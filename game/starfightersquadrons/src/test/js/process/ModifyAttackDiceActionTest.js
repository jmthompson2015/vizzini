define(["process/AttackDice", "process/Action", "process/EnvironmentFactory", "process/ModifyAttackDiceAction", "process/TargetLock"],
   function(AttackDice, Action, EnvironmentFactory, ModifyAttackDiceAction, TargetLock)
   {
      "use strict";
      QUnit.module("ModifyAttackDiceAction");

      QUnit.test("doIt() spend focus", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0];
         store.dispatch(Action.addFocusCount(attacker));
         var attackDice = new AttackDice(store, attacker.id(), 3);
         var defender = environment.tokens()[2];
         var modificationKey = ModifyAttackDiceAction.Modification.SPEND_FOCUS;
         var action = new ModifyAttackDiceAction(store, attacker, defender, modificationKey);
         assert.equal(attacker.focusCount(), 1);
         var focusCount0 = attackDice.focusCount();
         var hitCount0 = attackDice.hitCount();

         // Run.
         action.doIt();

         // Verify.
         assert.equal(attacker.focusCount(), 0);
         assert.equal(attackDice.focusCount(), 0);
         assert.equal(attackDice.hitCount(), hitCount0 + focusCount0);
      });

      QUnit.test("doIt() spend target lock", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0]; // TIE Fighter.
         var attackDice = new AttackDice(store, attacker.id(), 3);
         var defender = environment.tokens()[2]; // X-Wing.
         var modificationKey = ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK;
         var targetLock = TargetLock.newInstance(store, attacker, defender);
         var action = new ModifyAttackDiceAction(store, attacker, defender, modificationKey);
         var blankCount0 = attackDice.blankCount();
         var focusCount0 = attackDice.focusCount();
         var hitCount0 = attackDice.hitCount();

         // Run.
         action.doIt();

         // Verify.
         assert.ok(attackDice.hitCount() >= hitCount0);
         assert.ok(attackDice.hitCount() <= blankCount0 + focusCount0 + hitCount0);
      });
   });
