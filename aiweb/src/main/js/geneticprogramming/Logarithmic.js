define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Exp(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Exp", "exp", children));
    }

    Exp.ARITY = 1;

    Exp.prototype.copy = function(context)
    {
        return new Exp(this.copyChildren());
    };

    Exp.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return Math.exp(value);
    };

    function Log(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("Log", "log", children));
    }

    Log.ARITY = 1;

    Log.prototype.copy = function(context)
    {
        return new Log(this.copyChildren());
    };

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
