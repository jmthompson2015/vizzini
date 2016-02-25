define(function()
{
    "use strict";
    function TreeGenerator(functions, terminals, maxDepth)
    {
        InputValidator.validateNotNull("functions", functions);
        InputValidator.validateNotNull("terminals", terminals);
        InputValidator.validateNotNull("maxDepth", maxDepth);
        
        this.functions = function()
        {
            return functions;
        };

        this.terminals = function()
        {
            return terminals;
        };

        this.maxDepth = function()
        {
            return maxDepth;
        };
    }

    TreeGenerator.prototype.generate = function()
    {
        var Root = this.randomFunction();

        return new Root(this.createChildren(Root, 0));
    };

    TreeGenerator.prototype.randomFunction = function()
    {
        return this.functions().vizziniRandomElement();
    };

    TreeGenerator.prototype.randomTerminal = function()
    {
        return this.terminals().vizziniRandomElement();
    };

    function Full(functions, terminals, maxDepth)
    {
        Vizzini.extend(this, new TreeGenerator(functions, terminals, maxDepth));

        this.createChildren = function(f, depth)
        {
            var answer = [];
            var arity = f.ARITY;

            for (var i = 0; i < arity; i++)
            {
                var ChildNode = (depth < maxDepth - 1 ? this.randomFunction() : this.randomTerminal());

                if (typeof ChildNode === "function")
                {
                    answer.push(new ChildNode(this.createChildren(ChildNode, depth + 1)));
                }
                else
                {
                    answer.push(ChildNode);
                }
            }

            return answer;
        };
    }

    function Grow(functions, terminals, maxDepth)
    {
        Vizzini.extend(this, new TreeGenerator(functions, terminals, maxDepth));

        var nodes = [];
        nodes.vizziniAddAll(this.functions());
        nodes.vizziniAddAll(this.terminals());

        this.createChildren = function(f, depth)
        {
            var answer = [];
            var arity = f.ARITY;

            for (var i = 0; i < arity; i++)
            {
                var ChildNode = (depth < maxDepth - 1 ? nodes.vizziniRandomElement() : this.randomTerminal());

                if (typeof ChildNode === "function")
                {
                    answer.push(new ChildNode(this.createChildren(ChildNode, depth + 1)));
                }
                else
                {
                    answer.push(ChildNode);
                }
            }

            return answer;
        };
    }

    return (
    {
        TreeGenerator: TreeGenerator,
        Full: Full,
        Grow: Grow,
    });
});
