define([ "Count" ], function(Count)
{
    "use strict";
    QUnit.module("Count");

    QUnit.test("Count properties Cloak", function(assert)
    {
        var phase = Count.CLOAK;
        var properties = Count.properties[phase];
        assert.equal(properties.name, "Cloak");
        assert.equal(properties.value, "cloak");
    });

    QUnit.test("Count properties Activation (execute maneuver)", function(assert)
    {
        var phase = Count.ENERGY;
        var properties = Count.properties[phase];
        assert.equal(properties.name, "Energy");
        assert.equal(properties.value, "energy");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Count.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Count);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Count[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Count.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Count[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Count.values()", function(assert)
    {
        // Run.
        var result = Count.values();

        // Verify.
        assert.ok(result);
        var length = 9;
        assert.equal(result.length, length);
        assert.equal(result[0], Count.CLOAK);
        assert.equal(result[length - 1], Count.WEAPONS_DISABLED);
    });
});
