define([ "GPFunction", "../../../../example/main/js/artificialant/Direction" ], function(GPFunction, Direction)
{
    "use strict";
    function IfFoodAhead(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("if-food-ahead", children));
    }

    IfFoodAhead.ARITY = GPFunction.Binary.ARITY;

    IfFoodAhead.prototype.evaluate = function(context)
    {
        var answer;
        var condition = this.isFoodAhead(context);

        if (condition)
        {
            answer = this.childAt(0).evaluate(context);
        }
        else
        {
            answer = this.childAt(1).evaluate(context);
        }

        return answer;
    };

    IfFoodAhead.prototype.isFoodAhead = function(context)
    {
        var direction = Direction.properties[context.directionKey];
        var environment = context.environment;

        var newX = context.x + direction.dx;
        var newY = context.y + direction.dy;

        return environment.isFood(newX, newY);
    };

    return IfFoodAhead;
});
