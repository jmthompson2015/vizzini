define(function()
{
    "use strict";
    var SelectionOperator =
    {
        fitnessProportionalSelect: function(selectionCount, population)
        {
            InputValidator.validateNotNull("population", population);
            InputValidator.validateInRange("selectionCount", selectionCount, 0, population.length());

            // This assumes population is sorted.
            var head = population.slice(0, selectionCount);
            SelectionOperator.determineNormalizedFitness(head);

            var answer;
            var r = Math.random();
            var sum = 0.0;

            for (var i = 0; i < head.length(); i++)
            {
                var genome = head.get(i);
                var high = sum + genome.normalizedFitness;
                LOGGER.trace(i + " " + sum + " <= " + r + " < " + high + " ? " + (sum <= r && r < high));

                if (sum <= r && r < high)
                {
                    answer = genome;
                    break;
                }

                sum = high;
            }

            if (answer === undefined) { throw "SelectionOperator.fitnessProportionalSelect failed: answer = " + answer; }

            return answer;
        },

        randomSelect: function(selectionCount, population)
        {
            InputValidator.validateNotNull("population", population);
            InputValidator.validateInRange("selectionCount", selectionCount, 0, population.length - 1);

            // This assumes population is sorted.
            var head = population.slice(0, selectionCount);

            return head.vizziniRandomElement();
        },

        simpleTournamentSelect: function(selectionCount, population)
        {
            InputValidator.validateNotNull("population", population);
            InputValidator.validateInRange("selectionCount", selectionCount, 0, population.length);

            // This assumes population is sorted.
            var head = population.slice(0, selectionCount);

            var genome0 = head.vizziniRandomElement();
            var genome1 = head.vizziniRandomElement();

            return (genome0.fitness < genome1.fitness ? genome0 : genome1);
        },

        determineNormalizedFitness: function(population)
        {
            InputValidator.validateNotNull("population", population);

            var sum = population.sumAdjustedFitness();

            population.forEach(function(genome)
            {
                genome.normalizedFitness = genome.adjustedFitness / sum;
            });
        },
    };

    function Selector(selectionCount, selectFunction)
    {
        InputValidator.validateIsNumber("selectionCount", selectionCount);
        InputValidator.validateNotNull("selectFunction", selectFunction);

        this.getSelectionCount = function()
        {
            return selectionCount;
        };

        this.select = function(population)
        {
            return selectFunction(selectionCount, population);
        };
    }

    return (
    {
        fitnessProportionalSelect: SelectionOperator.fitnessProportionalSelect,
        randomSelect: SelectionOperator.randomSelect,
        simpleTournamentSelect: SelectionOperator.simpleTournamentSelect,
        Selector: Selector,
    });
});
