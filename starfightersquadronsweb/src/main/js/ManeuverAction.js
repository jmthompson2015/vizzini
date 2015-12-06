// require("ShipFledAction");

/*
 * Construct this object.
 * 
 * @param environment Environment. 
 * 
 * @param maneuver Maneuver. 
 * 
 * @param fromPosition From position. 
 * 
 * @param shipBase Ship base.
 */
function ManeuverAction(environment, maneuver, fromPosition, shipBase)
{
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

        var toPosition = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);
        LOGGER.trace("toPosition = " + toPosition);

        if (!toPosition && (isBarrelRoll || isBoost))
        {
            // Maneuver failed.
            var message = isBarrelRoll ? "Barrel Roll failed." : "Boost failed.";
            LOGGER.info(message);
        }
        else if (!toPosition
                || !Position.isPathInPlayArea(ShipBase.computePolygon(shipBase, toPosition.getX(), toPosition.getY(),
                        toPosition.getHeading())))
        {
            LOGGER.info("Ship fled the battlefield: " + token.getName());
            var shipFledAction = new ShipFledAction(environment, token, fromPosition);
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
}
