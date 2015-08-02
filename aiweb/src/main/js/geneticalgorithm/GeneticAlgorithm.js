/*
 * Provides a genetic algorithm.
 * 
 * @param populationIn Population.
 * @param evaluator Evaluator.
 * @param generationCount Number of genomes to mutate into the next generation.
 * @param comparator Genome comparator.
 * @param selector Selection operator.
 * @param operators Array of operator objects.
 * @param genomeFactory Genome factory.
 * @param backCount Best evaluation back count.
 */
function GeneticAlgorithm(populationIn, evaluator, generationCount, comparator,
        selector, operators, genomeFactory, backCount)
{
    InputValidator.validateNotNull("populationIn", populationIn);
    InputValidator.validateNotNull("evaluator", evaluator);
    InputValidator.validateNotNull("comparator", comparator);
    InputValidator.validateNotNull("selector", selector);
    InputValidator.validateNotEmpty("operators", operators);
    InputValidator.validateNotNull("genomeFactory", genomeFactory);

    var population = populationIn.slice();
    var bestEvals = [];

    {
        var sum = operators.reduce(function(previousValue, operator)
        {
            LOGGER.info("operator.getRatio() = " + operator.getRatio()
                    + " sum = " + (previousValue + operator.getRatio()));
            return previousValue + operator.getRatio();
        }, 0.0);

        LOGGER.info("Operators ratio sum = " + sum);

        if (sum !== 1.00) { throw "Operator ratios do not sum to 1.00: " + sum; }
    }

    this.addUnique = function(newPop, genome)
    {
        var answer = false;

        if (!newPop.vizziniContainsUsingArrayEquals(genome))
        {
            newPop[newPop.length] = genome;
            answer = true;
        }

        return answer;
    }

    /**
     * Create the next generation's population.
     */
    this.createNextGeneration = function()
    {
        LOGGER.trace("GeneticAlgorithm.createNextGeneration() start");
        var newPop = [];

        // Apply the operators to create the next generation.
        var popSize = population.length;
        var maxTries = 100;

        operators.forEach(function(operator)
        {
            var count = Math.max(0, Math.floor(operator.getRatio() * popSize));
            this.fillPopulation(newPop, newPop.length + count, maxTries,
                    operator);
        }, this);

        population = newPop.slice();
        LOGGER.info("population.length = " + population.length);
        LOGGER.trace("GeneticAlgorithm.createNextGeneration() end");
    }

    this.determineBest = function(callback)
    {
        LOGGER.trace("GeneticAlgorithm.determineBest() start");
        this.runGeneration(0, callback);
        LOGGER.trace("GeneticAlgorithm.determineBest() end");
    }

    this.fillPopulation = function(newPop, popSize, maxTries, operator)
    {
        var executor = operator.getExecutor();
        var isCopier = (executor instanceof Copier);
        var count = 0;

        while (newPop.length < popSize)
        {
            var genome = null;

            if (count < maxTries)
            {
                if (isCopier)
                {
                    var genome1 = population[count];
                    genome = executor.execute(genome1);
                }
                else
                {
                    var genome1 = selector.select(population);

                    if (operator.getArgCount() === 2)
                    {
                        var genome2 = selector.select(population);
                        genome = executor.execute(genome1, genome2);
                    }
                    else
                    {
                        genome = executor.execute(genome1);
                    }
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

            if (this.addUnique(newPop, genome))
            {
                count = -1;
            }

            count++;

            if (count > 2 * maxTries)
            {
                var message = "ERROR: can't fill population. count = " + count
                        + " isCrossover ? " + isCrossover;
                LOGGER.error(message);
                throw message;
            }
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

    this.getPopulation = function()
    {
        return population;
    }

    this.runGeneration = function(g, callback)
    {
        LOGGER.trace("GeneticAlgorithm.runGeneration() start g = " + g);
        this.fireMessage("Generation " + g);
        var bestEval;
        var bestGenome;
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

        if (bestEval >= evaluator.getIdealEvaluation())
        {
            message = "Ideal evaluation. Stopping.";
            LOGGER.debug(message);
            isDone = true;
        }
        else
        {
            var bestEvalBack = bestEvals[g - backCount];

            if (bestEvalBack && bestEval == bestEvalBack)
            {
                message = "No improvement. Stopping.";
                LOGGER.debug(message);
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

        LOGGER.trace("GeneticAlgorithm.runGeneration() end g = " + g);
    }
}

MicroEvent.mixin(GeneticAlgorithm);
