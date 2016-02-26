define([ "GenomeFactory", "StringifyVisitor" ], function(GenomeFactory, StringifyVisitor)
{
    "use strict";
    function PopulationGenerator(functions, terminals, maxDepth, popSize)
    {
        InputValidator.validateNotNull("functions", functions);
        InputValidator.validateNotNull("terminals", terminals);
        InputValidator.validateNotNull("maxDepth", maxDepth);
        InputValidator.validateNotNull("popSize", popSize);

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

        this.popSize = function()
        {
            return popSize;
        };
    }

    PopulationGenerator.isDuplicate = function(population, newTreeNode)
    {
        if (newTreeNode.string === undefined)
        {
            var visitor = new StringifyVisitor(newTreeNode);
            newTreeNode.string = visitor.string();
        }

        var nodes = population.filter(function(treeNode)
        {
            if (treeNode.string === undefined)
            {
                var visitor = new StringifyVisitor(treeNode);
                treeNode.string = visitor.string();
            }

            return newTreeNode.string === treeNode.string;
        });

        return (nodes.length > 0);
    };

    PopulationGenerator.prototype.generate = function()
    {
        var answer = [];
        var fullGenerator = new GenomeFactory.Full(this.functions(), this.terminals(), this.maxDepth());
        var growGenerator = new GenomeFactory.Grow(this.functions(), this.terminals(), this.maxDepth());

        while (answer.length < this.popSize())
        {
            var tree;

            if (answer.length < 0.5 * this.popSize())
            {
                tree = fullGenerator.generate();
            }
            else
            {
                tree = growGenerator.generate();
            }

            if (!PopulationGenerator.isDuplicate(answer, tree))
            {
                answer.push(tree);
            }
        }

        return answer;
    };

    return PopulationGenerator;
});
