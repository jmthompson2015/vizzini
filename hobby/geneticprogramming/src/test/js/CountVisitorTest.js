define([ "Arithmetic", "CountVisitor", "Terminal" ], function(Arithmetic, CountVisitor, Terminal)
{
    "use strict";
    QUnit.module("CountVisitor");

    QUnit.test("visit()", function(assert)
    {
        // Setup.
        var root = createTree();

        // Run.
        var visitor = new CountVisitor(root);

        // Verify.
        assert.equal(visitor.count(), 5);
    });

    function createTree()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node5 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        return node1;
    }
});
