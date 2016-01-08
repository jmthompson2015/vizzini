define([ "FiringArc", "Ship", "ShipBase" ], function(FiringArc, Ship, ShipBase)
{
    "use strict";
    QUnit.module("Ship");

    QUnit.test("Ship properties Firespray-31", function(assert)
    {
        var ship = Ship.FIRESPRAY_31;
        var properties = Ship.properties[ship];
        assert.equal(properties.name, "Firespray-31");
        assert.equal(properties.description, "A Firespray-31.");
        assert.equal(properties.value, ship);
        assert.equal(properties.primaryFiringArc, FiringArc.FORWARD_AND_AFT);
        assert.equal(properties.shipBase, ShipBase.LARGE);
        assert.ok(properties.maneuvers);
        assert.equal(properties.maneuvers.length, 16);
        assert.ok(properties.shipActions);
        assert.equal(properties.shipActions.length, 3);
    });

    QUnit.test("Ship properties TIE Fighter", function(assert)
    {
        var ship = Ship.TIE_FIGHTER;
        var properties = Ship.properties[ship];
        assert.equal(properties.name, "TIE Fighter");
        assert.equal(properties.description, "A TIE fighter.");
        assert.equal(properties.value, ship);
        assert.equal(properties.primaryFiringArc, FiringArc.FORWARD);
        assert.equal(properties.shipBase, ShipBase.SMALL);
        assert.ok(properties.maneuvers);
        assert.equal(properties.maneuvers.length, 16);
        assert.ok(properties.shipActions);
        assert.equal(properties.shipActions.length, 4);
    });

    QUnit.test("Ship properties X-Wing", function(assert)
    {
        var ship = Ship.X_WING;
        var properties = Ship.properties[ship];
        assert.equal(properties.name, "X-Wing");
        assert.equal(properties.description, "An X-Wing.");
        assert.equal(properties.value, ship);
        assert.equal(properties.primaryFiringArc, FiringArc.FORWARD);
        assert.equal(properties.shipBase, ShipBase.SMALL);
        assert.ok(properties.maneuvers);
        assert.equal(properties.maneuvers.length, 15);
        assert.ok(properties.shipActions);
        assert.equal(properties.shipActions.length, 2);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Ship.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Ship);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(Ship[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Ship[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Ship.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 27);
        assert.equal(result[0], "aWing");
        assert.equal(result[26], "z95Headhunter");

        var properties = Object.getOwnPropertyNames(Ship);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
