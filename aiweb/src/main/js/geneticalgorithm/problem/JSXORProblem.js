var mode = "easy";
// var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to perform
 * symbolic function identification.
 * 
 * xor(a, b) = (a || b) && !(a && b)
 * 
 * @param popSize Population size. @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSXORProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = (mode === "easy" ? 4 : 12);
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = JSXORProblem.Evaluator;
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.50 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.fitnessProportionalSelect);
        var copyCount = Math.floor(0.02 * popSize);
        var crossoverCount = Math.floor(0.65 * popSize);
        var crossoverOperator = CrossoverOperator.variableLengthCrossover;
        var mutator = new Mutator(genes, MutationOperator.mutate);

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, copyCount, crossoverCount,
                crossoverOperator, mutator, genomeFactory, backCount);

        return ga;
    }

    this.createGenes = function()
    {
        var easy = [ "(a && b)", "(a || b)", "&&", "!", ];
        var hard = [ "a", "b", "&&", "||", "!", "(", ")" ];

        return (mode === "easy" ? easy : hard);
    }
}

JSXORProblem.createPhenotype = function(genome)
{
    var answer;
    var genomeString = GAUtilities.genomeToString(genome);

    try
    {
        answer = Function("a", "b", "return " + genomeString);
        genome.errors = [];
    }
    catch (e)
    {
        genome.code = "function xor(a, b) { return " + genomeString + "}";

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
JSXORProblem.Evaluator =
{
    BEST_FITNESS: 1000,
    inputs: [ [ false, false ], [ false, true ], [ true, false ],
            [ true, true ] ],
    outputs: [ false, true, true, false ],
    idealEvaluation: 1000,

    computeMatches: function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var answer = 0;

        var inputs = this.inputs;
        var outputs = this.outputs;

        for (var i = 0; i < inputs.length; i++)
        {
            var input = inputs[i];
            var output = outputs[i];
            try
            {
                var result = phenotype(input[0], input[1]);

                if (result === output)
                {
                    answer++;
                }
            }
            catch (e)
            {
                return -1;
            }
        }

        return answer;
    },

    evaluate: function(population)
    {
        InputValidator.validateNotEmpty("population", population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.fitness = 0.0;
            genome.phenotype = JSXORProblem.createPhenotype(genome);

            if (genome.phenotype)
            {
                // Valid function.
                genome.fitness += 500.0;

                var matches = this.computeMatches(genome.phenotype);

                if (matches === this.outputs.length)
                {
                    // Perfect evaluation.
                    genome.fitness = this.BEST_FITNESS;

                    // Add pressure for the shortest genome.
                    genome.fitness += (mode === "easy" ? 4 : 12)
                            - genome.length;
                }
                else
                {
                    genome.fitness += 100.0 * matches;
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
