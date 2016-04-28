define([ "Trait" ], function(Trait)
{
    "use strict";
    QUnit.module("Trait");

    QUnit.test("Trait properties Archer", function(assert)
    {
        var cardKey = Trait.ARCHER;
        var properties = Trait.properties[cardKey];
        assert.equal(properties.name, "Archer");
        assert.equal(properties.value, "archer");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Trait.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Trait);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Trait[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Trait.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Trait[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Trait.values()", function(assert)
    {
        // Run.
        var result = Trait.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 55);
        assert.equal(result[0], Trait.ARCHER);
        assert.equal(result[54], Trait.WEAPON);
    });
});
