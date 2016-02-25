define([ "Arithmetic", "PopulationGenerator", "StringifyVisitor", "Terminal" ], function(Arithmetic,
        PopulationGenerator, StringifyVisitor, Terminal)
{
    "use strict";
    QUnit.module("PopulationGenerator");

    var functions = [];
    functions.push(Arithmetic.Add);
    functions.push(Arithmetic.Divide);
    functions.push(Arithmetic.Multiply);
    functions.push(Arithmetic.Subtract);
    var terminals = [];
    terminals.push(new Terminal.Constant(1));
    terminals.push(new Terminal.Variable("x"));
    var maxDepth = 6;
    var popSize = 500;

    QUnit.test("PopulationGenerator()", function(assert)
    {
        // Setup.

        // Run.
        var result = new PopulationGenerator(functions, terminals, maxDepth, popSize);

        // Verify.
        assert.ok(result);
        assert.ok(result.functions());
        assert.ok(result.terminals());
        assert.equal(result.maxDepth(), maxDepth);
        assert.equal(result.popSize(), popSize);
    });

    QUnit.test("generate()", function(assert)
    {
        // Setup.
        var maxDepth = 3;
        var popSize = 10;
        var generator = new PopulationGenerator(functions, terminals, maxDepth, popSize);

        // Run.
        var result = generator.generate();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, popSize);
    });

    QUnit.test("isDuplicate()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var genome2 = createTree0();
        var population = [];

        // Run / Verify.
        assert.ok(!PopulationGenerator.isDuplicate(population, genome0));
        assert.ok(!PopulationGenerator.isDuplicate(population, genome1));
        assert.ok(!PopulationGenerator.isDuplicate(population, genome2));

        population.push(genome0);
        assert.ok(PopulationGenerator.isDuplicate(population, genome0));
        assert.ok(!PopulationGenerator.isDuplicate(population, genome1));
        assert.ok(PopulationGenerator.isDuplicate(population, genome2));

        population.push(genome1);
        assert.ok(PopulationGenerator.isDuplicate(population, genome0));
        assert.ok(PopulationGenerator.isDuplicate(population, genome1));
        assert.ok(PopulationGenerator.isDuplicate(population, genome2));
    });

    function createTree0()
    {
        var node3 = new Terminal.Variable("x");
        var node4 = new Terminal.Constant(1);
        var node5 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);
        var node1 = new Arithmetic.Subtract([ node2, node5 ]);

        return node1;
    }

    function createTree1()
    {
        var node3 = new Terminal.Constant(2);
        var node4 = new Terminal.Variable("y");
        var node5 = new Terminal.Constant(3);
        var node2 = new Arithmetic.Subtract([ node3, node4 ]);
        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }
});
