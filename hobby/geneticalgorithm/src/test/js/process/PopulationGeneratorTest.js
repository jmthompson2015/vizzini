define([ "GenomeFactory", "process/PopulationGenerator" ], function(GenomeFactory, PopulationGenerator)
{
    "use strict";
    QUnit.module("PopulationGenerator");

    QUnit.test("generate()", function(assert)
    {
        // Setup.
        var genomeFactory = createGenomeFactory();
        var popSize = 100;
        var generator = new PopulationGenerator();

        // Run.
        var result = generator.generate(popSize, genomeFactory);

        // Verify.
        assert.ok(result);
        assert.equal(result.length(), popSize);
    });

    function createGenomeFactory()
    {
        var genes = [];
        for (var i = 0; i < 100; i++)
        {
            genes[i] = i;
        }
        var genomeLength = 10;
        var genomeFactory = new GenomeFactory(genes, genomeLength);

        return genomeFactory;
    }

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
