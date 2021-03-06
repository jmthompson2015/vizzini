"use strict";

define(["DiceModification",
  "process/Action", "process/Adjudicator", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/EnvironmentAction", "process/EnvironmentFactory", "process/ModifyDiceAbility", "process/Selector", "process/TargetLock", "process/TokenAction", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(DiceModification,
      Action, Adjudicator, AttackDice, CombatAction, DefenseDice, EnvironmentAction, EnvironmentFactory, ModifyDiceAbility, Selector, TargetLock, TokenAction, MockAttackDice, MockDefenseDice)
   {
      QUnit.module("ModifyDiceAbility");

      QUnit.test("condition()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing.

         // Run / Verify.
         var abilities = ModifyDiceAbility;
         assert.ok(abilities);

         Object.keys(abilities).forEach(function(modificationKey)
         {
            var ability = abilities[modificationKey];

            if (ability.condition)
            {
               var result = ability.condition(store, token);
               assert.ok(result !== undefined, "modificationKey = " + modificationKey);
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
         var abilities = ModifyDiceAbility;
         assert.ok(abilities);

         Object.keys(abilities).forEach(function(modificationKey)
         {
            var ability = abilities[modificationKey];

            if (ability.condition && ability.condition(store, token))
            {
               ability.consequent(store, token, callback);
               assert.ok(true, "modificationKey = " + modificationKey);
            }
         });
      });

      QUnit.test("attack spend focus", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var attacker = environment.activeToken();
         var attackDice = AttackDice.get(store, attacker.id());
         assert.equal(attacker.focusCount(), 1);
         var focusCount0 = attackDice.focusCount();
         var hitCount0 = attackDice.hitCount();
         var ability = ModifyDiceAbility[ModifyDiceAbility.ATTACK_KEY][DiceModification.ATTACK_SPEND_FOCUS];
         var callback = function()
         {
            // Verify.
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attacker.focusCount(), 0);
            assert.equal(attackDice.focusCount(), 0);
            assert.equal(attackDice.hitCount(), hitCount0 + focusCount0);
         };

         // Run.
         ability.consequent(store, attacker, callback);
      });

      QUnit.test("attack spend target lock", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[2]; // X-Wing.
         var defender = environment.tokens()[0]; // TIE Fighter.
         TargetLock.newInstance(store, attacker, defender);
         var attackDice = AttackDice.get(store, attacker.id());
         var blankCount0 = attackDice.blankCount();
         var focusCount0 = attackDice.focusCount();
         var hitCount0 = attackDice.hitCount();
         var ability = ModifyDiceAbility[ModifyDiceAbility.ATTACK_KEY][DiceModification.ATTACK_SPEND_TARGET_LOCK];
         var callback = function()
         {
            // Verify.
            var attackDice = AttackDice.get(store, attacker.id());
            assert.ok(attackDice);
            assert.ok(attackDice.hitCount() >= hitCount0);
            assert.ok(attackDice.hitCount() <= blankCount0 + focusCount0 + hitCount0);
         };

         // Run.
         ability.consequent(store, attacker, callback);
      });

      QUnit.test("defense spend evade", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[2]; // X-Wing.
         var defender = environment.tokens()[0]; // TIE Fighter.
         store.dispatch(TokenAction.addEvadeCount(defender));
         var defenseDice = DefenseDice.get(store, attacker.id());
         assert.equal(defender.evadeCount(), 1);
         assert.equal(defender.focusCount(), 0);
         var evadeCount0 = defenseDice.evadeCount();
         var focusCount0 = defenseDice.focusCount();
         var ability = ModifyDiceAbility[ModifyDiceAbility.DEFENSE_KEY][DiceModification.DEFENSE_SPEND_EVADE];
         var callback = function()
         {
            // Verify.
            assert.equal(defender.evadeCount(), 0);
            assert.equal(defender.focusCount(), 0);
            var defenseDice = DefenseDice.get(store, attacker.id());
            assert.ok(defenseDice);
            assert.equal(defenseDice.evadeCount(), evadeCount0 + 1);
            assert.equal(defenseDice.focusCount(), focusCount0);
         };

         // Run.
         ability.consequent(store, attacker, callback);
      });

      QUnit.test("defense spend focus", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[2]; // X-Wing.
         var defender = environment.tokens()[0]; // TIE Fighter.
         var defenseDice = DefenseDice.get(store, attacker.id());
         store.dispatch(TokenAction.addFocusCount(defender));
         assert.equal(defender.evadeCount(), 0);
         assert.equal(defender.focusCount(), 1);
         var evadeCount0 = defenseDice.evadeCount();
         var focusCount0 = defenseDice.focusCount();
         var ability = ModifyDiceAbility[ModifyDiceAbility.DEFENSE_KEY][DiceModification.DEFENSE_SPEND_FOCUS];
         var callback = function()
         {
            // Verify.
            assert.equal(defender.evadeCount(), 0);
            assert.equal(defender.focusCount(), 0);
            var defenseDice = DefenseDice.get(store, attacker.id());
            assert.ok(defenseDice);
            assert.equal(defenseDice.evadeCount(), evadeCount0 + focusCount0);
            assert.equal(defenseDice.focusCount(), 0);
         };

         // Run.
         ability.consequent(store, attacker, callback);
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

         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, undefined, MockAttackDice, MockDefenseDice);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

         return environment;
      }
   });
