/*
 * Provides a problem definition for finding the Fibonnacci sequence.
 * 
 * @param popSize Population size.
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
var FibonnacciProblem =
{
    createGA: function(popSize, generationCount, backCount)
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.getGenes();
        var genomeFactory = this.createGenomeFactory(genes);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.randomSelect);
        var operators = [
                new Operator(0.05, 1, new Copier(CopyOperator.copy)),
                new Operator(0.40, 2, new Crossoverer(
                        CrossoverOperator.onePointConstantLength)),
                new Operator(0.40, 2, new Crossoverer(
                        CrossoverOperator.twoPointConstantLength)),
                new Operator(0.15, 1, new Mutator(genomeFactory,
                        MutationOperator.mutate)), ];

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, operators, genomeFactory, backCount);

        return ga;
    },

    createEvaluator: function()
    {
        var outputs = this.getOutputs();

        var evaluator =
        {
            getIdealEvaluation: function()
            {
                return 10.0;
            },

            evaluate: function(population)
            {
                for (var i = 0; i < population.length; i++)
                {
                    var genome = population[i];
                    genome.fitness = 0;

                    // Count the number of genes which match the answer.
                    for (var j = 0; j < genome.length; j++)
                    {
                        if (genome[j] == outputs[0][j])
                        {
                            genome.fitness++;
                        }
                    }
                }
            },
        }

        return evaluator;
    },

    createGenomeFactory: function(genes)
    {
        var genomeLength = 10;

        return new GenomeFactory(genes, genomeLength);
    },

    getGenes: function()
    {
        var genes = [];

        // Genes are numbers in [0, 100).
        for (var i = 0; i < 100; i++)
        {
            genes[i] = i;
        }

        return genes;
    },

    getInputs: function()
    {
        return [ "" ];
    },

    getObjective: function()
    {
        return "Find the first ten numbers of the Fibonnacci sequence.";
    },

    getOutputs: function()
    {
        return [ [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ] ];
    },
}
