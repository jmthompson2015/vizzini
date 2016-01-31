define([ "Environment", "Quaternion", "Vector", "ship/Ship" ], function(Environment, Quaternion, Vector, Ship)
{
    "use strict";
    QUnit.module("Ship");

    QUnit.test("ReferenceShip()", function(assert)
    {
        // Setup.
        var bodyToState = {};
        var environment = new Environment(bodyToState);

        // Run.
        var result = new Ship.ReferenceShip("ReferenceShip", environment);

        // Verify.
        assert.ok(result);
        assert.ok(result.devices());
        assert.equal(result.devices().length, 8);
    });

    QUnit.test("ReferenceShip.tick()", function(assert)
    {
        // Setup.
        var bodyToState = {};
        var environment = new Environment(bodyToState);

        // Run.
        var ship = new Ship.ReferenceShip("ReferenceShip", environment);
        environment.addShip(ship, Vector.ZERO, Quaternion.ZERO);

        // Run.
        ship.tick();

        // Verify.
        assert.equal(ship.devices()[0].level(), 9994, "storage");
        assert.equal(ship.devices()[1].level(), 194, "power");
        assert.ok(ship.devices()[2].produce(), "sensor");
        assert.ok(ship.devices()[3].produce(), "sensor");
        assert.ok(ship.devices()[4].produce(), "sensor");
        assert.ok(ship.devices()[5].produce(), "sensor");
        assert.ok(ship.devices()[6].produce(), "sensor");
        assert.ok(ship.devices()[7].produce(), "sensor");
    });
});
