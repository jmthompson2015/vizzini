define([ "process/Action", "process/CopyOperator", "process/Population" ], function(Action, CopyOperator, Population)
{
    "use strict";
    function GeneticAlgorithm(store, populationIn, evaluator, generationCount, comparator, selector, operators,
            genomeFactory, backCount, duplicatesAllowedIn)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("population", populationIn);
        InputValidator.validateNotNull("evaluator", evaluator);
        InputValidator.validateNotNull("generationCount", generationCount);
        InputValidator.validateNotNull("comparator", comparator);
        InputValidator.validateNotNull("selector", selector);
        InputValidator.validateNotEmpty("operators", operators);
        InputValidator.validateNotNull("genomeFactory", genomeFactory);
        InputValidator.validateNotNull("backCount", backCount);
        // duplicatesAllowedIn optional.

        {
            var sum = operators.reduce(function(previousValue, operator)
            {
                LOGGER.info("operator.ratio() = " + operator.ratio() + " sum = " + (previousValue + operator.ratio()));
                return previousValue + operator.ratio();
            }, 0.0);

            LOGGER.info("Operators ratio sum = " + sum);

            if (Math.vizziniRound(sum, 4) !== 1.00) { throw "Operator ratios do not sum to 1.00: " + sum; }
        }

        var population = populationIn.slice();
        var duplicatesAllowed = (duplicatesAllowedIn ? duplicatesAllowedIn : false);

        this.store = function()
        {
            return store;
        };

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

        this.backCount = function()
        {
            return backCount;
        };

        this.duplicatesAllowed = function()
        {
            return duplicatesAllowed;
        };

        this.createNextGeneration = function()
        {
            LOGGER.trace("GeneticAlgorithm.createNextGeneration() start");
            var newPop = new Population();

            // Apply the operators to create the next generation.
            var popSize = population.length();
            var maxTries = 100;

            operators.forEach(function(operator)
            {
                var count = Math.max(0, Math.floor(operator.ratio() * popSize));
                this.fillPopulation(newPop, newPop.length() + count, maxTries, operator);
            }, this);

            population = newPop.slice();
            LOGGER.debug("population.length() = " + population.length());
            LOGGER.trace("GeneticAlgorithm.createNextGeneration() end");
        };

        this.fillPopulation = function(newPop, popSize, maxTries, operator)
        {
            var executor = operator.executor();
            var isCopier = (executor instanceof CopyOperator.Copier);
            var count = 0;
            var genome;

            while (newPop.length() < popSize)
            {
                if (count < maxTries)
                {
                    if (isCopier)
                    {
                        var genome1 = population.get(count);
                        genome = executor.execute(genome1);
                    }
                    else
                    {
                        var genome1 = selector.select(population);

                        if (operator.argCount() === 2)
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

                if (newPop.maybeAddGenome(genome, this.duplicatesAllowed()))
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
        var bestGenome = population.get(0);
        var bestEval = bestGenome.fitness;

        bestGenome.timestamp = moment().format("HH:mm:ss:SSS");
        bestGenome.generationCount = g;
        bestGenome.averageFitness = population.averageFitness();
        this.store().dispatch(Action.addBestGenome(bestGenome));

        if (bestEval === 0)
        {
            message = "Ideal evaluation. Stopping.";
            LOGGER.debug(message);
            isDone = true;
        }
        else if (bestGenome.hits === evaluator.fitnessCases().length)
        {
            message = "Ideal hits. Stopping.";
            LOGGER.debug(message);
            isDone = true;
        }
        else
        {
            var backIndex = g - this.backCount();

            if (0 <= backIndex && backIndex < g)
            {
                var bestBack = this.store().getState().bestGenomes[backIndex];
                var bestEvalBack = bestBack.fitness;

                if (bestEval === bestEvalBack)
                {
                    message = "No improvement. Stopping.";
                    LOGGER.debug(message);
                    isDone = true;
                }
            }
        }

        if (isDone)
        {
            this.store().dispatch(Action.setMessage(message));
            callback(this, bestGenome);
        }
        else
        {
            var self = this;

            setTimeout(function()
            {
                self.runGeneration(g + 1, callback);
            }, 100);
        }

        LOGGER.trace("GeneticAlgorithm.runGeneration() end g = " + g);
    };

    return GeneticAlgorithm;
});
