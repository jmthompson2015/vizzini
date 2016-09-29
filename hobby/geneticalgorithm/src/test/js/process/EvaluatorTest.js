define([ "process/Evaluator" ], function(Evaluator)
{
    "use strict";
    QUnit.module("Evaluator");

    QUnit.test("Evaluator()", function(assert)
    {
        // Setup.
        var fitnessCases = [
        {
            input: 1,
            output: 2,
        } ];
        var rawFitnessComputer = function()
        {};
        var standardizedFitnessComputer = function()
        {};

        // Run.
        var result = new Evaluator(fitnessCases, rawFitnessComputer, standardizedFitnessComputer);

        // Verify.
        assert.ok(result);
        assert.equal(result.fitnessCases(), fitnessCases);
        assert.equal(result.rawFitnessComputer(), rawFitnessComputer);
        assert.equal(result.standardizedFitnessComputer(), standardizedFitnessComputer);
    });
});
