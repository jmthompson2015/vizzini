define([ "Arithmetic", "Terminal", "process/GenomeComparator", "process/NumericEvaluator" ], function(Arithmetic,
        Terminal, GenomeComparator, NumericEvaluator)
{
    "use strict";
    QUnit.module("NumericEvaluator");

    QUnit.test("NumericEvaluator()", function(assert)
    {
        // Setup.
        var population = [];
        population.push(createTree0());
        population.push(createTree1());
        population.push(createTree2());
        var fitnessCases = createFitnessCases();
        var errorThreshold = 0.1;
        var evaluator = new NumericEvaluator(fitnessCases, errorThreshold);

        // Run.
        evaluator.evaluate(population);

        // Verify.
        var i;
        for (i = 0; i < population.length; i++)
        {
            assert.ok(population[i].fitness !== undefined);
        }

        i = 0;
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 29.7666);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 92.2334);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 0);

        population.sort(GenomeComparator);
        i = 0;
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 0);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 29.7666);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 92.2334);
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
        // (2 - x) + 3
        var node3 = new Terminal.Constant(2);
        var node4 = new Terminal.Variable("x");
        var node5 = new Terminal.Constant(3);
        var node2 = new Arithmetic.Subtract([ node3, node4 ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }

    function createTree2()
    {
        var x = new Terminal.Variable("x");
        var node9 = new Arithmetic.Multiply([ x, x ]);
        var node8 = new Arithmetic.Add([ node9, x ]);

        var node7 = new Arithmetic.Multiply([ x, x ]);
        var node6 = new Arithmetic.Multiply([ node7, x ]);
        var node5 = new Arithmetic.Add([ node6, node8 ]);

        var node4 = new Arithmetic.Multiply([ x, x ]);
        var node3 = new Arithmetic.Multiply([ node4, x ]);
        var node2 = new Arithmetic.Multiply([ node3, x ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }

    function createFitnessCases()
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
    }
});
