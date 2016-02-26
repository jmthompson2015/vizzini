define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Add(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("Add", "+", children));
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
        Vizzini.extend(this, new GPFunction.Binary("Divide", "/", children));
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
        Vizzini.extend(this, new GPFunction.Binary("Multiply", "*", children));
    }

    Multiply.ARITY = GPFunction.Binary.ARITY;

    Multiply.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 * value1;
    };

    function SquareRoot(children)
    {
        Vizzini.extend(this, new GPFunction.Unary("SquareRoot", "√", children));
    }

    SquareRoot.ARITY = GPFunction.Unary.ARITY;

    SquareRoot.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);

        return Math.sqrt(Math.abs(value0));
    };

    function Subtract(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("Subtract", "-", children));
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
        Add: Add,
        Divide: Divide,
        Multiply: Multiply,
        SquareRoot: SquareRoot,
        Subtract: Subtract,
    });
});
