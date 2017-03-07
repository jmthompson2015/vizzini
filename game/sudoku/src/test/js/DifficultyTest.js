define(["Difficulty"], function(Difficulty)
{
    "use strict";
    QUnit.module("Difficulty");

    QUnit.test("Difficulty properties Easy", function(assert)
    {
        var key = Difficulty.EASY;
        var properties = Difficulty.properties[key];
        assert.equal(properties.name, "Easy");
        assert.equal(properties.value, key);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Difficulty.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Difficulty);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Difficulty[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Difficulty.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Difficulty[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Difficulty.values();

        // Verify.
        assert.ok(result);
        var length = 6;
        assert.equal(result.length, length);
        assert.equal(result[0], "easy");
        assert.equal(result[length - 1], "impossible");

        var properties = Object.getOwnPropertyNames(Difficulty);
        var count = properties.length - 1 - // properties
            1; // values
        assert.equal(result.length, count);
    });
});
