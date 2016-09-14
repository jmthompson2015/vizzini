define([ "Arithmetic", "PopulationUtilities", "Terminal" ], function(Arithmetic, PopulationUtilities, Terminal)
{
    "use strict";
    QUnit.module("PopulationUtilities");

    QUnit.test("averageFitness()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var population = [];

        // Run / Verify.
        population.push(genome0);
        assert.equal(PopulationUtilities.averageFitness(population), 1.0);

        population.push(genome1);
        assert.equal(PopulationUtilities.averageFitness(population), 1.5);
    });

    QUnit.test("isDuplicate()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = [];

        // Run / Verify.
        assert.ok(!PopulationUtilities.isDuplicate(population, genome0));
        assert.ok(!PopulationUtilities.isDuplicate(population, genome1));
        assert.ok(!PopulationUtilities.isDuplicate(population, genome2));

        population.push(genome0);
        assert.ok(PopulationUtilities.isDuplicate(population, genome0));
        assert.ok(!PopulationUtilities.isDuplicate(population, genome1));
        assert.ok(PopulationUtilities.isDuplicate(population, genome2));

        population.push(genome1);
        assert.ok(PopulationUtilities.isDuplicate(population, genome0));
        assert.ok(PopulationUtilities.isDuplicate(population, genome1));
        assert.ok(PopulationUtilities.isDuplicate(population, genome2));
    });

    QUnit.test("sumFitness()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var population = [];

        // Run / Verify.
        population.push(genome0);
        assert.equal(PopulationUtilities.sumFitness(population), 1.0);

        population.push(genome1);
        assert.equal(PopulationUtilities.sumFitness(population), 3.0);
    });

    function createTree0()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node5 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        node1.fitness = 1.0;

        return node1;
    }

    function createTree1()
    {
        var node3 = new Terminal.Constant(2);
        var node4 = new Terminal.Variable("y");
        var node5 = new Terminal.Constant(3);
        var node2 = new Arithmetic.Subtract([ node3, node4 ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        node1.fitness = 2.0;

        return node1;
    }
});
