/*
 * Provides a ship destroyed action for Starfighter Squadrons.
 */
define(function()
{
    function ShipDestroyedAction(environment, token, fromPosition)
    {
        this.doIt = function()
        {
            LOGGER.trace("ShipDestroyedAction.doIt() start");

            // var attackerTargetLock = token.getAttackerTargetLock();
            //
            // if (attackerTargetLock != null)
            // {
            // TargetLock.freeInstance(attackerTargetLock);
            // }
            //
            // var defenderTargetLocks = new
            // ArrayList<TargetLock>(token.getDefenderTargetLocks());
            //
            // for (final TargetLock defenderTargetLock : defenderTargetLocks)
            // {
            // TargetLock.freeInstance(defenderTargetLock);
            // }

            // Return the damage cards.
            environment.discardAllDamage(token.getDamages());
            environment.discardAllDamage(token.getCriticalDamages());

            environment.removeToken(fromPosition);
            environment.fireShipDestroyed(this);

            // return true;

            LOGGER.trace("ShipDestroyedAction.doIt() end");
        }

        this.getEnvironment = function()
        {
            return environment;
        }

        this.getFromPosition = function()
        {
            return fromPosition;
        }

        this.getToken = function()
        {
            return token;
        }
    }

    return ShipDestroyedAction;
});
