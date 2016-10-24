define([ "Terminal", "../../../../example/main/js/artificialant/Direction",
        "../../../../example/main/js/artificialant/IfFoodAhead",
        "../../../../example/main/js/artificialant/SantaFeTrail" ], function(Terminal, Direction, IfFoodAhead,
        SantaFeTrail)
{
    "use strict";
    QUnit.module("IfFoodAhead");

    QUnit.test("evaluate() false", function(assert)
    {
        // Setup.
        var environment = new SantaFeTrail();
        var context =
        {
            environment: environment,
            time: 0,
            x: 0,
            y: 0,
            directionKey: Direction.SOUTH,
        };
        var node0 = new Terminal.Constant(1);
        var node1 = new Terminal.Constant(2);
        var ifFoodAhead = new IfFoodAhead([ node0, node1 ]);

        // Run.
        var result = ifFoodAhead.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 2);
        assert.equal(context.time, 0);
        assert.equal(context.x, 0);
        assert.equal(context.y, 0);
        assert.equal(context.directionKey, Direction.SOUTH);
    });

    QUnit.test("evaluate() true", function(assert)
    {
        // Setup.
        var environment = new SantaFeTrail();
        var context =
        {
            environment: environment,
            time: 0,
            x: 0,
            y: 0,
            directionKey: Direction.EAST,
        };
        var node0 = new Terminal.Constant(1);
        var node1 = new Terminal.Constant(2);
        var ifFoodAhead = new IfFoodAhead([ node0, node1 ]);

        // Run.
        var result = ifFoodAhead.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(context.time, 0);
        assert.equal(context.x, 0);
        assert.equal(context.y, 0);
        assert.equal(context.directionKey, Direction.EAST);
    });
});
