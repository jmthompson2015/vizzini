define([ "process/Action", "process/Population" ], function(Action, Population)
{
    "use strict";
    function GeneticAlgorithm(store, population, evaluator, generationCount, comparator, selector, copyOperator,
            crossoverOperator, genomeFactory, duplicatesAllowedIn)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("population", population);
        InputValidator.validateNotNull("evaluator", evaluator);
        InputValidator.validateNotNull("generationCount", generationCount);
        InputValidator.validateNotNull("comparator", comparator);
        InputValidator.validateNotNull("selector", selector);
        InputValidator.validateNotNull("copyOperator", copyOperator);
        InputValidator.validateNotNull("crossoverOperator", crossoverOperator);
        InputValidator.validateNotNull("genomeFactory", genomeFactory);

        if (copyOperator.ratio() + crossoverOperator.ratio() !== 1.0) { throw "Sum of operator ratios must be 1.0: " +
                (copyOperator.ratio() + crossoverOperator.ratio()); }

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

        this.selector = function()
        {
            return selector;
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

            // Copy.
            var operator = copyOperator;
            var count = Math.max(0, Math.floor(operator.ratio() * popSize));
            this.fillPopulationCopy(newPop, newPop.length() + count, maxTries, operator);

            // Crossover.
            operator = crossoverOperator;
            count = Math.max(0, Math.floor(operator.ratio() * popSize));
            this.fillPopulationCrossover(newPop, newPop.length() + count, maxTries, operator);

            population = newPop.slice();
            LOGGER.debug("population.length() = " + population.length());
            LOGGER.trace("GeneticAlgorithm.createNextGeneration() end");
        };

        this.fillPopulationCopy = function(newPop, popSize, maxTries, operator)
        {
            var executor = operator.executor();

            while (newPop.length() < popSize)
            {
                var genome1 = selector.select(population);
                var genome = executor.execute(genome1);

                newPop.maybeAddGenome(genome, duplicatesAllowed);
            }
        };

        this.fillPopulationCrossover = function(newPop, popSize, maxTries, operator)
        {
            var executor = operator.executor();
            var count = 0;

            while (newPop.length() < popSize)
            {
                var genome1 = selector.select(population);
                var genome2 = selector.select(population);

                var genomes = executor.execute(genome1, genome2);

                var isAdded0 = newPop.maybeAddGenome(genomes[0], duplicatesAllowed);
                var isAdded1 = newPop.maybeAddGenome(genomes[1], duplicatesAllowed);

                count = (isAdded0 || isAdded1 ? 0 : count + 1);

                if (count >= maxTries)
                {
                    LOGGER.info("generating a new random genome; count = " + count);
                    var genome = genomeFactory.generate();
                    newPop.maybeAddGenome(genome, true);
                    count = 0;
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
        bestGenome = population.get(0);
        bestEval = bestGenome.fitness;

        bestGenome.timestamp = moment().format("HH:mm:ss:SSS");
        bestGenome.generationCount = g;
        bestGenome.averageFitness = population.averageFitness();
        this.store().dispatch(Action.addBestGenome(bestGenome));

        if (bestGenome.hits === evaluator.fitnessCases().length)
        {
            message = "Ideal hits. Stopping.";
            LOGGER.debug(message);
            isDone = true;
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
