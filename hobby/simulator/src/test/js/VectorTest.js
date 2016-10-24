define([ "Vector" ], function(Vector)
{
    "use strict";
    QUnit.module("Vector");

    QUnit.test("Vector()", function(assert)
    {
        // Setup / Run.
        var result = new Vector(1.0, 2.0, 3.0);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result, 1.0, 2.0, 3.0);
    });

    QUnit.test("Vector.normalizeAngle()", function(assert)
    {
        assert.equal(Vector.normalizeAngle(3), 3);
        assert.equal(Vector.normalizeAngle(363), 3);
        assert.equal(Vector.normalizeAngle(-357), 3);
    });

    QUnit.test("add()", function(assert)
    {
        // Setup.
        var v0 = new Vector(1.0, 2.0, 3.0);
        var v1 = new Vector(4.0, 5.0, 6.0);

        // Run.
        var result = v0.add(v1);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result, 5.0, 7.0, 9.0);
    });

    QUnit.test("angle()", function(assert)
    {
        // Setup.
        var v0 = new Vector(1.0, 2.0, 3.0);
        var v1 = new Vector(4.0, 5.0, 6.0);

        // Run.
        var result = v0.angle(v1);

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 4), 12.9332);

        v0 = new Vector(0.0, 0.0, 1.0);
        v1 = new Vector(0.0, 0.0, 0.0);
        assert.equal(Math.vizziniRound(v0.angle(v1), 4), 90.0);

        v0 = new Vector(1.0, 0.0, 1.0);
        v1 = new Vector(0.0, 0.0, 0.0);
        assert.equal(Math.vizziniRound(v0.angle(v1), 4), 90.0);

        v0 = new Vector(1.0, 1.0, 1.0);
        v1 = new Vector(1.0, 1.0, 0.0);
        assert.equal(Math.vizziniRound(v0.angle(v1), 4), 35.2644);
    });

    QUnit.test("angle() XY", function(assert)
    {
        // Setup.

        // Run.
        var result = Vector.X_AXIS.angle(Vector.Y_AXIS);

        // Verify.
        assert.ok(result);
        assert.equal(result, 90.0);
    });

    QUnit.test("azimuth()", function(assert)
    {
        assert.equal(Math.vizziniRound(Vector.ZERO.azimuth(), 4), 0.0);

        assert.equal(Math.vizziniRound(new Vector(1.0, 0.0, 0.0).azimuth(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 1.0, 0.0).azimuth(), 4), 90.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 0.0, 1.0).azimuth(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, 0.0, 0.0).azimuth(), 4), 180.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, -1.0, 0.0).azimuth(), 4), 270.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 0.0, -1.0).azimuth(), 4), 0.0);

        assert.equal(Math.vizziniRound(new Vector(1.0, 1.0, 0.0).azimuth(), 4), 45.0);
        assert.equal(Math.vizziniRound(new Vector(1.0, 0.0, 1.0).azimuth(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 1.0, 1.0).azimuth(), 4), 90.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, -1.0, 0.0).azimuth(), 4), 225.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, 0.0, -1.0).azimuth(), 4), 180.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, -1.0, -1.0).azimuth(), 4), 270.0);

        assert.equal(Math.vizziniRound(new Vector(1.0, 1.0, 1.0).azimuth(), 4), 45.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, -1.0, -1.0).azimuth(), 4), 225.0);
    });

    QUnit.test("cross() XY", function(assert)
    {
        // Setup.
        var v0 = Vector.X_AXIS;
        var v1 = Vector.Y_AXIS;

        // Run.
        var result = v0.cross(v1);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result, 0.0, 0.0, 1.0);
    });

    QUnit.test("cross() YZ", function(assert)
    {
        // Setup.
        var v0 = Vector.Y_AXIS;
        var v1 = Vector.Z_AXIS;

        // Run.
        var result = v0.cross(v1);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result, 1.0, 0.0, 0.0);
    });

    QUnit.test("cross() Z(-X)", function(assert)
    {
        // Setup.
        var v0 = Vector.Z_AXIS;
        var v1 = Vector.X_AXIS.multiply(-1.0);

        // Run.
        var result = v0.cross(v1);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result, 0.0, -1.0, 0.0);
        assert.equal(Math.vizziniRound(result.magnitude(), 4), 1.0);
    });

    QUnit.test("dot()", function(assert)
    {
        // Setup.
        var v0 = new Vector(1.0, 2.0, 3.0);
        var v1 = new Vector(4.0, 5.0, 6.0);

        // Run.
        var result = v0.dot(v1);

        // Verify.
        assert.ok(result);
        assert.equal(result, 32.0);
    });

    QUnit.test("elevation()", function(assert)
    {
        assert.equal(Math.vizziniRound(Vector.ZERO.elevation(), 4), 0.0);

        assert.equal(Math.vizziniRound(new Vector(1.0, 0.0, 0.0).elevation(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 1.0, 0.0).elevation(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 0.0, 1.0).elevation(), 4), 90.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, 0.0, 0.0).elevation(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, -1.0, 0.0).elevation(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 0.0, -1.0).elevation(), 4), 270.0);

        assert.equal(Math.vizziniRound(new Vector(1.0, 1.0, 0.0).elevation(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(1.0, 0.0, 1.0).elevation(), 4), 45.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, 1.0, 1.0).elevation(), 4), 45.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, -1.0, 0.0).elevation(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Vector(-1.0, 0.0, -1.0).elevation(), 4), 315.0);
        assert.equal(Math.vizziniRound(new Vector(0.0, -1.0, -1.0).elevation(), 4), 315.0);

        assert.equal(Math.vizziniRound(new Vector(1.0, 1.0, 1.0).elevation(), 4), 35.2644);
        assert.equal(Math.vizziniRound(new Vector(-1.0, -1.0, -1.0).elevation(), 4), 324.7356);
    });

    QUnit.test("getters", function(assert)
    {
        // Setup.
        var v = new Vector(1.0, 2.0, 3.0);

        // Run / Verify.
        assert.equal(v.x(), 1.0);
        assert.equal(v.y(), 2.0);
        assert.equal(v.z(), 3.0);
    });

    QUnit.test("magnitude()", function(assert)
    {
        // Setup.
        var v = new Vector(1.0, 2.0, 3.0);

        // Run.
        var result = v.magnitude();

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 4), 3.7417);
    });

    QUnit.test("magnitudeSquared()", function(assert)
    {
        // Setup.
        var v = new Vector(1.0, 2.0, 3.0);

        // Run.
        var result = v.magnitudeSquared();

        // Verify.
        assert.ok(result);
        assert.equal(result, 14.0);
    });

    QUnit.test("multiply()", function(assert)
    {
        // Setup.
        var v = new Vector(1.0, 2.0, 3.0);

        // Run / Verify.
        verifyVector(assert, v.multiply(3.0), 3.0, 6.0, 9.0);
        verifyVector(assert, v.multiply(-1.0), -1.0, -2.0, -3.0);
    });

    QUnit.test("subtract()", function(assert)
    {
        // Setup.
        var v0 = new Vector(1.0, 2.0, 3.0);
        var v1 = new Vector(6.0, 5.0, 4.0);

        // Run.
        var result = v0.subtract(v1);

        // Verify.
        assert.ok(result);
        verifyVector(assert, result, -5.0, -3.0, -1.0);
    });

    QUnit.test("toHeadingString()", function(assert)
    {
        assert.equal(Vector.ZERO.toHeadingString(), "000m000");

        assert.equal(new Vector(1.0, 0.0, 0.0).toHeadingString(), "000m000");
        assert.equal(new Vector(0.0, 1.0, 0.0).toHeadingString(), "090m000");
        assert.equal(new Vector(0.0, 0.0, 1.0).toHeadingString(), "000m090");
        assert.equal(new Vector(-1.0, 0.0, 0.0).toHeadingString(), "180m000");
        assert.equal(new Vector(0.0, -1.0, 0.0).toHeadingString(), "270m000");
        assert.equal(new Vector(0.0, 0.0, -1.0).toHeadingString(), "000m270");

        assert.equal(new Vector(1.0, 1.0, 0.0).toHeadingString(), "045m000");
        assert.equal(new Vector(1.0, 0.0, 1.0).toHeadingString(), "000m045");
        assert.equal(new Vector(0.0, 1.0, 1.0).toHeadingString(), "090m045");
        assert.equal(new Vector(-1.0, -1.0, 0.0).toHeadingString(), "225m000");
        assert.equal(new Vector(-1.0, 0.0, -1.0).toHeadingString(), "180m315");
        assert.equal(new Vector(0.0, -1.0, -1.0).toHeadingString(), "270m315");
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        var v = new Vector(1.0, 2.0, 3.0);

        // Run.
        var result = v.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "(1, 2, 3)");
    });

    QUnit.test("unit()", function(assert)
    {
        // Setup.
        var v = new Vector(1.0, 2.0, 3.0);

        // Run.
        var result = v.unit();

        // Run / Verify.
        verifyVector(assert, result, 0.2673, 0.5345, 0.8018);
    });

    QUnit.test("unit() zero vector", function(assert)
    {
        // Setup.
        var v = Vector.ZERO;

        // Run.
        var result = v.unit();

        // Run / Verify.
        verifyVector(assert, result, 1.0, 0.0, 0.0);
    });
});
