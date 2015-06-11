// require("InputValidator");
// require("ArrayAugments");

/*
 * Provides a selection operator.
 */
var SelectionOperator =
{
    selectFromHead: function(selectionCount, population)
    {
        InputValidator.validateNotNull("population", population);
        InputValidator.validateInRange("selectionCount", selectionCount, 0,
                population.length - 1);

        // This assumes population is sorted.
        var head = population.slice(0, selectionCount);

        return Array.Vizzini.randomElement(head);
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
