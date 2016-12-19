define(["ActivationState", "Maneuver", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/EnvironmentFactory", "process/ManeuverAction"],
    function(ActivationState, Maneuver, Action, ActivationAction, Adjudicator, EnvironmentFactory, ManeuverAction)
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
            assert.equal(activationState.activationAction(), undefined);
            assert.equal(activationState.maneuverAction(), undefined);
        });

        QUnit.test("activationAction()", function(assert)
        {
            // Setup.
            var activationState = new ActivationState();
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var adjudicator = new Adjudicator();
            var token = environment.tokens()[0];
            var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
            var callback = function() {};
            var activationAction = new ActivationAction(store, token, callback);
            var maneuver = Maneuver.properties[maneuverKey];
            store.dispatch(Action.setTokenManeuver(token, maneuver));

            // Run.
            assert.equal(activationState.activationAction(), undefined);
            var result = activationState.activationAction(activationAction);

            // Verify.
            assert.equal(activationState.activationAction(), activationAction);
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
