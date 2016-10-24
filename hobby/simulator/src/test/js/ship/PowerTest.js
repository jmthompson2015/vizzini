define([ "Environment", "Quaternion", "StateFactory", "Vector", "ship/Conduit", "ship/Power", "ship/Storage",
        "ship/SupplyType" ], function(Environment, Quaternion, StateFactory, Vector, Conduit, Power, Storage,
        SupplyType)
{
    "use strict";
    QUnit.module("Power");

    QUnit.test("FusionReactor()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";

        // Run.
        var result = new Power.FusionReactor("1", environment, name, Vector.ZERO, Quaternion.ZERO, 1, 2);

        // Verify.
        assert.ok(result);
        assert.equal(result.consumePerTick(), 1);
        assert.equal(result.producePerTick(), 2);
    });

    QUnit.test("FusionReactor.request()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var storage = new Storage.FuelTank("1", environment, name, Vector.ZERO, Quaternion.ZERO, 100);
        var device = new Power.FusionReactor("1", environment, name, Vector.ZERO, Quaternion.ZERO, 1, 2);
        var conduit = new Conduit("1", SupplyType.FUEL, storage, device);
        storage.addProduceConduit(conduit);
        device.addConsumeConduit(conduit);

        // Run.
        var result = device.request(1);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(device.level(), 1);
    });

    QUnit.test("FusionReactor.toString()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var device = new Power.FusionReactor("1", environment, name, Vector.ZERO, Quaternion.ZERO, 1, 2);

        // Run / Verify.
        assert.equal(device.toString(), "FusionReactor 1 consumePerTick=1 producePerTick=2");
    });

    QUnit.test("RTG()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";

        // Run.
        var result = new Power.RTG("1", environment, name, Vector.ZERO, Quaternion.ZERO, 2);

        // Verify.
        assert.ok(result);
        assert.equal(result.producePerTick(), 2);
    });

    QUnit.test("RTG.request()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var device = new Power.RTG("1", environment, name, Vector.ZERO, Quaternion.ZERO, 2);

        // Run.
        var result = device.request(1);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(device.level(), 1);
    });

    QUnit.test("RTG.toString()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        var device = new Power.RTG("1", environment, name, Vector.ZERO, Quaternion.ZERO, 2);

        // Run / Verify.
        assert.equal(device.toString(), "RTG 1 producePerTick=2");
    });
});
