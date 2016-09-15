define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function GreaterThan(children)
    {
        Vizzini.extend(this, new GPFunction.Binary(">", children));
    }

    GreaterThan.ARITY = GPFunction.Binary.ARITY;

    GreaterThan.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 > value1;
    };

    function LessThan(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("<", children));
    }

    LessThan.ARITY = GPFunction.Binary.ARITY;

    LessThan.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 < value1;
    };

    return (
    {
        GreaterThan: GreaterThan,
        LessThan: LessThan,
    });
});
