define([ "process/Action", "process/CopyOperator", "process/GenomeEditor", "process/Population" ], function(Action,
        CopyOperator, GenomeEditor, Population)
{
    "use strict";
    function GeneticAlgorithm(store, populationIn, evaluator, generationCount, comparator, selector, operators,
            genomeFactory, duplicatesAllowedIn)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("population", populationIn);
        InputValidator.validateNotNull("evaluator", evaluator);
        InputValidator.validateNotNull("generationCount", generationCount);
        InputValidator.validateNotNull("comparator", comparator);
        InputValidator.validateNotNull("selector", selector);
        InputValidator.validateNotEmpty("operators", operators);
        InputValidator.validateNotNull("genomeFactory", genomeFactory);
        // duplicatesAllowedIn optional.

        {
            var sum = operators.reduce(function(previousValue, operator)
            {
                LOGGER.info("operator.ratio() = " + operator.ratio() + " sum = " + (previousValue + operator.ratio()));
                return previousValue + operator.ratio();
            }, 0.0);

            LOGGER.info("Operators ratio sum = " + sum);

            if (sum !== 1.00) { throw "Operator ratios do not sum to 1.00: " + sum; }
        }

        // FIXME: duplicate the input population
        var population = populationIn;
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

            if (isCopier)
            {
                // Copy.
                var count = Math.max(0, Math.floor(operator.ratio() * popSize));
                this.fillPopulationCopy(newPop, newPop.length() + count, maxTries, operator);
            }
            else
            {
                // Crossover.
                count = Math.max(0, Math.floor(operator.ratio() * popSize));
                this.fillPopulationCrossover(newPop, newPop.length() + count, maxTries, operator);
            }
        };

        this.fillPopulationCopy = function(newPop, popSize, maxTries, operator)
        {
            var executor = operator.executor();

            // Always copy an edited version of the best genome.
            var genome = executor.execute(population.get(0));
            genome = GenomeEditor.edit(genome);
            newPop.maybeAddGenome(genome, true);

            while (newPop.length() < popSize)
            {
                var genome1 = selector.select(population);
                genome = executor.execute(genome1);

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
