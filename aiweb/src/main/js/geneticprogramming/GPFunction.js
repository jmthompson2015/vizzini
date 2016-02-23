define([ "TreeNode" ], function(TreeNode)
{
    "use strict";
    function GPFunction(name, symbol, childrenIn)
    {
        InputValidator.validateNotNull("children", childrenIn);

        Vizzini.extend(this, new TreeNode(name, symbol));

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

    function Unary(name, symbol, children)
    {
        InputValidator.validateNotNull("children", children);
        InputValidator.validateNotNull("child0", children[0]);

        Vizzini.extend(this, new GPFunction(name, symbol, children));
    }

    Unary.ARITY = 1;

    Unary.prototype.arity = function()
    {
        return Unary.ARITY;
    };

    function Binary(name, symbol, children)
    {
        InputValidator.validateNotNull("children", children);
        InputValidator.validateNotNull("child0", children[0]);
        InputValidator.validateNotNull("child1", children[1]);

        Vizzini.extend(this, new GPFunction(name, symbol, children));
    }

    Binary.ARITY = 2;

    Binary.prototype.arity = function()
    {
        return Binary.ARITY;
    };

    function Ternary(name, symbol, children)
    {
        InputValidator.validateNotNull("children", children);
        InputValidator.validateNotNull("child0", children[0]);
        InputValidator.validateNotNull("child1", children[1]);
        InputValidator.validateNotNull("child2", children[2]);

        Vizzini.extend(this, new GPFunction(name, symbol, children));
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
