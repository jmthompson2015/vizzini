define([ "Phase" ], function(Phase)
{
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

    QUnit.test("Phase.values()", function(assert)
    {
        assert.ok(Phase.values);
        assert.equal(Phase.values.length, 17);
        assert.equal(Phase.values[0], Phase.PLANNING_START);
        assert.equal(Phase.values[16], Phase.END_END);
    });
});
