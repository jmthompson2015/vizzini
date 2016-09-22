define([ "../../../../example/main/js/artificialant/Content" ], function(Content)
{
    "use strict";
    QUnit.module("Content");

    QUnit.test("Content properties Empty", function(assert)
    {
        var contentKey = Content.EMPTY;
        var content = Content.properties[contentKey];
        assert.equal(content.name, "Empty");
        assert.equal(content.value, contentKey);
    });

    QUnit.test("Content properties Food", function(assert)
    {
        var contentKey = Content.FOOD;
        var content = Content.properties[contentKey];
        assert.equal(content.name, "Food");
        assert.equal(content.value, contentKey);
    });

    QUnit.test("Content properties Footprint", function(assert)
    {
        var contentKey = Content.FOOTPRINT;
        var content = Content.properties[contentKey];
        assert.equal(content.name, "Footprint");
        assert.equal(content.value, contentKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Content.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Content);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Content[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Content.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Content[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Content.values();

        // Verify.
        assert.ok(result);
        var length = 3;
        assert.equal(result.length, length);
        assert.equal(result[0], "empty");
        assert.equal(result[length - 1], "footprint");

        var properties = Object.getOwnPropertyNames(Content);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
