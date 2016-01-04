/*
 * Provides a turret weapon.
 */
define([ "Weapon" ], function(Weapon)
{
    function TurretWeapon(name, weaponValue, ranges, upgradeKey)
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
