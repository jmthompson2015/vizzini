define([ "Terminal", "../../../../example/main/js/artificialant/Direction" ], function(Terminal, Direction)
{
    "use strict";
    function Left()
    {
        Vizzini.extend(this, new Terminal.Terminal("left"));
    }

    Left.prototype.copy = function()
    {
        return new Left();
    };

    Left.prototype.evaluate = function(context)
    {
        // A side effect turns the ant.
        var direction = Direction.properties[context.directionKey];

        context.directionKey = direction.left();
        context.time++;

        return 1;
    };

    Left.prototype.toString = function()
    {
        return this.symbol();
    };

    function Move()
    {
        Vizzini.extend(this, new Terminal.Terminal("move"));
    }

    Move.prototype.copy = function()
    {
        return new Move();
    };

    Move.prototype.evaluate = function(context)
    {
        // A side effect moves the ant.
        var direction = Direction.properties[context.directionKey];

        context.x = context.x + direction.dx;
        context.y = context.y + direction.dy;

        var environment = context.environment;
        environment.placeAnt(context.x, context.y);

        context.time++;

        return 1;
    };

    Move.prototype.toString = function()
    {
        return this.symbol();
    };

    function Right()
    {
        Vizzini.extend(this, new Terminal.Terminal("right"));
    }

    Right.prototype.copy = function()
    {
        return new Right();
    };

    Right.prototype.evaluate = function(context)
    {
        // A side effect turns the ant.
        var direction = Direction.properties[context.directionKey];

        context.directionKey = direction.right();
        context.time++;

        return 1;
    };

    Right.prototype.toString = function()
    {
        return this.symbol();
    };

    return (
    {
        Left: Left,
        Move: Move,
        Right: Right,
    });
});
