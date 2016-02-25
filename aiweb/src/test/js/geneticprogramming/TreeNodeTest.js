define([ "TreeNode" ], function(TreeNode)
{
    "use strict";
    QUnit.module("TreeNode");

    QUnit.test("TreeNode()", function(assert)
    {
        // Setup.
        var name = "Test";
        var symbol = "#";

        // Run.
        var result = new TreeNode(name, symbol);

        // Verify.
        assert.ok(result);
        assert.equal(result.name(), name);
        assert.equal(result.symbol(), symbol);
    });
});
