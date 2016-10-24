define([ "Arithmetic", "Relational", "Terminal", "problem/CartCentering" ], function(Arithmetic, Relational, Terminal,
        CartCentering)
{
    "use strict";
    QUnit.module("CartCentering.Simulator");

    QUnit.test("CartCentering.Simulator() Negative Negative", function(assert)
    {
        // Setup.
        var xThreshold = 0.01;
        var vThreshold = 0.01;
        var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
        var x0 = -0.75;
        var v0 = -0.75;
        var genome = createTreeNodeCorrect();
        var isVerbose = false;

        // Run.
        var result = simulator.run(x0, v0, genome, isVerbose);

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 2), 3.18);
    });

    QUnit.test("CartCentering.Simulator() Positive Negative", function(assert)
    {
        // Setup.
        var xThreshold = 0.01;
        var vThreshold = 0.01;
        var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
        var x0 = 0.75;
        var v0 = -0.75;
        var genome = createTreeNodeCorrect();
        var isVerbose = false;

        // Run.
        var result = simulator.run(x0, v0, genome, isVerbose);

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 2), 1.62);
    });

    QUnit.test("CartCentering.Simulator() Negative Positive", function(assert)
    {
        // Setup.
        var xThreshold = 0.01;
        var vThreshold = 0.01;
        var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
        var x0 = -0.75;
        var v0 = 0.75;
        var genome = createTreeNodeCorrect();
        var isVerbose = false;

        // Run.
        var result = simulator.run(x0, v0, genome, isVerbose);

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 2), 1.62);
    });

    QUnit.test("CartCentering.Simulator() Positive Positive", function(assert)
    {
        // Setup.
        var xThreshold = 0.01;
        var vThreshold = 0.01;
        var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
        var x0 = 0.75;
        var v0 = 0.75;
        var genome = createTreeNodeCorrect();
        var isVerbose = false;

        // Run.
        var result = simulator.run(x0, v0, genome, isVerbose);

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 2), 3.18);
    });

    QUnit.test("CartCentering.Simulator() Bad Positive Negative", function(assert)
    {
        // Setup.
        var xThreshold = 0.01;
        var vThreshold = 0.01;
        var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
        var x0 = 0.75;
        var v0 = -0.75;
        var genome = createTreeNodeBad();
        var isVerbose = false;

        // Run.
        var result = simulator.run(x0, v0, genome, isVerbose);

        // Verify.
        assert.ok(result);
        assert.equal(Math.vizziniRound(result, 2), 10.00);
    });

    function createTreeNodeCorrect()
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

    function createTreeNodeBad()
    {
        // v * x
        var child0 = new Terminal.Variable("v");
        var child1 = new Terminal.Variable("x");
        var function0 = new Arithmetic.Multiply([ child0, child1 ]);

        // v * x
        var child2 = new Terminal.Variable("v");
        var child3 = new Terminal.Variable("x");
        var function1 = new Arithmetic.Multiply([ child2, child3 ]);

        // Multiply
        return new Arithmetic.Multiply([ function0, function1 ]);
    }
});
