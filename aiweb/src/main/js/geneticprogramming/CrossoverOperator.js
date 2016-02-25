define([ "CountVisitor", "FragmentVisitor" ], function(CountVisitor, FragmentVisitor)
{
    "use strict";
    var CrossoverOperator =
    {
        tree: function(genome0, genome1)
        {
            InputValidator.validateNotNull("genome0", genome0);
            InputValidator.validateNotNull("genome1", genome1);

            var visitor0 = new CountVisitor(genome0);
            var length0 = visitor0.nodeCount();
            var visitor1 = new CountVisitor(genome1);
            var length1 = visitor1.nodeCount();

            var index0 = Math.vizziniRandomIntFromRange(1, length0);
            var index1 = Math.vizziniRandomIntFromRange(1, length1);

            var visitor3 = new FragmentVisitor(genome1, index1);
            var fragment1 = visitor3.fragment();

            var answer = genome0.copy();
            var visitor4 = new FragmentVisitor(answer, index0);
            var parentNode = visitor4.parent();
            var fragment0 = visitor4.fragment();

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

            return answer;
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
        tree: CrossoverOperator.tree,
        Crossoverer: Crossoverer,
    });
});
