define(["process/Action", "process/EndPhaseAction", "process/EnvironmentFactory", "process/Selector", "process/TargetLock"],
   function(Action, EndPhaseAction, EnvironmentFactory, Selector, TargetLock)
   {
      "use strict";
      QUnit.module("EndPhaseAction");

      QUnit.test("doIt() X-Wing", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         store.dispatch(Action.addEvadeCount(token));
         store.dispatch(Action.addFocusCount(token, 2));
         store.dispatch(Action.addReinforceCount(token));
         store.dispatch(Action.addStressCount(token));
         store.dispatch(Action.addTractorBeamCount(token));
         store.dispatch(Action.addWeaponsDisabledCount(token));
         var defender = environment.tokens()[0];
         var targetLock = TargetLock.newInstance(store, token, defender);
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");

            assert.equal(token.evadeCount(), 0);
            assert.equal(token.focusCount(), 0);
            assert.equal(token.reinforceCount(), 0);
            assert.equal(token.tractorBeamCount(), 0);
            assert.equal(token.weaponsDisabledCount(), 0);

            assert.equal(token.stressCount(), 1);
            assert.ok(TargetLock.getFirst(store, token, defender) !== undefined);
            assert.equal(Selector.usedAbilities(store.getState(), token).length, 0);

            done();
         };
         var action = new EndPhaseAction(environment, token, callback);

         // Run.
         var done = assert.async();
         action.doIt();
      });
   });
