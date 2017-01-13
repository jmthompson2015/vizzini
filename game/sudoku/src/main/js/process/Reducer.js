define(["InitialState", "PuzzleFactory", "process/Action"],
    function(InitialState, PuzzleFactory, Action)
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

            switch (action.type)
            {
                case Action.SET_CELL_VALUE:
                    LOGGER.info("Reducer.setCellValue() " + action.index + " " + (typeof action.index) + " " + action.value + " " + (typeof action.value));
                    var newPuzzle = state.puzzle.slice();
                    newPuzzle.constantIndices = state.puzzle.constantIndices.slice();
                    newPuzzle[action.index] = action.value;
                    PuzzleFactory.removeValueFromPeers(newPuzzle, action.index);
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: newPuzzle,
                    });
                case Action.SET_PUZZLE:
                    LOGGER.info("Reducer.setPuzzle()");
                    return Object.assign(
                    {}, state,
                    {
                        puzzle: action.puzzle,
                    });
                case Action.SET_SELECTED_INDEX:
                    LOGGER.info("Reducer.setSelectedIndex() " + action.index + " " + (typeof action.index));
                    var newSelectedValue = state.puzzle[state.selectedIndex];
                    var isConstant = state.puzzle.constantIndices.vizziniContains(action.index);
                    if (Array.isArray(newSelectedValue))
                    {
                        newSelectedValue = state.selectedValue;
                    }
                    return Object.assign(
                    {}, state,
                    {
                        isConstantSelected: isConstant,
                        selectedIndex: action.index,
                        selectedValue: newSelectedValue,
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
