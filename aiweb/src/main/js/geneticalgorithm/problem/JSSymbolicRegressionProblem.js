var mode = "easy";
// var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to perform
 * symbolic function identification.
 * 
 * f(x) = x^4 + x^3 + x^2 + x
 * 
 * @param popSize Population size. @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSSymbolicRegressionProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = 19;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = JSSymbolicRegressionProblem.Evaluator;
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
        var easy = [ "x", "+", "*" ];
        var hard = [ "x", "+", "-", "*", "/", "Math.sin(", "Math.cos(",
                "Math.exp(", "Math.log(", ")", ];

        return (mode === "easy" ? easy : hard);
    }
}

JSSymbolicRegressionProblem.createPhenotype = function(genome)
{
    var answer;
    var genomeString = GAUtilities.genomeToString(genome);

    try
    {
        answer = Function("x", "return " + genomeString);
        genome.errors = [];
    }
    catch (e)
    {
        genome.code = "function f(x) { return " + genomeString + "}";

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
JSSymbolicRegressionProblem.Evaluator =
{
    BEST_FITNESS: 1000,
    inputs: undefined,
    outputs: undefined,
    idealEvaluation: 1000,

    getInputs: function()
    {
        if (!this.inputs)
        {
            var min = -1.0;
            var max = 1.0;
            this.inputs = [];
            this.outputs = [];

            for (var i = 0; i < 20; i++)
            {
                var x = Math.Vizzini.randomRealFromRange(min, max);
                this.inputs[this.inputs.length] = x;
                this.outputs[this.outputs.length] = (x * x * x * x)
                        + (x * x * x) + (x * x) + x;
            }
        }

        return this.inputs;
    },

    computeError: function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var inputs = this.getInputs();
        var outputs = this.outputs;
        var sumError = 0.0;

        for (var i = 0; i < inputs.length; i++)
        {
            var input = inputs[i];
            var output = outputs[i];

            try
            {
                var y = phenotype(input);
                var diff = y - output;
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
            genome.phenotype = JSSymbolicRegressionProblem
                    .createPhenotype(genome);

            if (genome.phenotype)
            {
                // Valid function.
                genome.fitness += 500.0;

                var error = this.computeError(genome.phenotype);

                // if (error === 0.0)
                if (error < 0.0001)
                {
                    // Perfect evaluation.
                    genome.fitness = this.BEST_FITNESS;

                    // Add pressure for the shortest genome.
                    genome.fitness += 19 - genome.length;
                }
                else if (isNaN(error))
                {
                    // Valid function but not a number.
                    genome.fitness -= 10.0;
                }
                else
                {
                    // genome.fitness += (1.0 / error);
                    genome.fitness += (400.0 - error);
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
