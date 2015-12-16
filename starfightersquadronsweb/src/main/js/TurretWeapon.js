/*
 * Provides a turret weapon.
 */
define([ "Weapon" ], function(Weapon)
{
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
    TurretWeapon.prototype = Vizzini.inherit(Weapon.prototype);

    // Now add properties to the prototype. These properties override the properties
    // of the same name from Weapon.prototype.
    Vizzini.extend(TurretWeapon.prototype,
    {
        isDefenderVulnerable: function(attacker, attackerPosition, defender, defenderPosition)
        {
            return true;
        },
    });

    return TurretWeapon;
});
