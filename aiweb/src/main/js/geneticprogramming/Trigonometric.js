define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Sin(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Sin", "sin", children));
    }

    Sin.ARITY = GPFunction.Unary.ARITY;

    Sin.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.sin(value);
    };

    function Cos(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Cos", "cos", children));
    }

    Cos.ARITY = GPFunction.Unary.ARITY;

    Cos.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.cos(value);
    };

    function Tan(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Tan", "tan", children));
    }

    Tan.ARITY = GPFunction.Unary.ARITY;

    Tan.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.tan(value);
    };

    return (
    {
        Sin: Sin,
        Cos: Cos,
        Tan: Tan,
    });
});
