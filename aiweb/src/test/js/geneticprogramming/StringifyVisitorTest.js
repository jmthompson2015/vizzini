define([ "Arithmetic", "StringifyVisitor", "Terminal" ], function(Arithmetic, StringifyVisitor, Terminal)
{
    "use strict";
    QUnit.module("StringifyVisitor");

    QUnit.test("visit()", function(assert)
    {
        // Setup.
        var root = createTree();

        // Run.
        var visitor = new StringifyVisitor(root);

        // Verify.
        assert.ok(visitor.string());
        assert.equal(visitor.string(), "(- (+ x 1) 2)");
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
