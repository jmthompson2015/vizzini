define([ "StringifyVisitor" ], function(StringifyVisitor)
{
    "use strict";
    var PopulationUtilities =
    {
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
