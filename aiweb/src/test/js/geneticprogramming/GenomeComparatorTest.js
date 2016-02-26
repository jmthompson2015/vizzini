define([ "Arithmetic", "CountVisitor", "GenomeComparator", "Terminal" ], function(Arithmetic, CountVisitor,
        GenomeComparator, Terminal)
{
    "use strict";
    QUnit.module("GenomeComparator");

    QUnit.test("compare()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        genome0.fitness = 12.3;
        var genome1 = createTree1();
        genome1.fitness = 45.6;
        var genome2 = createTree2();
        genome2.fitness = 12.3;
        var comparator = GenomeComparator;
        var population = [];
        population.push(genome0);
        population.push(genome1);
        population.push(genome2);

        // Run / Verify.
        assert.equal(comparator(genome0, genome0), 0);
        assert.ok(comparator(genome0, genome1) > 0);
        assert.equal(comparator(genome0, genome1), 33.3);
        assert.equal(comparator(genome0, genome2), 2);
    });

    QUnit.test("sort()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        genome0.fitness = 12.3;
        var genome1 = createTree1();
        genome1.fitness = 45.6;
        var genome2 = createTree2();
        genome2.fitness = 12.3;
        var population = [];
        population.push(genome0);
        population.push(genome1);
        population.push(genome2);

        // Run.
        population.sort(GenomeComparator);

        // Verify.
        var i = 0;
        assert.equal(population[i].fitness, 45.6);
        assert.equal((new CountVisitor(population[i++])).nodeCount(), 5);
        assert.equal(population[i].fitness, 12.3);
        assert.equal((new CountVisitor(population[i++])).nodeCount(), 5);
        assert.equal(population[i].fitness, 12.3);
        assert.equal((new CountVisitor(population[i++])).nodeCount(), 7);
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
