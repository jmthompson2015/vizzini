define(function()
{
    "use strict";
    function FragmentVisitor(treeNode, index)
    {
        InputValidator.validateNotNull("treeNode", treeNode);

        var nodeCount = 0;
        var currentParent;
        var fragment;
        var parent;

        this.fragment = function()
        {
            return fragment;
        };

        this.parent = function()
        {
            return parent;
        };

        this.visit = function(treeNode)
        {
            if (nodeCount === index)
            {
                fragment = treeNode;
                parent = currentParent;
                nodeCount++;
            }
            else
            {
                nodeCount++;

                if (treeNode.arity() > 0)
                {
                    var oldParent = currentParent;
                    currentParent = treeNode;

                    for (var i = 0; i < treeNode.arity(); i++)
                    {
                        treeNode.childAt(i).accept(this);
                    }

                    currentParent = oldParent;
                }
            }
        };

        this.visit(treeNode);
    }

    return FragmentVisitor;
});
