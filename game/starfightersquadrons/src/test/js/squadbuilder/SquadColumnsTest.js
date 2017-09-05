define(["squadbuilder/SquadColumns"], function(SquadColumns)
{
   "use strict";
   QUnit.module("SquadColumns");

   QUnit.test("properties", function(assert)
   {
      assert.equal(Object.getOwnPropertyNames(SquadColumns).length, 9);
   });
});
