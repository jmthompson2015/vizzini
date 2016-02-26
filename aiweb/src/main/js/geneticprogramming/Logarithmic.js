define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Exp(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Exp", "exp", children));
    }

    Exp.ARITY = GPFunction.Unary.ARITY;

    Exp.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.exp(value);
    };

    function Log(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Log", "log", children));
    }

    Log.ARITY = GPFunction.Unary.ARITY;

    Log.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return (value === 0.0 ? 0.0 : Math.log(value));
    };

    return (
    {
        Exp: Exp,
        Log: Log,
    });
});
