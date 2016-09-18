define([ "CountVisitor" ], function(CountVisitor)
{
    "use strict";
    var GenomeComparator = function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);

        var fitness0 = genome0.fitness;
        var fitness1 = genome1.fitness;

        // Highest fitness.
        var answer = fitness1 - fitness0;

        if (answer === 0.0)
        {
            var visitor0 = new CountVisitor(genome0);
            var length0 = visitor0.count();
            var visitor1 = new CountVisitor(genome1);
            var length1 = visitor1.count();

            // Shortest genome.
            answer = length0 - length1;
        }

        return answer;
    };

    return GenomeComparator;
});
