"use strict";

define(["Event", "process/Action", "process/EnvironmentFactory", "process/PilotAbility0"],
   function(Event, Action, EnvironmentFactory, PilotAbility)
   {
      QUnit.module("PilotAbility0");

      QUnit.test("condition()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         Event.values().forEach(function(eventKey)
         {
            var abilities = PilotAbility[eventKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(pilotKey)
               {
                  var ability = abilities[pilotKey];

                  if (ability.condition)
                  {
                     var result = ability.condition(store, token);
                     assert.ok(result !== undefined, "eventKey = " + eventKey + " pilotKey = " + pilotKey);
                  }
               });
            }
         });

         // assert.ok(true);
      });

      QUnit.test("consequent()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         Event.values().forEach(function(eventKey)
         {
            var abilities = PilotAbility[eventKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(pilotKey)
               {
                  var ability = abilities[pilotKey];

                  if (ability.condition && ability.condition(store, token))
                  {
                     ability.consequent(store, token);
                     assert.ok(true, "eventKey = " + eventKey + " pilotKey = " + pilotKey);
                  }
               });
            }
         });

         assert.ok(true);
      });

      function createEnvironment()
      {
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing.

         environment.setActiveToken(token);

         return environment;
      }
   });
