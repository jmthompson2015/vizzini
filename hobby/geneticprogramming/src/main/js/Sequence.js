define([ "GPFunction" ], function(GPFunction)
{
    "use strict";
    function Sequence2(children)
    {
        Vizzini.extend(this, new GPFunction.Binary("+", children));
    }

    Sequence2.ARITY = GPFunction.Binary.ARITY;

    Sequence2.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);

        return value1;
    };

    "use strict";
    function Sequence3(children)
    {
        Vizzini.extend(this, new GPFunction.Ternary("+", children));
    }

    Sequence3.ARITY = GPFunction.Ternary.ARITY;

    Sequence3.prototype.evaluate = function(context)
    {
        var value0 = this.childAt(0).evaluate(context);
        var value1 = this.childAt(1).evaluate(context);
        var value2 = this.childAt(2).evaluate(context);

        return value2;
    };

    return (
    {
        Sequence2: Sequence2,
        Sequence3: Sequence3,
    });
});
