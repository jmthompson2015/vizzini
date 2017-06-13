define(["process/Action", "process/DefenseDice", "process/Reducer"],
   function(Action, DefenseDice, Reducer)
   {
      "use strict";
      QUnit.module("DefenseDice");

      QUnit.test("DefenseDice properties", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new DefenseDice(store, attackerId, 3);

         assert.ok(dice.value(0));
         assert.ok(dice.value(1));
         assert.ok(dice.value(2));
      });

      QUnit.test("blankCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new DefenseDice(store, attackerId, 1);

         // Run / Verify.
         if (dice.value(0) == DefenseDice.Value.BLANK)
         {
            assert.equal(dice.blankCount(), 1);
         }
         else
         {
            assert.equal(dice.blankCount(), 0);
         }
      });

      QUnit.test("evadeCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new DefenseDice(store, attackerId, 1);

         // Run / Verify.
         if (dice.value(0) == DefenseDice.Value.EVADE)
         {
            assert.equal(dice.evadeCount(), 1);
         }
         else
         {
            assert.equal(dice.evadeCount(), 0);
         }
      });

      QUnit.test("focusCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new DefenseDice(store, attackerId, 1);

         // Run / Verify.
         if (dice.value(0) == DefenseDice.Value.FOCUS)
         {
            assert.equal(dice.focusCount(), 1);
         }
         else
         {
            assert.equal(dice.focusCount(), 0);
         }
      });

      QUnit.test("rerollAllFocus()", function(assert)
      {
         // Setup.
         var dice = createFocusDice(1);

         // Run.
         dice.rerollAllFocus();

         // Verify.
         if (dice.value(0) === DefenseDice.Value.FOCUS)
         {
            assert.equal(dice.focusCount(), 1);
         }
         else
         {
            assert.equal(dice.focusCount(), 0);
         }
      });

      QUnit.test("rerollBlank()", function(assert)
      {
         // Setup.
         var dice = createBlankDice(1);

         // Run.
         dice.rerollBlank();

         // Verify.
         if (dice.value(0) === DefenseDice.Value.BLANK)
         {
            assert.equal(dice.blankCount(), 1);
         }
         else
         {
            assert.equal(dice.blankCount(), 0);
         }
      });

      QUnit.test("rerollFocus()", function(assert)
      {
         //  var dice;
         //  do {
         //     dice = new DefenseDice(1);
         //  }
         //  while (dice.focusCount() === 0);
         // Setup.
         var dice = createFocusDice(1);

         // Run.
         dice.rerollFocus();

         // Verify.
         if (dice.value(0) === DefenseDice.Value.FOCUS)
         {
            assert.equal(dice.focusCount(), 1);
         }
         else
         {
            assert.equal(dice.focusCount(), 0);
         }
      });

      QUnit.test("spendEvadeToken()", function(assert)
      {
         // Setup.
         var dice = createFocusDice(2);
         assert.equal(dice.focusCount(), 2);

         // Run.
         dice.spendEvadeToken();

         // Verify.
         assert.equal(dice.evadeCount(), 1);
         assert.equal(dice.focusCount(), 2);
      });

      QUnit.test("spendFocusToken()", function(assert)
      {
         // Setup.
         var dice = createFocusDice(2);
         assert.equal(dice.focusCount(), 2);

         // Run.
         dice.spendFocusToken();

         // Verify.
         assert.equal(dice.evadeCount(), 2);
         assert.equal(dice.focusCount(), 0);
      });

      function createBlankDice(count)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var answer;

         do {
            store.dispatch(Action.setTokenDefenseDice(1));
            answer = new DefenseDice(store, attackerId, count);
         }
         while (answer.blankCount() < count);

         return answer;
      }

      function createFocusDice(count)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var answer;

         do {
            store.dispatch(Action.setTokenDefenseDice(1));
            answer = new DefenseDice(store, attackerId, count);
         }
         while (answer.focusCount() < count);

         return answer;
      }
   });
