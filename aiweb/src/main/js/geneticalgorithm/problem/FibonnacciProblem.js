/*
 * Provides a problem definition for finding the Fibonnacci sequence.
 * 
 * @param popSize Population size.
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function FibonnacciProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = 10;
        var population = GAUtilities.createPopulation(popSize, genes,
                genomeLength);
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.selectFromHead);
        var copyCount = Math.floor(0.05 * popSize);
        var crossoverCount = Math.floor(0.75 * popSize);
        var crossoverOperator = CrossoverOperator.sameLengthCrossover;
        var mutationOperator = MutationOperator.mutate;
        var genomeFactory = GAUtilities.createGenome;

        var ga = new GeneticAlgorithm(genes, population, this.evaluator,
                generationCount, selector, copyCount, crossoverCount,
                crossoverOperator, mutationOperator, genomeFactory, backCount);

        return ga;
    }

    this.createGenes = function()
    {
        var genes = [];

        // Genes are numbers in [0, 100).
        for (var i = 0; i < 100; i++)
        {
            genes[i] = i;
        }

        return genes;
    }

    this.evaluator =
    {
        SEQUENCE: [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ],

        idealEvaluation: 10.0,

        evaluate: function(population)
        {
            for (var i = 0; i < population.length; i++)
            {
                var genome = population[i];
                genome.fitness = 0;

                // Count the number of genes which match the answer.
                for (var j = 0; j < genome.length; j++)
                {
                    if (genome[j] == this.SEQUENCE[j])
                    {
                        genome.fitness++;
                    }
                }
            }
        },
    }
}
