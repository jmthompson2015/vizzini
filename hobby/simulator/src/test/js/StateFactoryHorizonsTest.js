define([ "Body", "StateFactory" ], function(Body, StateFactory)
{
    "use strict";
    QUnit.module("StateFactory");

    QUnit.test("Horizons.createStates()", function(assert)
    {
        // Setup.
        var bodyKeys = [ Body.SOL, Body.EARTH, Body.LUNA ];
        var callback = function(bodyToState)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(bodyToState);
            var solState = bodyToState[Body.SOL];
            assert.ok(solState, "solState");
            assert.ok(solState.position());
            assert.ok(solState.orientation());
            assert.ok(solState.velocity());
            assert.ok(solState.angularVelocity());

            var earthState = bodyToState[Body.EARTH];
            assert.ok(earthState, "earthState");
            assert.ok(earthState.position());
            assert.ok(earthState.orientation());
            assert.ok(earthState.velocity());
            assert.ok(earthState.angularVelocity());

            var lunaState = bodyToState[Body.LUNA];
            assert.ok(lunaState, "lunaState");
            assert.ok(lunaState.position());
            assert.ok(lunaState.orientation());
            assert.ok(lunaState.velocity());
            assert.ok(lunaState.angularVelocity());
            done();
        };
        var factory = new StateFactory.Horizons(bodyKeys, callback);

        // Run.
        var done = assert.async();
        factory.createStates();
    });
});
