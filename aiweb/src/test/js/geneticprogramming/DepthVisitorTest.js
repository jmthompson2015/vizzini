define([ "Arithmetic", "DepthVisitor", "Logic", "Terminal" ], function(Arithmetic, DepthVisitor, Logic, Terminal)
{
    "use strict";
    QUnit.module("DepthVisitor");

    QUnit.test("visit() 1", function(assert)
    {
        // Setup.
        var root = createTree1();

        // Run.
        var visitor = new DepthVisitor(root);

        // Verify.
        assert.equal(visitor.depth(), 4);
    });

    QUnit.test("visit() 2", function(assert)
    {
        // Setup.
        var root = createTree2();

        // Run.
        var visitor = new DepthVisitor(root);

        // Verify.
        assert.equal(visitor.depth(), 2);
    });

    QUnit.test("visit() 3", function(assert)
    {
        // Setup.
        var root = createTree3();

        // Run.
        var visitor = new DepthVisitor(root);

        // Verify.
        assert.equal(visitor.depth(), 2);
    });

    QUnit.test("visit() 4", function(assert)
    {
        // Setup.
        var root = createTree4();

        // Run.
        var visitor = new DepthVisitor(root);

        // Verify.
        assert.equal(visitor.depth(), 3);
    });

    QUnit.test("visit() 5", function(assert)
    {
        // Setup.
        var root = createTree5();

        // Run.
        var visitor = new DepthVisitor(root);

        // Verify.
        assert.equal(visitor.depth(), 2);
    });

    /*
     * @see Genetic Programming I p. 101
     */
    function createTree0()
    {
        var node3 = new Terminal.Variable("D1");
        var node5 = new Terminal.Variable("D0");
        var node6 = new Terminal.Variable("D1");
        var node2 = new Logic.Not([ node3 ]);
        var node4 = new Logic.And([ node5, node6 ]);
        var node1 = new Logic.Or([ node2, node4 ]);

        return node1;
    }

    /*
     * @see Genetic Programming I p. 101
     */
    function createTree1()
    {
        var node3 = new Terminal.Variable("D1");
        var node5 = new Terminal.Variable("D0");
        var node8 = new Terminal.Variable("D0");
        var node10 = new Terminal.Variable("D1");
        var node4 = new Logic.Not([ node5 ]);
        var node7 = new Logic.Not([ node8 ]);
        var node9 = new Logic.Not([ node10 ]);
        var node2 = new Logic.Or([ node3, node4 ]);
        var node6 = new Logic.And([ node7, node9 ]);
        var node1 = new Logic.Or([ node2, node6 ]);

        return node1;
    }

    function createTree2()
    {
        var node2 = new Terminal.Constant(1);
        var node3 = new Terminal.Constant(2);
        var node1 = new Arithmetic.Add([ node2, node3 ]);

        return node1;
    }

    function createTree3()
    {
        var node2 = new Terminal.Constant(3);
        var node3 = new Terminal.Constant(4);
        var node1 = new Arithmetic.Add([ node2, node3 ]);

        return node1;
    }

    function createTree4()
    {
        var node3 = new Terminal.Constant(1);
        var node4 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);

        var node6 = new Terminal.Constant(3);
        var node7 = new Terminal.Constant(4);
        var node5 = new Arithmetic.Add([ node6, node7 ]);

        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }

    function createTree5()
    {
        var node2 = new Terminal.Constant(5);
        var node3 = new Terminal.Constant(6);
        var node1 = new Arithmetic.Add([ node2, node3 ]);

        return node1;
    }
});
