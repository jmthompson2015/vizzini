define(["process/AttackDice", "process/Reducer", "../../test/js/MockAttackDice"],
   function(AttackDice, Reducer, MockAttackDice)
   {
      "use strict";
      QUnit.module("MockAttackDice");

      QUnit.test("MockAttackDice properties", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockAttackDice(store, attackerId);
         assert.equal(dice.value(0), AttackDice.Value.BLANK);
         assert.equal(dice.value(1), AttackDice.Value.CRITICAL_HIT);
         assert.equal(dice.value(2), AttackDice.Value.FOCUS);
         assert.equal(dice.value(3), AttackDice.Value.HIT);
      });

      QUnit.test("blankCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockAttackDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.blankCount(), 1);
      });

      QUnit.test("criticalHitCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockAttackDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.criticalHitCount(), 1);
      });

      QUnit.test("focusCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockAttackDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.focusCount(), 1);
      });

      QUnit.test("hitCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockAttackDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.hitCount(), 1);
      });

      QUnit.test("rerollBlank()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockAttackDice(store, attackerId);

         // Run.
         dice.rerollBlank();

         // Verify.
         assert.equal(dice.value(0), AttackDice.Value.BLANK);
         assert.equal(dice.value(1), AttackDice.Value.CRITICAL_HIT);
         assert.equal(dice.value(2), AttackDice.Value.FOCUS);
         assert.equal(dice.value(3), AttackDice.Value.HIT);
      });
   });
