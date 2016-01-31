define([ "Body", "BodyType", "Vector" ], function(Body, BodyType, Vector)
{
    "use strict";
    QUnit.module("Body");

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Body.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Body);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(Body[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Body[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("northPole Earth", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.EARTH];

        // Run.
        var result = body.northPole;

        // Verify.
        assert.ok(!result);
    });

    QUnit.test("northPole Venus", function(assert)
    {
        // Setup.
        var body = Body.properties[Body.VENUS];

        // Run.
        var result = body.northPole;

        // Verify.
        assert.equal(Math.vizziniRound(result.magnitude(), 4), 1.0);
        verifyVector(assert, result, -0.0187, 0.3877, -0.9216);
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Body.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 35);
        assert.equal(result.length, (1 + 8 + 5 + (19 + 2)));
        assert.equal(result[0], "sol");
        assert.equal(result[34], "charon");

        var properties = Object.getOwnPropertyNames(Body);
        var count = properties.length - 1 - // properties
        1 - // values
        1; // valuesByType
        assert.equal(result.length, count);
    });

    QUnit.test("valuesByType()", function(assert)
    {
        assert.equal(Body.valuesByType(BodyType.STAR).length, 1);
        assert.equal(Body.valuesByType(BodyType.PLANET).length, 8);
        assert.equal(Body.valuesByType(BodyType.DWARF_PLANET).length, 5);
        assert.equal(Body.valuesByType(BodyType.MOON).length, 19 + 2);
    });
});
