define([ "EnemyCard", "game/EnemyToken", "game/TargetState" ], function(EnemyCard, EnemyToken, TargetState)
{
    "use strict";
    QUnit.module("TargetState");

    QUnit.test("target()", function(assert)
    {
        // Setup.
        var target = new EnemyToken(EnemyCard.FOREST_SPIDER);
        var state = new TargetState();

        // Run.
        var result = state.target();

        // Verify.
        assert.ok(!result);

        // Run.
        var result = state.target(target);

        // Verify.
        assert.ok(result);
        assert.equal(result, target);

        // Run.
        var result = state.target(null);

        // Verify.
//        assert.ok(!result);
        assert.equal(result, null);
    });
});
