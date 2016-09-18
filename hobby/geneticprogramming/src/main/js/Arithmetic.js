define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function AbsoluteValue(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("abs", children));
    }

    AbsoluteValue.ARITY = GPFunction.Unary.ARITY;

    AbsoluteValue.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);

        return Math.abs(value0);
    };

    function Add(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("+", children));
    }

    Add.ARITY = GPFunction.Binary.ARITY;

    Add.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 + value1;
    };

    function Divide(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("/", children));
    }

    Divide.ARITY = GPFunction.Binary.ARITY;

    Divide.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return (value1 === 0 ? 1.0 : value0 / value1);
    };

    function Multiply(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("*", children));
    }

    Multiply.ARITY = GPFunction.Binary.ARITY;

    Multiply.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 * value1;
    };

    function Remainder(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("%", children));
    }

    Remainder.ARITY = GPFunction.Binary.ARITY;

    Remainder.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 % value1;
    };

    function SquareRoot(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("√", children));
    }

    SquareRoot.ARITY = GPFunction.Unary.ARITY;

    SquareRoot.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);

        return Math.sqrt(Math.abs(value0));
    };

    function Subtract(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("-", children));
    }

    Subtract.ARITY = GPFunction.Binary.ARITY;

    Subtract.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 - value1;
    };

    return (
    {
        AbsoluteValue: AbsoluteValue,
        Add: Add,
        Divide: Divide,
        Multiply: Multiply,
        Remainder: Remainder,
        SquareRoot: SquareRoot,
        Subtract: Subtract,
    });
});
