define([ "Arithmetic", "CopyOperator", "CrossoverOperator", "Evaluator", "GeneticAlgorithm", "GenomeComparator",
        "GenomeFactory", "Operator", "PopulationGenerator", "SelectionOperator", "Terminal" ], function(Arithmetic,
        CopyOperator, CrossoverOperator, Evaluator, GeneticAlgorithm, GenomeComparator, GenomeFactory, Operator,
        PopulationGenerator, SelectionOperator, Terminal)
{
    "use strict";
    function TwoBoxesWithoutADF(popSize, generationCount)
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);

        var fitnessCases;
        var functions;
        var maxDepth = 6;
        var terminals;

        this.createEvaluator = function()
        {
            var fitnessCases = this.fitnessCases();
            var isMatches = false;
            var errorThreshold = 0.01;
            var idealGenomeLength = 11;

            return new Evaluator(fitnessCases.contexts, fitnessCases.outputs, isMatches, errorThreshold,
                    idealGenomeLength);
        };

        this.createGeneticAlgorithm = function()
        {
            var population = this.createPopulation();
            var evaluator = this.createEvaluator();
            var comparator = GenomeComparator;
            var selector = this.createSelector();
            var operators = this.createOperators();
            var genomeFactory = this.createGenomeFactory();

            return new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators[0],
                    operators[1], genomeFactory);
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

            return new SelectionOperator.Selector(selectionCount, SelectionOperator.fitnessProportionalSelect);
        };

        this.fitnessCases = function()
        {
            if (!fitnessCases)
            {
                var contexts = [];
                var outputs = [];

                contexts.push(
                {
                    L0: 3,
                    W0: 4,
                    H0: 7,
                    L1: 2,
                    W1: 5,
                    H1: 3,
                });
                outputs.push(54);

                contexts.push(
                {
                    L0: 7,
                    W0: 10,
                    H0: 9,
                    L1: 10,
                    W1: 3,
                    H1: 1,
                });
                outputs.push(600);

                contexts.push(
                {
                    L0: 10,
                    W0: 9,
                    H0: 4,
                    L1: 8,
                    W1: 1,
                    H1: 6,
                });
                outputs.push(312);

                contexts.push(
                {
                    L0: 3,
                    W0: 9,
                    H0: 5,
                    L1: 1,
                    W1: 6,
                    H1: 4,
                });
                outputs.push(111);

                contexts.push(
                {
                    L0: 4,
                    W0: 3,
                    H0: 2,
                    L1: 7,
                    W1: 6,
                    H1: 1,
                });
                outputs.push(-18);

                contexts.push(
                {
                    L0: 3,
                    W0: 3,
                    H0: 1,
                    L1: 9,
                    W1: 5,
                    H1: 4,
                });
                outputs.push(-171);

                contexts.push(
                {
                    L0: 5,
                    W0: 9,
                    H0: 9,
                    L1: 1,
                    W1: 7,
                    H1: 6,
                });
                outputs.push(363);

                contexts.push(
                {
                    L0: 1,
                    W0: 2,
                    H0: 9,
                    L1: 3,
                    W1: 9,
                    H1: 2,
                });
                outputs.push(-36);

                contexts.push(
                {
                    L0: 2,
                    W0: 6,
                    H0: 8,
                    L1: 2,
                    W1: 6,
                    H1: 10,
                });
                outputs.push(-24);

                contexts.push(
                {
                    L0: 8,
                    W0: 1,
                    H0: 10,
                    L1: 7,
                    W1: 5,
                    H1: 1,
                });
                outputs.push(45);

                fitnessCases =
                {
                    contexts: contexts,
                    outputs: outputs,
                };

            }

            return fitnessCases;
        };

        this.functions = function()
        {
            if (!functions)
            {
                functions = [];

                functions.push(Arithmetic.Add);
                functions.push(Arithmetic.Divide);
                functions.push(Arithmetic.Multiply);
                functions.push(Arithmetic.Subtract);
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

                terminals.push(new Terminal.Variable("L0"));
                terminals.push(new Terminal.Variable("W0"));
                terminals.push(new Terminal.Variable("H0"));
                terminals.push(new Terminal.Variable("L1"));
                terminals.push(new Terminal.Variable("W1"));
                terminals.push(new Terminal.Variable("H1"));
            }

            return terminals;
        };
    }

    return TwoBoxesWithoutADF;
});
