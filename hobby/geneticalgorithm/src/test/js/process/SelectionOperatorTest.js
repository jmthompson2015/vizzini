define([ "GenomeComparator", "process/Population", "process/SelectionOperator" ], function(GenomeComparator,
        Population, SelectionOperator)
{
    "use strict";
    QUnit.module("SelectionOperator");

    var genomeLength = 4;
    var popSize = 10;
    var selectionCount = 5;

    QUnit.test("fitnessProportionalSelect()", function(assert)
    {
        // Setup.
        var population = createPopulation(genomeLength, popSize);
        var selector = new SelectionOperator.Selector(selectionCount, SelectionOperator.fitnessProportionalSelect);

        // Run.
        var result = selector.select(population);

        // Verify.
        assert.ok(result);
        LOGGER.debug("fitnessProportional result        = " + result.fitness + " " + result);
        assert.equal(result.length, genomeLength);
        assert.ok((popSize - selectionCount) > result.fitness);
        assert.ok(result.fitness <= popSize);
    });

    QUnit.test("randomSelect()", function(assert)
    {
        // Setup.
        var population = createPopulation(genomeLength, popSize);
        var selector = new SelectionOperator.Selector(selectionCount, SelectionOperator.randomSelect);

        // Run.
        var result = selector.select(population);

        // Verify.
        assert.ok(result);
        LOGGER.debug("randomSelect result        = " + result.fitness + " " + result);
        assert.equal(result.length, genomeLength);
        assert.ok((popSize - selectionCount) > result.fitness);
        assert.ok(result.fitness <= popSize);
    });

    QUnit.test("simpleTournamentSelect()", function(assert)
    {
        // Setup.
        var population = createPopulation(genomeLength, popSize);
        var selector = new SelectionOperator.Selector(selectionCount, SelectionOperator.simpleTournamentSelect);

        // Run.
        var result = selector.select(population);

        // Verify.
        assert.ok(result);
        LOGGER.debug("simpleTournament result        = " + result.fitness + " " + result);
        assert.equal(result.length, genomeLength);
        assert.ok((popSize - selectionCount) > result.fitness);
        assert.ok(result.fitness <= popSize);
    });

    function createPopulation(genomeLength, popSize)
    {
        var population = new Population();
        var duplicatesAllowed = true;

        for (var i = 0; i < popSize; i++)
        {
            var genome = [];

            for (var j = 0; j < genomeLength; j++)
            {
                genome[j] = i + j;
            }

            genome.fitness = popSize - i;
            genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));
            population.maybeAddGenome(genome, duplicatesAllowed);
        }

        population.sort(GenomeComparator);

        return population;
    }
});
