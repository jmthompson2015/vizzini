define(function()
{
    "use strict";
    function TreeNode(symbol)
    {
        InputValidator.validateNotNull("symbol", symbol);

        this.symbol = function()
        {
            return symbol;
        };
    }

    TreeNode.prototype.accept = function(visitor)
    {
        InputValidator.validateNotNull("visitor", visitor);

        visitor.visit(this);
    };

    return TreeNode;
});
