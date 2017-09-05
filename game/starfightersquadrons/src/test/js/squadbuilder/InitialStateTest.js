define(["squadbuilder/InitialState"], function(InitialState)
{
   "use strict";
   QUnit.module("InitialState");

   QUnit.test("InitialState()", function(assert)
   {
      // Run.
      var result = new InitialState();

      // Verify.
      assert.equal(result.delegateStore, undefined);
      assert.equal(result.displayItem, undefined);
      assert.equal(result.displayItemType, undefined);
      assert.equal(result.imageBase, undefined);
      assert.ok(result.pilots);
      assert.equal(result.pilots.size, 0);
      assert.ok(result.pilotKeyToUpgrades);
      assert.equal(result.pilotKeyToUpgrades.size, 0);
      assert.ok(result.ships);
      assert.equal(result.ships.size, 0);
      assert.equal(result.squad, undefined);
      assert.equal(result.team, undefined);
   });
});
