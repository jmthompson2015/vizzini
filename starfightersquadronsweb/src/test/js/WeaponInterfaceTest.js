define([ "TurretWeapon", "Weapon" ], function(TurretWeapon, Weapon)
{
    QUnit.module("WeaponInterface");

    QUnit.test("Weapon interface", function(assert)
    {
        // Setup.
        var name = "myWeapon";
        var isPrimary = true;
        var weaponValue = 12;
        var ranges = [ Range.TWO, Range.THREE ];

        var weapon0 = new Weapon(name, isPrimary, weaponValue, ranges);
        var weapon1 = new TurretWeapon(name, isPrimary, weaponValue, ranges);
        var weapons = [ weapon0, weapon1 ];

        // Run / Verify.
        for (var i = 0; i < weapons.length; i++)
        {
            var weapon = weapons[i];

            // Verify the functions exist.
            assert.ok(weapon.getName);
            assert.ok(weapon.isPrimary);
            assert.ok(weapon.getWeaponValue);
            assert.ok(weapon.getRanges);
            assert.ok(weapon.isDefenderInRange);
            assert.ok(weapon.isDefenderVulnerable);
            assert.ok(weapon.isDefenderTargetable);
            assert.ok(weapon.toString);
        }
    });
});
