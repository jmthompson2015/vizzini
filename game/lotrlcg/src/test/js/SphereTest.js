define([ "Sphere" ], function(Sphere)
{
    "use strict";
    QUnit.module("Sphere");

    QUnit.test("Sphere properties Leadership", function(assert)
    {
        var cardKey = Sphere.LEADERSHIP;
        var properties = Sphere.properties[cardKey];
        assert.equal(properties.name, "Leadership");
        assert.equal(properties.value, "leadership");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Sphere.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Sphere);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Sphere[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Sphere.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Sphere[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Sphere.values()", function(assert)
    {
        // Run.
        var result = Sphere.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 7);
        var i = 0;
        assert.equal(result[i++], Sphere.BAGGINS);
        assert.equal(result[i++], Sphere.FELLOWSHIP);
        assert.equal(result[i++], Sphere.LEADERSHIP);
        assert.equal(result[i++], Sphere.LORE);
        assert.equal(result[i++], Sphere.NEUTRAL);
        assert.equal(result[i++], Sphere.SPIRIT);
        assert.equal(result[i++], Sphere.TACTICS);
    });
});
