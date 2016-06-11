define([ "Adjudicator", "CombatAction", "Environment", "EnvironmentFactory", "Maneuver", "Phase", "Pilot", "Position",
        "RangeRuler", "SimpleAgent", "TargetLock", "Team", "Token", "UpgradeCard", "process/Reducer" ], function(
        Adjudicator, CombatAction, Environment, EnvironmentFactory, Maneuver, Phase, Pilot, Position, RangeRuler,
        SimpleAgent, TargetLock, Team, Token, UpgradeCard, Reducer)
{
    "use strict";
    QUnit.module("CombatAction");

    QUnit.test("CombatAction.doIt() out of range", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var maneuver = Maneuver.STRAIGHT_1_EASY;
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(attackerPosition.x(), attackerPosition.y(), -30);
        environment.placeToken(attackerPosition, attacker);
        var weapon = attacker.primaryWeapon();
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.combatState().range());
    });

    QUnit.skip("CombatAction.doIt() range one", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var maneuver = Maneuver.STRAIGHT_1_EASY;
        var attacker = environment.tokens()[2]; // X-Wing
        assert.ok(attacker);
        var weapon = attacker.primaryWeapon();
        assert.ok(weapon);
        var defenderPosition = new Position(305, 20, 90); // TIE Fighter
        var defender = environment.tokens()[0];
        defender.increaseEvadeCount();
        environment.removeToken(attackerPosition);
        var attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
        environment.placeToken(attackerPosition, attacker);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.equal(attacker.range(), RangeRuler.ONE);
        assert.equal(environment.phase(), Phase.COMBAT_DEAL_DAMAGE);
    });

    QUnit.test("CombatAction.doIt() Advanced Proton Torpedoes", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.ADVANCED_PROTON_TORPEDOES;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 5);
    });

    QUnit.test("CombatAction.doIt() Assault Missiles", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.ASSAULT_MISSILES;
        var combatAction = createCombatActionRange2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(true, "test resumed from async operation");
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(combatAction.executionCount(), 1);
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 4);
        if (attacker.combatState().isDefenderHit())
        {
            var token0 = environment.tokens()[0];
            assert.ok(token0);
            assert.equal(token0.damageCount(), 0);
            var token1 = environment.tokens()[1];
            if (token1)
            {
                assert.ok(token1);
                assert.equal(token1.damageCount(), 1);
            }
            var token2 = environment.tokens()[2];
            if (token2)
            {
                assert.ok(token2);
                assert.equal(token2.damageCount(), 1);
            }
        }
    });

    QUnit.test("CombatAction.doIt() Blaster Turret", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.BLASTER_TURRET;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.equal(attacker.focus().count(), 1);
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.equal(attacker.focus().count(), 0);
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        assert.equal(attacker.combatState().attackDice().size(), 3);
    });

    QUnit.test("CombatAction.doIt() Bossk", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.BOSSK;
        var combatAction = createCombatAction2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.stress().count(), 0);
        assert.equal(attacker.focus().count(), 0);
        assert.equal(attacker.attackerTargetLocks().length, 0);
        assert.equal(defender.defenderTargetLocks().length, 0);

        // Run.
        var done = assert.async();
        combatAction.doIt();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            if (attacker.combatState().isDefenderHit())
            {
                assert.equal(attacker.stress().count(), 0);
                assert.equal(attacker.focus().count(), 0);
                assert.equal(attacker.attackerTargetLocks().length, 0);
                assert.equal(defender.defenderTargetLocks().length, 0);
            }
            else
            {
                assert.equal(attacker.stress().count(), 1);
                assert.equal(attacker.focus().count(), 1);
                assert.equal(attacker.attackerTargetLocks().length, 1);
                assert.equal(defender.defenderTargetLocks().length, 1);
            }
            done();
        }, 1100);
    });

    QUnit.test("CombatAction.doIt() Cluster Missiles", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.CLUSTER_MISSILES;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        var done = assert.async();
        combatAction.doIt();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!attacker.findTargetLockByDefender(defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 2);
            assert.equal(attacker.secondaryWeapons().length, 0);
            assert.equal(attacker.combatState().attackDice().size(), 3);
            done();
        }, 1400);
    });

    QUnit.test("CombatAction.doIt() Concussion Missiles", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.CONCUSSION_MISSILES;
        var combatAction = createCombatActionRange2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 4);
    });

    QUnit.test("CombatAction.doIt() Heavy Laser Cannon", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.HEAVY_LASER_CANNON;
        var combatAction = createCombatActionRange2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        assert.equal(attacker.combatState().attackDice().size(), 4);
    });

    QUnit.test("CombatAction.doIt() Hot Shot Blaster", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.HOT_SHOT_BLASTER;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 3);
    });

    QUnit.test("CombatAction.doIt() Ion Torpedoes", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.ION_TORPEDOES;
        var combatAction = createCombatActionRange2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(true, "test resumed from async operation");
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(combatAction.executionCount(), 1);
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 4);
        if (attacker.combatState().isDefenderHit())
        {
            var token0 = environment.tokens()[0];
            assert.ok(token0);
            assert.equal(token0.ion().count(), 0);
            var token1 = environment.tokens()[1];
            assert.ok(token1);
            assert.equal(token1.ion().count(), 1);
            var token2 = environment.tokens()[2];
            assert.ok(token2);
            assert.equal(token2.ion().count(), 1);
        }
    });

    QUnit.test("CombatAction.doIt() Mangler Cannon", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.MANGLER_CANNON;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        assert.equal(attacker.combatState().attackDice().size(), 3);
    });

    QUnit.test("CombatAction.doIt() Proton Rockets", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.PROTON_ROCKETS;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 2 + 2);
    });

    QUnit.test("CombatAction.doIt() Proton Torpedoes", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.PROTON_TORPEDOES;
        var combatAction = createCombatActionRange2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 4);
    });

    QUnit.test("CombatAction.doIt() Tactician", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.TACTICIAN;
        var store = Redux.createStore(Reducer.root);
        var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
        var adjudicator = new Adjudicator();

        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [ upgradeKey ]);
        var attackerPosition = new Position(458, 895, -90);
        var weapon = attacker.primaryWeapon();

        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(attackerPosition.x(), attackerPosition.y() - 250, 90);

        environment.placeToken(attackerPosition, attacker);
        environment.placeToken(defenderPosition, defender);

        attacker.focus().increase();

        var targetLock = new TargetLock(store, attacker, defender);
        attacker.addAttackerTargetLock(targetLock);

        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        var done = assert.async();
        combatAction.doIt();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.combatState().attackDice().size(), 2);
            assert.equal(attacker.combatState().defenseDice().size(), 3);
            assert.equal(defender.stress().count(), 1);
            done();
        }, 1000);
    });

    QUnit.test("CombatAction.doIt() Twin Laser Turret", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.TWIN_LASER_TURRET;
        var combatAction = createCombatActionRange2(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        var defender = environment.tokens()[1];
        assert.equal(defender.damageCount(), 0);

        // Run.
        var done = assert.async();
        combatAction.doIt();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 2);
            assert.equal(attacker.secondaryWeapons().length, 1);
            assert.ok(attacker.combatState() !== undefined);
            assert.ok(attacker.combatState().attackDice() !== undefined);
            assert.equal(attacker.combatState().attackDice().size(), 3);
            assert.ok(0 <= defender.damageCount() && defender.damageCount() <= 2, "defender.damageCount() = " +
                    defender.damageCount());
            done();
        }, 1000);
    });

    QUnit.test("CombatAction.doIt() Whisper", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
        var adjudicator = new Adjudicator();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var attacker = new Token(store, Pilot.WHISPER, imperialAgent);
        var attackerPosition = new Position(458, 895, -90);
        var weapon = attacker.primaryWeapon();
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var defender = new Token(store, Pilot.DASH_RENDAR, rebelAgent);
        var defenderPosition = new Position(450, 845, 90);
        environment.placeToken(attackerPosition, attacker);
        environment.placeToken(defenderPosition, defender);
        assert.equal(attacker.focus().count(), 0);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        var done = assert.async();
        combatAction.doIt();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            if (attacker.combatState().isDefenderHit())
            {
                assert.equal(attacker.focus().count(), 1);
            }
            else
            {
                assert.equal(attacker.focus().count(), 0);
            }
            done();
        }, 1100);
    });

    function createCombatAction(upgradeKey, y)
    {
        var store = Redux.createStore(Reducer.root);
        var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
        var adjudicator = new Adjudicator();

        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [ upgradeKey ]);
        var attackerPosition = new Position(458, 895, -90);
        var weapon = attacker.secondaryWeapons()[0];

        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
        var myY = (y !== undefined ? y : 845);
        var defenderPosition = new Position(450, myY, 90);

        environment.placeToken(attackerPosition, attacker);
        environment.placeToken(defenderPosition, defender);

        attacker.focus().increase();

        var targetLock = new TargetLock(store, attacker, defender);
        attacker.addAttackerTargetLock(targetLock);

        return new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);
    }

    function createCombatActionRange2(upgradeKey)
    {
        return createCombatAction(upgradeKey, 700);
    }

    function createCombatAction2(upgradeKey)
    {
        var store = Redux.createStore(Reducer.root);
        var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
        var adjudicator = new Adjudicator();

        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [ upgradeKey ]);
        var attackerPosition = new Position(458, 895, -90);
        var weapon = attacker.primaryWeapon();

        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(450, 845, 90);

        environment.placeToken(attackerPosition, attacker);
        environment.placeToken(defenderPosition, defender);

        return new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);
    }
});
