define([ "ShipAction" ], function(ShipAction)
{
    "use strict";
    QUnit.module("ShipAction");

    QUnit.test("ShipAction properties Barrel Roll", function(assert)
    {
        var shipAction = ShipAction.BARREL_ROLL;
        var properties = ShipAction.properties[shipAction];
        assert.equal(properties.name, "Barrel Roll");
    });

    QUnit.test("ShipAction properties Evade", function(assert)
    {
        var shipAction = ShipAction.EVADE;
        var properties = ShipAction.properties[shipAction];
        assert.equal(properties.name, "Evade");
    });

    QUnit.test("ShipAction properties Focus", function(assert)
    {
        var shipAction = ShipAction.FOCUS;
        var properties = ShipAction.properties[shipAction];
        assert.equal(properties.name, "Focus");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = ShipAction.values();
        var ownPropertyNames = Object.getOwnPropertyNames(ShipAction);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = ShipAction[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(ShipAction.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return ShipAction[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = ShipAction.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 12);
        var i = 0;
        assert.equal(result[i++], ShipAction.BARREL_ROLL);
        assert.equal(result[i++], ShipAction.BOOST);
        assert.equal(result[i++], ShipAction.CLOAK);
        assert.equal(result[i++], ShipAction.COORDINATE);
        assert.equal(result[i++], ShipAction.DECLOAK);
        assert.equal(result[i++], ShipAction.EVADE);
        assert.equal(result[i++], ShipAction.FOCUS);
        assert.equal(result[i++], ShipAction.JAM);
        assert.equal(result[i++], ShipAction.RECOVER);
        assert.equal(result[i++], ShipAction.REINFORCE);
        assert.equal(result[i++], ShipAction.SLAM);
        assert.equal(result[i++], ShipAction.TARGET_LOCK);

        var properties = Object.getOwnPropertyNames(ShipAction);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
