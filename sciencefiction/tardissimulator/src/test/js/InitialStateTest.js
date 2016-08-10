define([ "InitialState" ], function(InitialState)
{
    "use strict";
    QUnit.module("InitialState");

    QUnit.test("InitialState()", function(assert)
    {
        // Run.
        var result = new InitialState();

        // Verify.
        assert.equal(result.consolePanelKey, "panel5");
        assert.ok(!result.isDematerialised);
        assert.ok(!result.isPowered);
        assert.ok(!result.isScanning);
        assert.equal(result.sceneKey, "scene1");
    });
});
