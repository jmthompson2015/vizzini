define(function()
{
    "use strict";
    function Evaluator(fitnessCases, rawFitnessComputer, standardizedFitnessComputer)
    {
        InputValidator.validateNotEmpty("fitnessCases", fitnessCases);
        InputValidator.validateNotNull("rawFitnessComputer", rawFitnessComputer);
        // standardizedFitnessComputer optional

        this.fitnessCases = function()
        {
            return fitnessCases;
        };

        this.rawFitnessComputer = function()
        {
            return rawFitnessComputer;
        };

        this.standardizedFitnessComputer = function()
        {
            return standardizedFitnessComputer;
        };

        this.computeStandardizedFitness = function(rawFitness)
        {
            InputValidator.validateIsNumber("rawFitness", rawFitness);

            var answer = rawFitness;

            if (standardizedFitnessComputer !== undefined)
            {
                answer = standardizedFitnessComputer(rawFitness);
            }

            return answer;
        };

        this.computeRawFitness = function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            return rawFitnessComputer(genome);
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
            this.computeRawFitness(genome);
            genome.fitness = this.computeStandardizedFitness(genome.rawFitness);
            genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));
        };
    }

    return Evaluator;
});
