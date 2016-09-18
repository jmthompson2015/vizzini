define([ "CountVisitor" ], function(CountVisitor)
{
    "use strict";
    function MatchEvaluator(fitnessCases, idealGenomeLength)
    {
        InputValidator.validateNotEmpty("fitnessCases", fitnessCases);

        this.fitnessCases = function()
        {
            return fitnessCases;
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

        this.computeMatches = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            LOGGER.debug("Evaluator.computeMatches() fitnessCases.length = " + fitnessCases.length);

            return fitnessCases.reduce(function(previousValue, fitnessCase, i)
            {
                var input = fitnessCase.input;
                var output = fitnessCase.output;
                try
                {
                    var result = genome.evaluate(input);
                    LOGGER.debug("Evaluator.computeMatches() input = " + input + " result = " + result);

                    return previousValue + (result === output ? 1 : 0);
                }
                catch (e)
                {
                    return previousValue;
                }
            }, 0);
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
            LOGGER.debug("Evaluator.evaluateMatches() genome = " + genome);
            var matches = this.computeMatches(genome);
            LOGGER.debug("Evaluator.evaluateMatches() matches = " + matches);

            if (matches === fitnessCases.length)
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
                genome.fitness += 0.5 * idealEvaluation * matches / fitnessCases.length;
            }

            if (isNaN(genome.fitness))
            {
                LOGGER.error("genome = " + genome);
                LOGGER.error("matches = " + matches);
                throw "MatchEvaluator.evaluateMatches() fitness = " + genome.fitness;
            }
        };
    }

    return MatchEvaluator;
});
