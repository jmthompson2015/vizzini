define([ "SelectionOperator" ], function(SelectionOperator)
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
        assert.equal(result.length, genomeLength);
        assert.ok((popSize - selectionCount) < result.fitness);
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
        assert.equal(result.length, genomeLength);
        assert.ok((popSize - selectionCount) < result.fitness);
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
        assert.equal(result.length, genomeLength);
        assert.ok((popSize - selectionCount) < result.fitness);
        assert.ok(result.fitness <= popSize);
    });

    function createPopulation(genomeLength, popSize)
    {
        var population = [];

        for (var i = 0; i < popSize; i++)
        {
            var genome = [];

            for (var j = 0; j < genomeLength; j++)
            {
                genome[j] = i + j;
            }

            genome.fitness = popSize - i;
            population[population.length] = genome;
        }

        return population;
    }
});
