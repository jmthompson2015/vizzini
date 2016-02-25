define([ "Arithmetic", "GenomeComparator", "Terminal" ], function(Arithmetic, GenomeComparator, Terminal)
{
    "use strict";
    QUnit.module("GenomeComparator");

    QUnit.test("create()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        genome0.fitness = 12.3;
        var genome1 = createTree1();
        genome1.fitness = 45.6;
        var genome2 = createTree2();
        genome2.fitness = 12.3;
        var comparator = GenomeComparator;

        // Run / Verify.
        assert.equal(comparator(genome0, genome0), 0);
        assert.ok(comparator(genome0, genome1) > 0);
        assert.equal(comparator(genome0, genome2), 2);
    });

    function createTree0()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node6 = new Terminal.Constant(3);
        var node7 = new Terminal.Constant(4);
        var node5 = new Arithmetic.Add([ node6, node7 ]);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        return node1;
    }

    function createTree1()
    {
        var node3 = new Terminal.Constant(2);
        var node4 = new Terminal.Variable("y");
        var node5 = new Terminal.Constant(3);
        var node2 = new Arithmetic.Subtract([ node3, node4 ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }

    function createTree2()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node5 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        return node1;
    }
});
