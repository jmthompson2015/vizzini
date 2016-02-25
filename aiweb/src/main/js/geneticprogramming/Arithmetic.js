define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Add(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("Add", "+", children));
    }

    Add.ARITY = 2;

    Add.prototype.copy = function(context)
    {
        return new Add(this.copyChildren());
    };

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

    Divide.ARITY = 2;

    Divide.prototype.copy = function(context)
    {
        return new Divide(this.copyChildren());
    };

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

    Multiply.ARITY = 2;

    Multiply.prototype.copy = function(context)
    {
        return new Multiply(this.copyChildren());
    };

    Multiply.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value0 * value1;
    };

    function Subtract(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("Subtract", "-", children));
    }

    Subtract.ARITY = 2;

    Subtract.prototype.copy = function(context)
    {
        return new Subtract(this.copyChildren());
    };

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
        Subtract: Subtract,
    });
});
