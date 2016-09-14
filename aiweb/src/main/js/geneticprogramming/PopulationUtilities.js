define([ "StringifyVisitor" ], function(StringifyVisitor)
{
    "use strict";
    var PopulationUtilities =
    {
        averageFitness: function(population)
        {
            InputValidator.validateNotNull("population", population);

            var sum = PopulationUtilities.sumFitness(population);
            var count = population.length;

            return (count > 0 ? sum / count : 0);
        },

        isDuplicate: function(population, newTreeNode)
        {
            InputValidator.validateNotNull("population", population);
            InputValidator.validateNotNull("newTreeNode", newTreeNode);

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

        sumFitness: function(population)
        {
            InputValidator.validateNotNull("population", population);

            return population.reduce(function(sum, genome)
            {
                return sum + genome.fitness;
            }, 0.0);
        },
    };

    return PopulationUtilities;
});
