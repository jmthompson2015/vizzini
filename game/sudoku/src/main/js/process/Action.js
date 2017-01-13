define(function()
{
    "use strict";
    var Action = {};

    Action.SET_CELL_VALUE = "setCellValue";
    Action.SET_PUZZLE = "setPuzzle";
    Action.SET_SELECTED_INDEX = "setSelectedIndex";

    Action.setCellValue = function(index, value)
    {
        return (
        {
            type: Action.SET_CELL_VALUE,
            index: index,
            value: value,
        });
    };

    Action.setPuzzle = function(puzzle)
    {
        InputValidator.validateNotNull("puzzle", puzzle);

        return (
        {
            type: Action.SET_PUZZLE,
            puzzle: puzzle,
        });
    };

    Action.setSelectedIndex = function(index)
    {
        InputValidator.validateIsNumber("index", index);

        return (
        {
            type: Action.SET_SELECTED_INDEX,
            index: index,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
