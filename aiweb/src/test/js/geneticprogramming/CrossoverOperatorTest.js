define([ "CrossoverOperator", "Logic", "StringifyVisitor", "Terminal" ], function(CrossoverOperator, Logic,
        StringifyVisitor, Terminal)
{
    "use strict";
    QUnit.module("CrossoverOperator");

    QUnit.test("tree()", function(assert)
    {
        // Setup.
        var genome0 = createTree0();
        var genome1 = createTree1();
        var visitor0 = new StringifyVisitor(genome0);
        LOGGER.debug("genome0 = " + visitor0.string());
        var visitor1 = new StringifyVisitor(genome1);
        LOGGER.debug("genome1 = " + visitor1.string());

        // Run.
        var result = CrossoverOperator.tree(genome0, genome1);

        // Verify.
        assert.ok(result);
        var visitor = new StringifyVisitor(result);
        LOGGER.debug("result = " + visitor.string());
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
});
