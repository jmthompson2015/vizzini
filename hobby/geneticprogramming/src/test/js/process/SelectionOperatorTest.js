define([ "Terminal", "process/Population", "process/SelectionOperator" ], function(Terminal, Population,
        SelectionOperator)
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
        assert.ok(result.fitness < selectionCount);
        assert.ok(result.fitness >= 0);
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
        assert.ok(result.fitness < selectionCount);
        assert.ok(result.fitness >= 0);
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
        assert.ok(result.fitness < selectionCount);
        assert.ok(result.fitness >= 0);
    });

    function createPopulation(genomeLength, popSize)
    {
        var population = new Population();
        var duplicatesAllowed = false;

        for (var i = 0; i < popSize; i++)
        {
            var genome = new Terminal.Constant(i);
            genome.fitness = i;
            genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));
            population.maybeAddGenome(genome, duplicatesAllowed);
        }

        return population;
    }
});
