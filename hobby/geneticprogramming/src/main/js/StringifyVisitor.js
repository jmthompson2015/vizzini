define(function()
{
    "use strict";
    function StringifyVisitor(treeNode)
    {
        InputValidator.validateNotNull("treeNode", treeNode);

        var string = "";

        this.string = function()
        {
            return string;
        };

        this.visit = function(treeNode)
        {
            if (treeNode.arity() > 0)
            {
                // function.
                string += "(";
                string += treeNode.symbol();

                for (var i = 0; i < treeNode.arity(); i++)
                {
                    string += " ";
                    treeNode.childAt(i).accept(this);
                }

                string += ")";
            }
            else
            {
                // terminal.
                string += treeNode.symbol();
            }
        };

        this.visit(treeNode);
    }

    return StringifyVisitor;
});
