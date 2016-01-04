define([ "TurretWeapon", "RangeRuler", "Weapon" ], function(TurretWeapon, RangeRuler, Weapon)
{
    QUnit.module("WeaponInterface");

    QUnit.test("Weapon interface", function(assert)
    {
        // Setup.
        var name = "myWeapon";
        var weaponValue = 12;
        var ranges = [ RangeRuler.TWO, RangeRuler.THREE ];

        var weapon0 = new Weapon(name, weaponValue, ranges);
        var weapon1 = new TurretWeapon(name, weaponValue, ranges);
        var weapons = [ weapon0, weapon1 ];

        // Run / Verify.
        for (var i = 0; i < weapons.length; i++)
        {
            var weapon = weapons[i];

            // Verify the functions exist.
            assert.ok(weapon.name);
            assert.ok(weapon.isPrimary);
            assert.ok(weapon.weaponValue);
            assert.ok(weapon.ranges);
            assert.ok(weapon.upgradeKey);
            assert.ok(weapon.isDefenderInRange);
            assert.ok(weapon.isDefenderVulnerable);
            assert.ok(weapon.isDefenderTargetable);
            assert.ok(weapon.toString);
        }
    });
});
