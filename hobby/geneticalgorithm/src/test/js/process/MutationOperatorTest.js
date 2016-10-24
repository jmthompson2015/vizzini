define([ "GenomeFactory", "process/MutationOperator" ], function(GenomeFactory, MutationOperator)
{
    "use strict";
    QUnit.module("MutationOperator");

    QUnit.test("deleteGene()", function(assert)
    {
        // Setup.
        var genomeFactory = createGenomeFactory();
        var genome = [ 1, 2, 3, 4 ];
        LOGGER.trace("genome = " + genome);

        // Run.
        var result = MutationOperator.deleteGene(genomeFactory, genome);

        // Verify.
        assert.ok(result);
        LOGGER.trace("deleteGene() result = " + result);
        assert.equal(result.length, genome.length - 1);
        var genes = genomeFactory.getGenes();
        result.forEach(function(gene)
        {
            assert.ok(genes.vizziniContains(gene));
        });
        assert.equal(result.creator, "MutationOperator.deleteGene");
    });

    QUnit.test("exchange()", function(assert)
    {
        // Setup.
        var genomeFactory = createGenomeFactory();
        var genome = [ 1, 2, 3, 4 ];
        LOGGER.trace("genome = " + genome);

        // Run.
        var result = MutationOperator.exchange(genomeFactory, genome);

        // Verify.
        assert.ok(result);
        LOGGER.trace("exchange() result = " + result);
        assert.equal(result.length, genome.length);
        var genes = genomeFactory.getGenes();
        result.forEach(function(gene)
        {
            assert.ok(genes.vizziniContains(gene));
        });
        assert.equal(result.creator, "MutationOperator.exchange");
    });

    QUnit.test("insertGene()", function(assert)
    {
        // Setup.
        var genomeFactory = createGenomeFactory();
        var genome = [ 1, 2, 3, 4 ];
        LOGGER.trace("genome = " + genome);

        // Run.
        var result = MutationOperator.insertGene(genomeFactory, genome);

        // Verify.
        assert.ok(result);
        LOGGER.trace("insertGene() result = " + result);
        assert.equal(result.length, genome.length + 1);
        var genes = genomeFactory.getGenes();
        result.forEach(function(gene)
        {
            assert.ok(genes.vizziniContains(gene));
        });
        assert.equal(result.creator, "MutationOperator.insertGene");
    });

    QUnit.test("mutate()", function(assert)
    {
        // Setup.
        var genomeFactory = createGenomeFactory();
        var genome = [ 1, 2, 3, 4 ];
        LOGGER.trace("genome = " + genome);

        // Run.
        var result = MutationOperator.mutate(genomeFactory, genome);

        // Verify.
        assert.ok(result);
        LOGGER.trace("mutate() result = " + result);
        assert.equal(result.length, genome.length);
        var genes = genomeFactory.getGenes();
        result.forEach(function(gene)
        {
            assert.ok(genes.vizziniContains(gene));
        });
        assert.equal(result.creator, "MutationOperator.mutate");
    });

    function createGenomeFactory()
    {
        var genes = [ 1, 2, 3, 4 ];
        var genomeLength = 4;

        return new GenomeFactory(genes, genomeLength);
    }
});
