define([ "DamageCard", "EnvironmentFactory", "Pilot", "Position", "TargetLock", "UpgradeCard", "process/Action",
        "process/Selector" ], function(DamageCard, EnvironmentFactory, Pilot, Position, TargetLock, UpgradeCard,
        Action, Selector)
{
    "use strict";
    QUnit.module("Selector");

    QUnit.test("activeToken()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token = environment.tokens()[0];

        // Run.
        var result = Selector.activeToken(store.getState());

        // Verify.
        assert.ok(!result);

        // Run.
        store.dispatch(Action.setActiveToken(token.id()));
        result = Selector.activeToken(store.getState());

        // Verify.
        assert.ok(result);
        assert.equal(result, token);
    });

    QUnit.test("attackerTargetLocks()", function(assert)
    {
        // Setup.
        var environment = createTargetLockEnvironment(assert);
        var store = environment.store();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[2];

        // Run.
        var result = Selector.attackerTargetLocks(store.getState(), attacker);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        assert.equal(result[0].id(), "A");
        assert.equal(result[0].attacker(), attacker);
        assert.equal(result[0].defender(), defender);
    });

    QUnit.test("cloakCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setCloakCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.cloakCount(), 0);

        // Setup.
        store.dispatch(Action.addCloakCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.cloakCount(), 1);
    });

    QUnit.test("count()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        var property0 = "focus";

        // Run / Verify.
        assert.equal(Selector.count(store.getState(), token0.id(), property0), 0);

        // Setup.
        store.dispatch(Action.addCount(token0.id(), property0));

        // Run / Verify.
        assert.equal(Selector.count(store.getState(), token0.id(), property0), 1);

        // Setup.
        store.dispatch(Action.addCount(token0.id(), property0, 2));

        // Run / Verify.
        assert.equal(Selector.count(store.getState(), token0.id(), property0), 3);
    });

    QUnit.test("criticalDamages()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];

        // Run.
        var result = Selector.criticalDamages(store.getState(), token0.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 0);

        // Setup.
        store.dispatch(Action.addTokenCriticalDamage(token0.id(), DamageCard.BLINDED_PILOT));

        // Run.
        result = Selector.criticalDamages(store.getState(), token0.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
    });

    QUnit.test("damages()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];

        // Run.
        var result = Selector.damages(store.getState(), token0.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 0);

        // Setup.
        store.dispatch(Action.addTokenDamage(token0.id(), DamageCard.BLINDED_PILOT));

        // Run.
        result = Selector.damages(store.getState(), token0.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
    });

    QUnit.test("defenderTargetLocks()", function(assert)
    {
        // Setup.
        var environment = createTargetLockEnvironment(assert);
        var store = environment.store();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[2];

        // Run.
        var result = Selector.defenderTargetLocks(store.getState(), defender);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        assert.equal(result[0].id(), "A");
        assert.equal(result[0].attacker(), attacker);
        assert.equal(result[0].defender(), defender);
    });

    QUnit.test("energyCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setEnergyCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.energyCount(), 0);

        // Setup.
        store.dispatch(Action.addEnergyCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.energyCount(), 1);
    });

    QUnit.test("evadeCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setEvadeCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.evadeCount(), 0);

        // Setup.
        store.dispatch(Action.addEvadeCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.evadeCount(), 1);
    });

    QUnit.test("focusCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setFocusCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.focusCount(), 0);

        // Setup.
        store.dispatch(Action.addFocusCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.focusCount(), 1);
    });

    QUnit.test("ionCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setIonCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.ionCount(), 0);

        // Setup.
        store.dispatch(Action.addIonCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.ionCount(), 1);
    });

    QUnit.test("position()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        var token1 = environment.tokens()[1];
        var token2 = environment.tokens()[2];

        // Run.
        var result = Selector.position(store.getState(), token0.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), 305);
        assert.equal(result.y(), 20);
        assert.equal(result.heading(), 90);

        // Run.
        result = Selector.position(store.getState(), token1.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), 610);
        assert.equal(result.y(), 20);
        assert.equal(result.heading(), 90);

        // Run.
        result = Selector.position(store.getState(), token2.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), 458);
        assert.equal(result.y(), 895);
        assert.equal(result.heading(), 270);
    });

    QUnit.test("reinforceCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setReinforceCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.reinforceCount(), 0);

        // Setup.
        store.dispatch(Action.addReinforceCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.reinforceCount(), 1);
    });

    QUnit.test("shieldCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setShieldCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.shieldCount(), 0);

        // Setup.
        store.dispatch(Action.addShieldCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.shieldCount(), 1);
    });

    QUnit.test("stressCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setStressCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.stressCount(), 0);

        // Setup.
        store.dispatch(Action.addStressCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.stressCount(store.getState(), token0.id()), 1);
    });

    QUnit.test("targetLock()", function(assert)
    {
        // Setup.
        var environment = createTargetLockEnvironment(assert);
        var store = environment.store();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[2];

        // Run.
        var result = Selector.targetLock(store.getState().targetLocks, attacker, defender);

        // Verify.
        assert.ok(result);
        assert.equal(result.id(), "A");
        assert.equal(result.attacker(), attacker);
        assert.equal(result.defender(), defender);
    });

    QUnit.test("token()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();

        // Run.
        var result = Selector.token(environment.store().getState(), 1);

        // Verify.
        assert.ok(result);
        assert.equal(result.pilotKey(), Pilot.MAULER_MITHEL);

        // Run.
        result = Selector.token(environment.store().getState(), 2);

        // Verify.
        assert.ok(result);
        assert.equal(result.pilotKey(), Pilot.DARK_CURSE);

        // Run.
        result = Selector.token(environment.store().getState(), 3);

        // Verify.
        assert.ok(result);
        assert.equal(result.pilotKey(), Pilot.LUKE_SKYWALKER);
    });

    QUnit.test("tokenAt()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var position0 = new Position(305, 20, 90);
        var position1 = new Position(610, 20, 90);
        var position2 = new Position(458, 895, 270);

        // Run.
        var result = Selector.tokenAt(environment.store().getState(), position0);

        // Verify.
        assert.ok(result);
        assert.equal(result.pilotKey(), Pilot.MAULER_MITHEL);

        // Run.
        result = Selector.tokenAt(environment.store().getState(), position1);

        // Verify.
        assert.ok(result);
        assert.equal(result.pilotKey(), Pilot.DARK_CURSE);

        // Run.
        result = Selector.tokenAt(environment.store().getState(), position2);

        // Verify.
        assert.ok(result);
        assert.equal(result.pilotKey(), Pilot.LUKE_SKYWALKER);
    });

    QUnit.test("upgrades()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token = environment.tokens()[2];

        // Run.
        var result = Selector.upgrades(store.getState(), token.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);

        // Setup.
        store.dispatch(Action.addTokenUpgrade(token.id(), UpgradeCard.DEADEYE));

        // Run.
        result = Selector.upgrades(store.getState(), token.id());

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 3);
    });

    QUnit.test("weaponsDisabledCount()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var token0 = environment.tokens()[0];
        store.dispatch(Action.setWeaponsDisabledCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.weaponsDisabledCount(), 0);

        // Setup.
        store.dispatch(Action.addWeaponsDisabledCount(token0.id()));

        // Run / Verify.
        assert.equal(token0.weaponsDisabledCount(), 1);
    });

    function createTargetLockEnvironment(assert)
    {
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[2];
        var targetLock = new TargetLock(store, attacker, defender);
        store.dispatch(Action.addTargetLock(targetLock));
        assert.equal(store.getState().targetLocks.length, 1);

        return environment;
    }
});
