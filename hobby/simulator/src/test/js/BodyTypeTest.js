define([ "BodyType" ], function(BodyType)
{
    "use strict";
    QUnit.module("BodyType");

    QUnit.test("BodyType properties Star", function(assert)
    {
        var bodyTypeKey = BodyType.STAR;
        var bodyType = BodyType.properties[bodyTypeKey];
        assert.equal(bodyType.name, "Star");
    });

    QUnit.test("BodyType properties Planet", function(assert)
    {
        var bodyTypeKey = BodyType.PLANET;
        var bodyType = BodyType.properties[bodyTypeKey];
        assert.equal(bodyType.name, "Planet");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Run.
        var result = BodyType.values();
        var ownPropertyNames = Object.getOwnPropertyNames(BodyType);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(BodyType[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return BodyType[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = BodyType.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 4);
        assert.equal(result[0], "star");
        assert.equal(result[1], "planet");
        assert.equal(result[2], "dwarfPlanet");
        assert.equal(result[3], "moon");

        var properties = Object.getOwnPropertyNames(BodyType);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
