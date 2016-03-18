define([ "Environment" ], function(Environment)
{
    "use strict";
    function ShipFledAction(environment, token, fromPosition)
    {
        this.environment = function()
        {
            return environment;
        };

        this.token = function()
        {
            return token;
        };

        this.fromPosition = function()
        {
            return fromPosition;
        };

        this.doIt = function()
        {
            LOGGER.trace("ShipFledAction.doIt() start");

            var tokens = [];

            if (token.tokenFore && token.tokenAft)
            {
                tokens.push(token.tokenFore());
                tokens.push(token.tokenAft());
            }
            else
            {
                tokens.push(token);
            }

            tokens.forEach(function(token)
            {
                token.removeAllTargetLocks();

                // Return the damage cards.
                environment.discardAllDamage(token.damages());
                environment.discardAllDamage(token.criticalDamages());

                environment.removeToken(fromPosition);
                environment.trigger(Environment.SHIP_FLED_EVENT, this);
            });

            LOGGER.trace("ShipFledAction.doIt() end");
        };
    }

    return ShipFledAction;
});
