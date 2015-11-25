// require("Range");

/*
 * Provides a range ruler for Starfighter Squadrons.
 */
function RangeRuler()
{
    /*
     * @param attacker Attacking token. @param attackerPosition Attacker
     * position. @param defender Defending token. @param defenderPosition
     * Defender position.
     * 
     * @return the range.
     */
    this.getRange = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var attackerBase = attacker.getShipBase();
        var defenderBase = defender.getShipBase();

        var attackerPolygon = ShipBase.computePolygon(attackerBase, attackerPosition.getX(), attackerPosition.getY(),
                attackerPosition.getHeading());
        var defenderPolygon = ShipBase.computePolygon(defenderBase, defenderPosition.getX(), defenderPosition.getY(),
                defenderPosition.getHeading());

        // FIXME
        // var distance = SHAPE_UTILS.computeMinimumDistance(attackerPolygon,
        // defenderPolygon);
        var distance = attackerPosition.computeDistance(defenderPosition);
        // LOGGER.trace("distance = "+distance);

        return Range.findRange(Math.round(distance));
    }
}
