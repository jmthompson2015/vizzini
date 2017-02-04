define(["process/Selector"],
    function(Selector)
    {
        "use strict";
        var Connector = {};

        Connector.BoardUI = {
            mapStateToProps: function(state, ownProps)
            {
                var selectedValue = Selector.selectedValue(state);

                return (
                {
                    callback: ownProps.callback,
                    // n: state.n,
                    puzzle: state.puzzle,
                    conflictIndices: state.conflictIndices,
                    sameValueIndices: state.sameValueIndices,
                    sameCandidateIndices: state.sameCandidateIndices,
                    selectedIndex: state.selectedIndex,
                    selectedValue: selectedValue,
                });
            },
        };

        Connector.CandidatePad = {
            mapStateToProps: function(state, ownProps)
            {
                var n = state.puzzle.n();

                return (
                {
                    callback: ownProps.callback,
                    n: n,
                });
            },
        };

        Connector.NumberPad = {
            mapStateToProps: function(state, ownProps)
            {
                var n = state.puzzle.n();

                return (
                {
                    callback: ownProps.callback,
                    n: n,
                });
            },
        };

        Connector.SudokuUI = {
            mapStateToProps: function(state, ownProps)
            {
                var isCandidatePadDisabled = Selector.isConstantSelected(state);
                var isNumberPadDisabled = Selector.isConstantSelected(state);

                return (
                {
                    isCandidatePadDisabled: isCandidatePadDisabled,
                    isNumberPadDisabled: isNumberPadDisabled,
                });
            },
        };

        if (Object.freeze)
        {
            Object.freeze(Connector);
        }

        return Connector;
    });
