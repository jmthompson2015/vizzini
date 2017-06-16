define(["Maneuver", "Pilot", "Position", "Team", "UpgradeCard", "process/Action", "process/EndPhaseAction", "process/Environment", "process/EnvironmentFactory", "process/Reducer", "process/Selector", "process/SimpleAgent", "process/SquadBuilder", "process/TargetLock", "process/Token"],
   function(Maneuver, Pilot, Position, Team, UpgradeCard, Action, EndPhaseAction, Environment, EnvironmentFactory, Reducer, Selector, SimpleAgent, SquadBuilder, TargetLock, Token)
   {
      "use strict";
      QUnit.module("EndPhaseAction");

      var delay = 1000;

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
         var targetLock = new TargetLock(store, token.id(), defender.id());
         var callback = function()
         {
            LOGGER.info("callback() start");
         };
         var action = new EndPhaseAction(environment, token, callback);

         // Run.
         var done = assert.async();
         action.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");

            assert.equal(token.evadeCount(), 0);
            assert.equal(token.focusCount(), 0);
            assert.equal(token.reinforceCount(), 0);
            assert.equal(token.tractorBeamCount(), 0);
            assert.equal(token.weaponsDisabledCount(), 0);

            assert.equal(token.stressCount(), 1);
            assert.ok(TargetLock.getFirst(store, token.id(), defender.id()) !== undefined);
            assert.equal(Selector.usedDamages(store.getState(), token).length, 0);
            assert.equal(Selector.usedPilots(store.getState(), token).length, 0);
            assert.equal(Selector.usedUpgrades(store.getState(), token).length, 0);

            done();
         }, delay);
      });
   });
