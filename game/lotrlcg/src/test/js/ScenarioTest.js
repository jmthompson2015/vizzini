define([ "Scenario" ], function(Scenario)
{
    "use strict";
    QUnit.module("Scenario");

    QUnit.test("Scenario properties A Chosen Path: Beorn's Path", function(assert)
    {
        var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
        var properties = Scenario.properties[scenarioKey];
        assert.equal(properties.name, "Passage Through Mirkwood");
        assert.equal(properties.value, "passageThroughMirkwood");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Scenario.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Scenario);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Scenario[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Scenario.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Scenario[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Scenario.values()", function(assert)
    {
        // Run.
        var result = Scenario.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        var i = 0;
        assert.equal(result[i++], Scenario.PASSAGE_THROUGH_MIRKWOOD);
        assert.equal(result[i++], Scenario.THE_HUNT_FOR_GOLLUM);
    });
});
