define(["squadbuilder/DisplayItemType"], function(DisplayItemType)
{
   "use strict";
   QUnit.module("DisplayItemType");

   QUnit.test("properties", function(assert)
   {
      assert.equal(DisplayItemType.PILOT, "pilot");
      assert.equal(DisplayItemType.SHIP, "ship");
      assert.equal(DisplayItemType.UPGRADE, "upgrade");
   });
});
