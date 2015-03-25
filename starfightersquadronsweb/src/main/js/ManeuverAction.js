/*
 * Provides a ship fled action for Starfighter Squadrons.
 */
function ShipFledAction(environmentIn, tokenIn, fromPositionIn)
{
    var environment = environmentIn;
    var token = tokenIn;
    var fromPosition = fromPositionIn;

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

/*
 * Construct this object.
 * 
 * @param environment Environment. @param maneuver Maneuver. @param fromPosition
 * From position. @param shipBase Ship base.
 */
function ManeuverAction(environmentIn, maneuverIn, fromPositionIn, shipBaseIn)
{
    var environment = environmentIn;
    var maneuver = maneuverIn;
    var fromPosition = fromPositionIn;
    var shipBase = shipBaseIn;
    var token = environment.getTokenAt(fromPosition);

    // Flag indicating if the maneuver is a barrel roll.
    var isBarrelRoll = false;

    // Flag indicating if the maneuver is a boost.
    var isBoost = false;

    this.getManeuver = function()
    {
        return maneuver;
    }

    this.getFromPosition = function()
    {
        return fromPosition;
    }

    this.getShipBase = function()
    {
        return shipBase;
    }

    this.doIt = function()
    {
        token.setManeuverAction(this);
        // token.setTouching(false);
        environment.setPhase(Phase.ACTIVATION_REVEAL_DIAL);

        var toPosition = Maneuver.computeToPosition(maneuver, fromPosition,
                shipBase);
        LOGGER.trace("toPosition = " + toPosition);

        if (!toPosition && (isBarrelRoll || isBoost))
        {
            // Maneuver failed.
            var message = isBarrelRoll ? "Barrel Roll failed."
                    : "Boost failed.";
            LOGGER.info(message);
        }
        else if (!toPosition
                || !isInPlayArea(ShipBase.computePolygon(shipBase, toPosition
                        .getX(), toPosition.getY(), toPosition.getHeading())))
        {
            LOGGER.info("Ship fled the battlefield: " + token.getName());
            var shipFledAction = new ShipFledAction(environment, token,
                    fromPosition);
            shipFledAction.doIt();
        }
        else
        {
            environment.removeToken(fromPosition);
            environment.placeToken(toPosition, token);

            environment.setPhase(Phase.ACTIVATION_EXECUTE_MANEUVER);
        }

        return false;
    }

    function isInPlayArea(path)
    {
        var answer = true;
        var points = path.getPoints();

        for (var i = 0; i < points.length; i += 2)
        {
            if (!Position.isInPlayArea(points[i], points[i + 1]))
            {
                answer = false;
                break;
            }
        }

        return answer;
    }
}
