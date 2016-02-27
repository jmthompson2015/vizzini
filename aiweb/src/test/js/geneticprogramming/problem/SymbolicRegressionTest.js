define([ "CountVisitor", "StringifyVisitor", "problem/SymbolicRegression" ], function(CountVisitor, StringifyVisitor,
        SymbolicRegression)
{
    "use strict";
    QUnit.module("SymbolicRegression");

    QUnit.test("SymbolicRegression()", function(assert)
    {
        // Setup.
        var popSize = 500;
        var generationCount = 51;
        var problem = new SymbolicRegression(popSize, generationCount);
        var ga = problem.createGeneticAlgorithm();
        ga.bind("generation", generationChange);

        // Run.
        var done = assert.async();
        ga.determineBest(runFinished);

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            done();
        }, 100);
    });

    function generationChange(geneticAlgorithm, generationCount)
    {
        var bestGenome = geneticAlgorithm.population()[0];
        var visitor1 = new StringifyVisitor(bestGenome);
        var visitor2 = new CountVisitor(bestGenome);
        LOGGER.info("Generation " + generationCount + ": " + Math.vizziniRound(bestGenome.fitness, 4) + " " +
                visitor1.string() + " nodeCount=" + visitor2.nodeCount());
    };

    function runFinished(geneticAlgorithm, bestGenome)
    {
        var visitor1 = new StringifyVisitor(bestGenome);
        var visitor2 = new CountVisitor(bestGenome);
        LOGGER.info("Run completed.");
    }
});
