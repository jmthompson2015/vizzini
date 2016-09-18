define([ "Logic", "Terminal" ], function(Logic, Terminal)
{
    "use strict";
    QUnit.module("Logic");

    QUnit.test("And()", function(assert)
    {
        // Setup.
        var child0 = new Terminal.Constant(true);
        var child1 = new Terminal.Constant(false);

        // Run.
        var result = new Logic.And([ child0, child1 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child0);
        assert.equal(result.childAt(1), child1);
    });

    QUnit.test("And.evaluate()", function(assert)
    {
        // Setup.
        var childTrue = new Terminal.Constant(true);
        var childFalse = new Terminal.Constant(false);

        // Run / Verify.
        assert.equal(new Logic.And([ childTrue, childTrue ]).evaluate(), true);
        assert.equal(new Logic.And([ childFalse, childTrue ]).evaluate(), false);
        assert.equal(new Logic.And([ childTrue, childFalse ]).evaluate(), false);
        assert.equal(new Logic.And([ childFalse, childFalse ]).evaluate(), false);
    });

    QUnit.test("And.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: true,
            y: false,
        };

        // Run / Verify.
        assert.equal(new Logic.And([ childX, childX ]).evaluate(context), true);
        assert.equal(new Logic.And([ childY, childX ]).evaluate(context), false);
        assert.equal(new Logic.And([ childX, childY ]).evaluate(context), false);
        assert.equal(new Logic.And([ childY, childY ]).evaluate(context), false);
    });

    QUnit.test("Not()", function(assert)
    {
        // Setup.
        var child = new Terminal.Constant(true);

        // Run.
        var result = new Logic.Not([ child ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child);
    });

    QUnit.test("Not.evaluate()", function(assert)
    {
        // Setup.
        var childTrue = new Terminal.Constant(true);
        var childFalse = new Terminal.Constant(false);

        // Run / Verify.
        assert.equal(new Logic.Not([ childTrue ]).evaluate(), false);
        assert.equal(new Logic.Not([ childFalse ]).evaluate(), true);
    });

    QUnit.test("Not.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: true,
            y: false,
        };

        // Run / Verify.
        assert.equal(new Logic.Not([ childX ]).evaluate(context), false);
        assert.equal(new Logic.Not([ childY ]).evaluate(context), true);
    });

    QUnit.test("Or()", function(assert)
    {
        // Setup.
        var child0 = new Terminal.Constant(true);
        var child1 = new Terminal.Constant(false);

        // Run.
        var result = new Logic.Or([ child0, child1 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child0);
        assert.equal(result.childAt(1), child1);
    });

    QUnit.test("Or.evaluate()", function(assert)
    {
        // Setup.
        var childTrue = new Terminal.Constant(true);
        var childFalse = new Terminal.Constant(false);

        // Run / Verify.
        assert.equal(new Logic.Or([ childTrue, childTrue ]).evaluate(), true);
        assert.equal(new Logic.Or([ childFalse, childTrue ]).evaluate(), true);
        assert.equal(new Logic.Or([ childTrue, childFalse ]).evaluate(), true);
        assert.equal(new Logic.Or([ childFalse, childFalse ]).evaluate(), false);
    });

    QUnit.test("Or.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: true,
            y: false,
        };

        // Run / Verify.
        assert.equal(new Logic.Or([ childX, childX ]).evaluate(context), true);
        assert.equal(new Logic.Or([ childY, childX ]).evaluate(context), true);
        assert.equal(new Logic.Or([ childX, childY ]).evaluate(context), true);
        assert.equal(new Logic.Or([ childY, childY ]).evaluate(context), false);
    });
});
