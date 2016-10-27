define(["ShipState"], function(ShipState)
{
    "use strict";
    QUnit.module("ShipState");

    QUnit.test("ShipState properties Pilot Skill", function(assert)
    {
        var shipStateKey = ShipState.PILOT_SKILL;
        var properties = ShipState.properties[shipStateKey];
        assert.equal(properties.name, "Pilot Skill");
        assert.equal(properties.value, shipStateKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Run.
        var result = ShipState.values();
        var ownPropertyNames = Object.getOwnPropertyNames(ShipState);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = ShipState[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(ShipState.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return ShipState[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = ShipState.values();

        // Verify.
        assert.ok(result);
        var length = 7;
        assert.equal(result.length, length);
        assert.equal(result[0], "pilotSkill");
        assert.equal(result[length - 1], "shield");

        var properties = Object.getOwnPropertyNames(ShipState);
        var count = properties.length - 1 - // properties
            1; // values
        assert.equal(result.length, count);
    });
});
