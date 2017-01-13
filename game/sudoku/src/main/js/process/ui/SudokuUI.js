define(["process/Action", "process/Selector", "process/ui/BoardUI", "process/ui/CandidatesUI", "process/ui/Connector", "process/ui/NumberPad"],
    function(Action, Selector, BoardUI, CandidatesUI, Connector, NumberPad)
    {
        var SudokuUI = React.createClass(
        {
            contextTypes:
            {
                store: React.PropTypes.object.isRequired,
            },

            propTypes:
            {
                isNumberPadDisabled: React.PropTypes.bool.isRequired,
            },

            render: function()
            {
                var boardUI = this.createBoardUI();
                var numberPad = this.createNumberPad();
                var candidatePad = this.createCandidatePad();

                var rows = [];
                var cells = [];
                cells.push(React.DOM.td(
                {
                    key: "boardUICell",
                    rowSpan: 2,
                }, boardUI));
                cells.push(React.DOM.td(
                {
                    key: "numberPadCell",
                }, numberPad));
                rows.push(React.DOM.tr(
                {
                    key: "row0",
                }, cells));

                cells = [];
                cells.push(React.DOM.td(
                {
                    key: "candidatePadCell",
                }, candidatePad));
                rows.push(React.DOM.tr(
                {
                    key: "row1",
                }, cells));

                var tbody = React.DOM.tbody(
                {}, rows);

                return React.DOM.table(
                {}, tbody);
            },

            createBoardUI: function()
            {
                var connector = ReactRedux.connect(Connector.BoardUI.mapStateToProps)(BoardUI);

                return React.createElement(connector,
                {
                    callback: this.mySelectionCallback,
                });
            },

            createCandidatePad: function()
            {
                var isNumberPadDisabled = true;
                var connector = ReactRedux.connect(Connector.NumberPad.mapStateToProps)(NumberPad);

                return React.createElement(connector,
                {
                    callback: this.myCandidateCallback,
                    isDisabled: isNumberPadDisabled,
                });
            },

            createNumberPad: function()
            {
                var isNumberPadDisabled = this.props.isNumberPadDisabled;
                LOGGER.info("isNumberPadDisabled ? " + isNumberPadDisabled);
                var connector = ReactRedux.connect(Connector.NumberPad.mapStateToProps)(NumberPad);

                return React.createElement(connector,
                {
                    callback: this.myNumberCallback,
                    isDisabled: isNumberPadDisabled,
                });
            },

            myCandidateCallback: function(selectedCandidate)
            {
                LOGGER.info("myCandidateCallback() selectedCandidate = " + selectedCandidate + " " + (typeof selectedCandidate));

                var store = this.context.store;
                var index = Selector.selectedIndex(store.getState());
                // store.dispatch(Action.setCellValue(index, selectedValue));
            },

            myNumberCallback: function(selectedValue)
            {
                LOGGER.info("myNumberCallback() selectedValue = " + selectedValue + " " + (typeof selectedValue));

                var store = this.context.store;
                var index = Selector.selectedIndex(store.getState());
                store.dispatch(Action.setCellValue(index, selectedValue));
            },

            mySelectionCallback: function(selectedIndex)
            {
                LOGGER.info("myCallback() selectedIndex = " + selectedIndex + " " + (typeof selectedIndex));

                var store = this.context.store;
                store.dispatch(Action.setSelectedIndex(selectedIndex));
            },
        });

        return SudokuUI;
    });
