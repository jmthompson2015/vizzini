define([ "DematStatus" ], function(DematStatus)
{
    "use strict";
    QUnit.module("DematStatus");

    QUnit.test("DematStatus properties Materialised", function(assert)
    {
        var statusKey = DematStatus.MATERIALISED;
        var status = DematStatus.properties[statusKey];
        assert.equal(status.name, "Materialised");
        assert.equal(status.value, statusKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = DematStatus.values();
        var ownPropertyNames = Object.getOwnPropertyNames(DematStatus);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = DematStatus[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(DematStatus.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return DematStatus[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = DematStatus.values();

        // Verify.
        assert.ok(result);
        var length = 4;
        assert.equal(result.length, length);
        assert.equal(result[0], "materialised");
        assert.equal(result[length - 1], "materialising");

        var properties = Object.getOwnPropertyNames(DematStatus);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
