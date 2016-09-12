define([ "StringifyVisitor" ], function(StringifyVisitor)
{
    "use strict";
    var PopulationUtilities =
    {
        averageFitness: function(population)
        {
            var sum = 0;
            var count = 0;

            population.forEach(function(treeNode)
            {
                sum += treeNode.fitness;
                count++;
            });

            return (count > 0 ? sum / count : 0);
        },

        isDuplicate: function(population, newTreeNode)
        {
            if (newTreeNode.string === undefined)
            {
                newTreeNode.string = (new StringifyVisitor(newTreeNode)).string();
            }

            var nodes = population.filter(function(treeNode)
            {
                if (treeNode.string === undefined)
                {
                    treeNode.string = (new StringifyVisitor(treeNode)).string();
                }

                return (newTreeNode.string === treeNode.string);
            });

            return (nodes.length > 0);
        },
    };

    return PopulationUtilities;
});
