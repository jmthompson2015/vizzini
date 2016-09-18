define([ "Logic", "Terminal", "process/MatchEvaluator" ], function(Logic, Terminal, MatchEvaluator)
{
    "use strict";
    QUnit.module("MatchEvaluator");

    QUnit.test("MatchEvaluator()", function(assert)
    {
        // Setup.
        var population = [];
        var a = new Terminal.Variable("a");
        var b = new Terminal.Variable("b");
        population.push(new Logic.And([ a, b ]));
        population.push(new Logic.Or([ a, b ]));
        LOGGER.debug("population[0] = " + population[0]);
        LOGGER.debug("population[1] = " + population[1]);

        var fitnessCases = createFitnessCases();
        var evaluator = new MatchEvaluator(fitnessCases);

        // Run.
        evaluator.evaluate(population);

        // Verify.
        var i;
        for (i = 0; i < population.length; i++)
        {
            assert.ok(population[i].fitness !== undefined);
        }

        i = 0;
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 1000);
        assert.equal(Math.vizziniRound(population[i++].fitness, 4), 250);
    });

    function createFitnessCases()
    {
        var fitnessCases = [];

        fitnessCases.push(
        {
            input:
            {
                a: true,
                b: true,
            },
            output: true,
        });

        fitnessCases.push(
        {
            input:
            {
                a: false,
                b: true,
            },
            output: false,
        });

        fitnessCases.push(
        {
            input:
            {
                a: true,
                b: false,
            },
            output: false,
        });

        fitnessCases.push(
        {
            input:
            {
                a: false,
                b: false,
            },
            output: false,
        });

        return fitnessCases;
    }
});
