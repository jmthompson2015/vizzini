define(["Cell", "InitialState", "process/Action", "process/PuzzleAnalyzer"],
    function(Cell, InitialState, Action, PuzzleAnalyzer)
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
                    newPuzzle = newPuzzle.adjustCandidates();
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.SET_CELL_VALUE:
                    LOGGER.info("Reducer setCellValue " + action.index + " " + (typeof action.index) + " " + action.value + " " + (typeof action.value));
                    var newCell = new Cell.Value(action.value);
                    newPuzzle = state.puzzle.withCell(action.index, newCell);
                    newPuzzle = newPuzzle.adjustCandidates();
                    newConflictIndices = Reducer._determineConflictIndices(newPuzzle, newCell);
                    newSameValueIndices = Reducer._determineSameValueIndices(newPuzzle, newCell);
                    newSameCandidateIndices = Reducer._determineSameCandidateIndices(newPuzzle, newCell);
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
                    var newSelectedValue = state.puzzle.get(action.index);
                    var cell = state.puzzle.get(action.index);
                    var isClue = (cell.isValue === true) && cell.isClue();
                    if (newSelectedValue.isCandidates === true)
                    {
                        newSelectedValue = state.selectedValue;
                    }
                    newSameValueIndices = Reducer._determineSameValueIndices(state.puzzle, newSelectedValue);
                    newSameCandidateIndices = Reducer._determineSameCandidateIndices(state.puzzle, newSelectedValue);
                    return Object.assign(
                    {}, state,
                    {
                        isConstantSelected: isClue,
                        sameCandidateIndices: newSameCandidateIndices,
                        sameValueIndices: newSameValueIndices,
                        selectedIndex: action.index,
                        selectedValue: newSelectedValue,
                    });
                default:
                    LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer._determineConflictIndices = function(puzzle, selectedValue)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            // selectedValue optional.

            var answer = [];

            if (selectedValue && selectedValue.isValue === true)
            {
                for (var i = 0; i < puzzle.cells().size; i++)
                {
                    if (PuzzleAnalyzer.isConflictCell(puzzle, i))
                    {
                        answer.push(i);
                    }
                }
            }

            return answer;
        };

        Reducer._determineSameCandidateIndices = function(puzzle, selectedValue)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            // selectedValue optional.

            var answer = [];

            if (selectedValue && selectedValue.isValue === true)
            {
                for (var i = 0; i < puzzle.cells().size; i++)
                {
                    if (PuzzleAnalyzer.isSameCandidateCell(puzzle, selectedValue.value(), i))
                    {
                        answer.push(i);
                    }
                }
            }

            return answer;
        };

        Reducer._determineSameValueIndices = function(puzzle, selectedValue)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            // selectedValue optional.

            var answer = [];

            if (selectedValue && selectedValue.isValue === true)
            {
                for (var i = 0; i < puzzle.cells().size; i++)
                {
                    if (PuzzleAnalyzer.isSameValueCell(puzzle, selectedValue.value(), i))
                    {
                        answer.push(i);
                    }
                }
            }

            return answer;
        };

        if (Object.freeze)
        {
            Object.freeze(Reducer);
        }

        return Reducer;
    });
