define(["GridFactory"], function(GridFactory)
{
    "use strict";
    QUnit.module("GridFactory");

    QUnit.test("createDefaultSolution()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createDefaultSolution();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, "123456789456789123789123456234567891567891234891234567345678912678912345912345678");
    });

    QUnit.test("createEmpty()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createEmpty();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, ".................................................................................");
    });
});
