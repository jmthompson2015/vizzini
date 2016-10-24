define([ "Arithmetic", "GenomeFactory", "Terminal" ], function(Arithmetic, GenomeFactory, Terminal)
{
    "use strict";
    QUnit.module("GenomeFactory");

    var functions = [];
    functions.push(Arithmetic.Add);
    functions.push(Arithmetic.Divide);
    functions.push(Arithmetic.Multiply);
    functions.push(Arithmetic.Subtract);
    var terminals = [];
    terminals.push(new Terminal.Constant(1));
    terminals.push(new Terminal.Variable("x"));

    QUnit.test("Full.generate()", function(assert)
    {
        // Setup.
        var maxDepth = 6;
        var treeGenerator = new GenomeFactory.Full(functions, terminals, maxDepth);

        // Run.
        var result = treeGenerator.generate();

        // Verify.
        assert.ok(result);
        assert.equal(result.arity(), 2);
    });

    QUnit.test("Full.createChildren()", function(assert)
    {
        // Setup.
        var maxDepth = 2;
        var treeGenerator = new GenomeFactory.Full(functions, terminals, maxDepth);
        var depth = 0;

        // Run.
        var result = treeGenerator.createChildren(Arithmetic.Add, depth);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0]);
        assert.equal(result[0].arity(), 2);
        assert.ok(result[1]);
        assert.equal(result[1].arity(), 2);
    });

    QUnit.test("Full.createChildren() at maxDepth", function(assert)
    {
        // Setup.
        var maxDepth = 2;
        var treeGenerator = new GenomeFactory.Full(functions, terminals, maxDepth);
        var depth = maxDepth - 1;

        // Run.
        var result = treeGenerator.createChildren(Arithmetic.Add, depth);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0] === terminals[0] || result[0] === terminals[1]);
        assert.ok(result[1] === terminals[0] || result[1] === terminals[1]);
    });

    QUnit.test("Grow.generate()", function(assert)
    {
        // Setup.
        var maxDepth = 6;
        var treeGenerator = new GenomeFactory.Grow(functions, terminals, maxDepth);

        // Run.
        var result = treeGenerator.generate();

        // Verify.
        assert.ok(result);
    });

    QUnit.test("Grow.createChildren()", function(assert)
    {
        // Setup.
        var maxDepth = 2;
        var treeGenerator = new GenomeFactory.Grow(functions, terminals, maxDepth);
        var depth = 0;

        // Run.
        var result = treeGenerator.createChildren(Arithmetic.Add, depth);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0]);
        assert.ok(result[1]);
    });

    QUnit.test("Grow.createChildren() at maxDepth", function(assert)
    {
        // Setup.
        var maxDepth = 2;
        var treeGenerator = new GenomeFactory.Grow(functions, terminals, maxDepth);
        var depth = maxDepth - 1;

        // Run.
        var result = treeGenerator.createChildren(Arithmetic.Add, depth);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0] === terminals[0] || result[0] === terminals[1]);
        assert.ok(result[1] === terminals[0] || result[1] === terminals[1]);
    });
});
