define([ "Arithmetic", "Evaluator", "GenomeComparator", "Terminal" ], function(Arithmetic, Evaluator, GenomeComparator,
        Terminal)
{
    "use strict";
    QUnit.module("Evaluator");

    QUnit.test("Evaluator()", function(assert)
    {
        // Setup.
        var population = [];
        population.push(createTree0());
        population.push(createTree1());
        population.push(createTree2());
        var fitnessCases = createFitnessCases();
        var isMatches = false;
        var errorThreshold = 0.1;
        var evaluator = new Evaluator(fitnessCases.contexts, fitnessCases.outputs, isMatches, errorThreshold);

        // Run.
        evaluator.evaluate(population);

        // Verify.
        var i;
        for (i = 0; i < population.length; i++)
        {
            assert.ok(population[i].fitness);
        }

        i = 0;
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 3.3595);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 1.0842);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 1000);

        population.sort(GenomeComparator);
        i = 0;
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 1000);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 3.3595);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 1.0842);
    });

    function createTree0()
    {
        // (- (+ x 1) 2) => (x + 1) - 2
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
        var node4 = new Terminal.Variable("x");
        var node5 = new Terminal.Constant(3);
        var node2 = new Arithmetic.Subtract([ node3, node4 ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }

    function createTree2()
    {
        var node17 = new Terminal.Variable("x");
        var node18 = new Terminal.Variable("x");
        var node19 = new Terminal.Variable("x");
        var node16 = new Arithmetic.Multiply([ node17, node18 ]);
        var node15 = new Arithmetic.Add([ node16, node19 ]);

        var node12 = new Terminal.Variable("x");
        var node13 = new Terminal.Variable("x");
        var node14 = new Terminal.Variable("x");
        var node11 = new Arithmetic.Multiply([ node12, node13 ]);
        var node10 = new Arithmetic.Multiply([ node11, node14 ]);
        var node9 = new Arithmetic.Add([ node10, node15 ]);

        var node5 = new Terminal.Variable("x");
        var node6 = new Terminal.Variable("x");
        var node7 = new Terminal.Variable("x");
        var node8 = new Terminal.Variable("x");
        var node4 = new Arithmetic.Multiply([ node5, node6 ]);
        var node3 = new Arithmetic.Multiply([ node4, node7 ]);
        var node2 = new Arithmetic.Multiply([ node3, node8 ]);
        var node1 = new Arithmetic.Add([ node2, node9 ]);

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
