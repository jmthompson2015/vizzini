define(function()
{
    "use strict";
    function DepthVisitor(treeNode)
    {
        InputValidator.validateNotNull("treeNode", treeNode);

        var level = 0;
        var depth = 0;

        this.depth = function()
        {
            return depth;
        };

        this.visit = function(treeNode)
        {
            if (treeNode.arity() > 0)
            {
                level++;
                var size = treeNode.arity();

                for (var j = 0; j < size; j++)
                {
                    var child = treeNode.childAt(j);
                    child.accept(this);
                }

                depth = Math.max(level + 1, depth);
                level--;
            }
        };

        this.visit(treeNode);
    }

    return DepthVisitor;
});
