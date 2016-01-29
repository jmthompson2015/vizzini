define([ "Body", "StateFactory" ], function(Body, StateFactory)
{
    "use strict";
    QUnit.module("StateFactory");

    QUnit.test("Reference.createStates()", function(assert)
    {
        // Run.
        var result = StateFactory.Reference.createStates();

        // Verify.
        assert.ok(result);
        var solState = result[Body.SOL];
        verifyVector(assert, solState.position(), 561524.6657, 231553.661, -24203.0858);
        verifyVector(assert, solState.velocity(), 0.0011, 0.012, 0.0);
        var earthState = result[Body.EARTH];
        verifyVector(assert, earthState.position(), -75613579.1947, 126206909.8272, -27995.6683);
        verifyVector(assert, earthState.velocity(), -25.9625, -15.5125, 0.0004);
        var lunaState = result[Body.LUNA];
        verifyVector(assert, lunaState.position(), -75651368.2263, 126584174.0843, -61031.2989);
        verifyVector(assert, lunaState.velocity(), -26.9966, -15.5789, 0.0178);
    });

    QUnit.test("StateFactory.createRelativeState()", function(assert)
    {
        // Setup.
        var states = StateFactory.Reference.createStates();
        var earthState = states[Body.EARTH];

        // Run.
        var result = StateFactory.createRelativeState(earthState, 42164, 3.0746);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result.position(), -75571415.1947, 126206909.8272, -27995.6683);
        verifyVector(assert, result.velocity(), -25.9625, -12.4379, 0.0004);
    });
});
