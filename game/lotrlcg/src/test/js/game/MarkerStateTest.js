define([ "game/MarkerState" ], function(MarkerState)
{
    "use strict";
    QUnit.module("MarkerState");

    QUnit.test("isMarked()", function(assert)
    {
        // Setup.
        var state = new MarkerState();

        // Run.
        var result = state.isMarked();

        // Verify.
        assert.ok(!result);

        // Run.
        var result = state.isMarked(true);

        // Verify.
        assert.ok(result);

        // Run.
        var result = state.isMarked(false);

        // Verify.
        assert.ok(!result);
    });
});
