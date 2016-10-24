define([ "ship/SupplyType" ], function(SupplyType)
{
    "use strict";
    QUnit.module("SupplyType");

    QUnit.test("SupplyType properties Fuel", function(assert)
    {
        var supplyTypeKey = SupplyType.FUEL;
        var supplyType = SupplyType.properties[supplyTypeKey];
        assert.equal(supplyType.name, "Fuel");
    });

    QUnit.test("SupplyType properties power", function(assert)
    {
        var supplyTypeKey = SupplyType.POWER;
        var supplyType = SupplyType.properties[supplyTypeKey];
        assert.equal(supplyType.name, "Power");
    });

    QUnit.test("SupplyType properties Data", function(assert)
    {
        var supplyTypeKey = SupplyType.DATA;
        var supplyType = SupplyType.properties[supplyTypeKey];
        assert.equal(supplyType.name, "Data");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = SupplyType.values();
        var ownPropertyNames = Object.getOwnPropertyNames(SupplyType);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(SupplyType[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return SupplyType[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = SupplyType.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 3);
        assert.equal(result[0], "data");
        assert.equal(result[1], "fuel");
        assert.equal(result[2], "power");

        var properties = Object.getOwnPropertyNames(SupplyType);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
