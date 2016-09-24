define([ "GenomeComparator", "Logic", "Terminal", "process/CopyOperator", "process/CrossoverOperator",
        "process/GeneticAlgorithm", "process/GenomeFactory", "process/MatchEvaluator", "process/Operator",
        "process/PopulationGenerator", "process/SelectionOperator" ], function(GenomeComparator, Logic, Terminal,
        CopyOperator, CrossoverOperator, GeneticAlgorithm, GenomeFactory, MatchEvaluator, Operator,
        PopulationGenerator, SelectionOperator)
{
    "use strict";
    function XOR(store, popSize, generationCount)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("popSize", popSize);
        InputValidator.validateNotNull("generationCount", generationCount);

        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);

        var fitnessCases;
        var functions;
        var maxDepth = 6;
        var terminals;

        this.createEvaluator = function()
        {
            var fitnessCases = this.fitnessCases();
            var idealGenomeLength = 8;

            return new MatchEvaluator(fitnessCases);
        };

        this.createGeneticAlgorithm = function()
        {
            var population = this.createPopulation();
            var evaluator = this.createEvaluator();
            var comparator = GenomeComparator;
            var selector = this.createSelector();
            var operators = this.createOperators();
            var genomeFactory = this.createGenomeFactory();

            return new GeneticAlgorithm(store, population, evaluator, generationCount, comparator, selector,
                    operators[0], operators[1], genomeFactory);
        };

        this.createGenomeFactory = function()
        {
            return new GenomeFactory.Full(this.functions(), this.terminals(), maxDepth);
        };

        this.createOperators = function()
        {
            var operators = [];
            operators.push(new Operator(0.05, 1, new CopyOperator.Copier(CopyOperator.copy)));
            operators.push(new Operator(0.95, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.crossover)));

            return operators;
        };

        this.createPopulation = function()
        {
            var populationGenerator = new PopulationGenerator(this.functions(), this.terminals(), maxDepth, popSize);

            return populationGenerator.generate();
        };

        this.createSelector = function()
        {
            var selectionCount = Math.floor(0.50 * popSize);

            return new SelectionOperator.Selector(selectionCount, SelectionOperator.simpleTournamentSelect);
        };

        this.fitnessCases = function()
        {
            if (!fitnessCases)
            {
                fitnessCases = [];

                fitnessCases.push(
                {
                    input:
                    {
                        a: false,
                        b: false,
                    },
                    output: false,
                });

                fitnessCases.push(
                {
                    input:
                    {
                        a: false,
                        b: true,
                    },
                    output: true,
                });

                fitnessCases.push(
                {
                    input:
                    {
                        a: true,
                        b: false,
                    },
                    output: true,
                });

                fitnessCases.push(
                {
                    input:
                    {
                        a: true,
                        b: true,
                    },
                    output: false,
                });
            }

            return fitnessCases;
        };

        this.functions = function()
        {
            if (!functions)
            {
                functions = [];

                functions.push(Logic.And);
                functions.push(Logic.Not);
                functions.push(Logic.Or);
            }

            return functions;
        };

        this.objective = function()
        {
            return "Find an equation to produce the given outputs from the given inputs.";
        };

        this.terminals = function()
        {
            if (!terminals)
            {
                terminals = [];

                terminals.push(new Terminal.Variable("a"));
                terminals.push(new Terminal.Variable("b"));
            }

            return terminals;
        };
    }

    return XOR;
});
