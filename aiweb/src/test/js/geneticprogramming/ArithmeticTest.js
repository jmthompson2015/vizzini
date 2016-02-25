define([ "Arithmetic", "Terminal" ], function(Arithmetic, Terminal)
{
    "use strict";
    QUnit.module("Arithmetic");

    QUnit.test("Add()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Arithmetic.Add([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Add.copy()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var add = new Arithmetic.Add([ child1, child2 ]);

        // Run.
        var result = add.copy();

        // Verify.
        assert.ok(result);
        assert.ok(add !== result);
        assert.equal(add.childAt(0), child1);
        assert.equal(add.childAt(1), child2);
        assert.ok(result.childAt(0) !== child1);
        assert.ok(result.childAt(1) !== child2);
        assert.equal(result.childAt(0).value(), child1.value());
        assert.equal(result.childAt(1).value(), child2.value());
    });

    QUnit.test("Add.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.equal(new Arithmetic.Add([ child1, child2 ]).evaluate(), 3);
    });

    QUnit.test("Add.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 1,
            y: 2,
        };

        // Run / Verify.
        assert.equal(new Arithmetic.Add([ childX, childY ]).evaluate(context), 3);
    });

    QUnit.test("Divide()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Arithmetic.Divide([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Divide.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.equal(new Arithmetic.Divide([ child1, child2 ]).evaluate(), 0.5);
    });

    QUnit.test("Divide.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 1,
            y: 2,
        };

        // Run / Verify.
        assert.equal(new Arithmetic.Divide([ childX, childY ]).evaluate(context), 0.5);
    });

    QUnit.test("Divide.evaluate() divide by zero", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child0 = new Terminal.Constant(0);

        // Run / Verify.
        assert.equal(new Arithmetic.Divide([ child1, child0 ]).evaluate(), 1);
    });

    QUnit.test("Multiply()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Arithmetic.Multiply([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Multiply.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.equal(new Arithmetic.Multiply([ child1, child2 ]).evaluate(), 2);
    });

    QUnit.test("Multiply.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 1,
            y: 2,
        };

        // Run / Verify.
        assert.equal(new Arithmetic.Multiply([ childX, childY ]).evaluate(context), 2);
    });

    QUnit.test("Subtract()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Arithmetic.Subtract([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Subtract.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.equal(new Arithmetic.Subtract([ child1, child2 ]).evaluate(), -1);
    });

    QUnit.test("Subtract.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 1,
            y: 2,
        };

        // Run / Verify.
        assert.equal(new Arithmetic.Subtract([ childX, childY ]).evaluate(context), -1);
    });
});
