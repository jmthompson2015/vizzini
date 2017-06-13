define(["process/DefenseDice", "../../test/js/MockDefenseDice"],
   function(DefenseDice, MockDefenseDice)
   {
      "use strict";
      QUnit.module("MockDefenseDice");

      QUnit.test("MockDefenseDice properties", function(assert)
      {
         var dice = new MockDefenseDice();
         assert.equal(dice.value(0), DefenseDice.Value.BLANK);
         assert.equal(dice.value(1), DefenseDice.Value.EVADE);
         assert.equal(dice.value(2), DefenseDice.Value.FOCUS);
      });

      QUnit.test("blankCount()", function(assert)
      {
         var dice = new MockDefenseDice();
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.blankCount(), 1);
      });

      QUnit.test("evadeCount()", function(assert)
      {
         var dice = new MockDefenseDice();
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.evadeCount(), 1);
      });

      QUnit.test("focusCount()", function(assert)
      {
         var dice = new MockDefenseDice();
         LOGGER.trace("dice = " + dice);
         assert.equal(dice.focusCount(), 1);
      });

      QUnit.test("rerollBlank()", function(assert)
      {
         // Setup.
         var dice = new MockDefenseDice();

         // Run.
         dice.rerollBlank();

         // Verify.
         assert.equal(dice.blankCount(), 1);
      });
   });
