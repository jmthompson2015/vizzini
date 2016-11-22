define(["Difficulty", "Maneuver", "Phase", "UpgradeCard", "process/Action", "process/ManeuverAction", "process/PilotAbility2", "process/UpgradeAbility2"],
    function(Difficulty, Maneuver, Phase, UpgradeCard, Action, ManeuverAction, PilotAbility2, UpgradeAbility2)
    {
        "use strict";

        function ActivationAction(environment, adjudicator, token, maneuverKey, callback)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);
            // maneuverKey optional.
            InputValidator.validateNotNull("callback", callback);

            this.environment = function()
            {
                return environment;
            };

            this.adjudicator = function()
            {
                return adjudicator;
            };

            this.token = function()
            {
                return token;
            };

            this.maneuverKey = function(value)
            {
                if (value !== undefined)
                {
                    maneuverKey = value;
                }

                return maneuverKey;
            };

            this.callback = function()
            {
                return callback;
            };

            var maneuverAction;

            this.maneuverAction = function(value)
            {
                if (value !== undefined)
                {
                    maneuverAction = value;
                }

                return maneuverAction;
            };
        }

        ActivationAction.prototype.doIt = function()
        {
            LOGGER.trace("ActivationAction.doIt() start");

            var token = this.token();
            token.activationState().activationAction(this);

            this.revealDial();

            LOGGER.trace("ActivationAction.doIt() end");
        };

        ActivationAction.prototype.revealDial = function()
        {
            LOGGER.trace("ActivationAction.revealDial() start");

            this.environment().phase(Phase.ACTIVATION_REVEAL_DIAL);

            var agent = this.token().agent();
            var pilotKeys = this.getUnusedAgentInputPilotKeys();
            var upgradeKeys = this.getUnusedAgentInputUpgradeKeys();
            agent.chooseAbility(this.environment(), pilotKeys, upgradeKeys, this.finishRevealDial.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("ActivationAction.revealDial() end");
        };

        ActivationAction.prototype.finishRevealDial = function(pilotKey, upgradeKey, isAccepted)
        {
            LOGGER.trace("ActivationAction.finishRevealDial() start");
            LOGGER.debug("ActivationAction.finishRevealDial() pilotKey = " + pilotKey + " upgradeKey = " + upgradeKey + " isAccepted ? " + isAccepted);

            this.finish(pilotKey, upgradeKey, isAccepted, this.revealDial.bind(this), this.setTemplate.bind(this));

            LOGGER.trace("ActivationAction.finishRevealDial() end");
        };

        ActivationAction.prototype.setTemplate = function()
        {
            LOGGER.trace("ActivationAction.setTemplate() start");

            this.environment().phase(Phase.ACTIVATION_SET_TEMPLATE);

            this.executeManeuver();

            LOGGER.trace("ActivationAction.setTemplate() end");
        };

        ActivationAction.prototype.executeManeuver = function()
        {
            LOGGER.trace("ActivationAction.executeManeuver() start");

            this.environment().phase(Phase.ACTIVATION_EXECUTE_MANEUVER);

            var environment = this.environment();
            var token = this.token();
            var maneuverKey = this.maneuverKey();
            var parentToken = token;

            if (token.parent && token.pilot().value.endsWith("fore"))
            {
                parentToken = token.parent;
            }

            if (maneuverKey)
            {
                var fromPosition = environment.getPositionFor(parentToken);

                if (fromPosition)
                {
                    this.maneuverAction(new ManeuverAction(environment, parentToken, maneuverKey));
                    this.maneuverAction().doIt();
                }
            }

            this.checkPilotStress();

            LOGGER.trace("ActivationAction.executeManeuver() end");
        };

        ActivationAction.prototype.checkPilotStress = function()
        {
            LOGGER.trace("ActivationAction.checkPilotStress() start");

            this.environment().phase(Phase.ACTIVATION_CHECK_PILOT_STRESS);

            var maneuverKey = this.maneuverKey();

            if (maneuverKey)
            {
                var maneuver = Maneuver.properties[maneuverKey];

                if (maneuver)
                {
                    var difficultyKey = maneuver.difficultyKey;
                    LOGGER.trace("difficultyKey = " + difficultyKey);

                    if (difficultyKey === Difficulty.EASY)
                    {
                        this.token().removeStress();
                    }
                    else if (difficultyKey === Difficulty.HARD)
                    {
                        this.token().receiveStress();
                    }
                }
            }

            setTimeout(this.cleanUp.bind(this), 1000);

            LOGGER.trace("ActivationAction.checkPilotStress() end");
        };

        ActivationAction.prototype.cleanUp = function()
        {
            LOGGER.trace("ActivationAction.cleanUp() start");

            this.environment().phase(Phase.ACTIVATION_CLEAN_UP);

            var agent = this.token().agent();
            var pilotKeys = this.getUnusedAgentInputPilotKeys();
            var upgradeKeys = this.getUnusedAgentInputUpgradeKeys();
            agent.chooseAbility(this.environment(), pilotKeys, upgradeKeys, this.finishCleanUp.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("ActivationAction.cleanUp() end");
        };

        ActivationAction.prototype.finishCleanUp = function(pilotKey, upgradeKey, isAccepted)
        {
            LOGGER.trace("ActivationAction.finishCleanUp() start");
            LOGGER.debug("ActivationAction.finishCleanUp() pilotKey = " + pilotKey + " upgradeKey = " + upgradeKey + " isAccepted ? " + isAccepted);

            this.finish(pilotKey, upgradeKey, isAccepted, this.cleanUp.bind(this), this.gainEnergy.bind(this));

            LOGGER.trace("ActivationAction.finishCleanUp() end");
        };

        ActivationAction.prototype.gainEnergy = function()
        {
            LOGGER.trace("ActivationAction.gainEnergy() start");

            this.environment().phase(Phase.ACTIVATION_GAIN_ENERGY);

            var token = this.token();

            if (token.isHuge() || (token.parent && token.parent.isHuge()))
            {
                var maneuverKey = this.maneuverKey();

                if (maneuverKey !== undefined)
                {
                    var maneuver = Maneuver.properties[maneuverKey];

                    if (maneuver && maneuver.energy !== undefined)
                    {
                        // Gain energy up to the energy limit.
                        var energyLimit = token.energyValue();
                        var diff = energyLimit - token.energyCount();

                        if (diff > 0)
                        {
                            var value = Math.min(diff, maneuver.energy);
                            var store = token.store();
                            store.dispatch(Action.addEnergyCount(token, value));
                        }
                    }
                }
            }

            var agent = this.token().agent();
            var pilotKeys = this.getUnusedAgentInputPilotKeys();
            var upgradeKeys = this.getUnusedAgentInputUpgradeKeys();
            agent.chooseAbility(this.environment(), pilotKeys, upgradeKeys, this.finishGainEnergy.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("ActivationAction.gainEnergy() end");
        };

        ActivationAction.prototype.finishGainEnergy = function(pilotKey, upgradeKey, isAccepted)
        {
            LOGGER.trace("ActivationAction.finishGainEnergy() start");
            LOGGER.debug("ActivationAction.finishGainEnergy() pilotKey = " + pilotKey + " upgradeKey = " + upgradeKey + " isAccepted ? " + isAccepted);

            this.finish(pilotKey, upgradeKey, isAccepted, this.gainEnergy.bind(this), this.allocateEnergy.bind(this));

            LOGGER.trace("ActivationAction.finishGainEnergy() end");
        };

        ActivationAction.prototype.allocateEnergy = function()
        {
            LOGGER.trace("ActivationAction.allocateEnergy() start");

            this.environment().phase(Phase.ACTIVATION_ALLOCATE_ENERGY);

            var token = this.token();

            if (token.isHuge() || (token.parent && token.parent.isHuge()))
            {
                // FIXME: implement allocateEnergy()
            }

            this.useEnergy();

            LOGGER.trace("ActivationAction.allocateEnergy() end");
        };

        ActivationAction.prototype.useEnergy = function()
        {
            LOGGER.trace("ActivationAction.useEnergy() start");

            this.environment().phase(Phase.ACTIVATION_USE_ENERGY);

            var token = this.token();

            if (token.isHuge() || (token.parent && token.parent.isHuge()))
            {
                // FIXME: implement useEnergy()
            }

            this.performAction();

            LOGGER.trace("ActivationAction.useEnergy() end");
        };

        ActivationAction.prototype.performAction = function()
        {
            LOGGER.trace("ActivationAction.performAction() start");

            this.environment().phase(Phase.ACTIVATION_PERFORM_ACTION);

            var environment = this.environment();
            var adjudicator = this.adjudicator();
            var token = this.token();
            var agent = token.agent();

            LOGGER.debug("adjudicator.canSelectShipAction(token) ? " + adjudicator.canSelectShipAction(token));

            if (adjudicator.canSelectShipAction(token))
            {
                agent.getShipAction(environment, adjudicator, token, this.finishPerformAction.bind(this));

                // Wait for agent to respond.
            }
            else
            {
                setTimeout(this.finishPerformAction.bind(this), 1000);
            }

            LOGGER.trace("ActivationAction.performAction() end");
        };

        ActivationAction.prototype.finishPerformAction = function(shipActionAction)
        {
            LOGGER.trace("ActivationAction.finishPerformAction() start");

            var environment = this.environment();
            var delay = 0;

            if (shipActionAction !== undefined)
            {
                environment.phase(Phase.ACTIVATION_PERFORM_ACTION);
                shipActionAction.doIt();
                delay = 1000;
            }

            setTimeout(this.callback(), delay);

            LOGGER.trace("ActivationAction.finishPerformAction() end");
        };

        ////////////////////////////////////////////////////////////////////////
        ActivationAction.prototype.finish = function(pilotKey, upgradeKey, isAccepted, backFunction, forwardFunction)
        {
            InputValidator.validateNotNull("backFunction", backFunction);
            InputValidator.validateNotNull("forwardFunction", forwardFunction);

            var store = this.environment().store();
            var token = this.token();

            if (pilotKey)
            {
                if (isAccepted)
                {
                    var pilotAbility = this.getPilotAbility(pilotKey);
                    pilotAbility.consequent(store, token);
                }

                token.activationState().usedPilots(upgradeKey);
                backFunction();
            }
            else if (upgradeKey)
            {
                if (isAccepted)
                {
                    var upgradeAbility = this.getUpgradeAbility(upgradeKey);
                    upgradeAbility.consequent(store, token);
                }

                token.activationState().usedUpgrades(upgradeKey);
                backFunction();
            }
            else
            {
                forwardFunction();
            }
        };

        ActivationAction.prototype.getPilotAbility = function(pilotKey)
        {
            InputValidator.validateNotNull("pilotKey", pilotKey);

            var answer;
            var phaseKey = this.environment().phase();

            if (PilotAbility2[phaseKey])
            {
                answer = PilotAbility2[phaseKey][pilotKey];
            }

            return answer;
        };

        ActivationAction.prototype.getUnusedAgentInputPilotKeys = function()
        {
            var store = this.environment().store();
            var token = this.token();
            var pilot = token.pilot();
            var pilotKey = pilot.value;
            var usedPilots = token.activationState().usedPilots();
            var pilotAbility = this.getPilotAbility(pilotKey);

            var answer = [];

            if (pilot.agentInput && !usedPilots.vizziniContains(pilotKey) && pilotAbility && pilotAbility.condition && pilotAbility.condition(store, token))
            {
                answer.push(pilotKey);
            }

            return answer;
        };

        ActivationAction.prototype.getUnusedAgentInputUpgradeKeys = function()
        {
            var store = this.environment().store();
            var token = this.token();

            return token.upgradeKeys().filter(function(upgradeKey)
            {
                var upgrade = UpgradeCard.properties[upgradeKey];
                var usedUpgrades = token.activationState().usedUpgrades();
                var upgradeAbility = this.getUpgradeAbility(upgradeKey);

                return upgrade.agentInput && !usedUpgrades.vizziniContains(upgradeKey) && upgradeAbility && upgradeAbility.condition && upgradeAbility.condition(store, token);
            }, this);
        };

        ActivationAction.prototype.getUpgradeAbility = function(upgradeKey)
        {
            InputValidator.validateNotNull("upgradeKey", upgradeKey);

            var answer;
            var phaseKey = this.environment().phase();

            if (UpgradeAbility2[phaseKey])
            {
                answer = UpgradeAbility2[phaseKey][upgradeKey];
            }

            return answer;
        };

        return ActivationAction;
    });
