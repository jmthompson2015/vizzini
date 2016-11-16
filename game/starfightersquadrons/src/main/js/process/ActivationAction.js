define(["Difficulty", "Maneuver", "Phase", "process/Action", "process/ManeuverAction"],
    function(Difficulty, Maneuver, Phase, Action, ManeuverAction)
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

            this.maneuverKey = function()
            {
                return maneuverKey;
            };

            this.callback = function()
            {
                return callback;
            };
        }

        ActivationAction.prototype.doIt = function()
        {
            LOGGER.trace("ActivationAction.doIt() start");

            this.revealDial();

            LOGGER.trace("ActivationAction.doIt() end");
        };

        ActivationAction.prototype.revealDial = function()
        {
            LOGGER.trace("ActivationAction.revealDial() start");

            this.environment().phase(Phase.ACTIVATION_REVEAL_DIAL);

            this.setTemplate();

            LOGGER.trace("ActivationAction.revealDial() end");
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
                    var maneuverAction = new ManeuverAction(environment, parentToken, maneuverKey);
                    maneuverAction.doIt();
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
            LOGGER.trace("ActivationAction.checkPilotStress() start");

            this.environment().phase(Phase.ACTIVATION_CLEAN_UP);

            this.gainEnergy();

            LOGGER.trace("ActivationAction.checkPilotStress() end");
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

            this.allocateEnergy();

            LOGGER.trace("ActivationAction.gainEnergy() end");
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

        return ActivationAction;
    });
