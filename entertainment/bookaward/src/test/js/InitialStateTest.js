define(["InitialState"], function(InitialState)
{
   "use strict";
   QUnit.module("InitialState");

   QUnit.test("InitialState()", function(assert)
   {
      // Run.
      var result = new InitialState();

      // Verify.
      assert.ok(result.books);
      var length = 101;
      assert.equal(result.books.length, length);
      assert.ok(result.bookToNomination);
      assert.equal(result.bookToNomination[result.books[0]].length, 1);
      assert.equal(result.bookToNomination[result.books[length - 1]].length, 1);
      assert.ok(result.bookToAssessment);
      assert.ok(result.bookToAssessment[result.books[0]]);
      assert.ok(result.bookToAssessment[result.books[length - 1]]);
   });
});
