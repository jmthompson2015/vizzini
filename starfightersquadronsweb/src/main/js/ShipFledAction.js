/*
 * Provides a ship fled action for Starfighter Squadrons.
 */
define(function()
{
    function ShipFledAction(environment, token, fromPosition)
    {
        this.getToken = function()
        {
            return token;
        }

        this.doIt = function()
        {
            LOGGER.trace("ShipFledAction.doIt() start");

            token.removeAllTargetLocks();

            // Return the damage cards.
            environment.discardAllDamage(token.getDamages());
            environment.discardAllDamage(token.getCriticalDamages());

            environment.removeToken(fromPosition);
            environment.fireShipFled(this);

            // return true;
            LOGGER.trace("ShipFledAction.doIt() end");
        }
    }

    return ShipFledAction;
});
