define(function()
{
    "use strict";
    function TreeVisitor(treeNode)
    {
        InputValidator.validateNotNull("treeNode", treeNode);

        var level = 0;
        var nodeCount = 0;
        var sb = "";

        this.description = function()
        {
            return sb;
        };

        this.nodeCount = function()
        {
            return nodeCount;
        };

        this.visit = function(treeNode)
        {
            for (var i = 0; i < level; i++)
            {
                sb += "  ";
            }
            sb += nodeCount;
            sb += ": ";
            sb += treeNode.symbol();
            sb += " ";
            sb += treeNode.name();
            sb += "\n";

            nodeCount++;

            if (treeNode.arity() > 0)
            {
                level++;
                var size = treeNode.arity();

                for (var j = 0; j < size; j++)
                {
                    var child = treeNode.childAt(j);
                    child.accept(this);
                }

                level--;
            }
        };

        this.visit(treeNode);
    }

    return TreeVisitor;
});
