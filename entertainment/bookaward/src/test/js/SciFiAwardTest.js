define(["SciFiAward"], function(SciFiAward)
{
    "use strict";
    QUnit.module("SciFiAward");

    QUnit.test("SciFiAward properties Hugo", function(assert)
    {
        var statusKey = SciFiAward.HUGO;
        var status = SciFiAward.properties[statusKey];
        assert.equal(status.name, "Hugo");
        assert.equal(status.value, statusKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = SciFiAward.values();
        var ownPropertyNames = Object.getOwnPropertyNames(SciFiAward);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = SciFiAward[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(SciFiAward.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return SciFiAward[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = SciFiAward.values();

        // Verify.
        assert.ok(result);
        var length = 5;
        assert.equal(result.length, length);
        assert.equal(result[0], "britishFantasy");
        assert.equal(result[length - 1], "nebula");

        var properties = Object.getOwnPropertyNames(SciFiAward);
        var count = properties.length - 1 - // properties
            1 - // values
            1; // findByName
        assert.equal(result.length, count);
    });
});
