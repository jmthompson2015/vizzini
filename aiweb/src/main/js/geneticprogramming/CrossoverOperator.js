define([ "CountVisitor", "FragmentVisitor" ], function(CountVisitor, FragmentVisitor)
{
    "use strict";
    var CrossoverOperator =
    {
        crossover: function(genome0, genome1)
        {
            InputValidator.validateNotNull("genome0", genome0);
            InputValidator.validateNotNull("genome1", genome1);

            var length0 = (new CountVisitor(genome0)).nodeCount();
            var length1 = (new CountVisitor(genome1)).nodeCount();
            LOGGER.debug("length0 = " + length0 + " length1 = " + length1);

            var index0 = Math.vizziniRandomIntFromRange(1, length0);
            var index1 = Math.vizziniRandomIntFromRange(1, length1);
            LOGGER.debug("index0 = " + index0 + " index1 = " + index1);

            var newGenome0 = genome0.copy();
            var visitor0 = new FragmentVisitor(newGenome0, index0);
            var parentNode0 = visitor0.parent();
            var fragment0 = visitor0.fragment();

            var newGenome1 = genome1.copy();
            var visitor1 = new FragmentVisitor(newGenome1, index1);
            var parentNode1 = visitor1.parent();
            var fragment1 = visitor1.fragment();

            CrossoverOperator.assemble(parentNode0, fragment0, fragment1);
            CrossoverOperator.assemble(parentNode1, fragment1, fragment0);
            var answer = [ newGenome0, newGenome1 ];

            return answer;
        },

        assemble: function(parentNode, fragment0, fragment1)
        {
            var children = parentNode.children();

            for (var i = 0; i < children.length; i++)
            {
                var child = children[i];

                if (child === fragment0)
                {
                    children[i] = fragment1.copy();
                    break;
                }
            }
        },
    };

    function Crossoverer(crossoverFunction)
    {
        InputValidator.validateNotNull("crossoverFunction", crossoverFunction);

        this.execute = function(genome0, genome1)
        {
            return crossoverFunction(genome0, genome1);
        };
    }

    return (
    {
        crossover: CrossoverOperator.crossover,
        Crossoverer: Crossoverer,
    });
});
