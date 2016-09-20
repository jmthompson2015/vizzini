define([ "CountVisitor" ], function(CountVisitor)
{
    "use strict";
    function NumericEvaluator(fitnessCases, errorThreshold, idealGenomeLength, standardizedFitnessComputer)
    {
        InputValidator.validateNotEmpty("fitnessCases", fitnessCases);
        InputValidator.validateNotNull("errorThreshold", errorThreshold);
        // idealGenomeLength optional
        // standardizedFitnessComputer optional

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

        this.computeStandardizedFitness = function(rawFitness)
        {
            var answer = rawFitness;

            if (standardizedFitnessComputer !== undefined)
            {
                answer = standardizedFitnessComputer(rawFitness);
            }

            return answer;
        };

        this.computeSumError = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            genome.hits = 0;

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
                        var error = Math.abs(output - result);

                        if (error < errorThreshold)
                        {
                            genome.hits++;
                        }

                        answer += error;
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
            genome.rawFitness = this.computeSumError(genome);

            if (idealGenomeLength !== undefined)
            {
                // Add pressure for the genome length.
                var visitor = new CountVisitor(genome);
                genome.rawFitness += (0.05 * Math.abs(idealGenomeLength - visitor.count()));
            }

            genome.fitness = this.computeStandardizedFitness(genome.rawFitness);
            genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));

            if (isNaN(genome.fitness))
            {
                LOGGER.error("genome = " + genome);
                throw "NumericEvaluator.evaluateGenome() fitness = " + genome.fitness;
            }
        };
    }

    return NumericEvaluator;
});
