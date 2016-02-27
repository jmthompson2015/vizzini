define([ "Arithmetic", "CopyOperator", "CrossoverOperator", "Evaluator", "GeneticAlgorithm", "GenomeComparator",
        "GenomeFactory", "Logarithmic", "Operator", "PopulationGenerator", "SelectionOperator", "Terminal",
        "Trigonometric" ], function(Arithmetic, CopyOperator, CrossoverOperator, Evaluator, GeneticAlgorithm,
        GenomeComparator, GenomeFactory, Logarithmic, Operator, PopulationGenerator, SelectionOperator, Terminal,
        Trigonometric)
{
    "use strict";
    function SymbolicRegression(popSize, generationCount)
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
            var idealGenomeLength = 13;

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

            return new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators,
                    genomeFactory);
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
            var selectionCount = Math.floor(0.20 * popSize);

            return new SelectionOperator.Selector(selectionCount, SelectionOperator.fitnessProportionalSelect);
        };

        this.fitnessCases = function()
        {
            if (!fitnessCases)
            {
                var contexts = [];
                var outputs = [];

                for (var i = 0; i < 20; i++)
                {
                    var x = (i / 10) - 1;
                    contexts[i] =
                    {
                        x: x,
                    };
                    outputs[i] = Math.pow(x, 4) + Math.pow(x, 3) + Math.pow(x, 2) + x;
                }

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
                functions.push(Trigonometric.Sin);
                functions.push(Trigonometric.Cos);
                functions.push(Logarithmic.Exp);
                functions.push(Logarithmic.Log);
            }

            return functions;
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
