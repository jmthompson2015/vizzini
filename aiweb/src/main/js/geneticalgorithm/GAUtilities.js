// require("InputValidator");

/*
 * Provides utility methods for a genetic algorithm.
 */
var GAUtilities =
{
    computeAverageFitness: function(population)
    {
        InputValidator.validateNotEmpty("population", population);

        var sum = this.computeSumFitness(population);

        return sum / population.length;
    },

    computeImbalance: function(genome, openGene, closeGene)
    {
        var openCount = this.count(genome, openGene);
        var closeCount = this.count(genome, closeGene);

        return Math.abs(closeCount - openCount);
    },

    computeSumFitness: function(population)
    {
        InputValidator.validateNotNull("population", population);

        var sum = 0.0;

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            sum += genome.fitness;
        }

        return sum;
    },

    count: function(genome, gene)
    {
        var answer = 0;

        for (var i = 0; i < genome.length; i++)
        {
            if (genome[i] == gene)
            {
                answer++;
            }
        }

        return answer;
    },

    countErrors: function(issues)
    {
        var answer = 0;

        for (var i = 0; i < issues.length; i++)
        {
            var issue = issues[i];

            if (issue.code[0] === "E")
            {
                answer++;
            }
        }

        return answer;
    },

    countWarnings: function(issues)
    {
        var answer = 0;

        for (var i = 0; i < issues.length; i++)
        {
            var issue = issues[i];

            if (issue.code[0] === "W")
            {
                answer++;
            }
        }

        return answer;
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

    determineNormalizedFitness: function(population)
    {
        InputValidator.validateNotNull("population", population);

        var sum = this.computeSumFitness(population);

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            genome.normalizedFitness = genome.fitness / sum;
        }
    },

    genomeToString: function(genome)
    {
        InputValidator.validateNotNull("genome", genome);

        return genome.join(" ");
    },

    genomeToLongString: function(genome)
    {
        InputValidator.validateNotNull("genome", genome);

        var answer = genome.fitness;
        answer += ":\t";
        answer += this.genomeToString(genome);

        return answer;
    },

    populationToString: function(population)
    {
        InputValidator.validateNotNull("population", population);

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
