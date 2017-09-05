define(["squadbuilder/Action", "squadbuilder/DisplayItemType"],
   function(Action, DisplayItemType)
   {
      "use strict";
      QUnit.module("Action");

      QUnit.test("setDisplayItem()", function(assert)
      {
         // Setup.
         var displayItem = {};
         var displayItemType = DisplayItemType.PILOT;

         // Run.
         var result = Action.setDisplayItem(displayItem, displayItemType);

         // Verify.
         assert.ok(result);
         assert.equal(result.type, Action.SET_DISPLAY_ITEM);
         assert.equal(result.displayItem, displayItem);
         assert.equal(result.displayItemType, displayItemType);
      });
   });
