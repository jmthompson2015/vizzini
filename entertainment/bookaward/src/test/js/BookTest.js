define(["Book"], function(Book)
{
    "use strict";
    QUnit.module("Book");

    QUnit.test("Book()", function(assert)
    {
        // Setup.
        var title = "A Dark and Stormy Night";
        var author = "Noah Boddy";

        // Run.
        var result = new Book(title, author);

        // Verify.
        assert.ok(result);
        assert.equal(result.title(), title);
        assert.equal(result.author(), author);
    });
});
