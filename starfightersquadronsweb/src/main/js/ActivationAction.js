define([ "ManeuverAction" ], function(ManeuverAction)
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

    ActivationAction.prototype.setDecloakAction = function(decloakAction)
    {
        LOGGER.trace("ActivationAction.setDecloakAction() start");
        LOGGER.debug("decloakAction = " + decloakAction);

        var token = this.token();

        if (decloakAction)
        {
            decloakAction.doIt();
            token.cloak().decrease();
            setTimeout(this.executeManeuver.bind(this), 1000);
        }
        else
        {
            // Proceed.
            this.executeManeuver();
        }

        LOGGER.trace("ActivationAction.setDecloakAction() end");
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

    ActivationAction.prototype.setShipActionAction = function(shipActionAction)
    {
        LOGGER.debug("shipActionAction = " + shipActionAction);

        var callback = this.callback();

        var delay = 0;

        if (shipActionAction !== undefined)
        {
            shipActionAction.doIt();
            delay = 1000;
        }

        setTimeout(callback, delay);
    };

    return ActivationAction;
});
