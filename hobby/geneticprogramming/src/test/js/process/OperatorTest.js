define([ "process/Operator" ], function(Operator)
{
    "use strict";
    QUnit.module("Operator");

    QUnit.test("Operator()", function(assert)
    {
        // Setup.
        var ratio = 0.20;
        var argCount = 2;
        var executor = function(genome0, genome1)
        {};

        // Run.
        var result = new Operator(ratio, argCount, executor);

        // Verify.
        assert.ok(result);
        assert.equal(result.ratio(), ratio);
        assert.equal(result.argCount(), argCount);
        assert.equal(result.executor(), executor);
    });
});
