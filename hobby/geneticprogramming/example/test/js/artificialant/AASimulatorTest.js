define([ "Sequence", "../../../../example/main/js/artificialant/AASimulator",
        "../../../../example/main/js/artificialant/AATerminal", "../../../../example/main/js/artificialant/Direction",
        "../../../../example/main/js/artificialant/IfFoodAhead",
        "../../../../example/main/js/artificialant/SantaFeTrail" ], function(Sequence, AASimulator, AATerminal,
        Direction, IfFoodAhead, SantaFeTrail)
{
    "use strict";
    QUnit.module("AASimulator");

    QUnit.test("run() Move", function(assert)
    {
        // Setup.
        var context = createContext();
        var genome = new AATerminal.Move();
        var simulator = new AASimulator();

        // Run.
        var result = simulator.run(context, genome);

        // Verify.
        assert.ok(result);
        assert.equal(result, 3);
    });

    QUnit.test("run() solution", function(assert)
    {
        // Setup.
        var context = createContext();
        var genome = createGenome();
        var simulator = new AASimulator();

        // Run.
        var result = simulator.run(context, genome);

        // Verify.
        assert.ok(result);
        assert.equal(result, 89);
    });

    function createContext()
    {
        return (
        {
            environment: new SantaFeTrail(),
            time: 0,
            x: 0,
            y: 0,
            directionKey: Direction.EAST,
        });
    }

    function createGenome()
    {
        var left = new AATerminal.Left();
        var move = new AATerminal.Move();
        var right = new AATerminal.Right();

        var node6 = new IfFoodAhead([ move, left ]);
        var node5 = new IfFoodAhead([ move, right ]);
        var node4 = new Sequence.Sequence2([ node6, move ]);
        var node3 = new Sequence.Sequence2([ node5, right ]);
        var node2 = new Sequence.Sequence3([ left, node3, node4 ]);
        var node1 = new IfFoodAhead([ move, node2 ]);

        return node1;
    }
});
