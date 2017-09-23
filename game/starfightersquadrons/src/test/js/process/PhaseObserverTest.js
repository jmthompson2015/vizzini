"use strict";

define(["Phase", "process/Action", "process/Environment", "process/PhaseObserver", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder"],
   function(Phase, Action, Environment, PhaseObserver, Reducer, SimpleAgent, SquadBuilder)
   {
      QUnit.module("PhaseObserver");

      QUnit.test("onChange()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing Luke Skywalker
         var phaseKey = Phase.ACTIVATION_REVEAL_DIAL;
         var phaseCallback = function(phaseData)
         {
            // Verify.
            assert.equal(store.getState().phaseQueue.size, 0);
            assert.ok(phaseData);
            assert.equal(phaseData.get("phaseKey"), phaseKey);
            assert.equal(phaseData.get("phaseToken"), token);
         };
         store.dispatch(Action.enqueuePhase(phaseKey, token, phaseCallback));
         assert.equal(store.getState().phaseQueue.size, 1);

         // Run.
         new PhaseObserver(store);
      });

      function createEnvironment()
      {
         var squadBuilder1 = SquadBuilder.CoreSetImperialSquadBuilder;
         var squadBuilder2 = SquadBuilder.CoreSetRebelSquadBuilder;
         var agent1 = new SimpleAgent("1", squadBuilder1.factionKey());
         var agent2 = new SimpleAgent("2", squadBuilder2.factionKey());
         var squad1 = squadBuilder1.buildSquad(agent1);
         var squad2 = squadBuilder2.buildSquad(agent2);
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, agent1, squad1, agent2, squad2);

         return environment;
      }
   });
