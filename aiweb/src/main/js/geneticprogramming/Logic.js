define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function And(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("AND", children));
    }

    And.ARITY = GPFunction.Binary.ARITY;

    And.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 && value1;
    };

    function Not(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("NOT", children));
    }

    Not.ARITY = GPFunction.Unary.ARITY;

    Not.prototype.evaluate = function(context)
    {
        var value = this.childAt(0).evaluate(context);

        return !value;
    };

    function Or(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("OR", children));
    }

    Or.ARITY = GPFunction.Binary.ARITY;

    Or.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 || value1;
    };

    return (
    {
        And: And,
        Not: Not,
        Or: Or,
    });
});
