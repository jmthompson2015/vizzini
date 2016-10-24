define([ "Arithmetic", "CopyOperator", "Terminal" ], function(Arithmetic, CopyOperator, Terminal)
{
    "use strict";
    QUnit.module("CopyOperator");

    QUnit.test("copy()", function(assert)
    {
        // Setup.
        var genome = createTree0();
        LOGGER.debug("genome = " + genome);

        // Run.
        var result = CopyOperator.copy(genome);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.ok(result != genome);
        assert.ok(result !== genome);
    });

    function createTree0()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node5 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        return node1;
    }
});
