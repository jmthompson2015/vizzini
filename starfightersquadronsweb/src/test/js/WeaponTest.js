define([ "Environment", "FiringArc", "Position", "RangeRuler", "Token", "Weapon" ], function(Environment, FiringArc,
        Position, RangeRuler, Token, Weapon)
{
    QUnit.module("Weapon");

    QUnit.test("Weapon properties", function(assert)
    {
        // Setup.
        var weapon = new Weapon("Primary Weapon", 12, [ RangeRuler.TWO, RangeRuler.THREE ], FiringArc.FORWARD);

        // Run / Verify.
        assert.equal(weapon.name(), "Primary Weapon");
        assert.equal(weapon.isPrimary(), true);
        assert.equal(weapon.weaponValue(), 12);
        var ranges = weapon.ranges();
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
        var weapon = new Weapon("myWeapon", 12, [ RangeRuler.ONE, RangeRuler.TWO ], FiringArc.FORWARD);

        // Run.
        var result = weapon.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("isDefenderInFiringArc() range one", function(assert)
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
        var weapon = new Weapon("myWeapon", 12, [ RangeRuler.ONE, RangeRuler.TWO ], FiringArc.FORWARD);

        // Run.
        var result = weapon.isDefenderInFiringArc( attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("isDefenderInFiringArc() rotated", function(assert)
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
        var weapon = new Weapon("myWeapon", 12, [ RangeRuler.ONE, RangeRuler.TWO ], FiringArc.FORWARD);

        // Run.
        var result = weapon.isDefenderInFiringArc( attackerPosition, defender, defenderPosition);

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
        var weapon = new Weapon("myWeapon", 12, [ RangeRuler.ONE, RangeRuler.TWO ], FiringArc.FORWARD);

        // Run.
        var result = weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        var weapon = new Weapon("myWeapon", 12, [ RangeRuler.TWO, RangeRuler.THREE ], FiringArc.FORWARD);

        // Run / Verify.
        assert.equal(weapon.toString(), "myWeapon");
    });
});
