define([ "StringifyVisitor" ], function(StringifyVisitor)
{
    "use strict";
    function Population()
    {
        var genomes = [];

        this.averageFitness = function()
        {
            var sum = this.sumFitness();
            var count = genomes.length;

            return (count > 0 ? sum / count : 0);
        };

        this.forEach = function(callback, thisArg)
        {
            genomes.forEach(callback, thisArg);
        };

        this.get = function(i)
        {
            return genomes[i];
        };

        this.isDuplicate = function(newGenome)
        {
            InputValidator.validateNotNull("newGenome", newGenome);

            if (newGenome.string === undefined)
            {
                newGenome.string = (new StringifyVisitor(newGenome)).string();
            }

            var nodes = genomes.filter(function(genome)
            {
                if (genome.string === undefined)
                {
                    genome.string = (new StringifyVisitor(genome)).string();
                }

                return (newGenome.string === genome.string);
            });

            return (nodes.length > 0);
        };

        this.length = function()
        {
            return genomes.length;
        };

        this.map = function(callback, thisArg)
        {
            return genomes.map(callback, thisArg);
        };

        this.maybeAddGenome = function(genome, duplicatesAllowed)
        {
            InputValidator.validateNotNull("genome", genome);
            InputValidator.validateNotNull("duplicatesAllowed", duplicatesAllowed);

            var answer = false;

            if (duplicatesAllowed || !this.isDuplicate(genome))
            {
                genomes.push(genome);
                answer = true;
            }

            return answer;
        };

        this.reduce = function(callback, initialValue)
        {
            return genomes.reduce(callback, initialValue);
        };

        this.slice = function(begin, end)
        {
            var answer = new Population();

            var newGenomes = genomes.slice(begin, end);
            var duplicatesAllowed = true;

            newGenomes.forEach(function(newGenome)
            {
                answer.maybeAddGenome(newGenome, duplicatesAllowed);
            });

            return answer;
        };

        this.sort = function(comparator)
        {
            genomes.sort(comparator);
        };

        this.sumAdjustedFitness = function()
        {
            return genomes.reduce(function(sum, genome)
            {
                return sum + genome.adjustedFitness;
            }, 0.0);
        };

        this.sumFitness = function()
        {
            return genomes.reduce(function(sum, genome)
            {
                return sum + genome.fitness;
            }, 0.0);
        };

        this.vizziniRandomElement = function()
        {
            return genomes.vizziniRandomElement();
        };
    }

    return Population;
});
