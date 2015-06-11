/*
 * Provides a genetic algorithm.
 * 
 * @param populationIn Population.
 * @param evaluator Evaluator.
 * @param generationCount Number of genomes to mutate into the next generation.
 * @param selector Selection operator.
 * @param copyCount Number of genomes to copy into the next generation.
 * @param crossoverCount Number of genomes to crossover into the next generation.
 * @param crossoverOperator Crossover operator.
 * @param mutator Mutation operator.
 * @param genomeFactory Genome factory.
 * @param backCount Best evaluation back count.
 */
function GeneticAlgorithm(populationIn, evaluator, generationCount, selector,
        copyCount, crossoverCount, crossoverOperator, mutator, genomeFactory,
        backCount)
{
    InputValidator.validateNotNull("populationIn", populationIn);
    InputValidator.validateNotNull("evaluator", evaluator);
    InputValidator.validateNotNull("selector", selector);
    InputValidator.validateNotNull("crossoverOperator", crossoverOperator);
    InputValidator.validateNotNull("mutator", mutator);
    InputValidator.validateNotNull("genomeFactory", genomeFactory);

    var population = populationIn.slice();
    var mutateCount = Math.max(0, population.length - copyCount
            - crossoverCount);
    var bestEvals = [];

    this.getPopulation = function()
    {
        return population;
    }

    this.determineBest = function(callback)
    {
        this.runGeneration(0, callback);
    }

    this.runGeneration = function(g, callback)
    {
        this.fireMessage("Generation " + g);
        var bestEval;
        var bestGenome;
        var comparator = GenomeComparator;
        var message = "Done.";

        var isDone = (g >= (generationCount - 1));

        if (g > 0)
        {
            this.createNextGeneration();
        }

        evaluator.evaluate(population);
        population.sort(comparator);
        bestGenome = population[0];
        bestEval = bestGenome.fitness;
        bestEvals[bestEvals.length] = bestEval;
        this.fireGenerationCompleted(g);

        if (bestEval == evaluator.idealEvaluation)
        {
            message = "Ideal evaluation. Stopping.";
            isDone = true;
        }
        else
        {
            var bestEvalBack = bestEvals[g - backCount];

            if (bestEvalBack && bestEval == bestEvalBack)
            {
                message = "No improvement. Stopping.";
                isDone = true;
            }
        }

        if (isDone)
        {
            this.fireMessage(message);

            if (callback)
            {
                callback(bestGenome);
            }
        }
        else
        {
            var self = this;

            setTimeout(function()
            {
                self.runGeneration(g + 1, callback);
            }, 300);
        }
    }

    /**
     * Create the next generation's population.
     */
    this.createNextGeneration = function()
    {
        LOGGER.trace("GeneticAlgorithm.createNextGeneration() start");
        var newPop = [];

        // Copy over the first X genomes unchanged.
        for (var i = 0; i < copyCount; i++)
        {
            newPop[newPop.length] = population[i].slice();
        }

        // Crossover the top X genomes.
        var maxTries = 100;
        this.fillPopulation(newPop, (copyCount + crossoverCount), maxTries,
                true);

        // Mutate the top X genomes.
        this.fillPopulation(newPop, population.length, maxTries, false);

        population = newPop.slice();
        LOGGER.trace("GeneticAlgorithm.createNextGeneration() start");
    }

    this.fillPopulation = function(newPop, popSize, maxTries, isCrossover)
    {
        var count = 0;

        while (newPop.length < popSize)
        {
            var genome = null;

            if (count < maxTries)
            {
                var genome1 = selector.select(population);

                if (isCrossover)
                {
                    var genome2 = selector.select(population);
                    genome = crossoverOperator(genome1, genome2);
                }
                else
                {
                    genome = mutator.mutate(genome1);
                }
            }
            else
            {
                genome = genomeFactory.create();
            }

            if (genome === undefined || genome === null)
            {
                LOGGER.error("ERROR: genome is undefined or null");
                throw "ERROR: genome is undefined or null";
            }

            if (!Array.Vizzini.containsUsingEquals(newPop, genome,
                    Array.Vizzini.equals))
            {
                newPop[newPop.length] = genome;
                count = 0;
            }

            count++;
        }
    }

    this.fireGenerationCompleted = function(generationCount)
    {
        this.trigger("generation", generationCount);
    }

    this.fireMessage = function(message)
    {
        this.trigger("message", message);
    }
}

MicroEvent.mixin(GeneticAlgorithm);
