// require("InputValidator");

/*
 * Provides utility methods for a genetic algorithm.
 */
var GAUtilities =
{
    computeAverageFitness: function(population)
    {
        InputValidator.validateNotNull("population", population);

        var sum = 0.0;

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            var fitness = genome.fitness;
            sum += fitness;
        }

        return sum / population.length;
    },

    createPopulation: function(popSize, genomeFactory)
    {
        InputValidator.validateIsNumber("popSize", popSize);
        InputValidator.validateNotNull("genomeFactory", genomeFactory);

        var answer = [];

        for (var i = 0; i < popSize; i++)
        {
            answer[answer.length] = genomeFactory.create();
        }

        return answer;
    },

    genomeToString: function(genome)
    {
        var answer = genome[0];

        for (var i = 1; i < genome.length; i++)
        {
            answer += " ";
            answer += genome[i];
        }

        return answer;
    },

    genomeToLongString: function(genome)
    {
        var answer = genome.fitness;
        answer += ":\t";
        answer += this.genomeToString(genome);

        return answer;
    },

    populationToString: function(population)
    {
        var answer = "";

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            answer += this.genomeToLongString(genome);
            answer += "\n";
        }

        return answer;
    },

    round2: function(value)
    {
        var factor = 100.0;

        return Math.round(factor * value) / factor;
    },

    round4: function(value)
    {
        var factor = 10000.0;

        return Math.round(factor * value) / factor;
    },
}
