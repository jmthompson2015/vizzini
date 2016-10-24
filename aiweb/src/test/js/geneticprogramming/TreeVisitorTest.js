define([ "Arithmetic", "GenomeFactory", "Terminal", "TreeVisitor" ], function(Arithmetic, GenomeFactory, Terminal,
        TreeVisitor)
{
    "use strict";
    QUnit.module("TreeVisitor");

    var functions = [];
    functions.push(Arithmetic.Add);
    functions.push(Arithmetic.Divide);
    functions.push(Arithmetic.Multiply);
    functions.push(Arithmetic.Subtract);
    var terminals = [];
    terminals.push(new Terminal.Constant(1));
    terminals.push(new Terminal.Variable("x"));
    var maxDepth = 3;

    QUnit.test("visit()", function(assert)
    {
        // Setup.
        var treeGenerator = new GenomeFactory.Full(functions, terminals, maxDepth);
        var root = treeGenerator.generate();

        // Run.
        var visitor = new TreeVisitor(root);

        // Verify.
        assert.equal(visitor.nodeCount(), 15);
        assert.ok(visitor.description());
    });
});
