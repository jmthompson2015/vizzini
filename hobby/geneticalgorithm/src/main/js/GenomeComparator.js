define(function()
{
    "use strict";
    var GenomeComparator = function(genome0, genome1)
    {
        var fitness0 = genome0.fitness;
        var fitness1 = genome1.fitness;

        // Lowest fitness.
        var answer = fitness0 - fitness1;

        if (answer === 0.0)
        {
            var length0 = genome0.length;
            var length1 = genome1.length;

            // Shortest genome.
            answer = length0 - length1;
        }

        if (answer === 0.0)
        {
            var string0 = genome0.toString();
            var string1 = genome1.toString();

            if (string0 == string1)
            {
                answer = 0;
            }
            else if (string0 < string1)
            {
                answer = -1;
            }
            else
            {
                answer = 1;
            }
        }

        return answer;
    }

    return GenomeComparator;
});
