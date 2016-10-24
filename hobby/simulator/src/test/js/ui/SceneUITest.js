define([ "Body", "Environment", "StateFactory", "ui/SceneUI" ], function(Body, Environment, StateFactory, SceneUI)
{
    "use strict";
    QUnit.module("SceneUI");

    QUnit.test("SceneUI()", function(assert)
    {
        // Setup.
        var bodyToState0 = StateFactory.Reference.createStates();
        var bodyToState = {};
        bodyToState[Body.SOL] = bodyToState0[Body.SOL];
        bodyToState[Body.EARTH] = bodyToState0[Body.EARTH];
        bodyToState[Body.LUNA] = bodyToState0[Body.LUNA];
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
