define(function()
{
    "use strict";
    function CountVisitor(treeNode)
    {
        InputValidator.validateNotNull("treeNode", treeNode);

        var nodeCount = 0;

        this.nodeCount = function()
        {
            return nodeCount;
        };

        this.visit = function(treeNode)
        {
            nodeCount++;

            if (treeNode.arity() > 0)
            {
                for (var i = 0; i < treeNode.arity(); i++)
                {
                    treeNode.childAt(i).accept(this);
                }
            }
        };

        this.visit(treeNode);
    }

    return CountVisitor;
});
