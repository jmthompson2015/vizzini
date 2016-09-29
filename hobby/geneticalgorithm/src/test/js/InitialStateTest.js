define([ "InitialState" ], function(InitialState)
{
    "use strict";
    QUnit.module("InitialState");

    QUnit.test("InitialState()", function(assert)
    {
        // Setup.

        // Run.
        var state = new InitialState();

        // Verify.
        assert.ok(state);
        assert.equal(state.backCount, 0);
        assert.ok(state.bestGenomes);
        assert.equal(state.bestGenomes.length, 0);
        assert.equal(state.generationCount, 0);
        assert.equal(state.geneticAlgorithm, undefined);
        assert.equal(state.message, "");
        assert.equal(state.popSize, 0);
        assert.equal(state.problem, undefined);
    });
});
