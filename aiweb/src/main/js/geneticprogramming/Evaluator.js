define(function()
{
    "use strict";
    function Evaluator(contexts, outputs, isMatches, errorThreshold)
    {
        InputValidator.validateNotEmpty("contexts", contexts);
        InputValidator.validateNotEmpty("outputs", outputs);

        var idealEvaluation = 1000;

        this.contexts = function()
        {
            return contexts;
        };

        this.outputs = function()
        {
            return outputs;
        };

        this.isMatches = function()
        {
            return isMatches;
        };

        this.errorThreshold = function()
        {
            return errorThreshold;
        };

        this.idealEvaluation = function()
        {
            return idealEvaluation;
        };

        this.computeMatches = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            return inputs.reduce(function(previousValue, input, i)
            {
                try
                {
                    var result = genome.evaluate(context);

                    return previousValue + (result === outputs[i] ? 1 : 0);
                }
                catch (e)
                {
                    return previousValue;
                }
            }, 0);
        };

        this.computeSumError = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            return contexts.reduce(function(previousValue, context, i)
            {
                var answer = previousValue;

                try
                {
                    var result = genome.evaluate(context);

                    if (isNaN(result))
                    {
                        answer += 10.0;
                    }
                    else
                    {
                        answer += Math.abs(outputs[i] - result);
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

                if (isMatches)
                {
                    this.evaluateMatches(genome);
                }
                else
                {
                    this.evaluateNumericError(genome);
                }
            }, this);
        };

        this.evaluateMatches = function(genome)
        {
            var matches = this.computeMatches(genome.phenotype);

            if (matches === outputs.length)
            {
                // Perfect evaluation.
                genome.fitness = idealEvaluation;

                if (idealGenomeLength)
                {
                    // Add pressure for the shortest genome.
                    genome.fitness += idealGenomeLength - genome.length;
                }
            }
            else
            {
                genome.fitness += matches * (400.0 / outputs.length);
            }

            if (isNaN(genome.fitness))
            {
                LOGGER.error("genome = " + genome);
                LOGGER.error("matches = " + matches);
                throw "JSEvaluator.evaluateMatches() fitness = " + genome.fitness;
            }
        };

        this.evaluateNumericError = function(genome)
        {
            var sumError = this.computeSumError(genome);

            if (sumError <= errorThreshold)
            {
                // Perfect evaluation.
                genome.fitness = idealEvaluation;
            }
            else
            {
                genome.fitness += 400.0 / (sumError / errorThreshold);
            }
        };
    }

    return Evaluator;
});
