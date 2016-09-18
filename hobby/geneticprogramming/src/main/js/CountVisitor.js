define(function()
{
    "use strict";
    function CountVisitor(treeNode)
    {
        InputValidator.validateNotNull("treeNode", treeNode);

        var count = 0;

        this.count = function()
        {
            return count;
        };

        this.visit = function(treeNode)
        {
            count++;

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
