define([ "TreeNode" ], function(TreeNode)
{
    "use strict";
    function GPFunction(symbol, childrenIn)
    {
        InputValidator.validateNotNull("children", childrenIn);

        Vizzini.extend(this, new TreeNode(symbol));

        var children = [];
        children.vizziniAddAll(childrenIn);

        this.arity = function()
        {
            return children.length;
        };

        this.childAt = function(index)
        {
            return children[index];
        };

        // Needed for crossover.
        this.children = function()
        {
            return children;
        };

        this.copyChildren = function()
        {
            var answer = [];

            children.forEach(function(element)
            {
                answer.push(element.copy());
            });

            return answer;
        };
    }

    GPFunction.prototype.copy = function(context)
    {
        return new this.constructor(this.copyChildren());
    };

    GPFunction.prototype.toString = function()
    {
        var sb = this.constructor.name;
        sb += " ";

        this.children().forEach(function(child, i)
        {
            if (i > 0)
            {
                sb += ",";
            }
            sb += "child";
            sb += i;
            sb += "=";
            sb += child;
        });

        return sb;
    };

    function Unary(symbol, children)
    {
        InputValidator.validateNotNull("children", children);
        InputValidator.validateNotNull("child0", children[0]);

        Vizzini.extend(this, new GPFunction(symbol, children));
    }

    Unary.ARITY = 1;

    Unary.prototype.arity = function()
    {
        return Unary.ARITY;
    };

    function Binary(symbol, children)
    {
        InputValidator.validateNotNull("children", children);
        InputValidator.validateNotNull("child0", children[0]);
        InputValidator.validateNotNull("child1", children[1]);

        Vizzini.extend(this, new GPFunction(symbol, children));
    }

    Binary.ARITY = 2;

    Binary.prototype.arity = function()
    {
        return Binary.ARITY;
    };

    function Ternary(symbol, children)
    {
        InputValidator.validateNotNull("children", children);
        InputValidator.validateNotNull("child0", children[0]);
        InputValidator.validateNotNull("child1", children[1]);
        InputValidator.validateNotNull("child2", children[2]);

        Vizzini.extend(this, new GPFunction(symbol, children));
    }

    Ternary.ARITY = 3;

    Ternary.prototype.arity = function()
    {
        return Ternary.ARITY;
    };

    return (
    {
        GPFunction: GPFunction,
        Unary: Unary,
        Binary: Binary,
        Ternary: Ternary,
    });
});
