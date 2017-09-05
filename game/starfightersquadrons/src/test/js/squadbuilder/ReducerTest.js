define(["squadbuilder/Action", "squadbuilder/DisplayItemType", "squadbuilder/InitialState", "squadbuilder/Reducer"],
   function(Action, DisplayItemType, InitialState, Reducer)
   {
      "use strict";
      QUnit.module("Reducer");

      QUnit.test("setDisplayItem()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var displayItem = {};
         var displayItemType = DisplayItemType.SHIP;
         var action = Action.setDisplayItem(displayItem, displayItemType);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.displayItem, displayItem);
         assert.equal(result.displayItemType, displayItemType);
      });
   });
