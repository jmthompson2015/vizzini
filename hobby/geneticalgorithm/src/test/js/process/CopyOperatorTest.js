define([ "process/CopyOperator" ], function(CopyOperator)
{
    "use strict";
    QUnit.module("CopyOperator");

    QUnit.test("copy()", function(assert)
    {
        // Setup.
        var genome = [ 1, 2, 3, 4, 5 ];
        LOGGER.debug("genome = " + genome);

        // Run.
        var result = CopyOperator.copy(genome);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.ok(result != genome);
        assert.ok(result !== genome);
        assert.equal(result.length, genome.length);

        for (var i = 0; i < genome.length; i++)
        {
            assert.ok(result[i] === genome[i]);
        }
    });
});
