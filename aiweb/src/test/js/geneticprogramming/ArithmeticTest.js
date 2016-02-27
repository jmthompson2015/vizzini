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

    QUnit.test("Add.ARITY", function(assert)
    {
        // Setup.

        // Run.
        var result = Arithmetic.Add.ARITY;

        // Verify.
        assert.ok(result);
        assert.equal(result, 2);
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

    QUnit.test("Add.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Arithmetic.Add([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Add child0=Constant value=1,child1=Constant value=2");
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

    QUnit.test("Divide.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Arithmetic.Divide([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Divide child0=Constant value=1,child1=Constant value=2");
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

    QUnit.test("Multiply.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Arithmetic.Multiply([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Multiply child0=Constant value=1,child1=Constant value=2");
    });

    QUnit.test("Remainder()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Arithmetic.Remainder([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Remainder.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Arithmetic.Remainder([ child1, child2 ]).evaluate(), 4), 1);
    });

    QUnit.test("Remainder.evaluate() context", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: 2,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Arithmetic.Remainder([ child1, childX ]).evaluate(context), 4), 1);
    });

    QUnit.test("Remainder.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Arithmetic.Remainder([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Remainder child0=Constant value=1,child1=Constant value=2");
    });

    QUnit.test("SquareRoot()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);

        // Run.
        var result = new Arithmetic.SquareRoot([ child1 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
    });

    QUnit.test("SquareRoot.evaluate()", function(assert)
    {
        // Setup.
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Arithmetic.SquareRoot([ child2 ]).evaluate(), 4), 1.4142);
    });

    QUnit.test("SquareRoot.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var context =
        {
            x: 2,
        };

        // Run / Verify.
        assert.equal(Math.vizziniRound(new Arithmetic.SquareRoot([ childX ]).evaluate(context), 4), 1.4142);
    });

    QUnit.test("SquareRoot.toString()", function(assert)
    {
        // Setup.
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Arithmetic.SquareRoot([ child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "SquareRoot child0=Constant value=2");
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

    QUnit.test("Subtract.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Arithmetic.Subtract([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Subtract child0=Constant value=1,child1=Constant value=2");
    });
});
