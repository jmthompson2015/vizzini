define([ "CountVisitor" ], function(CountVisitor)
{
    "use strict";
    function NumericEvaluator(fitnessCases, errorThreshold, idealGenomeLength)
    {
        InputValidator.validateNotEmpty("fitnessCases", fitnessCases);
        InputValidator.validateNotNull("errorThreshold", errorThreshold);

        this.fitnessCases = function()
        {
            return fitnessCases;
        };

        this.errorThreshold = function()
        {
            return errorThreshold;
        };

        this.idealGenomeLength = function()
        {
            return idealGenomeLength;
        };

        var idealEvaluation = 1000;

        this.idealEvaluation = function()
        {
            return idealEvaluation;
        };

        this.computeSumError = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            return fitnessCases.reduce(function(previousValue, fitnessCase, i)
            {
                var answer = previousValue;
                var input = fitnessCase.input;
                var output = fitnessCase.output;

                try
                {
                    var result = genome.evaluate(input);

                    if (isNaN(result))
                    {
                        answer += 10.0;
                    }
                    else
                    {
                        answer += Math.abs(output - result);
                    }
                }
                catch (e)
                {
                    answer += 10.0;
                }

                return answer;
            }, 0.0);
        };

        this.evaluate = function(population)
        {
            InputValidator.validateNotEmpty("population", population);
            var isDetailed = true;

            population.map(function(genome)
            {
                genome.fitness = 0.0;
                this.evaluateGenome(genome);
            }, this);
        };

        this.evaluateGenome = function(genome)
        {
            var sumError = this.computeSumError(genome);

            if (sumError <= errorThreshold)
            {
                // Perfect evaluation.
                genome.fitness = idealEvaluation;

                if (idealGenomeLength !== undefined)
                {
                    // Add pressure for the shortest genome.
                    var visitor = new CountVisitor(genome);
                    genome.fitness += idealGenomeLength - visitor.count();
                }
            }
            else
            {
                genome.fitness += 0.5 * idealEvaluation * errorThreshold / sumError;
            }

            if (isNaN(genome.fitness))
            {
                LOGGER.error("genome = " + genome);
                LOGGER.error("matches = " + matches);
                throw "NumericEvaluator.evaluateMatches() fitness = " + genome.fitness;
            }
        };
    }

    return NumericEvaluator;
});
