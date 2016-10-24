define([ "GenomeFactory" ], function(GenomeFactory)
{
    "use strict";
    QUnit.module("GenomeFactory");

    QUnit.test("create()", function(assert)
    {
        // Setup.
        var genes = [ "a", "b", "c", "d", "e" ];
        var genomeLength = 3;
        var factory = new GenomeFactory(genes, genomeLength);

        // Run.
        var result = factory.create();

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genomeLength);
    });
});
