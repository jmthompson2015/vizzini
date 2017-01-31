define(["InitialState", "process/Action", "process/PuzzleAnalyzer", "process/PuzzleFactory"],
    function(InitialState, Action, PuzzleAnalyzer, PuzzleFactory)
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
                    newPuzzle = Reducer._clonePuzzle(state.puzzle);
                    action.indices.forEach(function(index)
                    {
                        var value = newPuzzle[index];
                        if (Array.isArray(value))
                        {
                            action.candidates.forEach(function(candidate)
                            {
                                value.vizziniRemove(candidate);
                            });
                        }
                    });
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.REMOVE_CELL_CANDIDATE:
                    LOGGER.info("Reducer removeCellCandidate " + action.index + " " + (typeof action.index) + " " + action.candidate + " " + (typeof action.candidate));
                    newPuzzle = Reducer._clonePuzzle(state.puzzle);
                    newPuzzle[action.index].vizziniRemove(action.candidate);
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.SET_CELL_VALUE:
                    LOGGER.info("Reducer setCellValue " + action.index + " " + (typeof action.index) + " " + action.value + " " + (typeof action.value));
                    newPuzzle = Reducer._clonePuzzle(state.puzzle);
                    newPuzzle[action.index] = action.value;
                    PuzzleFactory.removeValueFromPeers(newPuzzle, action.index);
                    newConflictIndices = Reducer._determineConflictIndices(newPuzzle, action.value);
                    newSameValueIndices = Reducer._determineSameValueIndices(newPuzzle, action.value);
                    newSameCandidateIndices = Reducer._determineSameCandidateIndices(newPuzzle, action.value);
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
                    var newSelectedValue = state.puzzle[action.index];
                    var isConstant = state.puzzle.constantIndices.vizziniContains(action.index);
                    if (Array.isArray(newSelectedValue))
                    {
                        newSelectedValue = state.selectedValue;
                    }
                    newSameValueIndices = Reducer._determineSameValueIndices(state.puzzle, newSelectedValue);
                    newSameCandidateIndices = Reducer._determineSameCandidateIndices(state.puzzle, newSelectedValue);
                    return Object.assign(
                    {}, state,
                    {
                        isConstantSelected: isConstant,
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

        Reducer._clonePuzzle = function(puzzle)
        {
            InputValidator.validateNotNull("puzzle", puzzle);

            var newPuzzle = puzzle.slice();
            newPuzzle.constantIndices = puzzle.constantIndices.slice();

            return newPuzzle;
        };

        Reducer._determineConflictIndices = function(puzzle, selectedValue)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            // selectedValue optional.

            var answer = [];

            if (selectedValue && !Array.isArray(selectedValue))
            {
                for (var i = 0; i < puzzle.length; i++)
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

            if (selectedValue && !Array.isArray(selectedValue))
            {
                for (var i = 0; i < puzzle.length; i++)
                {
                    if (PuzzleAnalyzer.isSameCandidateCell(puzzle, selectedValue, i))
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

            if (selectedValue && !Array.isArray(selectedValue))
            {
                for (var i = 0; i < puzzle.length; i++)
                {
                    if (PuzzleAnalyzer.isSameValueCell(puzzle, selectedValue, i))
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
