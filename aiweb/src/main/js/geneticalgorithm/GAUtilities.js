var GAUtilities =
{
    computeAverageFitness: function(population)
    {
        var sum = 0.0;

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            var fitness = genome.fitness;
            sum += fitness;
        }

        return sum / population.length;
    },

    createGenome: function(genes, genomeLength)
    {
        var answer = [];

        for (var j = 0; j < genomeLength; j++)
        {
            answer[j] = Array.Vizzini.randomElement(genes);
        }

        return answer;
    },

    createPopulation: function(popSize, genes, genomeLength)
    {
        var answer = [];

        for (var i = 0; i < popSize; i++)
        {
            answer[answer.length] = this.createGenome(genes, genomeLength);
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

    printPopulationOld: function(population)
    {
        console.log("Population:");

        for (var i = 0; i < population.length; i++)
        {
            var genome = population[i];
            console.log(this.genomeToLongString(genome));
        }
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
