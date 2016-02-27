define([ "GenomeFactory", "PopulationUtilities" ], function(GenomeFactory, PopulationUtilities)
{
    "use strict";
    function PopulationGenerator(functions, terminals, maxDepth, popSize)
    {
        InputValidator.validateNotNull("functions", functions);
        InputValidator.validateNotNull("terminals", terminals);
        InputValidator.validateNotNull("maxDepth", maxDepth);
        InputValidator.validateNotNull("popSize", popSize);

        this.functions = function()
        {
            return functions;
        };

        this.terminals = function()
        {
            return terminals;
        };

        this.maxDepth = function()
        {
            return maxDepth;
        };

        this.popSize = function()
        {
            return popSize;
        };
    }

    PopulationGenerator.prototype.generate = function()
    {
        var answer = [];
        var minDepth = 2;
        var maxDepth = this.maxDepth();
        var steps = maxDepth - minDepth + 1;

        for (var depth = minDepth; depth <= maxDepth; depth++)
        {
            var fullGenerator = new GenomeFactory.Full(this.functions(), this.terminals(), depth);
            var growGenerator = new GenomeFactory.Grow(this.functions(), this.terminals(), depth);
            var portion = this.popSize() / steps;
            var start = (depth - minDepth) * this.popSize() / steps;
            var end = (depth - minDepth + 1) * this.popSize() / steps;
            // var countFull = 0;
            // var countGrow = 0;

            while (answer.length < end)
            {
                var tree;

                if (answer.length < 0.5 * portion + start)
                {
                    tree = fullGenerator.generate();
                    // countFull++;
                }
                else
                {
                    tree = growGenerator.generate();
                    // countGrow++;
                }

                if (!PopulationUtilities.isDuplicate(answer, tree))
                {
                    answer.push(tree);
                }
            }

            // LOGGER.info(depth + " countFull = " + countFull + " countGrow = " + countGrow + " sum = " +
            // (countFull + countGrow));
        }

        return answer;
    };

    return PopulationGenerator;
});
