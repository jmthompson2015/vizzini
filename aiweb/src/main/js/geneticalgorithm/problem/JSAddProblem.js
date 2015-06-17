// var mode = "easy";
var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to calculate
 * addition.
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
        var evaluator = JSAddProblem.Evaluator;
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.randomSelect);
        var copyCount = Math.floor(0.05 * popSize);
        var crossoverCount = Math.floor(0.75 * popSize);
        var crossoverOperator = CrossoverOperator.variableLengthCrossover;
        var mutator = new Mutator(genes, MutationOperator.mutate);

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, copyCount, crossoverCount,
                crossoverOperator, mutator, genomeFactory, backCount);

        return ga;
    }

    this.createGenes = function()
    {
        var easy = [ "return", "a", "+", "b" ];
        var hard = [ "return", "a", "+", "b", // necessary
        "-", "*", "/", "%", // math
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // numbers
        "(", ")", "[", "]", "{", "}", // brackets
        "var", "i", "=", "if", "==", "===", ";", // symbols
        ];

        return (mode === "easy" ? easy : hard);
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
    catch (e)
    {
        genome.code = "function add(a, b) {" + genomeString + "}";

        try
        {
            JSHINT(genome.code);
            genome.errorCount = JSHINT.errors.length;
        }
        catch (e)
        {
            genome.errorCount = Number.NaN;
        }
    }

    return answer;
}

/*
 * Provides an evaluator for finding a JavaScript function to calculate
 * addition.
 */
JSAddProblem.Evaluator =
{
    BEST_FITNESS: 1000,
    inputs: [ [ 0, 0 ], [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ], ],
    outputs: [ 0, 3, 7, 11, 15, 19 ],
    idealEvaluation: 1000,

    computeError: function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var sumError = 0.0;

        for (var i = 0; i < this.inputs.length; i++)
        {
            var input = this.inputs[i];
            var output = this.outputs[i];

            try
            {
                var result = phenotype(input[0], input[1]);
                var diff = output - result;
                sumError += Math.abs(diff);
            }
            catch (e)
            {
                sumError += 100.0;
            }
        }

        return sumError;
    },

    evaluate: function(population)
    {
        InputValidator.validateNotEmpty("population", population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.fitness = 0.0;
            genome.phenotype = JSAddProblem.createPhenotype(genome);

            if (genome.phenotype)
            {
                // Valid function.
                genome.fitness += 100.0;

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
                    genome.fitness -= 10.0;
                }
                else
                {
                    genome.fitness += (1.0 / error);
                }
            }
            else
            {
                // Invalid function.
                var errorCount = genome.errorCount;

                if (!isNaN(errorCount))
                {
                    if (errorCount === 0)
                    {
                        genome.fitness += 400.0;
                    }
                    else
                    {
                        genome.fitness += 100.0 / errorCount;
                    }
                }
            }
        }
    },
}
