define([ "Maneuver", "ShipAction" ], function(Maneuver, ShipAction)
{
    QUnit.module("ShipAction");

    QUnit.test("ShipAction properties Barrel Roll (left)", function(assert)
    {
        var shipAction = ShipAction.BARREL_ROLL_LEFT;
        var properties = ShipAction.properties[shipAction];
        assert.equal(properties.displayName, "Barrel Roll (left)");
        assert.equal(properties.maneuver, Maneuver.BARREL_ROLL_LEFT_1_STANDARD);
    });

    QUnit.test("ShipAction properties Evade", function(assert)
    {
        var shipAction = ShipAction.EVADE;
        var properties = ShipAction.properties[shipAction];
        assert.equal(properties.displayName, "Evade");
    });

    QUnit.test("ShipAction properties Focus", function(assert)
    {
        var shipAction = ShipAction.FOCUS;
        var properties = ShipAction.properties[shipAction];
        assert.equal(properties.displayName, "Focus");
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
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(ShipAction[key], "Missing value for key = " + key);
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
        assert.equal(result.length, 9);
        assert.equal(result[0], "barrelRollLeft");
        assert.equal(result[8], "targetLock");

        var properties = Object.getOwnPropertyNames(ShipAction);
        var count = properties.length - 1 // properties
        - 1; // values
        assert.equal(result.length, count);
    });
});
