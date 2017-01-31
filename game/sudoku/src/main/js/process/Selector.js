define(function()
{
    "use strict";
    var Selector = {};

    Selector.candidates = function(state, index)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("index", index);

        var answer;
        var cell = state.puzzle.get(index);

        if (cell.isCandidates)
        {
            answer = cell.candidates();
        }

        return answer;
    };

    Selector.isConstantSelected = function(state)
    {
        InputValidator.validateNotNull("state", state);

        return state.isConstantSelected;
    };

    Selector.n = function(state)
    {
        InputValidator.validateNotNull("state", state);

        return state.n;
    };

    Selector.N = function(state)
    {
        InputValidator.validateNotNull("state", state);

        var n = Selector.n(state);

        return n * n;
    };

    Selector.puzzle = function(state)
    {
        InputValidator.validateNotNull("state", state);

        return state.puzzle;
    };

    Selector.selectedIndex = function(state)
    {
        InputValidator.validateNotNull("state", state);

        return state.selectedIndex;
    };

    Selector.selectedValue = function(state)
    {
        InputValidator.validateNotNull("state", state);

        var answer;
        var selectedIndex = Selector.selectedIndex(state);

        if (selectedIndex !== undefined)
        {
            answer = Selector.value(state, selectedIndex);

            if (Array.isArray(answer))
            {
                answer = state.selectedValue;
            }
        }

        return answer;
    };

    Selector.value = function(state, index)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("index", index);

        var answer;
        var cell = state.puzzle.get(index);

        if (cell.isValue)
        {
            answer = cell.value();
        }

        return answer;
    };

    if (Object.freeze)
    {
        Object.freeze(Selector);
    }

    return Selector;
});
