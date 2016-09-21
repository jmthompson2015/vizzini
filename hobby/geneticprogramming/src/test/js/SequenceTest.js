define([ "Arithmetic", "Sequence", "Terminal" ], function(Arithmetic, Sequence, Terminal)
{
    "use strict";
    QUnit.module("Sequence");

    QUnit.test("Sequence2()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);

        // Run.
        var result = new Sequence.Sequence2([ child1, child2 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Sequence2.ARITY", function(assert)
    {
        assert.equal(Sequence.Sequence2.ARITY, 2);
    });

    QUnit.test("Sequence2.copy()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var sequence = new Sequence.Sequence2([ child1, child2 ]);

        // Run.
        var result = sequence.copy();

        // Verify.
        assert.ok(result);
        assert.ok(sequence !== result);
        assert.equal(sequence.childAt(0), child1);
        assert.equal(sequence.childAt(1), child2);
        assert.ok(result.childAt(0) !== child1);
        assert.ok(result.childAt(1) !== child2);
        assert.equal(result.childAt(0).value(), child1.value());
        assert.equal(result.childAt(1).value(), child2.value());
    });

    QUnit.test("Sequence2.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var sequence = new Sequence.Sequence2([ child1, child2 ]);

        // Run.
        var result = sequence.evaluate();

        // Verify.
        assert.ok(result);
        assert.equal(result, 2);
    });

    QUnit.test("Sequence2.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var context =
        {
            x: 1,
            y: 2,
        };
        var sequence = new Sequence.Sequence2([ childX, childY ]);

        // Run.
        var result = sequence.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 2);
    });

    QUnit.test("Sequence2.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var sequence = new Sequence.Sequence2([ child1, child2 ]);

        // Run.
        var result = sequence.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Sequence2 child0=Constant 1,child1=Constant 2");
    });

    QUnit.test("Sequence3()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var child3 = new Terminal.Constant(3);

        // Run.
        var result = new Sequence.Sequence3([ child1, child2, child3 ]);

        // Verify.
        assert.ok(result);
        assert.equal(result.childAt(0), child1);
        assert.equal(result.childAt(1), child2);
    });

    QUnit.test("Sequence3.ARITY", function(assert)
    {
        assert.equal(Sequence.Sequence3.ARITY, 3);
    });

    QUnit.test("Sequence3.copy()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var child3 = new Terminal.Constant(3);
        var sequence = new Sequence.Sequence3([ child1, child2, child3 ]);

        // Run.
        var result = sequence.copy();

        // Verify.
        assert.ok(result);
        assert.ok(sequence !== result);
        assert.equal(sequence.childAt(0), child1);
        assert.equal(sequence.childAt(1), child2);
        assert.ok(result.childAt(0) !== child1);
        assert.ok(result.childAt(1) !== child2);
        assert.equal(result.childAt(0).value(), child1.value());
        assert.equal(result.childAt(1).value(), child2.value());
    });

    QUnit.test("Sequence3.evaluate()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var child3 = new Terminal.Constant(3);
        var sequence = new Sequence.Sequence3([ child1, child2, child3 ]);

        // Run
        var result = sequence.evaluate();

        // Verify.
        assert.equal(result, 3);
    });

    QUnit.test("Sequence3.evaluate() context", function(assert)
    {
        // Setup.
        var childX = new Terminal.Variable("x");
        var childY = new Terminal.Variable("y");
        var childZ = new Terminal.Variable("z");
        var context =
        {
            x: 1,
            y: 2,
            z: 3,
        };
        var sequence = new Sequence.Sequence3([ childX, childY, childZ ]);

        // Run
        var result = sequence.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 3);
    });

    QUnit.test("Sequence3.toString()", function(assert)
    {
        // Setup.
        var child1 = new Terminal.Constant(1);
        var child2 = new Terminal.Constant(2);
        var child3 = new Terminal.Constant(3);
        var sequence = new Sequence.Sequence3([ child1, child2, child3 ]);

        // Run.
        var result = sequence.toString();

        // Verify.
        assert.ok(result);
        assert.equal(result, "Sequence3 child0=Constant 1,child1=Constant 2,child2=Constant 3");
    });
});
