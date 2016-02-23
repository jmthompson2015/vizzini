define(function()
{
    "use strict";
    function TreeNode(name, symbol)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("symbol", symbol);

        this.name = function()
        {
            return name;
        };

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
