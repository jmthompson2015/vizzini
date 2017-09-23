"use strict";

define(["process/Action", "process/Adjudicator", "process/EnvironmentFactory", "process/Reducer", "process/Selector"],
   function(Action, Adjudicator, EnvironmentFactory, Reducer, Selector)
   {
      QUnit.module("Selector");

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
