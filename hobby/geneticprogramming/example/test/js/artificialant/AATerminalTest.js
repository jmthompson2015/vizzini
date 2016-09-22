define([ "Terminal", "../../../../example/main/js/artificialant/AATerminal",
        "../../../../example/main/js/artificialant/Direction",

        "../../../../example/main/js/artificialant/SantaFeTrail" ], function(Terminal, AATerminal, Direction,
        SantaFeTrail)
{
    "use strict";
    QUnit.module("AATerminal");

    QUnit.test("Left.evaluate()", function(assert)
    {
        // Setup.
        var environment = new SantaFeTrail();
        var context =
        {
            environment: environment,
            time: 10,
            x: 16,
            y: 16,
            directionKey: Direction.NORTH,
        };
        var terminal = new AATerminal.Left();

        // Run.
        var result = terminal.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(context.time, 11);
        assert.equal(context.x, 16);
        assert.equal(context.y, 16);
        assert.equal(context.directionKey, Direction.WEST);
    });

    QUnit.test("Move.evaluate()", function(assert)
    {
        // Setup.
        var environment = new SantaFeTrail();
        var context =
        {
            environment: environment,
            time: 10,
            x: 16,
            y: 16,
            directionKey: Direction.NORTH,
        };
        var terminal = new AATerminal.Move();

        // Run.
        var result = terminal.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(context.time, 11);
        assert.equal(context.x, 16);
        assert.equal(context.y, 15);
        assert.equal(context.directionKey, Direction.NORTH);
    });

    QUnit.test("Right.evaluate()", function(assert)
    {
        // Setup.
        var environment = new SantaFeTrail();
        var context =
        {
            environment: environment,
            time: 10,
            x: 16,
            y: 16,
            directionKey: Direction.NORTH,
        };
        var terminal = new AATerminal.Right();

        // Run.
        var result = terminal.evaluate(context);

        // Verify.
        assert.ok(result);
        assert.equal(result, 1);
        assert.equal(context.time, 11);
        assert.equal(context.x, 16);
        assert.equal(context.y, 16);
        assert.equal(context.directionKey, Direction.EAST);
    });
});
