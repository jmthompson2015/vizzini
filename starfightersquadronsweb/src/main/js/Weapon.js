/*
 * Provides a turret weapon.
 */
function TurretWeapon(name, isPrimary, weaponValue, ranges)
{
    this.getName = function()
    {
        return name;
    }

    this.getRanges = function()
    {
        return ranges;
    }

    this.getWeaponValue = function()
    {
        return weaponValue;
    }

    this.isPrimary = function()
    {
        return isPrimary;
    }
}

// Create a prototype object that inherits from the prototype of Weapon.
TurretWeapon.prototype = inherit(Weapon.prototype);

// Now add properties to the prototype. These properties override the properties
// of the same name from Weapon.prototype.
extend(TurretWeapon.prototype,
{
    isDefenderVulnerable: function(attacker, attackerPosition, defender,
            defenderPosition)
    {
        return true;
    },
});

/*
 * Provides a weapon for Starfighter Squadrons.
 */
function Weapon(name, isPrimary, weaponValue, ranges)
{
    this.getName = function()
    {
        return name;
    }

    this.getRanges = function()
    {
        return ranges;
    }

    this.getWeaponValue = function()
    {
        return weaponValue;
    }

    this.isPrimary = function()
    {
        return isPrimary;
    }
}

/*
 * @param attacker Attacker. @param attackerPosition Attacker position. @param
 * defender Defender. @param defenderPosition Defender position.
 * 
 * @return true if the defender is in this weapon's range.
 */
Weapon.prototype.isDefenderInRange = function(attacker, attackerPosition,
        defender, defenderPosition)
{
    var range = this._RANGE_RULER.getRange(attacker, attackerPosition,
            defender, defenderPosition);
    // LOGGER.trace("range = " + range);

    return range && ArrayUtilities.contains(this.getRanges(), range);
}

/*
 * @param attacker Attacker. @param attackerPosition Attacker position. @param
 * defender Defender. @param defenderPosition Defender position.
 * 
 * @return true if the defender is in this weapon's firing arc and range.
 */
Weapon.prototype.isDefenderTargetable = function(attacker, attackerPosition,
        defender, defenderPosition)
{
    return this.isDefenderInRange(attacker, attackerPosition, defender,
            defenderPosition)
            && this.isDefenderVulnerable(attacker, attackerPosition, defender,
                    defenderPosition);
}

/*
 * @param attacker Attacker. @param attackerPosition Attacker position. @param
 * defender Defender. @param defenderPosition Defender position.
 * 
 * @return true if the defender is in this weapon's firing arc.
 */
Weapon.prototype.isDefenderVulnerable = function(attacker, attackerPosition,
        defender, defenderPosition)
{
    return this._isDefenderInPrimaryFiringArc(attacker, attackerPosition,
            defender, defenderPosition);
}

Weapon.prototype.toString = function()
{
    return this.getName();
}

Weapon.prototype._RANGE_RULER = new RangeRuler();

/*
 * @param attacker Attacker. @param attackerPosition Attacker position. @param
 * defender Defender. @param defenderPosition Defender position.
 * 
 * @return true if the defender is in this weapon's firing arc.
 */
Weapon.prototype._isDefenderInPrimaryFiringArc = function(attacker,
        attackerPosition, defender, defenderPosition)
{
    var firingArc = attacker.getShipPrimaryFiringArc();
    var bearing = attackerPosition.computeBearing(defenderPosition.getX(),
            defenderPosition.getY());
    // LOGGER.trace("bearing = " + bearing);
    var answer = FiringArc.properties[firingArc].isInFiringArc(bearing);
    // LOGGER.trace("0 answer ? " + answer);

    if (!answer)
    {
        var defenderBase = defender.getShipBase();
        var polygon = ShipBase
                .computePolygon(defenderBase, defenderPosition.getX(),
                        defenderPosition.getY(), defenderPosition.getHeading());

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
