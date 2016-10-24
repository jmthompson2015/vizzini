define([ "GenomeComparator", "GenomeFactory", "process/CopyOperator", "process/CrossoverOperator",
        "process/GeneticAlgorithm", "process/MutationOperator", "process/Population", "process/PopulationGenerator",
        "process/Operator", "process/SelectionOperator" ], function(GenomeComparator, GenomeFactory, CopyOperator,
        CrossoverOperator, GeneticAlgorithm, MutationOperator, Population, PopulationGenerator, Operator,
        SelectionOperator)
{
    "use strict";
    QUnit.module("GeneticAlgorithm");

    var SHOULD_THROW = "Should have thrown an exception.";

    QUnit.test("GeneticAlgorithm Fibonnacci", function(assert)
    {
        // Setup.
        var popSize = 300;
        var genes = [];
        for (var i = 0; i < 100; i++)
        {
            genes[i] = i;
        }
        var genomeLength = 10;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = (new PopulationGenerator()).generate(popSize, genomeFactory);
        var evaluator =
        {
            idealEvaluation: 10.0,
            getIdealEvaluation: function()
            {
                return idealEvaluation;
            },
            evaluate: function()
            {
                return 0.0;
            }
        };
        var idealEvaluation = 10.0;
        var generationCount = 50;
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new SelectionOperator.Selector(selectionCount, SelectionOperator.randomSelect);
        var operators = [ new Operator(0.02, 1, new CopyOperator.Copier(CopyOperator.copy)),
                new Operator(0.02, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.uniformConstantLength)),
                new Operator(0.02, 1, new MutationOperator.Mutator(genomeFactory, MutationOperator.mutate)), ];
        var backCount = 30;

        // Run / Verify.
        try
        {
            var ga = new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators,
                    genomeFactory, backCount);
            throw SHOULD_THROW;
        }
        catch (e)
        {
            assert.equal(e, "Operator ratios do not sum to 1.00: 0.06");
        }
    });

    QUnit.test("GeneticAlgorithm Fibonnacci", function(assert)
    {
        // Setup.
        var popSize = 300;
        var genes = [];
        for (var i = 0; i < 100; i++)
        {
            genes[i] = i;
        }
        var genomeLength = 10;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = (new PopulationGenerator()).generate(popSize, genomeFactory);
        LOGGER.debug("population.length() = " + population.length());
        var evaluator =
        {
            idealEvaluation: 10.0,
            getIdealEvaluation: function()
            {
                return idealEvaluation;
            },
            evaluate: evaluate
        };
        var idealEvaluation = 10.0;
        var generationCount = 50;
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new SelectionOperator.Selector(selectionCount, SelectionOperator.randomSelect);
        var operators = [ new Operator(0.05, 1, new CopyOperator.Copier(CopyOperator.copy)),
                new Operator(0.75, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.uniformConstantLength)),
                new Operator(0.20, 1, new MutationOperator.Mutator(genomeFactory, MutationOperator.mutate)), ];
        var backCount = 30;

        var ga = new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators,
                genomeFactory, backCount);

        ga.bind("generation", function(generationCount)
        {
            var population = ga.getPopulation();
            var averageFitness = round2(population.averageFitness());
            var best = population.get(0);
            LOGGER.debug("generation " + generationCount + " ave = " + averageFitness + " best " + best.fitness + " " +
                    best.toString());
        });

        ga.bind("message", function(message)
        {
            LOGGER.debug("message: " + message);
        });

        // Run.
        ga.determineBest(function(result)
        {
            LOGGER.debug("result !== undefined ? " + (result !== undefined));
            LOGGER.debug("result !== null      ? " + (result !== null));
            LOGGER.debug("result = " + +result.fitness + " " + result.toString());
        });

        // Verify.
        assert.ok(true);

        function evaluate(population)
        {
            var SEQUENCE = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ];

            for (var i = 0; i < population.length(); i++)
            {
                var genome = population.get(i);
                genome.rawFitness = 0;

                // Count the number of genes which match the answer.
                for (var j = 0; j < genome.length; j++)
                {
                    if (genome[j] == SEQUENCE[j])
                    {
                        genome.rawFitness++;
                    }
                }

                genome.fitness = SEQUENCE.length - genome.rawFitness;
                genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));
            }
        }

        function round2(value)
        {
            var factor = 100.0;

            return Math.round(factor * value) / factor;
        }
    });
});
