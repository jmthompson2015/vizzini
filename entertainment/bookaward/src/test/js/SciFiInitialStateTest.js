define(["SciFiInitialState"], function(SciFiInitialState)
{
    "use strict";
    QUnit.module("SciFiInitialState");

    QUnit.test("SciFiInitialState()", function(assert)
    {
        // Run.
        var result = new SciFiInitialState();

        // Verify.
        assert.ok(result.books);
        assert.equal(result.books.length, 32);
        assert.ok(result.bookToNomination);
        assert.equal(result.bookToNomination[result.books[0]].length, 1);
        assert.equal(result.bookToNomination[result.books[result.books.length - 1]].length, 1);
        assert.ok(result.bookToAssessment);
        assert.ok(result.bookToAssessment[result.books[0]]);
        assert.ok(result.bookToAssessment[result.books[result.books.length - 1]]);
    });
});
