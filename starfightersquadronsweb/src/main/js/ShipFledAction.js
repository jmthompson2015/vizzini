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
            // final TargetLock attackerTargetLock = token.getAttackerTargetLock();
            //
            // if (attackerTargetLock != null)
            // {
            // TargetLock.freeInstance(attackerTargetLock);
            // }
            //
            // final List<TargetLock> defenderTargetLocks = new
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
            environment.fireShipFled(this);

            // return true;
            LOGGER.trace("ShipFledAction.doIt() end");
        }
    }

    return ShipFledAction;
});
