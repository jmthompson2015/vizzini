define(["Event", "process/Action", "process/Adjudicator", "process/EventObserver", "process/Environment", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder"],
   function(Event, Action, Adjudicator, EventObserver, Environment, Reducer, SimpleAgent, SquadBuilder)
   {
      "use strict";
      QUnit.module("EventObserver");

      QUnit.test("onChange()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var adjudicator = new Adjudicator();
         var store = environment.store();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var token = environment.tokens()[2]; // X-Wing Luke Skywalker
         var eventKey = Event.AFTER_EXECUTE_MANEUVER;
         var eventCallback = function()
         {
            // Verify.
            assert.equal(store.getState().eventQueue.size, 0);
            // store.getState().eventQueue.forEach(function(element, i)
            // {
            //    console.log(i + " " + JSON.stringify(element) + " token = " + element.get("eventToken"));
            // });
         };
         store.dispatch(Action.enqueueEvent(eventKey, token, eventCallback));
         assert.equal(store.getState().eventQueue.size, 1);
         var eventObserver = new EventObserver(store);

         // Run.
         eventObserver.onChange(store.getState().eventQueue);
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
         var environment = new Environment(store, agent1.teamKey(), agent2.teamKey());
         environment.placeInitialTokens(agent1, squad1, agent2, squad2);

         return environment;
      }
   });
