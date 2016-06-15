define([ "Difficulty", "Maneuver", "ManeuverAction", "Phase", "process/Action" ], function(Difficulty, Maneuver,
        ManeuverAction, Phase, Action)
{
    "use strict";
    function ActivationAction(environment, adjudicator, token, maneuverKey, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("token", token);
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

    ActivationAction.prototype.allocateEnergy = function()
    {
    // TODO: implement allocateEnergy()
    };

    ActivationAction.prototype.checkPilotStress = function(maneuverKey)
    {
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
    };

    ActivationAction.prototype.doIt = function()
    {
        LOGGER.trace("ActivationAction.doIt() start");

        var environment = this.environment();
        var adjudicator = this.adjudicator();
        var token = this.token();

        if (token.isCloaked && token.isCloaked())
        {
            var agent = token.agent();
            agent.getDecloakAction(environment, adjudicator, token, this.setDecloakAction.bind(this));

            // Wait for agent to respond.
        }
        else
        {
            // Proceed.
            this.executeManeuver();
        }

        LOGGER.trace("ActivationAction.doIt() end");
    };

    ActivationAction.prototype.executeManeuver = function()
    {
        LOGGER.trace("ActivationAction.executeManeuver() start");

        var environment = this.environment();
        var adjudicator = this.adjudicator();
        var token = this.token();
        var maneuverKey = this.maneuverKey();
        var callback = this.callback();

        var agent = token.agent();
        var factionKey = token.pilot().shipTeam.teamKey;
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

            environment.phase(Phase.ACTIVATION_CHECK_PILOT_STRESS);
            this.checkPilotStress(maneuverKey);
        }

        setTimeout(this.finishExecuteManeuver.bind(this), 500);
    };

    ActivationAction.prototype.finishExecuteManeuver = function()
    {
        var environment = this.environment();
        var adjudicator = this.adjudicator();
        var token = this.token();
        var maneuverKey = this.maneuverKey();
        var callback = this.callback();
        var agent = token.agent();

        environment.phase(Phase.ACTIVATION_CLEAN_UP);

        if (token.isHuge() || (token.parent && token.parent.isHuge()))
        {
            environment.phase(Phase.ACTIVATION_GAIN_ENERGY);
            this.gainEnergy(maneuverKey);

            environment.phase(Phase.ACTIVATION_ALLOCATE_ENERGY);
            this.allocateEnergy();

            environment.phase(Phase.ACTIVATION_USE_ENERGY);
            this.useEnergy();
        }

        LOGGER.debug("adjudicator.canSelectShipAction(token) ? " + adjudicator.canSelectShipAction(token));

        if (adjudicator.canSelectShipAction(token))
        {
            agent.getShipAction(environment, adjudicator, token, this.setShipActionAction.bind(this));

            // Wait for agent to respond.
        }
        else
        {
            // Proceed.
            setTimeout(callback, 1000);
        }

        LOGGER.trace("ActivationAction.executeManeuver() end");
    };

    ActivationAction.prototype.gainEnergy = function(maneuverKey)
    {
        if (maneuverKey)
        {
            var maneuver = Maneuver.properties[maneuverKey];

            if (maneuver && maneuver.energy)
            {
                var token = this.token();

                // Gain energy up to the energy limit.
                var energyLimit = token.energyLimit();
                LOGGER.trace(token.pilotName() + " energyLimit = " + energyLimit);
                var store = token.store();

                for (var i = 0; i < maneuver.energy; i++)
                {
                    if (token.energyCount() < energyLimit)
                    {
                        store.dispatch(Action.addEnergyCount(token.id()));
                    }
                }
            }
        }
    };

    ActivationAction.prototype.setDecloakAction = function(decloakAction)
    {
        LOGGER.trace("ActivationAction.setDecloakAction() start");
        LOGGER.debug("decloakAction = " + decloakAction);

        var token = this.token();

        if (decloakAction)
        {
            decloakAction.doIt();
            var store = this.environment().store();
            store.dispatch(Action.addCloakCount(this.token().id(), -1));
            setTimeout(this.executeManeuver.bind(this), 1000);
        }
        else
        {
            // Proceed.
            this.executeManeuver();
        }

        LOGGER.trace("ActivationAction.setDecloakAction() end");
    };

    ActivationAction.prototype.setShipActionAction = function(shipActionAction)
    {
        LOGGER.debug("shipActionAction = " + shipActionAction);

        var environment = this.environment();
        var callback = this.callback();

        var delay = 0;

        if (shipActionAction !== undefined)
        {
            environment.phase(Phase.ACTIVATION_PERFORM_ACTION);
            shipActionAction.doIt();
            delay = 1000;
        }

        setTimeout(callback, delay);
    };

    ActivationAction.prototype.useEnergy = function()
    {
    // TODO: implement useEnergy()
    };

    return ActivationAction;
});
