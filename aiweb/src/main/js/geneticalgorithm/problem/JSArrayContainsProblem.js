var mode = "easy";
// var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to determine
 * if an array contains an element.
 * 
 * @param popSize Population size. @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSArrayContainsProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        var genes = this.createGenes();
        var genomeLength = (mode === "easy" ? 4 : 27);
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = JSArrayContainsProblem.Evaluator;
        var comparator = JSArrayContainsProblem.GenomeComparator;
        var selectionCount = Math.floor(0.50 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.fitnessProportionalSelect);
        var copyCount = Math.floor(0.05 * popSize);
        var crossoverCount = Math.floor(0.60 * popSize);
        var crossoverOperator = CrossoverOperator.variableLengthCrossover;
        var mutator = new Mutator(genes, MutationOperator.mutate);

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, copyCount, crossoverCount,
                crossoverOperator, mutator, genomeFactory, backCount);

        return ga;
    }

    this.createGenes = function()
    {
        var easy = [ "for (var i = 0; i < array.length; i++)",
                "if (array[i] === element)", "return true;", "return false;", ];
        var hard = [ "for (var i = 0; i < array.length; i++)", "if", "(",
                "array[i]", "===", "element", ")", "return true;",
                "return false;", ];

        return (mode === "easy" ? easy : hard);
    }
}

JSArrayContainsProblem.createPhenotype = function(genome)
{
    var answer;
    var genomeString = GAUtilities.genomeToString(genome);

    try
    {
        answer = Function("array", "element", genomeString);
    }
    catch (e)
    {
        genome.code = "function contains(array, element) {" + genomeString
                + "}";

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
 * Provides an evaluator for finding a JavaScript function to determine if an
 * array contains an element.
 */
JSArrayContainsProblem.Evaluator =
{
    BEST_FITNESS: 1000,
    inputs: undefined,
    outputs: [ false, false, true, true, true, true, false, false, // a
    false, true, false, true, false, true, false, true, // b
    ],
    idealEvaluation: 1000,

    getInputs: function()
    {
        if (!this.inputs)
        {
            this.inputs = [];
            var a = [ 1, 2, 3, 4 ];
            this.inputs[this.inputs.length] = [ a, -1 ];
            this.inputs[this.inputs.length] = [ a, 0 ];
            this.inputs[this.inputs.length] = [ a, 1 ];
            this.inputs[this.inputs.length] = [ a, 2 ];
            this.inputs[this.inputs.length] = [ a, 3 ];
            this.inputs[this.inputs.length] = [ a, 4 ];
            this.inputs[this.inputs.length] = [ a, 5 ];
            this.inputs[this.inputs.length] = [ a, 6 ];
            var b = [ 2, 4, 6, 8 ];
            this.inputs[this.inputs.length] = [ b, 1 ];
            this.inputs[this.inputs.length] = [ b, 2 ];
            this.inputs[this.inputs.length] = [ b, 3 ];
            this.inputs[this.inputs.length] = [ b, 4 ];
            this.inputs[this.inputs.length] = [ b, 5 ];
            this.inputs[this.inputs.length] = [ b, 6 ];
            this.inputs[this.inputs.length] = [ b, 7 ];
            this.inputs[this.inputs.length] = [ b, 8 ];
        }

        return this.inputs;
    },

    computeMatches: function(phenotype)
    {
        InputValidator.validateNotNull("phenotype", phenotype);

        var answer = 0;

        var inputs = this.getInputs();

        for (var i = 0; i < inputs.length; i++)
        {
            var input = inputs[i];
            var output = this.outputs[i];
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
        LOGGER.trace("JSArrayContainsProblem.Evaluator.evaluate() start");
        InputValidator.validateNotEmpty("population", population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.fitness = 0.0;
            genome.phenotype = JSArrayContainsProblem.createPhenotype(genome);
            // LOGGER.debug("genome.phenotype = " + genome.phenotype);

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
                    genome.fitness += 4 - genome.length; // easy
                }
                else
                {
                    genome.fitness += 10.0 * matches;
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

        LOGGER.trace("JSArrayContainsProblem.Evaluator.evaluate() end");
    },
}

JSArrayContainsProblem.GenomeComparator = function(genome0, genome1)
{
    var fitness0 = genome0.fitness;
    var fitness1 = genome1.fitness;

    // Highest fitness.
    return fitness1 - fitness0;
}
