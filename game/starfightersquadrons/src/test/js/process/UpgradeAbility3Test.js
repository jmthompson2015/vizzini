"use strict";

define(["Phase", "process/Action", "process/Adjudicator", "process/CombatAction", "process/EnvironmentFactory", "process/TokenAction", "process/UpgradeAbility3", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(Phase, Action, Adjudicator, CombatAction, EnvironmentFactory, TokenAction, UpgradeAbility, MockAttackDice, MockDefenseDice)
   {
      QUnit.module("UpgradeAbility3");

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
                     ability.consequent(store, token, callback);
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
         var store = environment.store();
         var attacker = environment.tokens()[2]; // X-Wing.
         var weapon = attacker.primaryWeapon();
         var defender = environment.tokens()[0]; // TIE Fighter.
         var callback = function()
         {
            LOGGER.info("in callback()");
         };

         environment.setActiveToken(attacker);
         store.dispatch(TokenAction.addFocusCount(attacker));
         store.dispatch(TokenAction.addStressCount(attacker));

         store.dispatch(Action.setTokenAttackDice(attacker.id(), (new MockAttackDice(store, attacker.id())).values()));
         store.dispatch(Action.setTokenDefenseDice(attacker.id(), (new MockDefenseDice(store, attacker.id())).values()));
         store.dispatch(Action.setTokenInFiringArc(attacker, true));

         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, MockAttackDice, MockDefenseDice);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

         return environment;
      }
   });
