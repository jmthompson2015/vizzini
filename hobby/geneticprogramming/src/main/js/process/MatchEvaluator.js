define([ "CountVisitor" ], function(CountVisitor)
{
    "use strict";
    function MatchEvaluator(fitnessCases, idealGenomeLength, standardizedFitnessComputer)
    {
        InputValidator.validateNotEmpty("fitnessCases", fitnessCases);
        // idealGenomeLength optional
        // standardizedFitnessComputer optional

        this.fitnessCases = function()
        {
            return fitnessCases;
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

        this.computeMatches = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            return fitnessCases.reduce(function(previousValue, fitnessCase, i)
            {
                var input = fitnessCase.input;
                var output = fitnessCase.output;
                try
                {
                    var result = genome.evaluate(input);

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
            genome.hits = this.computeMatches(genome);
            genome.rawFitness = genome.hits;

            if (idealGenomeLength !== undefined)
            {
                // Add pressure for the genome length.
                var visitor = new CountVisitor(genome);
                genome.rawFitness -= (0.05 * Math.abs(idealGenomeLength - visitor.count()));
            }

            genome.fitness = this.computeStandardizedFitness(fitnessCases.length - genome.rawFitness);
            genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));

            if (isNaN(genome.fitness))
            {
                LOGGER.error("genome = " + genome);
                throw "MatchEvaluator.evaluateGenome() fitness = " + genome.fitness;
            }
        };
    }

    return MatchEvaluator;
});
