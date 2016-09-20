define([ "Arithmetic", "Relational", "Terminal", "../../../example/main/js/CartCentering" ], function(Arithmetic,
        Relational, Terminal, CartCentering)
{
    "use strict";
    QUnit.module("CartCentering.Evaluator");

    QUnit.test("CartCentering.Evaluator()", function(assert)
    {
        // Setup.
        var fitnessCases = createFitnessCases();
        var xThreshold = 0.01;
        var vThreshold = 0.01;
        var evaluator = new CartCentering.Evaluator(fitnessCases, xThreshold, vThreshold);
        var population = [];
        population.push(createTreeNode());

        // Run.
        evaluator.evaluate(population);

        // Verify.
        var result = population[0];
        assert.ok(result);
        assert.equal(Math.vizziniRound(result.fitness, 2), 104.17);
    });

    function addFitnessCase(fitnessCases, x, v)
    {
        fitnessCases.push(
        {
            input:
            {
                x: x,
                v: v,
            },
            output: 0, // Output is irrevelant for this problem.
        });
    }

    function createFitnessCases()
    {
        var fitnessCases = [];

        var minX = -0.75;
        var maxX = 0.75;
        var minV = -0.75;
        var maxV = 0.75;

        addFitnessCase(fitnessCases, minX, minV);
        addFitnessCase(fitnessCases, maxX, minV);
        addFitnessCase(fitnessCases, minX, maxV);
        addFitnessCase(fitnessCases, maxX, maxV);

        return fitnessCases;
    }

    function createTreeNode()
    {
        // -1 * x
        var child0 = new Terminal.Constant(-1.0);
        var child1 = new Terminal.Variable("x");
        var function0 = new Arithmetic.Multiply([ child0, child1 ]);

        // v * abs(v)
        var child2 = new Terminal.Variable("v");
        var child3 = new Terminal.Variable("v");
        var function2 = new Arithmetic.AbsoluteValue([ child3 ]);
        var function1 = new Arithmetic.Multiply([ child2, function2 ]);

        // Greater than
        return new Relational.GreaterThan([ function0, function1 ]);
    }
});
