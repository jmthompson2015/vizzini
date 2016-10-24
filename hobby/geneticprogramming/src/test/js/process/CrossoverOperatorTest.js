define([ "Arithmetic", "CountVisitor", "FragmentVisitor", "Logic", "StringifyVisitor", "Terminal",
        "process/CrossoverOperator" ], function(Arithmetic, CountVisitor, FragmentVisitor, Logic, StringifyVisitor,
        Terminal, CrossoverOperator)
{
    "use strict";
    QUnit.module("CrossoverOperator");

    QUnit.test("crossover() 1", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        LOGGER.debug("crossover() 1");
        LOGGER.debug("genome0 = " + (new StringifyVisitor(genome0)).string());
        LOGGER.debug("genome1 = " + (new StringifyVisitor(genome1)).string());

        // Run.
        var result = CrossoverOperator.crossover(genome0, genome1);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0]);
        assert.ok(result[1]);
        LOGGER.debug("result[0] = " + (new StringifyVisitor(result[0])).string());
        LOGGER.debug("result[1] = " + (new StringifyVisitor(result[1])).string());
    });

    QUnit.test("crossover() 2", function(assert)
    {
        // Setup.
        var genome0 = createTree2();
        var genome1 = createTree3();
        LOGGER.debug("crossover() 2");
        LOGGER.debug("genome0 = " + (new StringifyVisitor(genome0)).string());
        LOGGER.debug("genome1 = " + (new StringifyVisitor(genome1)).string());

        // Run.
        var result = CrossoverOperator.crossover(genome0, genome1);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0]);
        assert.ok(result[1]);
        LOGGER.debug("result[0] = " + (new StringifyVisitor(result[0])).string());
        LOGGER.debug("result[1] = " + (new StringifyVisitor(result[1])).string());
        assert.equal((new CountVisitor(result[0])).count(), 3);
        assert.equal((new CountVisitor(result[1])).count(), 3);
        var node01 = (new FragmentVisitor(result[0], 1)).fragment();
        assert.ok([ 1, 2, 3, 4 ].vizziniContains(node01.value()));
        var node02 = (new FragmentVisitor(result[0], 2)).fragment();
        assert.ok([ 1, 2, 3, 4 ].vizziniContains(node02.value()));
        var node11 = (new FragmentVisitor(result[1], 1)).fragment();
        assert.ok([ 1, 2, 3, 4 ].vizziniContains(node11.value()));
        var node12 = (new FragmentVisitor(result[1], 2)).fragment();
        assert.ok([ 1, 2, 3, 4 ].vizziniContains(node12.value()));
    });

    QUnit.test("crossover() 3", function(assert)
    {
        // Setup.
        var genome0 = createTree4();
        var genome1 = createTree5();
        LOGGER.debug("crossover() 3");
        LOGGER.debug("genome0 = " + (new StringifyVisitor(genome0)).string());
        LOGGER.debug("genome1 = " + (new StringifyVisitor(genome1)).string());

        // Run.
        var result = CrossoverOperator.crossover(genome0, genome1);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.ok(result[0]);
        assert.ok(result[1]);
        LOGGER.debug("result[0] = " + (new StringifyVisitor(result[0])).string());
        LOGGER.debug("result[1] = " + (new StringifyVisitor(result[1])).string());
    });

    /*
     * @see Genetic Programming I p. 101
     */
    function createTree0()
    {
        var node3 = new Terminal.Variable("D1");
        var node5 = new Terminal.Variable("D0");
        var node6 = new Terminal.Variable("D1");
        var node2 = new Logic.Not([ node3 ]);
        var node4 = new Logic.And([ node5, node6 ]);
        var node1 = new Logic.Or([ node2, node4 ]);

        return node1;
    }

    /*
     * @see Genetic Programming I p. 101
     */
    function createTree1()
    {
        var node3 = new Terminal.Variable("D1");
        var node5 = new Terminal.Variable("D0");
        var node8 = new Terminal.Variable("D0");
        var node10 = new Terminal.Variable("D1");
        var node4 = new Logic.Not([ node5 ]);
        var node7 = new Logic.Not([ node8 ]);
        var node9 = new Logic.Not([ node10 ]);
        var node2 = new Logic.Or([ node3, node4 ]);
        var node6 = new Logic.And([ node7, node9 ]);
        var node1 = new Logic.Or([ node2, node6 ]);

        return node1;
    }

    function createTree2()
    {
        var node2 = new Terminal.Constant(1);
        var node3 = new Terminal.Constant(2);
        var node1 = new Arithmetic.Add([ node2, node3 ]);

        return node1;
    }

    function createTree3()
    {
        var node2 = new Terminal.Constant(3);
        var node3 = new Terminal.Constant(4);
        var node1 = new Arithmetic.Add([ node2, node3 ]);

        return node1;
    }

    function createTree4()
    {
        var node3 = new Terminal.Constant(1);
        var node4 = new Terminal.Constant(2);
        var node2 = new Arithmetic.Add([ node3, node4 ]);

        var node6 = new Terminal.Constant(3);
        var node7 = new Terminal.Constant(4);
        var node5 = new Arithmetic.Add([ node6, node7 ]);

        var node1 = new Arithmetic.Add([ node2, node5 ]);

        return node1;
    }

    function createTree5()
    {
        var node2 = new Terminal.Constant(5);
        var node3 = new Terminal.Constant(6);
        var node1 = new Arithmetic.Add([ node2, node3 ]);

        return node1;
    }
});
