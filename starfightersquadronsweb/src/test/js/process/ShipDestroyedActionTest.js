define(["process/EnvironmentFactory", "Position", "process/ShipDestroyedAction", "process/TargetLock"],
    function(EnvironmentFactory, Position, ShipDestroyedAction, TargetLock)
    {
        "use strict";
        QUnit.module("ShipDestroyedAction");

        QUnit.test("doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var fromPosition = new Position(305, 20, 90); // TIE Fighter.
            var token = environment.getTokenAt(fromPosition);
            var defender = environment.tokens()[2]; // X-Wing.
            var targetLock = new TargetLock(store, token, defender);
            token.addAttackerTargetLock(targetLock);
            assert.equal(token.attackerTargetLocks().length, 1);
            assert.equal(token.defenderTargetLocks().length, 0);
            assert.equal(defender.attackerTargetLocks().length, 0);
            assert.equal(defender.defenderTargetLocks().length, 1);
            var shipDestroyedAction = new ShipDestroyedAction(environment, token, fromPosition);

            // Run.
            shipDestroyedAction.doIt();

            // Verify.
            assert.equal(token.damageCount(), 0);
            assert.equal(token.criticalDamageCount(), 0);
            assert.ok(!environment.getTokenAt(fromPosition));
            assert.equal(token.attackerTargetLocks().length, 0);
            assert.equal(token.defenderTargetLocks().length, 0);
            assert.equal(defender.attackerTargetLocks().length, 0);
            assert.equal(defender.defenderTargetLocks().length, 0);
        });
    });
