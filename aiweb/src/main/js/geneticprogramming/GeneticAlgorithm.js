define([ "CopyOperator", "PopulationUtilities" ], function(CopyOperator, PopulationUtilities)
{
    "use strict";
    function GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators, genomeFactory)
    {
        InputValidator.validateNotNull("population", population);
        InputValidator.validateNotNull("evaluator", evaluator);
        InputValidator.validateNotNull("generationCount", generationCount);
        InputValidator.validateNotNull("comparator", comparator);
        InputValidator.validateNotNull("selector", selector);
        InputValidator.validateNotNull("operators", operators);
        InputValidator.validateNotNull("genomeFactory", genomeFactory);

        this.population = function()
        {
            return population;
        };

        this.evaluator = function()
        {
            return evaluator;
        };

        this.generationCount = function()
        {
            return generationCount;
        };

        this.comparator = function()
        {
            return comparator;
        };

        this.selector = function()
        {
            return selector;
        };

        this.operators = function()
        {
            return operators;
        };

        this.addUnique = function(newPop, genome)
        {
            var answer = false;

            if (!PopulationUtilities.isDuplicate(newPop, genome))
            {
                newPop.push(genome);
                answer = true;
            }

            return answer;
        };

        this.createNextGeneration = function()
        {
            LOGGER.trace("GeneticAlgorithm.createNextGeneration() start");
            var newPop = [];

            // Apply the operators to create the next generation.
            var popSize = population.length;
            var maxTries = 100;

            operators.forEach(function(operator)
            {
                var isCopier = (operator.executor() instanceof CopyOperator.Copier);
                var count = Math.max(0, Math.floor(operator.ratio() * popSize));

                if (isCopier)
                {
                    this.fillPopulationCopy(newPop, newPop.length + count, maxTries, operator);
                }
                else
                {
                    this.fillPopulationCrossover(newPop, newPop.length + count, maxTries, operator);
                }
            }, this);

            population = newPop.slice();
            LOGGER.debug("population.length = " + population.length);
            LOGGER.trace("GeneticAlgorithm.createNextGeneration() end");
        };

        this.fillPopulationCopy = function(newPop, popSize, maxTries, operator)
        {
            var executor = operator.executor();
            var count = 0;

            while (newPop.length < popSize)
            {
                var genome = null;

                if (count < maxTries)
                {
                    var genome1 = population[count];
                    genome = executor.execute(genome1);
                }
                else
                {
                    genome = genomeFactory.generate();
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
                    var message = "ERROR: can't fill population. count = " + count + " isCrossover ? " + isCrossover;
                    LOGGER.error(message);
                    throw message;
                }
            }
        };

        this.fillPopulationCrossover = function(newPop, popSize, maxTries, operator)
        {
            var executor = operator.executor();
            var count = 0;

            while (newPop.length < popSize)
            {
                var genome = null;

                if (count < maxTries)
                {
                    var genome1 = selector.select(population);
                    var genome2 = selector.select(population);
                    var genomes = executor.execute(genome1, genome2);
                    genome = genomes[0];
                    this.addUnique(newPop, genome);
                    genome = genomes[1];
                }
                else
                {
                    genome = genomeFactory.generate();
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
                    var message = "ERROR: can't fill population. count = " + count + " isCrossover ? " + isCrossover;
                    LOGGER.error(message);
                    throw message;
                }
            }
        };
    }

    GeneticAlgorithm.prototype.determineBest = function(callback)
    {
        InputValidator.validateNotNull("callback", callback);

        LOGGER.trace("GeneticAlgorithm.determineBest() start");
        this.runGeneration(0, callback);
        LOGGER.trace("GeneticAlgorithm.determineBest() end");
    };

    GeneticAlgorithm.prototype.runGeneration = function(g, callback)
    {
        LOGGER.trace("GeneticAlgorithm.runGeneration() start g = " + g);
        var bestEval;
        var bestGenome;
        var message = "Done.";

        var isDone = (g >= (this.generationCount() - 1));

        if (g > 0)
        {
            this.createNextGeneration();
        }

        var population = this.population();
        var evaluator = this.evaluator();
        evaluator.evaluate(population);
        var comparator = this.comparator();
        population.sort(comparator);
        bestGenome = population[0];
        bestEval = bestGenome.fitness;
        this.trigger("generation", this, g);

        if (bestEval >= evaluator.idealEvaluation())
        {
            message = "Ideal evaluation. Stopping.";
            LOGGER.debug(message);
            isDone = true;
        }
        // else
        // {
        // var bestEvalBack = bestEvals[g - backCount];
        //
        // if (bestEvalBack && bestEval == bestEvalBack)
        // {
        // message = "No improvement. Stopping.";
        // LOGGER.debug(message);
        // isDone = true;
        // }
        // }

        if (isDone)
        {
            if (callback)
            {
                callback(this, bestGenome);
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
    };

    MicroEvent.mixin(GeneticAlgorithm);

    return GeneticAlgorithm;
});
