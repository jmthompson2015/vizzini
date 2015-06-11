/*
 * Provides a genetic algorithm.
 * 
 * @param genes Genes.
 * @param populationIn Population.
 * @param evaluator Evaluator.
 * @param generationCount Number of genomes to mutate into the next generation.
 * @param selector Selection operator.
 * @param copyCount Number of genomes to copy into the next generation.
 * @param crossoverCount Number of genomes to crossover into the next generation.
 * @param crossoverOperator Crossover operator.
 * @param mutationOperator Mutation operator.
 * @param genomeFactory Genome factory.
 * @param backCount Best evaluation back count.
 */
function GeneticAlgorithm(genes, populationIn, evaluator, generationCount,
        selector, copyCount, crossoverCount, crossoverOperator,
        mutationOperator, genomeFactory, backCount)
{
    var population = populationIn.slice();
    var mutateCount = Math.max(0, population.length - copyCount
            - crossoverCount);
    var newPop = [];
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
            LOGGER.info("Ideal evaluation. Stopping.");
            message = "Ideal evaluation. Stopping.";
            isDone = true;
        }
        else
        {
            var bestEvalBack = bestEvals[g - backCount];

            if (bestEvalBack && bestEval == bestEvalBack)
            {
                LOGGER.info("No improvement. Stopping.");
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
        newPop = [];

        // Copy over the first X genomes unchanged.
        for (var i = 0; i < copyCount; i++)
        {
            newPop[newPop.length] = population[i].slice();
        }

        // Crossover the top X genomes.
        var maxTries = 100;
        var count = 0;

        while (newPop.length < (copyCount + crossoverCount))
        {
            var genome = null;

            if (count < maxTries)
            {
                var genome1 = selector.select(population);
                var genome2 = selector.select(population);

                genome = crossoverOperator(genome1, genome2);
            }
            else
            {
                genome = genomeFactory();
            }

            if (!Array.Vizzini.containsUsingEquals(newPop, genome,
                    Array.Vizzini.equals))
            {
                newPop[newPop.length] = genome;
                count = 0;
            }

            count++;
        }

        // Mutate the top X genomes.
        var popSize = population.length;
        count = 0;

        while (newPop.length < popSize)
        {
            var genome = null;

            if (count < maxTries)
            {
                var genome1 = selector.select(population);

                genome = mutationOperator(genes, genome1);
            }
            else
            {
                genome = genomeFactory();
            }

            if (!Array.Vizzini.containsUsingEquals(newPop, genome,
                    Array.Vizzini.equals))
            {
                newPop[newPop.length] = genome;
                count = 0;
            }

            count++;
        }

        population = newPop.slice();
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
