define([ "Environment", "Position", "RangeRuler", "Token", "Weapon" ], function(Environment, Position, RangeRuler,
        Token, Weapon)
{
    QUnit.module("Weapon");

    QUnit.test("Weapon properties", function(assert)
    {
        // Setup.
        var weapon = new Weapon("myWeapon", true, 12, [ RangeRuler.TWO, RangeRuler.THREE ]);

        // Run / Verify.
        assert.equal(weapon.getName(), "myWeapon");
        assert.equal(weapon.isPrimary(), true);
        assert.equal(weapon.getWeaponValue(), 12);
        var ranges = weapon.getRanges();
        assert.equal(ranges.length, 2);
        assert.equal(ranges[0], RangeRuler.TWO);
        assert.equal(ranges[1], RangeRuler.THREE);
    });

    QUnit.test("isDefenderInRange() range one", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
        environment.placeToken(attackerPosition, attacker);
        var weapon = new Weapon("myWeapon", true, 12, [ RangeRuler.ONE, RangeRuler.TWO ]);

        // Run.
        var result = weapon.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("isDefenderVulnerable() range one", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
        environment.placeToken(attackerPosition, attacker);
        var weapon = new Weapon("myWeapon", true, 12, [ RangeRuler.ONE, RangeRuler.TWO ]);

        // Run.
        var result = weapon.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("isDefenderVulnerable() rotated", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, 0);
        environment.placeToken(attackerPosition, attacker);
        var weapon = new Weapon("myWeapon", true, 12, [ RangeRuler.ONE, RangeRuler.TWO ]);

        // Run.
        var result = weapon.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(!result);
    });

    QUnit.test("isDefenderTargetable() range one", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
        environment.placeToken(attackerPosition, attacker);
        var weapon = new Weapon("myWeapon", true, 12, [ RangeRuler.ONE, RangeRuler.TWO ]);

        // Run.
        var result = weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        var weapon = new Weapon("myWeapon", true, 12, [ RangeRuler.TWO, RangeRuler.THREE ]);

        // Run / Verify.
        assert.equal(weapon.toString(), "myWeapon");
    });
});
