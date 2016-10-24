define([ "Arithmetic", "FragmentVisitor", "Terminal" ], function(Arithmetic, FragmentVisitor, Terminal)
{
    "use strict";
    QUnit.module("FragmentVisitor");

    QUnit.test("visit() 1", function(assert)
    {
        // Setup.
        var root = createTree();
        var index = 1;

        // Run.
        var visitor = new FragmentVisitor(root, index);

        // Verify.
        assert.ok(visitor.fragment());
        assert.equal(visitor.fragment().symbol(), "+");
        assert.equal(visitor.fragment().childAt(0).variableName(), "x");
        assert.equal(visitor.fragment().childAt(1).value(), 1);

        assert.ok(visitor.parent());
        assert.equal(visitor.parent().symbol(), "-");
    });

    QUnit.test("visit() 2", function(assert)
    {
        // Setup.
        var root = createTree();
        var index = 2;

        // Run.
        var visitor = new FragmentVisitor(root, index);

        // Verify.
        assert.ok(visitor.fragment());
        assert.equal(visitor.fragment().variableName(), "x");

        assert.ok(visitor.parent());
        assert.equal(visitor.parent().symbol(), "+");
    });

    QUnit.test("visit() 3", function(assert)
    {
        // Setup.
        var root = createTree();
        var index = 3;

        // Run.
        var visitor = new FragmentVisitor(root, index);

        // Verify.
        assert.ok(visitor.fragment());
        assert.equal(visitor.fragment().value(), 1);

        assert.ok(visitor.parent());
        assert.equal(visitor.parent().symbol(), "+");
    });

    QUnit.test("visit() 4", function(assert)
    {
        // Setup.
        var root = createTree();
        var index = 4;

        // Run.
        var visitor = new FragmentVisitor(root, index);

        // Verify.
        assert.ok(visitor.fragment());
        assert.equal(visitor.fragment().value(), 2);

        assert.ok(visitor.parent());
        assert.equal(visitor.parent().symbol(), "-");
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
