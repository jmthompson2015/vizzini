define([ "Body", "Environment", "StateFactory", "ui/SceneUI" ], function(Body, Environment, StateFactory, SceneUI)
{
    "use strict";
    QUnit.module("SceneUI");

    QUnit.test("SceneUI()", function(assert)
    {
        // Setup.
        var bodyToState = {};
        var stateFactory = StateFactory.Reference;
        bodyToState[Body.SOL] = stateFactory.createSolState();
        bodyToState[Body.EARTH] = stateFactory.createEarthState();
        bodyToState[Body.LUNA] = stateFactory.createLunaState();
        var environment = new Environment.Environment(bodyToState);
        var callback = function(sceneUI)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(sceneUI);
            assert.ok(sceneUI.ambientLight());
            assert.ok(sceneUI.bodyToUI());
            assert.ok(sceneUI.pointLight());
            assert.ok(sceneUI.scene());
            done();
        };

        // Run.
        var done = assert.async();
        new SceneUI(environment, callback);
    });
});
