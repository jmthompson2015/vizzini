define([ "Arithmetic", "Evaluator", "Terminal" ], function(Arithmetic, Evaluator, Terminal)
{
    "use strict";
    QUnit.module("Evaluator");

    QUnit.test("Evaluator()", function(assert)
    {
        // Setup.
        var population = [];
        population.push(createTree0());
        population.push(createTree1());
        var fitnessCases = createFitnessCases();
        var isMatches = false;
        var errorThreshold = 0.001;
        var evaluator = new Evaluator(fitnessCases.contexts, fitnessCases.outputs, isMatches, errorThreshold);

        // Run.
        evaluator.evaluate(population);

        // Verify.
        for (var i = 0; i < population.length; i++)
        {
            assert.ok(population[i].fitness);
            assert.ok(population[i].fitness > 0.0);
        }
    });

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
});
