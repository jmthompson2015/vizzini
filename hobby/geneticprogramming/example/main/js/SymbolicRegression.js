define([ "Arithmetic", "Logarithmic", "Terminal", "Trigonometric", "process/CopyOperator", "process/CrossoverOperator",
        "process/GeneticAlgorithm", "process/GenomeComparator", "process/GenomeFactory", "process/NumericEvaluator",
        "process/Operator", "process/PopulationGenerator", "process/SelectionOperator" ], function(Arithmetic,
        Logarithmic, Terminal, Trigonometric, CopyOperator, CrossoverOperator, GeneticAlgorithm, GenomeComparator,
        GenomeFactory, NumericEvaluator, Operator, PopulationGenerator, SelectionOperator)
{
    "use strict";
    function SymbolicRegression(store, popSize, generationCount)
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
            var errorThreshold = 0.01;
            var idealGenomeLength = 13;

            return new NumericEvaluator(fitnessCases, errorThreshold, idealGenomeLength);
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

            return new SelectionOperator.Selector(selectionCount, SelectionOperator.fitnessProportionalSelect);
        };

        this.fitnessCases = function()
        {
            var fitnessCases = [];

            for (var i = 0; i < 20; i++)
            {
                var x = (i / 10) - 1;
                fitnessCases.push(
                {
                    input:
                    {
                        x: x,
                    },
                    output: Math.pow(x, 4) + Math.pow(x, 3) + Math.pow(x, 2) + x,
                });
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
                functions.push(Trigonometric.Sine);
                functions.push(Trigonometric.Cosine);
                functions.push(Logarithmic.Exponential);
                functions.push(Logarithmic.Logarithm);
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

                terminals.push(new Terminal.Variable("x"));
            }

            return terminals;
        };
    }

    return SymbolicRegression;
});
