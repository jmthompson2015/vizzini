define(["ConditionCard"], function(ConditionCard)
{
   "use strict";
   QUnit.module("ConditionCard");

   QUnit.test("ConditionCard properties Fanatical Devotion", function(assert)
   {
      var upgrade = ConditionCard.FANATICAL_DEVOTION;
      var properties = ConditionCard.properties[upgrade];
      assert.equal(properties.name, "Fanatical Devotion");
      assert.equal(properties.description, "When defending, you cannot spend focus tokens. When attacking, if you spend a focus token to change all focus results to hit results, set aside the first focus result that you change. The set-aside hit result cannot be canceled by defense dice, but the defender may cancel critical hit results before it.");
      assert.equal(properties.value, "fanaticalDevotion");
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = ConditionCard.values();
      var ownPropertyNames = Object.getOwnPropertyNames(ConditionCard);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = ConditionCard[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(ConditionCard.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return ConditionCard[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("values()", function(assert)
   {
      // Run.
      var result = ConditionCard.values();

      // Verify.
      assert.ok(result);
      var length = 2;
      assert.equal(result.length, length);
      assert.equal(result[0], ConditionCard.FANATICAL_DEVOTION);
      assert.equal(result[length - 1], ConditionCard.ILL_SHOW_YOU_THE_DARK_SIDE);
   });
});
