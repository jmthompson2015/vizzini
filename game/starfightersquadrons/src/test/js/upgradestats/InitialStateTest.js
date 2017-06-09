define(["upgradestats/InitialState"],
   function(InitialState)
   {
      "use strict";
      QUnit.module("InitialState");

      QUnit.test("InitialState()", function(assert)
      {
         // Run.
         var result = new InitialState();

         // Verify.
         assert.ok(result.filters);
         assert.equal(Object.getOwnPropertyNames(result.filters).length, 8);
         assert.ok(result.upgradeData);
         assert.equal(result.upgradeData.length, 274);
         assert.ok(result.filteredUpgradeData);
         assert.equal(result.filteredUpgradeData.length, 274);
      });
   });
