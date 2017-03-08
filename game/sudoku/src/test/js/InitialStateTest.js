define(["InitialState"], function(InitialState)
{
    "use strict";
    QUnit.module("InitialState");

    QUnit.test("InitialState()", function(assert)
    {
        // Run.
        var result = new InitialState();

        // Verify.
        assert.ok(!result.isConstantSelected);
        assert.ok(result.puzzle);
        assert.equal(result.puzzle.n(), 3);
        assert.equal(result.puzzle.N(), 9);
        assert.equal(result.puzzle.cells().length, 81);
        assert.equal(result.selectedIndex, undefined);
        assert.equal(result.selectedValue, undefined);
    });
});
