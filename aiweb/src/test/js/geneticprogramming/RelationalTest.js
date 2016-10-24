define([ "Relational", "Terminal" ], function(Relational, Terminal)
{
    "use strict";
    QUnit.module("Relational");

    QUnit.test("GreaterThan()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Relational.GreaterThan([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("GreaterThan.ARITY", function(assert)
    {
        // Setup.

        // Run.
        var result = Relational.GreaterThan.ARITY;

        // Verify.
        assert.ok(result);
        assert.equal(result, 2);
    });

    QUnit.test("GreaterThan.copy()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var add = new Relational.GreaterThan([ child1, child2 ]);

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

    QUnit.test("GreaterThan.evaluate() false", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.ok(!(new Relational.GreaterThan([ child1, child2 ]).evaluate()));
    });

    QUnit.test("GreaterThan.evaluate() true", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(2);
        var child2 = new Terminal.Constant(1);

        // Run / Verify.
        assert.ok(new Relational.GreaterThan([ child1, child2 ]).evaluate());
    });

    QUnit.test("GreaterThan.evaluate() context false", function(assert)
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
        assert.ok(!(new Relational.GreaterThan([ childX, childY ]).evaluate(context)));
    });

    QUnit.test("GreaterThan.evaluate() context true", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 2,
            y: 1,
        };

        // Run / Verify.
        assert.ok(new Relational.GreaterThan([ childX, childY ]).evaluate(context));
    });

    QUnit.test("GreaterThan.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Relational.GreaterThan([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "GreaterThan child0=Constant 1,child1=Constant 2");
    });

    QUnit.test("LessThan()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Relational.LessThan([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("LessThan.ARITY", function(assert)
    {
        // Setup.

        // Run.
        var result = Relational.LessThan.ARITY;

        // Verify.
        assert.ok(result);
        assert.equal(result, 2);
    });

    QUnit.test("LessThan.copy()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var add = new Relational.LessThan([ child1, child2 ]);

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

    QUnit.test("LessThan.evaluate() false", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(2);
        var child2 = new Terminal.Constant(1);

        // Run / Verify.
        assert.ok(!(new Relational.LessThan([ child1, child2 ]).evaluate()));
    });

    QUnit.test("LessThan.evaluate() true", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run / Verify.
        assert.ok(new Relational.LessThan([ child1, child2 ]).evaluate());
    });

    QUnit.test("LessThan.evaluate() context false", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 2,
            y: 1,
        };

        // Run / Verify.
        assert.ok(!(new Relational.LessThan([ childX, childY ]).evaluate(context)));
    });

    QUnit.test("LessThan.evaluate() context true", function(assert)
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
        assert.ok(new Relational.LessThan([ childX, childY ]).evaluate(context));
    });

    QUnit.test("LessThan.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var gpFunction = new Relational.LessThan([ child1, child2 ]);

        // Run.
        var result = gpFunction.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "LessThan child0=Constant 1,child1=Constant 2");
    });
});
