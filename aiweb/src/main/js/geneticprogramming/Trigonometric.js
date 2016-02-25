define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Sin(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Sin", "sin", children));
    }

    Sin.ARITY = 1;

    Sin.prototype.copy = function(context)
    {
        return new Sin(this.copyChildren());
    };

    Sin.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.sin(value);
    };

    function Cos(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Cos", "cos", children));
    }

    Cos.ARITY = 1;

    Cos.prototype.copy = function(context)
    {
        return new Cos(this.copyChildren());
    };

    Cos.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.cos(value);
    };

    function Tan(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Tan", "tan", children));
    }

    Tan.ARITY = 1;

    Tan.prototype.copy = function(context)
    {
        return new Tan(this.copyChildren());
    };

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
