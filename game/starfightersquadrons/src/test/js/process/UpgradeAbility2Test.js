"use strict";

define(["Maneuver", "Phase", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/EnvironmentFactory", "process/UpgradeAbility2"],
   function(Maneuver, Phase, Action, ActivationAction, Adjudicator, EnvironmentFactory, UpgradeAbility)
   {
      QUnit.module("UpgradeAbility2");

      var delay = 10;

      QUnit.test("condition()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         Phase.values().forEach(function(phaseKey)
         {
            var abilities = UpgradeAbility[phaseKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(upgradeKey)
               {
                  var ability = abilities[upgradeKey];

                  if (ability.condition)
                  {
                     var result = ability.condition(store, token);
                     assert.ok(result !== undefined, "phaseKey = " + phaseKey + " upgradeKey = " + upgradeKey);
                  }
               });
            }
         });
      });

      QUnit.test("consequent()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.
         var callback = function()
         {
            LOGGER.info("in callback()");
         };

         // Run / Verify.
         Phase.values().forEach(function(phaseKey)
         {
            var abilities = UpgradeAbility[phaseKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(upgradeKey)
               {
                  var ability = abilities[upgradeKey];

                  if (ability.condition && ability.condition(store, token))
                  {
                     var consequent = ability.consequent.bind(ability);
                     consequent(store, token, callback);
                     assert.ok(true, "phaseKey = " + phaseKey + " upgradeKey = " + upgradeKey);
                  }
               });
            }
         });
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
            var abilities = UpgradeAbility[phaseKey];

            if (abilities)
            {
               Object.keys(abilities).forEach(function(upgradeKey)
               {
                  var ability = abilities[upgradeKey];

                  if (typeof ability === "function")
                  {
                     ability(store, token);
                     assert.ok(true, "phaseKey = " + phaseKey + " upgradeKey = " + upgradeKey);
                  }
               });
            }
         });

         assert.ok(true);
      });

      function createEnvironment()
      {
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();

         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.
         var maneuverKey = Maneuver.STRAIGHT_3_STANDARD;
         var callback = function()
         {
            LOGGER.info("in callback()");
         };

         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.setActiveToken(token);

         new ActivationAction(store, token.id(), callback, delay);
         var maneuver = Maneuver.properties[maneuverKey];
         store.dispatch(Action.setTokenManeuver(token, maneuver));

         return environment;
      }
   });
