define(["process/Action", "process/Adjudicator", "process/EnvironmentFactory", "process/Reducer", "process/Selector"],
   function(Action, Adjudicator, EnvironmentFactory, Reducer, Selector)
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
         store.dispatch(Action.setActiveToken(token));
         result = Selector.activeToken(store.getState());

         // Verify.
         assert.ok(result);
         assert.ok(result.equals(token));
      });

      QUnit.test("adjudicator()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));

         // Run.
         var result = Selector.adjudicator(store.getState());

         // Verify.
         assert.ok(result);
         assert.equal(result, adjudicator);
      });

      QUnit.test("environment()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();

         // Run.
         var result = Selector.environment(store.getState());

         // Verify.
         assert.ok(result);
         assert.equal(result, environment);
      });
   });
