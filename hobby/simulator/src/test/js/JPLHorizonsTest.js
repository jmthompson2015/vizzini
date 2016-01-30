define([ "Body", "JPLHorizons" ], function(Body, JPLHorizons)
{
    "use strict";
    QUnit.module("JPLHorizons");

    var START_TIME = '2016-01-22';
    var STOP_TIME = '2016-01-23';

    QUnit.test("fetchData() Sol", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.SOL];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), 561524.6657, 231553.661, -24203.0858);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 0.0011, 0.012, 0.0);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Mercury", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.MERCURY];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -46552697.3677, 23404020.8974, 6191685.5665);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -31.5156, -41.6404, -0.512);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000001);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Venus", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.VENUS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -84036209.2703, -67047562.8984, 3935176.5016);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 21.5533, -27.563, -1.6218);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Earth", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.EARTH];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -75613579.1947, 126206909.8272, -27995.6683);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -25.9625, -15.5125, 0.0004);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000036);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Luna", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.LUNA];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -75651368.2263, 126584174.0843, -61031.2989);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), -26.9966, -15.5789, 0.0178);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000001);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Mars", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.MARS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -245348812.6809, -14482576.8921, 5702725.3988);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 2.3512, -22.1047, -0.5212);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.000035);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Phobos", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.PHOBOS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -245341784.62, -14487714.1007, 5698994.1288);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 3.3902, -20.3162, -0.9673);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });

    QUnit.test("fetchData() Deimos", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.DEIMOS];
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(state);
            assert.equal(state.date().valueOf(), 1453446000000);
            verifyVector(assert, state.position(), -245341967.3608, -14460170.7875, 5701610.9722);
            verifyQuaternion(assert, state.orientation(), 1.0, 0.0, 0.0, 0.0);
            verifyVector(assert, state.velocity(), 1.1941, -21.722, 0.0629);
            verifyQuaternion(assert, state.angularVelocity(), 1.0, 0.0, 0.0, 0.0);
            done();
        };
        var horizons = new JPLHorizons(body, START_TIME, STOP_TIME, callback);

        // Run.
        var done = assert.async();
        horizons.fetchData();
    });
});
