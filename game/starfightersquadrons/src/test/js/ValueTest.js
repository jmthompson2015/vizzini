define([ "Value" ], function(Value)
{
    "use strict";
    QUnit.module("Value");

    QUnit.test("Value properties Agility", function(assert)
    {
        var property = Value.AGILITY;
        var properties = Value.properties[property];
        assert.equal(properties.name, "Agility");
        assert.equal(properties.value, "agility");
    });

    QUnit.test("Value properties Energy", function(assert)
    {
        var property = Value.ENERGY;
        var properties = Value.properties[property];
        assert.equal(properties.name, "Energy");
        assert.equal(properties.value, "energy");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Value.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Value);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Value[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Value.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Value[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Value.values()", function(assert)
    {
        // Run.
        var result = Value.values();

        // Verify.
        assert.ok(result);
        var length = 6;
        assert.equal(result.length, length);
        assert.equal(result[0], Value.AGILITY);
        assert.equal(result[length - 1], Value.SHIELD);
    });
});
