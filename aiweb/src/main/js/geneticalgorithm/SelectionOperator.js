// require("InputValidator");
// require("ArrayAugments");

/*
 * Provides a selection operator.
 */
var SelectionOperator =
{
    fitnessProportionalSelect: function(selectionCount, population)
    {
        InputValidator.validateNotNull("population", population);
        InputValidator.validateInRange("selectionCount", selectionCount, 0,
                population.length);

        // This assumes population is sorted.
        var head = population.slice(0, selectionCount);
        GAUtilities.determineNormalizedFitness(head);

        var answer;
        var r = Math.random();
        var sum = 0.0;

        for (var i = 0; i < head.length; i++)
        {
            var genome = head[i];
            var high = sum + genome.normalizedFitness;
            LOGGER.trace(i + " " + sum + " <= " + r + " < " + high + " ? "
                    + (sum <= r && r < high));

            if (sum <= r && r < high)
            {
                answer = genome;
                break;
            }

            sum = high;
        }

        return answer;
    },

    randomSelect: function(selectionCount, population)
    {
        InputValidator.validateNotNull("population", population);
        InputValidator.validateInRange("selectionCount", selectionCount, 0,
                population.length - 1);

        // This assumes population is sorted.
        var head = population.slice(0, selectionCount);

        return Array.Vizzini.randomElement(head);
    },

    simpleTournamentSelect: function(selectionCount, population)
    {
        InputValidator.validateNotNull("population", population);
        InputValidator.validateInRange("selectionCount", selectionCount, 0,
                population.length);

        // This assumes population is sorted.
        var head = population.slice(0, selectionCount);

        var genome0 = Array.Vizzini.randomElement(head);
        var genome1 = Array.Vizzini.randomElement(head);

        return (genome0.fitness > genome1.fitness ? genome0 : genome1);
    },
}

function Selector(selectionCount, selectFunction)
{
    InputValidator.validateIsNumber("selectionCount", selectionCount);
    InputValidator.validateNotNull("selectFunction", selectFunction);

    this.getSelectionCount = function()
    {
        return selectionCount;
    }

    this.select = function(population)
    {
        return selectFunction(selectionCount, population)
    }
}
