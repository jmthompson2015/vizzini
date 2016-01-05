define([ "FiringArc",  "RangeRuler", "Weapon" ], function(FiringArc,  RangeRuler, Weapon)
{
    QUnit.module("WeaponInterface");

    QUnit.test("Weapon interface", function(assert)
    {
        // Setup.
        var name = "myWeapon";
        var weaponValue = 12;
        var ranges = [ RangeRuler.TWO, RangeRuler.THREE ];
        var firingArc = FiringArc.FORWARD;

        var weapon0 = new Weapon(name, weaponValue, ranges, firingArc);
        var weapons = [ weapon0 ];

        // Run / Verify.
        for (var i = 0; i < weapons.length; i++)
        {
            var weapon = weapons[i];

            // Verify the functions exist.
            assert.ok(weapon.name);
            assert.ok(weapon.weaponValue);
            assert.ok(weapon.ranges);
            assert.ok(weapon.firingArcKey);
            assert.ok(weapon.upgradeKey);
            assert.ok(weapon.isDefenderInFiringArc);
            assert.ok(weapon.isDefenderInRange);
//            assert.ok(weapon.isDefenderVulnerable);
            assert.ok(weapon.isDefenderTargetable);
            assert.ok(weapon.isPrimary);
            assert.ok(weapon.toString);
        }
    });
});
