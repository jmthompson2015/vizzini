define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Sine(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("sin", children));
    }

    Sine.ARITY = GPFunction.Unary.ARITY;

    Sine.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.sin(value);
    };

    function Cosine(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("cos", children));
    }

    Cosine.ARITY = GPFunction.Unary.ARITY;

    Cosine.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.cos(value);
    };

    function Tangent(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("tan", children));
    }

    Tangent.ARITY = GPFunction.Unary.ARITY;

    Tangent.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.tan(value);
    };

    return (
    {
        Sine: Sine,
        Cosine: Cosine,
        Tangent: Tangent,
    });
});
