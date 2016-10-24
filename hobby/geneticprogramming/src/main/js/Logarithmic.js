define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Exponential(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("exp", children));
    }

    Exponential.ARITY = GPFunction.Unary.ARITY;

    Exponential.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.exp(value);
    };

    function Logarithm(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("log", children));
    }

    Logarithm.ARITY = GPFunction.Unary.ARITY;

    Logarithm.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return (value === 0.0 ? 0.0 : Math.log(Math.abs(value)));
    };

    return (
    {
        Exponential: Exponential,
        Logarithm: Logarithm,
    });
});
