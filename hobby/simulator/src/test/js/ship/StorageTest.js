define([ "Environment", "Quaternion", "StateFactory", "Vector", "ship/Storage" ], function(Environment, Quaternion,
        StateFactory, Vector, Storage)
{
    "use strict";
    QUnit.module("Storage");

    QUnit.test("FuelTank()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";

        // Run.
        var result = new Storage.FuelTank("1", environment, name, Vector.ZERO, Quaternion.ZERO, 100);

        // Verify.
        assert.ok(result);
        assert.equal(result.capacity(), 100);
    });

    QUnit.test("request()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var device = new Storage.FuelTank("1", environment, name, Vector.ZERO, Quaternion.ZERO, 100);

        // Run.
        var result = device.request(1);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(device.capacity(), 100);
        assert.equal(device.level(), 99);
    });

    QUnit.test("request() too much", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var device = new Storage.FuelTank("1", environment, name, Vector.ZERO, Quaternion.ZERO, 10);

        // Run.
        var result = device.request(12);

        // Verify.
        assert.ok(result);
        assert.equal(result, 10);
        assert.equal(device.capacity(), 10);
        assert.equal(device.level(), 0);
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var device = new Storage.FuelTank("1", environment, name, Vector.ZERO, Quaternion.ZERO, 100);

        // Run / Verify.
        assert.equal(device.toString(), "FuelTank 1 capacity=100 level=100");
    });
});
