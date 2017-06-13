define(["process/DefenseDice", "process/Reducer", "../../test/js/MockDefenseDice"],
   function(DefenseDice, Reducer, MockDefenseDice)
   {
      "use strict";
      QUnit.module("MockDefenseDice");

      QUnit.test("MockDefenseDice properties", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockDefenseDice(store, attackerId);
         assert.equal(dice.value(0), DefenseDice.Value.BLANK);
         assert.equal(dice.value(1), DefenseDice.Value.EVADE);
         assert.equal(dice.value(2), DefenseDice.Value.FOCUS);
      });

      QUnit.test("blankCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockDefenseDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.blankCount(), 1);
      });

      QUnit.test("evadeCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockDefenseDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.evadeCount(), 1);
      });

      QUnit.test("focusCount()", function(assert)
      {
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockDefenseDice(store, attackerId);
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.focusCount(), 1);
      });

      QUnit.test("rerollBlank()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var attackerId = 1;
         var dice = new MockDefenseDice(store, attackerId);

         // Run.
         dice.rerollBlank();

         // Verify.
         assert.equal(dice.blankCount(), 1);
      });
   });
