/*
 * Provides a problem definition for finding a JavaScript function to calculate addition.
 * 
 * @param popSize Population size.
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSAddProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = 5;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = JSAddEvaluator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.selectFromHead);
        var copyCount = Math.floor(0.05 * popSize);
        var crossoverCount = Math.floor(0.75 * popSize);
        var crossoverOperator = CrossoverOperator.variableLengthCrossover;
        var mutator = new Mutator(genes, MutationOperator.mutate);

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                selector, copyCount, crossoverCount, crossoverOperator,
                mutator, genomeFactory, backCount);

        return ga;
    }

    this.createGenes = function()
    {
        var genes = [ "return", "a", "+", "b", ";", // necessary
        "-", "*", "/", // math
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // numbers
        ];

        return genes;
    }
}

JSAddProblem.createPhenotype = function(genome)
{
    var answer;
    var genomeString = GAUtilities.genomeToString(genome);

    try
    {
        answer = Function("a", "b", genomeString);
    }
    catch (ignore)
    {}

    return answer;
}

/*
 * Provides an evaluator for finding a JavaScript function to calculate
 * addition.
 */
var JSAddEvaluator =
{
    BEST_FITNESS: 1000,
    WORST_FITNESS: 0,
    inputs: [ [ 0, 0 ], [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ], ],
    outputs: [ 0, 3, 7, 11, 15, 19 ],
    idealEvaluation: 1000,

    computeError: function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var errorSquared = 0.0;

        for (var i = 0; i < this.inputs.length; i++)
        {
            var input = this.inputs[i];
            var output = this.outputs[i];
            var result = phenotype(input[0], input[1]);
            var diff = output - result;
            errorSquared += (diff * diff);
        }

        return errorSquared;
    },

    evaluate: function(population)
    {
        InputValidator.validateNotEmpty("population", population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.phenotype = JSAddProblem.createPhenotype(genome);

            if (genome.phenotype)
            {
                // Valid function.
                var error = this.computeError(genome.phenotype);

                if (error === 0.0)
                {
                    // Perfect evaluation.
                    genome.fitness = this.BEST_FITNESS;

                    // Add pressure for the shortest genome.
                    genome.fitness += 4 - genome.length;
                }
                else if (isNaN(error))
                {
                    // Valid function but not a number.
                    genome.fitness = 100.0;
                }
                else
                {
                    genome.fitness = 100.0 + (1.0 / error);
                }
            }
            else
            {
                // Invalid function.
                genome.fitness = this.WORST_FITNESS;
            }
        }
    },
}
