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
        assert.equal(result.n, 3);
        assert.ok(result.puzzle);
        assert.equal(result.puzzle.cells().size, 81);
        assert.equal(result.selectedIndex, undefined);
        assert.equal(result.selectedValue, undefined);
    });
});
