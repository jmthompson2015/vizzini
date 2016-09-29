define([ "process/Action" ], function(Action)
{
    "use strict";
    QUnit.module("Action");

    QUnit.test("setGenerationCount()", function(assert)
    {
        // Setup.
        var generationCount = 12;

        // Run.
        var result = Action.setGenerationCount(generationCount);

        // Verify.
        assert.ok(result);
        assert.equal(result.type, Action.SET_GENERATION_COUNT);
        assert.equal(result.generationCount, 12);
    });
});
