define([ "Arithmetic", "CopyOperator", "CrossoverOperator", "Evaluator", "GeneticAlgorithm", "GenomeComparator",
        "Operator", "PopulationGenerator", "SelectionOperator", "StringifyVisitor", "Terminal", "TreeGenerator",
        "TreeVisitor" ], function(Arithmetic, CopyOperator, CrossoverOperator, Evaluator, GeneticAlgorithm,
        GenomeComparator, Operator, PopulationGenerator, SelectionOperator, StringifyVisitor, Terminal, TreeGenerator,
        TreeVisitor)
{
    "use strict";
    QUnit.module("GeneticAlgorithm");

    var functions = [];
    functions.push(Arithmetic.Add);
    functions.push(Arithmetic.Divide);
    functions.push(Arithmetic.Multiply);
    functions.push(Arithmetic.Subtract);
    var terminals = [];
    terminals.push(new Terminal.Constant(1));
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
        var selector = createSelector(population);
        var operators = [];
        var fullGenerator = new TreeGenerator.Full(functions, terminals, maxDepth);

        // Run.
        var result = new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators,
                fullGenerator);

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
        var generationCount = 11;
        var comparator = GenomeComparator;
        var selector = createSelector(population);
        var operators = [ new Operator(0.20, 1, new CopyOperator.Copier(CopyOperator.copy)),
                new Operator(0.80, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.tree)) ];
        var genomeFactory = new TreeGenerator.Full(functions, terminals, maxDepth);
        var ga = new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector, operators,
                genomeFactory);
        ga.bind("generation", function(generationCount)
        {
            var best = ga.population()[0];
            var visitor = new StringifyVisitor(best);
            LOGGER.info("Generation " + generationCount + ": " + Math.vizziniRound(best.fitness, 4) + " " +
                    visitor.string())
        });
        var callback = function(state)
        {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var best = ga.population()[0];
            assert.ok(best);
            var visitor = new TreeVisitor(best);
            LOGGER.info(Math.vizziniRound(best.fitness, 4) + "\n" + visitor.description());
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
        var errorThreshold = 0.001;
        var evaluator = new Evaluator(fitnessCases.contexts, fitnessCases.outputs, isMatches, errorThreshold);

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

    function createSelector(population)
    {
        var selectionCount = Math.floor(0.20 * population.length);
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
