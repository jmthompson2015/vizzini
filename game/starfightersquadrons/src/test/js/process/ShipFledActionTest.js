define(["process/EnvironmentFactory", "Position", "process/ShipFledAction", "process/TargetLock"],
   function(EnvironmentFactory, Position, ShipFledAction, TargetLock)
   {
      "use strict";
      QUnit.module("ShipFledAction");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var fromPosition = new Position(305, 20, 90);
         LOGGER.trace("fromPosition = " + fromPosition.toString());
         var token = environment.getTokenAt(fromPosition);
         var defender = environment.tokens()[2]; // X-Wing.
         var targetLock = new TargetLock(store, token.id(), defender.id());
         assert.equal(store.getState().targetLocks.size, 1);
         var shipFledAction = new ShipFledAction(environment, token, fromPosition);

         // Run.
         shipFledAction.doIt();

         // Verify.
         assert.equal(token.damageCount(), 0);
         assert.equal(token.criticalDamageCount(), 0);
         assert.ok(!environment.getTokenAt(fromPosition));
         assert.equal(store.getState().targetLocks.size, 0);
      });
   });
