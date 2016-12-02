define(["DamageCard", "DamageCardV2", "Difficulty", "Event", "Maneuver", "Phase", "UpgradeCard", "process/Action", "process/DamageAbility2", "process/ManeuverAction", "process/PilotAbility2", "process/UpgradeAbility2"],
    function(DamageCard, DamageCardV2, Difficulty, Event, Maneuver, Phase, UpgradeCard, Action, DamageAbility2, ManeuverAction, PilotAbility2, UpgradeAbility2)
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
            var damageKeys = this.getUnusedDamageKeys();
            var pilotKeys = this.getUnusedPilotKeys();
            var upgradeKeys = this.getUnusedUpgradeKeys();
            agent.chooseAbility(this.environment(), damageKeys, pilotKeys, upgradeKeys, this.finishRevealDial.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("ActivationAction.revealDial() end");
        };

        ActivationAction.prototype.finishRevealDial = function(damageKey, pilotKey, upgradeKey, isAccepted)
        {
            LOGGER.trace("ActivationAction.finishRevealDial() start");
            LOGGER.debug("ActivationAction.finishRevealDial() damageKey = " + damageKey + " pilotKey = " + pilotKey + " upgradeKey = " + upgradeKey + " isAccepted ? " + isAccepted);

            this.finish(damageKey, pilotKey, upgradeKey, isAccepted, this.revealDial.bind(this), this.setTemplate.bind(this));
            LOGGER.debug("ActivationAction.finishRevealDial() maneuverKey = " + this.maneuverKey());

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
                    var store = this.environment().store();
                    store.dispatch(Action.setEvent(Event.AFTER_EXECUTE_MANEUVER, parentToken, this.finishExecuteManeuver.bind(this)));
                }
                else
                {
                    this.checkPilotStress();
                }
            }
            else
            {
                this.checkPilotStress();
            }

            LOGGER.trace("ActivationAction.executeManeuver() end");
        };

        ActivationAction.prototype.finishExecuteManeuver = function()
        {
            LOGGER.trace("ActivationAction.finishExecuteManeuver() start");

            this.checkPilotStress();

            LOGGER.trace("ActivationAction.finishExecuteManeuver() end");
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
            var damageKeys = this.getUnusedDamageKeys();
            var pilotKeys = this.getUnusedPilotKeys();
            var upgradeKeys = this.getUnusedUpgradeKeys();
            agent.chooseAbility(this.environment(), damageKeys, pilotKeys, upgradeKeys, this.finishCleanUp.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("ActivationAction.cleanUp() end");
        };

        ActivationAction.prototype.finishCleanUp = function(damageKey, pilotKey, upgradeKey, isAccepted)
        {
            LOGGER.trace("ActivationAction.finishCleanUp() start");
            LOGGER.debug("ActivationAction.finishCleanUp() damageKey = " + damageKey + " pilotKey = " + pilotKey + " upgradeKey = " + upgradeKey + " isAccepted ? " + isAccepted);

            this.finish(damageKey, pilotKey, upgradeKey, isAccepted, this.cleanUp.bind(this), this.gainEnergy.bind(this));

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
            var damageKeys = this.getUnusedDamageKeys();
            var pilotKeys = this.getUnusedPilotKeys();
            var upgradeKeys = this.getUnusedUpgradeKeys();
            agent.chooseAbility(this.environment(), damageKeys, pilotKeys, upgradeKeys, this.finishGainEnergy.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("ActivationAction.gainEnergy() end");
        };

        ActivationAction.prototype.finishGainEnergy = function(damageKey, pilotKey, upgradeKey, isAccepted)
        {
            LOGGER.trace("ActivationAction.finishGainEnergy() start");
            LOGGER.debug("ActivationAction.finishGainEnergy() damageKey = " + damageKey + " pilotKey = " + pilotKey + " upgradeKey = " + upgradeKey + " isAccepted ? " + isAccepted);

            this.finish(damageKey, pilotKey, upgradeKey, isAccepted, this.gainEnergy.bind(this), this.allocateEnergy.bind(this));

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
        ActivationAction.prototype.finish = function(damageKey, pilotKey, upgradeKey, isAccepted, backFunction, forwardFunction)
        {
            InputValidator.validateNotNull("backFunction", backFunction);
            InputValidator.validateNotNull("forwardFunction", forwardFunction);

            var store = this.environment().store();
            var token = this.token();

            if (damageKey)
            {
                if (isAccepted)
                {
                    var damageAbility = this.getDamageAbility(damageKey);
                    damageAbility.consequent(store, token);
                }

                token.activationState().usedDamages(damageKey);
                backFunction();
            }
            else if (pilotKey)
            {
                if (isAccepted)
                {
                    var pilotAbility = this.getPilotAbility(pilotKey);
                    pilotAbility.consequent(store, token);
                }

                token.activationState().usedPilots(pilotKey);
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

        ActivationAction.prototype.getDamageAbility = function(damageKey)
        {
            InputValidator.validateNotNull("damageKey", damageKey);

            var answer;
            var phaseKey = this.environment().phase();

            if (DamageAbility2[phaseKey])
            {
                answer = DamageAbility2[phaseKey][damageKey];
            }

            return answer;
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

        ActivationAction.prototype.getUnusedDamageKeys = function()
        {
            var store = this.environment().store();
            var token = this.token();

            return token.criticalDamages().filter(function(damageKey)
            {
                // var damage = DamageCard.properties[damageKey];
                // if (!damage)
                // {
                //     damage = DamageCardV2.properties[damageKey];
                // }
                var usedDamages = token.activationState().usedDamages();
                var damageAbility = this.getDamageAbility(damageKey);
                return !usedDamages.vizziniContains(damageKey) && damageAbility !== undefined &&
                    (damageAbility.condition === undefined || (damageAbility.condition !== undefined && damageAbility.condition(store, token)));
            }, this);
        };

        ActivationAction.prototype.getUnusedPilotKeys = function()
        {
            var store = this.environment().store();
            var token = this.token();
            var pilot = token.pilot();
            var pilotKey = pilot.value;
            var usedPilots = token.activationState().usedPilots();
            var pilotAbility = this.getPilotAbility(pilotKey);

            var answer = [];

            if (!usedPilots.vizziniContains(pilotKey) && pilotAbility !== undefined &&
                (pilotAbility.condition === undefined || (pilotAbility.condition !== undefined && pilotAbility.condition(store, token))))
            {
                answer.push(pilotKey);
            }

            return answer;
        };

        ActivationAction.prototype.getUnusedUpgradeKeys = function()
        {
            var store = this.environment().store();
            var token = this.token();

            return token.upgradeKeys().filter(function(upgradeKey)
            {
                // var upgrade = UpgradeCard.properties[upgradeKey];
                var usedUpgrades = token.activationState().usedUpgrades();
                var upgradeAbility = this.getUpgradeAbility(upgradeKey);
                return !usedUpgrades.vizziniContains(upgradeKey) && upgradeAbility !== undefined &&
                    (upgradeAbility.condition === undefined || (upgradeAbility.condition !== undefined && upgradeAbility.condition(store, token)));
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
