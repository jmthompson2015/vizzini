define([ "EnvironmentFactory", "Pilot", "TargetLock", "process/Action", "process/Reducer", "process/Selector" ],
        function(EnvironmentFactory, Pilot, TargetLock, Action, Reducer, Selector)
        {
            "use strict";
            QUnit.module("Selector");

            QUnit.test("attackerTargetLocks()", function(assert)
            {
                // Setup.
                var environment = createTargetLockEnvironment(assert);
                var store = environment.store();
                var attacker = environment.tokens()[0];
                var defender = environment.tokens()[2];

                // Run.
                var result = Selector.attackerTargetLocks(store.getState().targetLocks, attacker);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                assert.equal(result[0].id(), "A");
                assert.equal(result[0].attacker(), attacker);
                assert.equal(result[0].defender(), defender);
            });

            QUnit.test("defenderTargetLocks()", function(assert)
            {
                // Setup.
                var environment = createTargetLockEnvironment(assert);
                var store = environment.store();
                var attacker = environment.tokens()[0];
                var defender = environment.tokens()[2];

                // Run.
                var result = Selector.defenderTargetLocks(store.getState().targetLocks, defender);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                assert.equal(result[0].id(), "A");
                assert.equal(result[0].attacker(), attacker);
                assert.equal(result[0].defender(), defender);
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

            QUnit.test("tokenById()", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                // Run.
                var result = Selector.tokenById(environment.store().getState(), 1);

                // Verify.
                assert.ok(result);
                assert.equal(result.pilotKey(), Pilot.MAULER_MITHEL);

                // Run.
                var result = Selector.tokenById(environment.store().getState(), 2);

                // Verify.
                assert.ok(result);
                assert.equal(result.pilotKey(), Pilot.DARK_CURSE);

                // Run.
                var result = Selector.tokenById(environment.store().getState(), 3);

                // Verify.
                assert.ok(result);
                assert.equal(result.pilotKey(), Pilot.LUKE_SKYWALKER);
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
