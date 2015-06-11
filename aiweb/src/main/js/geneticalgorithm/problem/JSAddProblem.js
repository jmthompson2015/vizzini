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
        answer = eval("myFunc = function(a, b) {" + genomeString + "}");
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
    WORST_FITNESS: -1000,
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

        return Math.sqrt(errorSquared);
    },

    evaluate: function(population)
    {
        InputValidator.validateNotEmpty("population", population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.phenotype = JSAddProblem.createPhenotype(genome);

            var error = undefined;

            if (genome.phenotype)
            {
                error = this.computeError(genome.phenotype);
            }

            genome.error = error;
            genome.fitness = this.errorToFitness(genome, error);
        }
    },

    errorToFitness: function(genome, error)
    {
        var answer;

        if (error === 0.0)
        {
            // Perfect evaluation.
            answer = this.BEST_FITNESS;

            // Subtract the genome length to pressure for a short answer.
            // answer -= genome.length;
        }
        else if (error === undefined)
        {
            // Invalid function.
            answer = this.WORST_FITNESS;
        }
        else if (isNaN(error))
        {
            // Valid function but not a number.
            answer = 0.0;
        }
        else
        {
            answer = 1.0 / error;
        }

        return answer;
    },
}
