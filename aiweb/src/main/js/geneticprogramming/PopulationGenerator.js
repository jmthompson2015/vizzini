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
        LOGGER.info("PopulationGenerator.generate() start");

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
            var maxTries = 20;
            var count = 0;
            var duplicatesAllowed = false;

            while (answer.length < end)
            {
                var usingFull = (answer.length < 0.5 * portion + start);
                var tree = (usingFull ? fullGenerator.generate() : growGenerator.generate());

                var isAdded = PopulationUtilities.maybeAddGenome(answer, tree, duplicatesAllowed);
                count = (isAdded ? 0 : count + 1);

                if (count >= maxTries)
                {
                    LOGGER.debug("Can't generate a unique genome; usingFull ? " + usingFull + " count = " + count);
                    PopulationUtilities.maybeAddGenome(answer, tree, true);
                    count = 0;
                }
            }
        }

        LOGGER.info("PopulationGenerator.generate() end");

        return answer;
    };

    return PopulationGenerator;
});
