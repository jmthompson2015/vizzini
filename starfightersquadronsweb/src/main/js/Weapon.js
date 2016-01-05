define([ "FiringArc", "Maneuver", "RangeRuler", "ShipBase" ], function(FiringArc, Maneuver, RangeRuler, ShipBase)
{
    function Weapon(name, weaponValue, ranges, firingArcKey, upgradeKey)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("weaponValue", weaponValue);
        InputValidator.validateNotNull("ranges", ranges);
        InputValidator.validateNotNull("firingArcKey", firingArcKey);
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

        this.firingArcKey = function()
        {
            return firingArcKey;
        }

        this.upgradeKey = function()
        {
            return upgradeKey;
        }
    }

    Weapon.prototype.isDefenderInFiringArc = function(attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var firingArc = FiringArc.properties[this.firingArcKey()];
        var bearing = attackerPosition.computeBearing(defenderPosition.x(), defenderPosition.y());
        var answer = firingArc.isInFiringArc(bearing);
        LOGGER.debug("weapon = " + this.name());
        LOGGER.debug("0 firingArcKey = " + this.firingArcKey() + " bearing = " + bearing + " answer ? " + answer);

        if (!answer)
        {
            var shipBaseKey = defender.shipBaseKey();
            var polygon = Maneuver.computePolygon(shipBaseKey, defenderPosition.x(), defenderPosition.y(),
                    defenderPosition.heading());
            var points = polygon.points();

            for (var i = 0; i < points.length; i += 2)
            {
                var bearing = attackerPosition.computeBearing(points[i], points[i + 1]);

                if (firingArc.isInFiringArc(bearing))
                {
                    answer = true;
                    LOGGER.debug(i + " firingArcKey = " + this.firingArcKey() + " bearing = " + bearing + " answer ? "
                            + answer);
                    break;
                }
            }
        }

        return answer;
    }

    Weapon.prototype.isDefenderInRange = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

        return this.ranges().vizziniContains(range);
    }

    Weapon.prototype.isDefenderTargetable = function(attacker, attackerPosition, defender, defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        return this.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition)
                && this.isDefenderInFiringArc(attackerPosition, defender, defenderPosition);
    }

    Weapon.prototype.isPrimary = function()
    {
        return this.name() === "Primary Weapon";
    }

    Weapon.prototype.toString = function()
    {
        return this.name();
    }

    return Weapon;
});
