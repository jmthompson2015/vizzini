define(["process/Selector"],
    function(Selector)
    {
        "use strict";
        var Connector = {};

        Connector.BoardUI = {
            mapStateToProps: function(state, ownProps)
            {
                var n = Selector.n(state);
                var puzzle = Selector.puzzle(state);
                var selectedIndex = Selector.selectedIndex(state);
                var selectedValue = Selector.selectedValue(state);

                return (
                {
                    callback: ownProps.callback,
                    n: n,
                    puzzle: puzzle,
                    selectedIndex: selectedIndex,
                    selectedValue: selectedValue,
                });
            },
        };

        Connector.NumberPad = {
            mapStateToProps: function(state, ownProps)
            {
                var n = Selector.n(state);

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
                var isNumberPadDisabled = Selector.isConstantSelected(state);

                return (
                {
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
