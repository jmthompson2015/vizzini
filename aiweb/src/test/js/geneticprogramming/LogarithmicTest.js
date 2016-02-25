define([ "Logarithmic", "Terminal" ], function(Logarithmic, Terminal)
{
    "use strict";
    QUnit.module("Logarithmic");

    QUnit.test("Exp()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(0);

        // Run.
        var result = new Logarithmic.Exp([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Exp.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(0);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Exp([ child ]).evaluate(), 4), 1);
    });

    QUnit.test("Exp.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: 0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Exp([ childX ]).evaluate(context), 4), 1);
    });

    QUnit.test("Log()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(1);

        // Run.
        var result = new Logarithmic.Log([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Log.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(1);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Log([ child ]).evaluate(), 4), 0);
    });

    QUnit.test("Log.evaluate() zero", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(0);

        // Run / Verify.
        assert.equal(new Logarithmic.Log([ child ]).evaluate(), 0);
    });

    QUnit.test("Log.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: 1,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Logarithmic.Log([ childX ]).evaluate(context), 4), 0);
    });
});
