define(["Assessment"], function(Assessment)
{
   "use strict";
   QUnit.module("Assessment");

   QUnit.test("Assessment properties Possible pick", function(assert)
   {
      var assessmentKey = Assessment.POSSIBLE_PICK;
      var assessment = Assessment.properties[assessmentKey];
      assert.equal(assessment.name, "Possible pick");
      assert.equal(assessment.value, assessmentKey);
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = Assessment.values();
      var ownPropertyNames = Object.getOwnPropertyNames(Assessment);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = Assessment[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(Assessment.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return Assessment[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("values()", function(assert)
   {
      // Run.
      var result = Assessment.values();

      // Verify.
      assert.ok(result);
      var length = 7;
      assert.equal(result.length, length);
      assert.equal(result[0], "bookClubPick");
      assert.equal(result[length - 1], "read");

      var properties = Object.getOwnPropertyNames(Assessment);
      var count = properties.length - 1 - // properties
         1; // values
      assert.equal(result.length, count);
   });
});
