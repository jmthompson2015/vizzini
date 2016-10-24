define([ "Scene" ], function(Scene)
{
    "use strict";
    QUnit.module("Scene");

    QUnit.test("Scene properties Fabrication", function(assert)
    {
        var panelKey = Scene.SCENE_1;
        var panel = Scene.properties[panelKey];
        assert.equal(panel.name, "Gizah Pyramids");
        assert.equal(panel.image, "../resources/scenes/All_Gizah_Pyramids.jpg");
        assert.equal(panel.value, panelKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Scene.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Scene);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Scene[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Scene.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Scene[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Scene.values();

        // Verify.
        assert.ok(result);
        var length = 3;
        assert.equal(result.length, length);
        assert.equal(result[0], "scene1");
        assert.equal(result[length - 1], "scene3");

        var properties = Object.getOwnPropertyNames(Scene);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
