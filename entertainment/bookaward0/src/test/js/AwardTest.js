define(["Award"], function(Award)
{
    "use strict";
    QUnit.module("Award");

    QUnit.test("Award properties Agatha", function(assert)
    {
        var statusKey = Award.AGATHA;
        var status = Award.properties[statusKey];
        assert.equal(status.name, "Agatha");
        assert.equal(status.value, statusKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Award.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Award);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Award[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Award.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Award[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Award.values();

        // Verify.
        assert.ok(result);
        var length = 4;
        assert.equal(result.length, length);
        assert.equal(result[0], "agatha");
        assert.equal(result[length - 1], "shamus");

        var properties = Object.getOwnPropertyNames(Award);
        var count = properties.length - 1 - // properties
            1 - // values
            1; // findByName
        assert.equal(result.length, count);
    });
});
