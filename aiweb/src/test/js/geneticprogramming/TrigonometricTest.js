define([ "Terminal", "Trigonometric" ], function(Terminal, Trigonometric)
{
    "use strict";
    QUnit.module("Trigonometric");

    QUnit.test("Sin()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run.
        var result = new Trigonometric.Sin([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Sin.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Sin([ child ]).evaluate(), 4), 0.7071);
    });

    QUnit.test("Sin.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: Math.PI / 4.0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Sin([ childX ]).evaluate(context), 4), 0.7071);
    });

    QUnit.test("Cos()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run.
        var result = new Trigonometric.Cos([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Cos.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Cos([ child ]).evaluate(), 4), 0.7071);
    });

    QUnit.test("Cos.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: Math.PI / 4.0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Cos([ childX ]).evaluate(context), 4), 0.7071);
    });

    QUnit.test("Tan()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run.
        var result = new Trigonometric.Tan([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Tan.evaluate()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Tan([ child ]).evaluate(), 4), 1);
    });

    QUnit.test("Tan.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: Math.PI / 4.0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Tan([ childX ]).evaluate(context), 4), 1);
    });
});
