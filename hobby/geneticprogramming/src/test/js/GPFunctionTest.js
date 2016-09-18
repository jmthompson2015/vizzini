define([ "GPFunction", "Terminal" ], function(GPFunction, Terminal)
{
    "use strict";
    QUnit.module("GPFunction");

    QUnit.test("GPFunction()", function(assert)
    {
        // Setup.
        var symbol = "#";
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new GPFunction.GPFunction(symbol, [ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.symbol(), symbol);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });
});
