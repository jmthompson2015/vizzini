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

    QUnit.test("maybeAddGenome() duplicates", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = [];
        var duplicatesAllowed = true;

        // Run / Verify.
        assert.equal(population.length, 0);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome0, duplicatesAllowed));
        assert.equal(population.length, 1);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome1, duplicatesAllowed));
        assert.equal(population.length, 2);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome2, duplicatesAllowed));
        assert.equal(population.length, 3);

        assert.ok(PopulationUtilities.maybeAddGenome(population, genome0, duplicatesAllowed));
        assert.equal(population.length, 4);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome1, duplicatesAllowed));
        assert.equal(population.length, 5);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome2, duplicatesAllowed));
        assert.equal(population.length, 6);
    });

    QUnit.test("maybeAddGenome() no duplicates", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = [];
        var duplicatesAllowed = false;

        // Run / Verify.
        assert.equal(population.length, 0);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome0, duplicatesAllowed));
        assert.equal(population.length, 1);
        assert.ok(PopulationUtilities.maybeAddGenome(population, genome1, duplicatesAllowed));
        assert.equal(population.length, 2);
        assert.ok(!PopulationUtilities.maybeAddGenome(population, genome2, duplicatesAllowed));
        assert.equal(population.length, 2);

        assert.ok(!PopulationUtilities.maybeAddGenome(population, genome0, duplicatesAllowed));
        assert.equal(population.length, 2);
        assert.ok(!PopulationUtilities.maybeAddGenome(population, genome1, duplicatesAllowed));
        assert.equal(population.length, 2);
        assert.ok(!PopulationUtilities.maybeAddGenome(population, genome2, duplicatesAllowed));
        assert.equal(population.length, 2);
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
