define([ "Environment", "Quaternion", "StateFactory", "Vector", "ship/Conduit", "ship/Power", "ship/Propulsion",
        "ship/Ship", "ship/Storage", "ship/SupplyType" ], function(Environment, Quaternion, StateFactory, Vector,
        Conduit, Power, Propulsion, Ship, Storage, SupplyType)
{
    "use strict";
    QUnit.module("Propulsion");

    QUnit.test("IonEngine()", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";

        // Run.
        var result = new Propulsion.IonEngine("Main", environment, name, Vector.ZERO, Quaternion.ZERO, 2, 1, 100);

        // Verify.
        assert.ok(result);
        assert.equal(result.consumeFuelPerTick(), 2);
        assert.equal(result.consumePowerPerTick(), 1);
        assert.equal(result.producePerTick(), 100);
    });

    QUnit.test("isActive()", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device = ship.device("PortYawAftEngine");
        assert.ok(!device.isActive());
        device.isActive(true);
        assert.ok(device.isActive());
        device.isActive(false);
        assert.ok(!device.isActive());
    });

    QUnit.test("produce() torque dorsal pitch", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device0 = ship.device("DorsalPitchAftEngine");
        var device1 = ship.device("DorsalPitchForwardEngine");
        device0.isActive(true);
        device1.isActive(true);
        environment.tick();

        // Run.
        var result0 = device0.produce();
        var result1 = device1.produce();

        // Verify.
        assert.ok(result0);
        assert.ok(Object.getOwnPropertyNames(result0));
        assert.equal(Object.getOwnPropertyNames(result0).length, 3);
        assert.equal(result0.shipKey, name);
        verifyVector(assert, result0.acceleration, 0.0, 0.0, -0.01);
        verifyQuaternion(assert, result0.angularAcceleration, 1.0, 0.0, -0.001, 0.0);
        assert.equal(Math.vizziniRound(result0.angularAcceleration.angle(), 6), 0.114592);
        verifyVector(assert, result0.angularAcceleration.vector(), 0.0, -1.0, 0.0);
        assert.ok(device0.isActive());

        assert.ok(result1);
        assert.ok(Object.getOwnPropertyNames(result1));
        assert.equal(Object.getOwnPropertyNames(result1).length, 3);
        assert.equal(result1.shipKey, name);
        verifyVector(assert, result1.acceleration, 0.0, 0.0, 0.01);
        verifyQuaternion(assert, result1.angularAcceleration, 1.0, 0.0, -0.001, 0.0);
        assert.equal(Math.vizziniRound(result1.angularAcceleration.angle(), 6), 0.114592);
        verifyVector(assert, result1.angularAcceleration.vector(), 0.0, -1.0, 0.0);
        assert.ok(device1.isActive());
    });

    QUnit.test("produce() torque dorsal roll", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device0 = ship.device("DorsalRollPortEngine");
        var device1 = ship.device("DorsalRollStarboardEngine");
        device0.isActive(true);
        device1.isActive(true);
        environment.tick();

        // Run.
        var result0 = device0.produce();
        var result1 = device1.produce();

        // Verify.
        assert.ok(result0);
        assert.ok(Object.getOwnPropertyNames(result0));
        assert.equal(Object.getOwnPropertyNames(result0).length, 3);
        assert.equal(result0.shipKey, name);
        verifyVector(assert, result0.acceleration, 0.0, 0.0, 0.01);
        verifyQuaternion(assert, result0.angularAcceleration, 1.0, 0.00075, 0.0, 0.0);
        assert.equal(Math.vizziniRound(result0.angularAcceleration.angle(), 6), 0.085944);
        verifyVector(assert, result0.angularAcceleration.vector(), 1.0, 0.0, 0.0);
        assert.ok(device0.isActive());

        assert.ok(result1);
        assert.ok(Object.getOwnPropertyNames(result1));
        assert.equal(Object.getOwnPropertyNames(result1).length, 3);
        assert.equal(result1.shipKey, name);
        verifyVector(assert, result1.acceleration, 0.0, 0.0, -0.01);
        verifyQuaternion(assert, result1.angularAcceleration, 1.0, 0.00075, 0.0, 0.0);
        assert.equal(Math.vizziniRound(result1.angularAcceleration.angle(), 6), 0.085944);
        verifyVector(assert, result1.angularAcceleration.vector(), 1.0, 0.0, 0.0);
        assert.ok(device1.isActive());
    });

    QUnit.test("produce() torque port yaw", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device0 = ship.device("PortYawAftEngine");
        var device1 = ship.device("PortYawForwardEngine");
        device0.isActive(true);
        device1.isActive(true);
        environment.tick();

        // Run.
        var result0 = device0.produce();
        var result1 = device1.produce();

        // Verify.
        assert.ok(result0);
        assert.ok(Object.getOwnPropertyNames(result0));
        assert.equal(Object.getOwnPropertyNames(result0).length, 3);
        assert.equal(result0.shipKey, name);
        verifyVector(assert, result0.acceleration, 0.0, -0.01, 0.0);
        verifyQuaternion(assert, result0.angularAcceleration, 1.0, 0.0, 0.0, 0.001);
        assert.equal(Math.vizziniRound(result0.angularAcceleration.angle(), 6), 0.114592);
        verifyVector(assert, result0.angularAcceleration.vector(), 0.0, 0.0, 1.0);
        assert.ok(device0.isActive());

        assert.ok(result1);
        assert.ok(Object.getOwnPropertyNames(result1));
        assert.equal(Object.getOwnPropertyNames(result1).length, 3);
        assert.equal(result1.shipKey, name);
        verifyVector(assert, result1.acceleration, 0.0, 0.01, 0.0);
        verifyQuaternion(assert, result1.angularAcceleration, 1.0, 0.0, 0.0, 0.001);
        assert.equal(Math.vizziniRound(result1.angularAcceleration.angle(), 6), 0.114592);
        verifyVector(assert, result1.angularAcceleration.vector(), 0.0, 0.0, 1.0);
        assert.ok(device1.isActive());
    });

    QUnit.test("produce() torque starboard yaw", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device0 = ship.device("StarboardYawAftEngine");
        var device1 = ship.device("StarboardYawForwardEngine");
        device0.isActive(true);
        device1.isActive(true);
        environment.tick();

        // Run.
        var result0 = device0.produce();
        var result1 = device1.produce();

        // Verify.
        assert.ok(result0);
        assert.ok(Object.getOwnPropertyNames(result0));
        assert.equal(Object.getOwnPropertyNames(result0).length, 3);
        assert.equal(result0.shipKey, name);
        verifyVector(assert, result0.acceleration, 0.0, 0.01, 0.0);
        verifyQuaternion(assert, result0.angularAcceleration, 1.0, 0.0, 0.0, -0.001);
        assert.equal(Math.vizziniRound(result0.angularAcceleration.angle(), 6), 0.114592);
        verifyVector(assert, result0.angularAcceleration.vector(), 0.0, 0.0, -1.0);
        assert.ok(device0.isActive());

        assert.ok(result1);
        assert.ok(Object.getOwnPropertyNames(result1));
        assert.equal(Object.getOwnPropertyNames(result1).length, 3);
        assert.equal(result1.shipKey, name);
        verifyVector(assert, result1.acceleration, 0.0, -0.01, 0.0);
        verifyQuaternion(assert, result1.angularAcceleration, 1.0, 0.0, 0.0, -0.001);
        assert.equal(Math.vizziniRound(result1.angularAcceleration.angle(), 6), 0.114592);
        verifyVector(assert, result1.angularAcceleration.vector(), 0.0, 0.0, -1.0);
        assert.ok(device1.isActive());
    });

    QUnit.test("produce() thrust", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device = ship.device("MainEngine");
        device.isActive(true);
        environment.tick();

        // Run.
        var result = device.produce();

        // Verify.
        assert.ok(result);
        assert.ok(Object.getOwnPropertyNames(result));
        assert.equal(Object.getOwnPropertyNames(result).length, 3);
        assert.equal(result.shipKey, name);
        verifyVector(assert, result.acceleration, 1.0, 0.0, 0.0);
        verifyQuaternion(assert, result.angularAcceleration, 1.0, 0.0, 0.0, 0.0);
        assert.ok(device.isActive());
    });

    QUnit.test("toString()",
            function(assert)
            {
                // Setup.
                var environment = new Environment.Reference();
                var parentKey = "ReferenceShip";
                var device = new Propulsion.IonEngine("Main", environment, parentKey, Vector.ZERO, Quaternion.ZERO, 2,
                        1, 100);

                // Run / Verify.
                assert.equal(device.toString(),
                        "IonEngine Main consumeFuelPerTick=2 consumePowerPerTick=1 producePerTick=100");
            });
});
