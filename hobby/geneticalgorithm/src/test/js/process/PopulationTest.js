define([ "process/Population" ], function(Population)
{
    "use strict";
    QUnit.module("Population");

    var genomeLength = 4;

    QUnit.test("averageFitness()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var population = new Population();
        var duplicatesAllowed = false;

        // Run / Verify.
        population.maybeAddGenome(genome0, duplicatesAllowed);
        assert.equal(population.averageFitness(), 1.0);

        population.maybeAddGenome(genome1, duplicatesAllowed);
        assert.equal(population.averageFitness(), 1.5);
    });

    QUnit.test("isDuplicate()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = new Population();
        var duplicatesAllowed = false;

        // Run / Verify.
        assert.ok(!population.isDuplicate(genome0));
        assert.ok(!population.isDuplicate(genome1));
        assert.ok(!population.isDuplicate(genome2));

        population.maybeAddGenome(genome0, duplicatesAllowed);
        assert.ok(population.isDuplicate(genome0));
        assert.ok(!population.isDuplicate(genome1));
        assert.ok(population.isDuplicate(genome2));

        population.maybeAddGenome(genome1, duplicatesAllowed);
        assert.ok(population.isDuplicate(genome0));
        assert.ok(population.isDuplicate(genome1));
        assert.ok(population.isDuplicate(genome2));
    });

    QUnit.test("maybeAddGenome() duplicates", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = new Population();
        var duplicatesAllowed = true;

        // Run / Verify.
        assert.equal(population.length(), 0);
        assert.ok(population.maybeAddGenome(genome0, duplicatesAllowed));
        assert.equal(population.length(), 1);
        assert.ok(population.maybeAddGenome(genome1, duplicatesAllowed));
        assert.equal(population.length(), 2);
        assert.ok(population.maybeAddGenome(genome2, duplicatesAllowed));
        assert.equal(population.length(), 3);

        assert.ok(population.maybeAddGenome(genome0, duplicatesAllowed));
        assert.equal(population.length(), 4);
        assert.ok(population.maybeAddGenome(genome1, duplicatesAllowed));
        assert.equal(population.length(), 5);
        assert.ok(population.maybeAddGenome(genome2, duplicatesAllowed));
        assert.equal(population.length(), 6);
    });

    QUnit.test("maybeAddGenome() no duplicates", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = new Population();
        var duplicatesAllowed = false;

        // Run / Verify.
        assert.equal(population.length(), 0);
        assert.ok(population.maybeAddGenome(genome0, duplicatesAllowed));
        assert.equal(population.length(), 1);
        assert.ok(population.maybeAddGenome(genome1, duplicatesAllowed));
        assert.equal(population.length(), 2);
        assert.ok(!population.maybeAddGenome(genome2, duplicatesAllowed));
        assert.equal(population.length(), 2);

        assert.ok(!population.maybeAddGenome(genome0, duplicatesAllowed));
        assert.equal(population.length(), 2);
        assert.ok(!population.maybeAddGenome(genome1, duplicatesAllowed));
        assert.equal(population.length(), 2);
        assert.ok(!population.maybeAddGenome(genome2, duplicatesAllowed));
        assert.equal(population.length(), 2);
    });

    QUnit.test("sumAdjustedFitness()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var population = new Population();
        var duplicatesAllowed = false;

        // Run / Verify.
        population.maybeAddGenome(genome0, duplicatesAllowed);
        assert.equal(population.sumAdjustedFitness(), 0.5);

        population.maybeAddGenome(genome1, duplicatesAllowed);
        assert.equal(Math.vizziniRound(population.sumAdjustedFitness(), 4), 0.8333);
    });

    QUnit.test("sumFitness()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var population = new Population();
        var duplicatesAllowed = false;

        // Run / Verify.
        population.maybeAddGenome(genome0, duplicatesAllowed);
        assert.equal(population.sumFitness(), 1.0);

        population.maybeAddGenome(genome1, duplicatesAllowed);
        assert.equal(population.sumFitness(), 3.0);
    });

    function createTree0()
    {
        var genome = [];

        for (var i = 0; i < genomeLength; i++)
        {
            genome.push(i);
        }

        genome.fitness = 1;
        genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));

        return genome;
    }

    function createTree1()
    {
        var genome = [];

        for (var i = 0; i < genomeLength; i++)
        {
            genome.push(genomeLength - i);
        }

        genome.fitness = 2;
        genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));

        return genome;
    }
});
