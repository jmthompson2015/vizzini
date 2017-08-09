define(["Event", "process/Action", "process/EventObserver", "process/EnvironmentFactory"],
   function(Event, Action, EventObserver, EnvironmentFactory)
   {
      "use strict";
      QUnit.module("EventObserver");

      QUnit.test("onChange()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[0];
         var eventKey = Event.AFTER_EXECUTE_MANEUVER;
         var eventCallback = function()
         {
            // Verify.
            assert.equal(store.getState().eventQueue.size, 0);
            store.getState().eventQueue.forEach(function(element, i)
            {
               console.log(i + " " + JSON.stringify(element) + " token = " + element.eventToken);
            });
         };
         store.dispatch(Action.enqueueEvent(eventKey, token, eventCallback));
         var eventObserver = new EventObserver(store);

         // Run.
         eventObserver.onChange(store.getState().eventQueue);
      });
   });
