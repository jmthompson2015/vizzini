define([ "GenomeComparator" ], function(GenomeComparator)
{
    "use strict";
    QUnit.module("GenomeComparator");

    QUnit.test("GenomeComparator()", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4 ];
        genome0.fitness = 12.3;
        var genome1 = [ 6, 5, 4, 3, 2, 1 ];
        genome1.fitness = 45.6;
        var genome2 = [ 1, 2, 3 ];
        genome2.fitness = 12.3;
        var comparator = GenomeComparator;

        // Run / Verify.
        assert.equal(comparator(genome0, genome0), 0);
        assert.ok(comparator(genome0, genome1) < 0);
        assert.equal(comparator(genome0, genome2), 1);
    });
});
