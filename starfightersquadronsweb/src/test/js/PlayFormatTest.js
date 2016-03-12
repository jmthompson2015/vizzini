define([ "PlayFormat" ], function(PlayFormat)
{
    "use strict";
    QUnit.module("PlayFormat");

    QUnit.test("PlayFormat properties Standard", function(assert)
    {
        var type = PlayFormat.STANDARD;
        var properties = PlayFormat.properties[type];
        assert.equal(properties.name, "Standard");
        assert.equal(properties.value, "standard");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = PlayFormat.values();
        var ownPropertyNames = Object.getOwnPropertyNames(PlayFormat);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(PlayFormat[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return PlayFormat[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("PlayFormat.isPointInPlayArea()", function(assert)
    {
        assert.ok(PlayFormat.isPointInPlayArea(PlayFormat.STANDARD, 3, 4));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.STANDARD, -1, 4));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.STANDARD, 3, -1));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.STANDARD, 915, 4));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.STANDARD, 3, 915));
        
        assert.ok(PlayFormat.isPointInPlayArea(PlayFormat.EPIC, 3, 4));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.EPIC, -1, 4));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.EPIC, 3, -1));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.EPIC, 1830, 4));
        assert.ok(!PlayFormat.isPointInPlayArea(PlayFormat.EPIC, 3, 915));
    });

    QUnit.test("PlayFormat.values()", function(assert)
    {
        var result = PlayFormat.values();
        assert.ok(result);
        assert.equal(result.length, 3);
        var i = 0;
        assert.equal(result[i++], PlayFormat.STANDARD);
        assert.equal(result[i++], PlayFormat.CINEMATIC);
        assert.equal(result[i++], PlayFormat.EPIC);
    });
});
