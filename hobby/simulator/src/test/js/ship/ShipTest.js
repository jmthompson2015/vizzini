define([ "Environment", "Quaternion", "StateFactory", "Vector", "ship/Ship" ], function(Environment, Quaternion,
        StateFactory, Vector, Ship)
{
    "use strict";
    QUnit.module("Ship");

    QUnit.test("ObserverSatellite()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);

        // Run.
        var result = new Ship.ObserverSatellite("ObserverSatellite", environment);

        // Verify.
        assert.ok(result);
        assert.ok(result.devices());
        assert.equal(result.devices().length, 2);
    });

    QUnit.test("ObserverSatellite.tick()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);

        // Run.
        var ship = new Ship.ObserverSatellite("ObserverSatellite", environment);
        environment.addShip(ship, Vector.ZERO, Quaternion.ZERO);

        // Run.
        ship.tick();

        // Verify.
        assert.equal(ship.devices()[0].level(), 1, "power");
        assert.ok(ship.devices()[1].produce(), "sensor");
    });

    QUnit.test("ReferenceShip()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);

        // Run.
        var result = new Ship.ReferenceShip("ReferenceShip", environment);

        // Verify.
        assert.ok(result);
        assert.ok(result.devices());
        assert.equal(result.devices().length, 24);
        var power = result.device("FusionReactor");
        assert.ok(power);
        var conduit1 = power.consumeConduits()[0];
        assert.ok(conduit1);
        assert.equal(conduit1.name(), "1");
    });

    QUnit.test("ReferenceShip.tick()", function(assert)
    {
        // Setup.
        var bodyToState = StateFactory.Reference.createStates();
        var environment = new Environment.Environment(bodyToState);

        // Run.
        var ship = new Ship.ReferenceShip("ReferenceShip", environment);
        environment.addShip(ship, Vector.ZERO, Quaternion.ZERO);

        // Run.
        ship.tick();

        // Verify.
        var i = 0;
        assert.equal(ship.devices()[i++].level(), 99999994, "storage");
        assert.equal(ship.devices()[i++].level(), 194, "power");
        assert.ok(ship.devices()[i++].targetVector(), "fakeComputer");
        assert.ok(ship.devices()[i++].targetVector(), "computer");
        assert.ok(ship.devices()[i++].produce(), "sensor");
        assert.ok(ship.devices()[i++].produce(), "sensor");
        assert.ok(ship.devices()[i++].produce(), "sensor");
        assert.ok(ship.devices()[i++].produce(), "sensor");
        assert.ok(ship.devices()[i++].produce(), "sensor");
        assert.ok(ship.devices()[i++].produce(), "sensor");
    });
});
