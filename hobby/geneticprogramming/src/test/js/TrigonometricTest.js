define([ "Terminal", "Trigonometric" ], function(Terminal, Trigonometric)
{
    "use strict";
    QUnit.module("Trigonometric");

    QUnit.test("Sine()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run.
        var result = new Trigonometric.Sine([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Sine.evaluate()", function(assert)
    {
        assert.equal(Math.vizziniRound(new Trigonometric.Sine([ new Terminal.Constant(0.0) ]).evaluate(), 4), 0.0);
        assert.equal(Math.vizziniRound(new Trigonometric.Sine([ new Terminal.Constant(Math.PI / 4.0) ]).evaluate(), 4),
                0.7071);
        assert.equal(Math.vizziniRound(new Trigonometric.Sine([ new Terminal.Constant(Math.PI / 2.0) ]).evaluate(), 4),
                1.0);
    });

    QUnit.test("Sine.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: Math.PI / 4.0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Sine([ childX ]).evaluate(context), 4), 0.7071);
    });

    QUnit.test("Cosine()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run.
        var result = new Trigonometric.Cosine([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Cosine.evaluate()", function(assert)
    {
        assert.equal(Math.vizziniRound(new Trigonometric.Cosine([ new Terminal.Constant(0.0) ]).evaluate(), 4), 1.0);
        assert
                .equal(Math.vizziniRound(new Trigonometric.Cosine([ new Terminal.Constant(Math.PI / 4.0) ]).evaluate(),
                        4), 0.7071);
        assert.equal(Math
                .vizziniRound(new Trigonometric.Cosine([ new Terminal.Constant(Math.PI / 2.0) ]).evaluate(), 4), 0.0);
    });

    QUnit.test("Cosine.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: Math.PI / 4.0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Cosine([ childX ]).evaluate(context), 4), 0.7071);
    });

    QUnit.test("Tangent()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(Math.PI / 4.0);

        // Run.
        var result = new Trigonometric.Tangent([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Tangent.evaluate()", function(assert)
    {
        assert.equal(Math.vizziniRound(new Trigonometric.Tangent([ new Terminal.Constant(0.0) ]).evaluate(), 4), 0);
        assert.equal(Math.vizziniRound(new Trigonometric.Tangent([ new Terminal.Constant(Math.PI / 4.0) ]).evaluate(),
                4), 1);
        assert.equal(Math.vizziniRound(new Trigonometric.Tangent([ new Terminal.Constant(3.0 * Math.PI / 4.0) ])
                .evaluate(), 4), -1);
    });

    QUnit.test("Tangent.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: Math.PI / 4.0,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Trigonometric.Tangent([ childX ]).evaluate(context), 4), 1);
    });
});
