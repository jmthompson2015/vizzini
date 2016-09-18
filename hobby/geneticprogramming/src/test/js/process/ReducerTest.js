define([ "InitialState", "process/Action", "process/Reducer" ], function(InitialState, Action, Reducer)
{
    "use strict";
    QUnit.module("Reducer");

    QUnit.test("root()", function(assert)
    {
        // Setup.
        var state = new InitialState();
        var generationCount = 12;
        var action = Action.setGenerationCount(generationCount);

        // Run.
        var result = Reducer.root(state, action);

        // Verify.
        assert.ok(result);
        assert.equal(result.generationCount, 12);
    });
});
