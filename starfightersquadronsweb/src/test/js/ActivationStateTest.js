define([ "ActivationState", "EnvironmentFactory", "Maneuver", "ManeuverAction" ], function(ActivationState,
        EnvironmentFactory, Maneuver, ManeuverAction)
{
    "use strict";
    QUnit.module("ActivationState");

    QUnit.test("ActivationState()", function(assert)
    {
        // Setup.
        var activationState = new ActivationState();

        // Run / Verify.
        assert.ok(activationState);
        assert.ok(!activationState.isTouching());
        assert.equal(activationState.maneuverAction(), undefined);
    });

    QUnit.test("isTouching()", function(assert)
    {
        // Setup.
        var activationState = new ActivationState();

        // Run.
        assert.ok(!activationState.isTouching());
        var result = activationState.isTouching(true);

        // Verify.
        assert.ok(result);
    });

    QUnit.test("maneuverAction()", function(assert)
    {
        // Setup.
        var activationState = new ActivationState();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var token = environment.tokens()[0];
        var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
        var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

        // Run.
        assert.equal(activationState.maneuverAction(), undefined);
        var result = activationState.maneuverAction(maneuverAction);

        // Verify.
        assert.equal(activationState.maneuverAction(), maneuverAction);
    });
});
