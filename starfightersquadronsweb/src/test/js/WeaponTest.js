define([ "Environment", "EnvironmentFactory", "FiringArc", "Pilot", "Position", "RangeRuler", "SimpleAgent",
        "TargetLock", "Team", "Token", "UpgradeCard", "Weapon", "process/Reducer" ], function(Environment,
        EnvironmentFactory, FiringArc, Pilot, Position, RangeRuler, SimpleAgent, TargetLock, Team, Token, UpgradeCard,
        Weapon, Reducer)
{
    "use strict";
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
        var environment = EnvironmentFactory.createCoreSetEnvironment();
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
        var environment = EnvironmentFactory.createCoreSetEnvironment();
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
        var result = weapon.isDefenderInFiringArc(attackerPosition, attacker.primaryWeapon().primaryFiringArc(),
                defender, defenderPosition);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("isDefenderInFiringArc() rotated", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
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
        var result = weapon.isDefenderInFiringArc(attackerPosition, attacker.primaryWeapon().primaryFiringArc(),
                defender, defenderPosition);

        // Verify.
        assert.ok(!result);
    });

    QUnit.test("isDefenderTargetable() range one", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
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

    QUnit.test("isUsable()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [ UpgradeCard.MANGLER_CANNON,
                UpgradeCard.BLASTER_TURRET, UpgradeCard.PROTON_TORPEDOES ]);
        var weapon0 = attacker.secondaryWeapons()[0]; // Mangler cannon.
        var weapon1 = attacker.secondaryWeapons()[1]; // Blaster turret.
        var weapon2 = attacker.secondaryWeapons()[2]; // Cluster missiles.
        var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
        var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
        environment.placeToken(new Position(458, 895, -90), attacker);
        environment.placeToken(new Position(450, 845, 90), defender);

        // Run / Verify.
        assert.ok(weapon0.isUsable(attacker, defender));
        assert.ok(!weapon1.isUsable(attacker, defender));
        assert.ok(!weapon2.isUsable(attacker, defender));

        attacker.focus().increase();

        // Run / Verify.
        assert.ok(weapon0.isUsable(attacker, defender));
        assert.ok(weapon1.isUsable(attacker, defender));
        assert.ok(!weapon2.isUsable(attacker, defender));

        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);

        // Run / Verify.
        assert.ok(weapon0.isUsable(attacker, defender));
        assert.ok(weapon1.isUsable(attacker, defender));
        assert.ok(weapon2.isUsable(attacker, defender));
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        var weapon = new Weapon("myWeapon", 12, [ RangeRuler.TWO, RangeRuler.THREE ], FiringArc.FORWARD);

        // Run / Verify.
        assert.equal(weapon.toString(), "myWeapon");
    });
});
