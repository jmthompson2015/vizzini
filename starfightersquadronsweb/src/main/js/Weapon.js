define([ "FiringArc", "Maneuver", "RangeRuler", "ShipBase" ], function(FiringArc, Maneuver, RangeRuler, ShipBase)
{
    function Weapon(name, weaponValue, ranges, upgradeKey)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("weaponValue", weaponValue);
        InputValidator.validateNotNull("ranges", ranges);
        // upgradeKey optional.

        this.name = function()
        {
            return name;
        }

        this.weaponValue = function()
        {
            return weaponValue;
        }

        this.ranges = function()
        {
            return ranges;
        }

        this.upgradeKey = function()
        {
            return upgradeKey;
        }
    }

    /*
     * @return true if the defender is in this weapon's range.
     */
    Weapon.prototype.isDefenderInRange = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
        // LOGGER.trace("Weapon.isDefenderInRange() range = " + range);
        // LOGGER.trace("Weapon.ranges() = " + this.ranges());

        return range && this.ranges().vizziniContains(range);
    }

    /*
     * @return true if the defender is in this weapon's firing arc and range.
     */
    Weapon.prototype.isDefenderTargetable = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        // LOGGER.trace("Weapon.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition) ? "
        // + this.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition));
        // LOGGER.trace("Weapon.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition) ? "
        // + this.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition));
        return this.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition)
                && this.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
    }

    /*
     * @return true if the defender is in this weapon's firing arc.
     */
    Weapon.prototype.isDefenderVulnerable = function(attacker, attackerPosition, defender, defenderPosition)
    {
        return this._isDefenderInPrimaryFiringArc(attacker, attackerPosition, defender, defenderPosition);
    }

    Weapon.prototype.isPrimary = function()
    {
        return this.name() === "Primary Weapon";
    }

    Weapon.prototype.toString = function()
    {
        return this.name();
    }

    /*
     * @return true if the defender is in this weapon's firing arc.
     */
    Weapon.prototype._isDefenderInPrimaryFiringArc = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var firingArc = attacker.primaryFiringArc();
        var bearing = attackerPosition.computeBearing(defenderPosition.x(), defenderPosition.y());
        // LOGGER.trace("bearing = " + bearing);
        var answer = FiringArc.properties[firingArc].isInFiringArc(bearing);
        // LOGGER.trace("0 answer ? " + answer);

        if (!answer)
        {
            var defenderBase = defender.shipBaseKey();
            var polygon = Maneuver.computePolygon(defenderBase, defenderPosition.x(), defenderPosition.y(),
                    defenderPosition.heading());

            // FIXME
            // final double[] coords = new double[6];
            //
            // for (final PathIterator iter = polygon.getPathIterator(null);
            // !iter.isDone(); iter.next())
            // {
            // iter.currentSegment(coords);
            // final int bearing = attackerPosition.computeBearing(coords[0],
            // coords[1]);
            // LOGGER.trace("bearing = " + bearing);
            //
            // if (firingArc.isInFiringArc(bearing))
            // {
            // answer = true;
            // break;
            // }
            // }
        }

        return answer;
    }

    return Weapon;
});
