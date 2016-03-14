define([ "Phase" ], function(Phase)
{
    "use strict";
    QUnit.module("Phase");

    QUnit.test("Phase properties Planning (start)", function(assert)
    {
        var phase = Phase.PLANNING_START;
        var properties = Phase.properties[phase];
        assert.equal(properties.displayName, "Planning (start)");
        assert.equal(properties.value, "planningStart");
    });

    QUnit.test("Phase properties Activation (execute maneuver)", function(assert)
    {
        var phase = Phase.ACTIVATION_EXECUTE_MANEUVER;
        var properties = Phase.properties[phase];
        assert.equal(properties.displayName, "Activation (execute maneuver)");
        assert.equal(properties.value, "activationExecuteManeuver");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Phase.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Phase);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Phase[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Phase.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Phase[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Phase.values()", function(assert)
    {
        // Run.
        var result = Phase.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 19);
        assert.equal(result[0], Phase.PLANNING_START);
        assert.equal(result[18], Phase.END_END);
    });
});
