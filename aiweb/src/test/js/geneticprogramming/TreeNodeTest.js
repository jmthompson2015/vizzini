define([ "TreeNode" ], function(TreeNode)
{
    "use strict";
    QUnit.module("TreeNode");

    QUnit.test("TreeNode()", function(assert)
    {
        // Setup.
        var symbol = "#";

        // Run.
        var result = new TreeNode(symbol);

        // Verify.
        assert.ok(result);
        assert.equal(result.symbol(), symbol);
    });
});
