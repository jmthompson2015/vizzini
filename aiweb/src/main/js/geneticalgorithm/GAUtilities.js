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

        return population.reduce(function(sum, genome)
        {
            return sum + genome.fitness;
        }, 0.0);
    },

    count: function(genome, gene)
    {
        InputValidator.validateNotNull("genome", genome);
        InputValidator.validateNotNull("gene", gene);

        return genome.filter(function(genomeGene)
        {
            return genomeGene == gene;
        }).length;
    },

    countErrors: function(issues)
    {
        InputValidator.validateNotNull("issues", issues);

        return issues.filter(function(issue)
        {
            return issue && issue.code[0] === "E";
        }).length;
    },

    countWarnings: function(issues)
    {
        InputValidator.validateNotNull("issues", issues);

        return issues.filter(function(issue)
        {
            return issue && issue.code[0] === "W";
        }).length;
    },

    createPopulation: function(popSize, genomeFactory)
    {
        InputValidator.validateIsNumber("popSize", popSize);
        InputValidator.validateNotNull("genomeFactory", genomeFactory);

        // FIXME: only add unique genomes?
        var answer = [];

        while (answer.length < popSize)
        {
            answer.push(genomeFactory.create());
        }

        return answer;
    },

    determineNormalizedFitness: function(population)
    {
        InputValidator.validateNotNull("population", population);

        var sum = this.computeSumFitness(population);

        population.forEach(function(genome)
        {
            genome.normalizedFitness = genome.fitness / sum;
        });
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

        return population.reduce(function(previousValue, genome)
        {
            return previousValue + GAUtilities.genomeToLongString(genome)
                    + "\n";
        }, "");
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
