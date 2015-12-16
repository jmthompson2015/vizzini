/*
 * Provides a range ruler for Starfighter Squadrons.
 */
define([ "Maneuver", "Range" ], function(Maneuver, Range)
{
    var RangeRuler =
    {
        /*
         * @param attacker Attacking token. @param attackerPosition Attacker position. @param defender Defending token.
         * @param defenderPosition Defender position.
         * 
         * @return the range.
         */
        getRange: function(attacker, attackerPosition, defender, defenderPosition)
        {
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("attackerPosition", attackerPosition);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateNotNull("defenderPosition", defenderPosition);

            var attackerBase = attacker.getShipBase();
            var defenderBase = defender.getShipBase();

            var attackerPolygon = Maneuver.computePolygon(attackerBase, attackerPosition.getX(), attackerPosition
                    .getY(), attackerPosition.getHeading());
            var defenderPolygon = Maneuver.computePolygon(defenderBase, defenderPosition.getX(), defenderPosition
                    .getY(), defenderPosition.getHeading());

            // FIXME
            // var distance = SHAPE_UTILS.computeMinimumDistance(attackerPolygon,
            // defenderPolygon);
            var distance = attackerPosition.computeDistance(defenderPosition);
            // LOGGER.trace("distance = "+distance);

            return Range.findRange(Math.round(distance));
        }
    }

    return RangeRuler;
});
