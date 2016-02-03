define([ "Body", "Environment", "Quaternion", "StateFactory", "Vector", "ship/Ship" ], function(Body, Environment,
        Quaternion, StateFactory, Vector, Ship)
{
    "use strict";
    QUnit.module("Environment");

    QUnit.test("Environment()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);

        // Run / Verify.
        assert.ok(environment.state(Body.SOL));
        assert.ok(environment.state(Body.EARTH));
        assert.ok(environment.state(Body.LUNA));
    });

    QUnit.test("Environment()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);

        // Run.
        var result = environment.bodyKeys();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 27);
        assert.equal(result[0], Body.SOL);
        assert.equal(result[1], Body.MERCURY);
        assert.equal(result[2], Body.VENUS);
        assert.equal(result[3], Body.EARTH);
        assert.equal(result[4], Body.LUNA);
        assert.equal(result[5], Body.MARS);
        assert.equal(result[6], Body.PHOBOS);
        assert.equal(result[7], Body.DEIMOS);
        assert.equal(result[8], Body.JUPITER);
        assert.equal(result[9], Body.IO);
        assert.equal(result[10], Body.EUROPA);
        assert.equal(result[11], Body.GANYMEDE);
        assert.equal(result[12], Body.CALLISTO);
        assert.equal(result[13], Body.SATURN);
        assert.equal(result[14], Body.MIMAS);
        assert.equal(result[15], Body.ENCELADUS);
        assert.equal(result[16], Body.TETHYS);
        assert.equal(result[17], Body.DIONE);
        assert.equal(result[18], Body.RHEA);
        assert.equal(result[19], Body.TITAN);
        assert.equal(result[20], Body.IAPETUS);
        assert.equal(result[21], Body.URANUS);
        assert.equal(result[22], Body.MIRANDA);
        assert.equal(result[23], Body.ARIEL);
        assert.equal(result[24], Body.UMBRIEL);
        assert.equal(result[25], Body.TITANIA);
        assert.equal(result[26], Body.OBERON);
    });

    QUnit.test("tick()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var earthState = bodyToState[Body.EARTH];
        var state = StateFactory.createRelativeState(earthState, 42164, 3.0746);
        environment.addShip(new Ship.ReferenceShip("ReferenceShip", environment), state.position(), Quaternion.ZERO,
                state.velocity(), Quaternion.ZERO);

        var solState = environment.state(Body.SOL);
        verifyVector(assert, solState.position(), 561524.6657, 231553.661, -24203.0858);
        var earthState = environment.state(Body.EARTH);
        verifyVector(assert, earthState.position(), -75613579.1947, 126206909.8272, -27995.6683);
        var lunaState = environment.state(Body.LUNA);
        verifyVector(assert, lunaState.position(), -75651368.2263, 126584174.0843, -61031.2989);
        var shipState = environment.state("ReferenceShip");
        verifyVector(assert, shipState.position(), -75571415.1947, 126206909.8272, -27995.6683);

        // Run.
        environment.tick();

        // Verify.
        solState = environment.state(Body.SOL);
        verifyVector(assert, solState.position(), 561524.6667, 231553.673, -24203.0859);
        earthState = environment.state(Body.EARTH);
        verifyVector(assert, earthState.position(), -75613605.1572, 126206894.3147, -27995.6679);
        lunaState = environment.state(Body.LUNA);
        verifyVector(assert, lunaState.position(), -75651395.2229, 126584158.5053, -61031.2811);
        shipState = environment.state("ReferenceShip");
        verifyVector(assert, shipState.position(), -75571441.1572, 126206897.3893, -27995.6679);

        // Run.
        environment.tick();

        // Verify.
        solState = environment.state(Body.SOL);
        verifyVector(assert, solState.position(), 561524.6678, 231553.6851, -24203.0859);
        earthState = environment.state(Body.EARTH);
        verifyVector(assert, earthState.position(), -75613631.1196, 126206878.8022, -27995.6674);
        lunaState = environment.state(Body.LUNA);
        verifyVector(assert, lunaState.position(), -75651422.2196, 126584142.9264, -61031.2633);
        shipState = environment.state("ReferenceShip");
        verifyVector(assert, shipState.position(), -75571467.1199, 126206884.9514, -27995.6674);

        // Run.
        environment.tick();

        // Verify.
        solState = environment.state(Body.SOL);
        verifyVector(assert, solState.position(), 561524.6689, 231553.6971, -24203.0859);
        earthState = environment.state(Body.EARTH);
        verifyVector(assert, earthState.position(), -75613657.0821, 126206863.2897, -27995.667);
        lunaState = environment.state(Body.LUNA);
        verifyVector(assert, lunaState.position(), -75651449.2162, 126584127.3475, -61031.2455);
        shipState = environment.state("ReferenceShip");
        verifyVector(assert, shipState.position(), -75571493.0828, 126206872.5135, -27995.667);
    });
});
