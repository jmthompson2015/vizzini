define([ "Environment", "Quaternion", "StateFactory", "Vector", "ship/Conduit", "ship/Power", "ship/Sensor",
        "ship/Ship", "ship/Storage", "ship/SupplyType" ], function(Environment, Quaternion, StateFactory, Vector,
        Conduit, Power, Sensor, Ship, Storage, SupplyType)
{
    "use strict";
    QUnit.module("Sensor");

    QUnit.test("Camera()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";

        // Run.
        var result = new Sensor.Camera("Forward", environment, name, Vector.ZERO, Quaternion.ZERO, 1);

        // Verify.
        assert.ok(result);
        assert.equal(result.consumePerTick(), 1);
    });

    QUnit.test("produce()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);
        var name = "ReferenceShip";
        environment.addShip(new Ship.ReferenceShip(name, environment), Vector.ZERO, Quaternion.ZERO);
        var ship = environment.ship(name);
        var device = ship.device("ForwardCamera");
        environment.tick();

        // Run.
        var result = device.produce();

        // Verify.
        assert.ok(result);
        assert.ok(Object.getOwnPropertyNames(result));
        assert.equal(Object.getOwnPropertyNames(result).length, 13);
    });

    QUnit.test("toString()",
            function(assert)
            {
                // Setup.
                var bodyToState = StateFactory.Reference.createStates();
                var environment = new Environment.Environment(bodyToState);
                var parentKey = "ReferenceShip";
                var consumePerTick = 1;
                var device = new Sensor.Camera("Forward", environment, parentKey, Vector.ZERO, Quaternion.ZERO,
                        consumePerTick);

                // Run / Verify.
                assert.equal(device.toString(), "Camera Forward consumePerTick=1");
            });
});
