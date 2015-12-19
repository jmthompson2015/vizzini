define([ "ShipBase" ], function(ShipBase)
{
    QUnit.module("ShipBase");

    QUnit.test("ShipBase properties Large", function(assert)
    {
        var shipBase = ShipBase.LARGE;
        var properties = ShipBase.properties[shipBase];
        assert.equal(properties.width, 80);
        assert.equal(properties.height, 80);
    });

    QUnit.test("ShipBase properties Standard", function(assert)
    {
        var shipBase = ShipBase.STANDARD;
        var properties = ShipBase.properties[shipBase];
        assert.equal(properties.width, 40);
        assert.equal(properties.height, 40);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = ShipBase.values();
        var ownPropertyNames = Object.getOwnPropertyNames(ShipBase);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(ShipBase[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return ShipBase[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = ShipBase.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 4);
        assert.equal(result[0], "standard");
        assert.equal(result[3], "huge2");

        var properties = Object.getOwnPropertyNames(ShipBase);
        var count = properties.length - 1 // properties
        - 1; // values
        assert.equal(result.length, count);
    });
});
