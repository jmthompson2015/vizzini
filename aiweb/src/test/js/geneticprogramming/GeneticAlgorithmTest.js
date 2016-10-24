define([ "Arithmetic", "CopyOperator", "CountVisitor", "CrossoverOperator", "Evaluator", "GeneticAlgorithm",
        "GenomeComparator", "GenomeFactory", "Operator", "PopulationGenerator", "SelectionOperator",
        "StringifyVisitor", "Terminal" ], function(Arithmetic, CopyOperator, CountVisitor, CrossoverOperator,
        Evaluator, GeneticAlgorithm, GenomeComparator, GenomeFactory, Operator, PopulationGenerator, SelectionOperator,
        StringifyVisitor, Terminal)
{
    "use strict";
    QUnit.module("GeneticAlgorithm");

    var functions = [];
    functions.push(Arithmetic.Add);
    functions.push(Arithmetic.Divide);
    functions.push(Arithmetic.Multiply);
    functions.push(Arithmetic.Subtract);
    var terminals = [];
    terminals.push(new Terminal.Variable("x"));
    var maxDepth = 6;
    var popSize = 500;
    var generationCount = 51;

    QUnit.test("GeneticAlgorithm()", function(assert)
    {
        // Setup.
        var population = [];
        population.push(createTree0());
        population.push(createTree1());
        var evaluator = createEvaluator();
        var comparator = GenomeComparator;
        var selector = createSelector(popSize);
        var copyOperator = new Operator(0.10, 1, new CopyOperator.Copier(CopyOperator.copy));
        var crossoverOperator = new Operator(0.90, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.crossover));
        var fullGenerator = new GenomeFactory.Full(functions, terminals, maxDepth);

        // Run.
        var result = new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, copyOperator,
                crossoverOperator, fullGenerator);

        // Verify.
        assert.ok(result);
        assert.equal(result.generationCount(), generationCount);
    });

    QUnit.test("determineBest()", function(assert)
    {
        // Setup.
        var maxDepth = 6;
        var popSize = 500;
        var populationGenerator = new PopulationGenerator(functions, terminals, maxDepth, popSize);
        var population = populationGenerator.generate();
        var evaluator = createEvaluator();
        var generationCount = 21;
        var comparator = GenomeComparator;
        var selector = createSelector(popSize);
        var copyOperator = new Operator(0.10, 1, new CopyOperator.Copier(CopyOperator.copy));
        var crossoverOperator = new Operator(0.90, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.crossover));
        var genomeFactory = new GenomeFactory.Full(functions, terminals, maxDepth);
        var ga = new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, copyOperator,
                crossoverOperator, genomeFactory);
        ga.bind("generation", function(geneticAlgorithm, generationCount)
        {
            var best = geneticAlgorithm.population()[0];
            var visitor1 = new StringifyVisitor(best);
            var visitor2 = new CountVisitor(best);
            LOGGER.info("Generation " + generationCount + ": " + Math.vizziniRound(best.fitness, 4) + " " +
                    visitor1.string() + " nodeCount=" + visitor2.nodeCount());
        });
        var callback = function(geneticAlgorithm, bestGenome)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(bestGenome);
            LOGGER.info("Run completed.");
            done();
        };

        // Run.
        var done = assert.async();
        ga.determineBest(callback);
    });

    function createEvaluator()
    {
        var fitnessCases = createFitnessCases();
        var isMatches = false;
        var errorThreshold = 0.01;
        var idealGenomeLength = 13;
        var evaluator = new Evaluator(fitnessCases.contexts, fitnessCases.outputs, isMatches, errorThreshold,
                idealGenomeLength);

        return evaluator;
    }

    function createFitnessCases()
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

        var answer =
        {
            contexts: contexts,
            outputs: outputs,
        };

        return answer;
    }

    function createSelector(popSize)
    {
        var selectionCount = Math.floor(0.50 * popSize);
        var selector = new SelectionOperator.Selector(selectionCount, SelectionOperator.fitnessProportionalSelect);

        return selector;
    }

    function createTree0()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node5 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        return node1;
    }

    function createTree1()
    {
        var node3 = new Terminal.Constant(2);
        var node4 = new Terminal.Variable("y");
        var node5 = new Terminal.Constant(3);
        var node2 = new Arithmetic.Subtract([ node3, node4 ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }
});
