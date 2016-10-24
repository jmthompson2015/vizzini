define([ "ConsolePanel" ], function(ConsolePanel)
{
    "use strict";
    QUnit.module("ConsolePanel");

    QUnit.test("ConsolePanel properties Fabrication", function(assert)
    {
        var panelKey = ConsolePanel.PANEL_1;
        var panel = ConsolePanel.properties[panelKey];
        assert.equal(panel.name, "Fabrication & Information Systems");
        assert.equal(panel.image, "../resources/images/panel1.jpg");
        assert.equal(panel.value, panelKey);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = ConsolePanel.values();
        var ownPropertyNames = Object.getOwnPropertyNames(ConsolePanel);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = ConsolePanel[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(ConsolePanel.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return ConsolePanel[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = ConsolePanel.values();

        // Verify.
        assert.ok(result);
        var length = 6;
        assert.equal(result.length, length);
        assert.equal(result[0], "panel1");
        assert.equal(result[length - 1], "panel6");

        var properties = Object.getOwnPropertyNames(ConsolePanel);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
