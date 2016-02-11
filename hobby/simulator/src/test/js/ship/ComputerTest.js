define([ "Environment", "Quaternion", "Vector", "ship/Computer" ], function(Environment, Quaternion, Vector, Computer)
{
    "use strict";
    QUnit.module("Computer");

    QUnit.test("AlignmentAutopilot()", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";

        // Run.
        var result = new Computer.AlignmentAutopilot("Main", environment, name, Vector.ZERO, Quaternion.ZERO, 1);

        // Verify.
        assert.ok(result);
        assert.equal(result.consumePerTick(), 1);
        verifyVector(assert, result.targetVector(), 1.0, 0.0, 0.0);
    });

    QUnit.test("isActive()", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var name = "ReferenceShip";
        var ship = environment.ship(name);
        var device = ship.device("AlignmentAutopilot");
        assert.ok(!device.isActive());
        device.isActive(true);
        assert.ok(device.isActive());
        device.isActive(false);
        assert.ok(!device.isActive());
    });

    QUnit.test("tick() 10 deg port", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(10.0, Vector.Z_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 21; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().azimuth(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().azimuth(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().azimuth(), 4), 10.0841, "tick " + i + " azimuth");
        assert.equal(Math.vizziniRound(state.angularVelocity().azimuth(), 4), 0.0, "tick " + i + " azimuth rate");
    });

    QUnit.test("tick() 90 deg port", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(90.0, Vector.Z_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 53; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().azimuth(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().azimuth(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().azimuth(), 4), 90.2981, "tick " + i + " azimuth");
        assert.equal(Math.vizziniRound(state.angularVelocity().azimuth(), 4), 0.0, "tick " + i + " azimuth rate");
    });

    QUnit.test("tick() 180 deg", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(180.0, Vector.Z_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 57; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().azimuth(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().azimuth(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().azimuth(), 4), 179.6796, "tick " + i + " azimuth");
        assert.equal(Math.vizziniRound(state.angularVelocity().azimuth(), 4), 0.0, "tick " + i + " azimuth rate");
    });

    QUnit.test("tick() 10 deg starboard", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(-10.0, Vector.Z_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 21; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().azimuth(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().azimuth(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().azimuth(), 4), 349.9159, "tick " + i + " azimuth");
        assert.equal(Math.vizziniRound(state.angularVelocity().azimuth(), 4), 0.0, "tick " + i + " azimuth rate");
    });

    QUnit.test("tick() 90 deg starboard", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(-90.0, Vector.Z_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 53; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().azimuth(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().azimuth(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().azimuth(), 4), 269.7019, "tick " + i + " azimuth");
        assert.equal(Math.vizziniRound(state.angularVelocity().azimuth(), 4), 0.0, "tick " + i + " azimuth rate");
    });

    QUnit.test("tick() 10 deg ventral", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(10.0, Vector.Y_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 21; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().elevation(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().elevation(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().elevation(), 4), 349.9159, "tick " + i + " elevation");
        assert.equal(Math.vizziniRound(state.angularVelocity().elevation(), 4), 0.0, "tick " + i + " elevation rate");
    });

    QUnit.test("tick() 90 deg ventral", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var ship = environment.ship("ReferenceShip");
        var state = environment.state("ReferenceShip");
        var computer = ship.device("AlignmentAutopilot");
        var targetVector = Quaternion.newInstance(90.0, Vector.Y_AXIS).preMultiply(Vector.X_AXIS);
        computer.targetVector(targetVector);
        computer.isActive(true);

        // Run / Verify.
        for (var i = 0; i < 53; i++)
        {
            environment.tick();
            LOGGER.debug(i + " " + Math.vizziniRound(state.orientation().elevation(), 4) + " " +
                    Math.vizziniRound(state.angularVelocity().elevation(), 4));
        }

        assert.equal(Math.vizziniRound(state.orientation().elevation(), 4), 270.2981, "tick " + i + " elevation");
        assert.equal(Math.vizziniRound(state.angularVelocity().elevation(), 4), 0.0, "tick " + i + " elevation rate");
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        var environment = new Environment.Reference();
        var parentKey = "ReferenceShip";
        var device = new Computer.AlignmentAutopilot("Main", environment, parentKey, Vector.ZERO, Quaternion.ZERO, 1);

        // Run / Verify.
        assert.equal(device.toString(), "AlignmentAutopilot Main consumePerTick=1");
    });
});
