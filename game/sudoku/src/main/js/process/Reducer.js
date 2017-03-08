define(["Cell", "InitialState", "process/Action"],
    function(Cell, InitialState, Action)
    {
        "use strict";
        var Reducer = {};

        Reducer.root = function(state, action)
        {
            LOGGER.debug("root() type = " + action.type);

            if (typeof state === 'undefined')
            {
                return new InitialState();
            }

            var newConflictIndices, newPuzzle, newSameValueIndices, newSameCandidateIndices;

            switch (action.type)
            {
                case Action.ADD_CELL_CANDIDATE:
                    LOGGER.info("Reducer addCellCandidate " + action.index + " " + (typeof action.index) + " " + action.candidate + " " + (typeof action.candidate));
                    newPuzzle = state.puzzle.withCandidate(action.index, action.candidate);
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.BATCH_REMOVE_CANDIDATES:
                    LOGGER.info("Reducer batchRemoveCandidates " + action.indices + " " + action.candidates);
                    newPuzzle = state.puzzle.withoutCandidates(action.indices, action.candidates);
                    newPuzzle = newPuzzle.adjustCandidates();
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.REMOVE_CELL_CANDIDATE:
                    LOGGER.info("Reducer removeCellCandidate " + action.index + " " + (typeof action.index) + " " + action.candidate + " " + (typeof action.candidate));
                    newPuzzle = state.puzzle.withoutCandidate(action.index, action.candidate);
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.SET_CELL_VALUE:
                    LOGGER.info("Reducer setCellValue " + action.index + " " + (typeof action.index) + " " + action.value + " " + (typeof action.value));
                    var newCell = new Cell.Value(action.value);
                    newPuzzle = state.puzzle.withCell(action.index, newCell);
                    newPuzzle = newPuzzle.removeValueFromPeers(action.index, action.value);
                    newConflictIndices = newPuzzle.conflictIndices(newCell);
                    newSameValueIndices = newPuzzle.sameValueIndices(newCell);
                    newSameCandidateIndices = newPuzzle.sameCandidateIndices(newCell);
                    return Object.assign(
                    {}, state,
                    {
                        conflictIndices: newConflictIndices,
                        puzzle: newPuzzle,
                        sameCandidateIndices: newSameCandidateIndices,
                        sameValueIndices: newSameValueIndices,
                        selectedIndex: action.index,
                        selectedValue: action.value,
                    });
                case Action.SET_PUZZLE:
                    LOGGER.info("Reducer setPuzzle");
                    return Object.assign(
                    {}, state,
                    {
                        conflictIndices: [],
                        isConstantSelected: false,
                        puzzle: action.puzzle,
                        sameCandidateIndices: [],
                        sameValueIndices: [],
                        selectedIndex: undefined,
                        selectedValue: undefined,
                    });
                case Action.SET_SELECTED_INDEX:
                    LOGGER.info("Reducer setSelectedIndex " + action.index + " " + (typeof action.index));
                    var newSelectedValue = state.selectedValue;
                    var newIsConstantSelected = state.isConstantSelected;
                    newSameValueIndices = state.sameValueIndices;
                    newSameCandidateIndices = state.sameCandidateIndices;
                    var cell = state.puzzle.get(action.index);
                    if (cell.isValue === true)
                    {
                        newSelectedValue = cell.value();
                        newIsConstantSelected = cell.isClue();
                        newSameValueIndices = state.puzzle.sameValueIndices(cell);
                        newSameCandidateIndices = state.puzzle.sameCandidateIndices(cell);
                    }
                    return Object.assign(
                    {}, state,
                    {
                        isConstantSelected: newIsConstantSelected,
                        sameCandidateIndices: newSameCandidateIndices,
                        sameValueIndices: newSameValueIndices,
                        selectedIndex: action.index,
                        selectedValue: newSelectedValue,
                    });
                case Action.SET_SOLVER:
                    LOGGER.info("Reducer setSolver");
                    return Object.assign(
                    {}, state,
                    {
                        solver: action.solver,
                    });
                default:
                    LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                    return state;
            }
        };

        if (Object.freeze)
        {
            Object.freeze(Reducer);
        }

        return Reducer;
    });
