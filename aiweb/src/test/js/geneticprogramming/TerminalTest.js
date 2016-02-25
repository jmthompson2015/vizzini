define([ "Terminal" ], function(Terminal)
{
    "use strict";
    QUnit.module("Terminal");

    QUnit.test("Constant()", function(assert)
    {
        // Setup.

        // Run.
        var result = new Terminal.Constant(12);

        // Verify.
        assert.ok(result);
        assert.equal(result.evaluate(), 12);
        assert.equal(result.toString(), "Constant value=12");
    });

    QUnit.test("Variable()", function(assert)
    {
        // Setup.
        var context =
        {
            "x": 12,
        };

        // Run.
        var result = new Terminal.Variable("x");

        // Verify.
        assert.ok(result);
        assert.equal(result.evaluate(context), 12);
        assert.equal(result.toString(), "Variable variableName=x");
    });
});
