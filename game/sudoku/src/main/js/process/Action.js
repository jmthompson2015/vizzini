define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_CELL_CANDIDATE = "addCellCandidate";
    Action.BATCH_REMOVE_CANDIDATES = "batchRemoveCandidates";
    Action.REMOVE_CELL_CANDIDATE = "removeCellCandidate";
    Action.SET_CELL_VALUE = "setCellValue";
    Action.SET_PUZZLE = "setPuzzle";
    Action.SET_SELECTED_INDEX = "setSelectedIndex";
    Action.SET_SOLVER = "setSolver";

    Action.addCellCandidate = function(index, candidate)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateIsNumber("candidate", candidate);

        return (
        {
            type: Action.ADD_CELL_CANDIDATE,
            index: index,
            candidate: candidate,
        });
    };

    Action.batchRemoveCandidates = function(indices, candidates)
    {
        InputValidator.validateNotNull("indices", indices);
        InputValidator.validateNotNull("candidates", candidates);

        return (
        {
            type: Action.BATCH_REMOVE_CANDIDATES,
            indices: indices,
            candidates: candidates,
        });
    };

    Action.removeCellCandidate = function(index, candidate)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateIsNumber("candidate", candidate);

        return (
        {
            type: Action.REMOVE_CELL_CANDIDATE,
            index: index,
            candidate: candidate,
        });
    };

    Action.setCellValue = function(index, value)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateIsNumber("value", value);

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

    Action.setSolver = function(solver)
    {
        InputValidator.validateNotNull("solver", solver);

        return (
        {
            type: Action.SET_SOLVER,
            solver: solver,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
