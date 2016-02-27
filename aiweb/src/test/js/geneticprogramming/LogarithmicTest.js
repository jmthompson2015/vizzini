define([ "Logarithmic", "Terminal" ], function(Logarithmic, Terminal)
{
    "use strict";
    QUnit.module("Logarithmic");

    QUnit.test("Exponential()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(0);

        // Run.
        var result = new Logarithmic.Exponential([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Exponential.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(0);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Exponential([ child ]).evaluate(), 4), 1);
    });

    QUnit.test("Exponential.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: 0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Exponential([ childX ]).evaluate(context), 4), 1);
    });

    QUnit.test("Logarithm()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(1);

        // Run.
        var result = new Logarithmic.Logarithm([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Logarithm.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(1);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Logarithm([ child ]).evaluate(), 4), 0);
    });

    QUnit.test("Logarithm.evaluate() zero", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(0);

        // Run / Verify.
        assert.equal(new Logarithmic.Logarithm([ child ]).evaluate(), 0);
    });

    QUnit.test("Logarithm.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: 1,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Logarithm([ childX ]).evaluate(context), 4), 0);
    });
});
