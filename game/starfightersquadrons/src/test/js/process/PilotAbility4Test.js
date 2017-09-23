"use strict";

define(["Phase", "process/Action", "process/EnvironmentFactory", "process/PilotAbility4"],
   function(Phase, Action, EnvironmentFactory, PilotAbility)
   {
      QUnit.module("PilotAbility4");

      QUnit.test("condition()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         Phase.values().forEach(function(phaseKey)
         {
            var abilities = PilotAbility[phaseKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(pilotKey)
               {
                  var ability = abilities[pilotKey];

                  if (ability.condition)
                  {
                     var result = ability.condition(store, token);
                     assert.ok(result !== undefined, "phaseKey = " + phaseKey + " pilotKey = " + pilotKey);
                  }
               });
            }
         });

         assert.ok(true);
      });

      QUnit.test("consequent()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         Phase.values().forEach(function(phaseKey)
         {
            var abilities = PilotAbility[phaseKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(pilotKey)
               {
                  var ability = abilities[pilotKey];

                  if (ability.condition && ability.condition(store, token))
                  {
                     ability.consequent(store, token);
                     assert.ok(true, "phaseKey = " + phaseKey + " pilotKey = " + pilotKey);
                  }
               });
            }
         });

         assert.ok(true);
      });

      QUnit.test("function()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         Phase.values().forEach(function(phaseKey)
         {
            var abilities = PilotAbility[phaseKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(pilotKey)
               {
                  var ability = abilities[pilotKey];

                  if (typeof ability === "function")
                  {
                     ability(store, token);
                     assert.ok(true, "phaseKey = " + phaseKey + " pilotKey = " + pilotKey);
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
