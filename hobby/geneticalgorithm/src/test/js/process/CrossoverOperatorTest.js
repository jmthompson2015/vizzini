define([ "process/CrossoverOperator" ], function(CrossoverOperator)
{
    "use strict";
    QUnit.module("CrossoverOperator");

    QUnit.test("onePointConstantLength()", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4, 5 ];
        var genome1 = [ 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.onePointConstantLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genome0.length);
        assert.equal(result.length, genome1.length);

        for (var i = 0; i < genome0.length; i++)
        {
            assert.ok(result[i] === genome0[i] || result[i] === genome1[i]);
        }
    });

    QUnit.test("onePointConstantLength() different lengths", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4 ];
        var genome1 = [ 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        try
        {
            // Run.
            var result = CrossoverOperator.onePointConstantLength(genome0, genome1);
            throw SHOULD_THROW;
        }
        catch (e)
        {
            // Verify.
            assert.equal(e, "Genomes are different lengths: genome0.length = 4 genome1.length = 5");
        }
    });

    QUnit.test("onePointConstantLength() length one", function(assert)
    {
        // Setup.
        var genome0 = [ 1 ];
        var genome1 = [ 2 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.onePointConstantLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genome0.length);
        assert.equal(result.length, genome1.length);

        for (var i = 0; i < genome0.length; i++)
        {
            assert.ok(result[i] === genome0[i] || result[i] === genome1[i]);
        }
    });

    QUnit.test("onePointVariableLength()", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4 ];
        var genome1 = [ 6, 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.onePointVariableLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.ok(result.length > 0);
    });

    QUnit.test("twoPointConstantLength()", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        var genome1 = [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.twoPointConstantLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genome0.length);
        assert.equal(result.length, genome1.length);

        for (var i = 0; i < genome0.length; i++)
        {
            assert.ok(result[i] === genome0[i] || result[i] === genome1[i]);
        }
    });

    QUnit.test("twoPointConstantLength() different lengths", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4 ];
        var genome1 = [ 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        try
        {
            // Run.
            var result = CrossoverOperator.twoPointConstantLength(genome0, genome1);
            throw SHOULD_THROW;
        }
        catch (e)
        {
            // Verify.
            assert.equal(e, "Genomes are different lengths: genome0.length = 4 genome1.length = 5");
        }
    });

    QUnit.test("twoPointConstantLength() length one", function(assert)
    {
        // Setup.
        var genome0 = [ 1 ];
        var genome1 = [ 2 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.twoPointConstantLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genome0.length);
        assert.equal(result.length, genome1.length);

        for (var i = 0; i < genome0.length; i++)
        {
            assert.ok(result[i] === genome0[i] || result[i] === genome1[i]);
        }
    });

    QUnit.test("twoPointConstantLength() length two", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2 ];
        var genome1 = [ 3, 4 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.twoPointConstantLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genome0.length);
        assert.equal(result.length, genome1.length);

        for (var i = 0; i < genome0.length; i++)
        {
            assert.ok(result[i] === genome0[i] || result[i] === genome1[i]);
        }
    });

    QUnit.test("twoPointVariableLength()", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4 ];
        var genome1 = [ 6, 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.twoPointVariableLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.ok(result.length > 0);
    });

    QUnit.test("twoPointVariableLength() length one", function(assert)
    {
        // Setup.
        var genome0 = [ 1 ];
        var genome1 = [ 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.twoPointVariableLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.ok(result.length > 0);
    });

    QUnit.test("uniformConstantLength()", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4, 5 ];
        var genome1 = [ 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        // Run.
        var result = CrossoverOperator.uniformConstantLength(genome0, genome1);

        // Verify.
        assert.ok(result);
        LOGGER.debug("result = " + result);
        assert.equal(result.length, genome0.length);
        assert.equal(result.length, genome1.length);

        for (var i = 0; i < genome0.length; i++)
        {
            assert.ok(result[i] === genome0[i] || result[i] === genome1[i]);
        }
    });

    QUnit.test("uniformConstantLength() different lengths", function(assert)
    {
        // Setup.
        var genome0 = [ 1, 2, 3, 4 ];
        var genome1 = [ 5, 4, 3, 2, 1 ];
        LOGGER.debug("genome0 = " + genome0);
        LOGGER.debug("genome1 = " + genome1);

        try
        {
            // Run.
            var result = CrossoverOperator.uniformConstantLength(genome0, genome1);
            throw SHOULD_THROW;
        }
        catch (e)
        {
            // Verify.
            assert.equal(e, "Genomes are different lengths: genome0.length = 4 genome1.length = 5");
        }
    });
});
