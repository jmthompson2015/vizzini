define(["process/Action", "process/Selector", "process/ui/BoardUI", "process/ui/Connector", "process/ui/NumberPad"],
    function(Action, Selector, BoardUI, Connector, NumberPad)
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
                var controlTable = this.createControlTable();

                var boardUIPanel = React.DOM.div(
                {
                    key: "boardUIPanel",
                    className: "boardUIPanel",
                }, boardUI);
                var controlTablePanel = React.DOM.div(
                {
                    key: "controlTablePanel",
                    className: "controlTablePanel",
                }, controlTable);

                return React.DOM.span(
                {
                    key: "sudokuUIPanel",
                    className: "sudokuUIPanel",
                }, boardUIPanel, controlTablePanel);
            },

            createBoardUI: function()
            {
                var connector = ReactRedux.connect(Connector.BoardUI.mapStateToProps)(BoardUI);

                return React.createElement(connector,
                {
                    callback: this.mySelectionCallback,
                });
            },

            createButtonArea: function()
            {
                var pencilButton = React.DOM.button(
                {}, "Pencil");
                var eraseButton = React.DOM.button(
                {}, "Erase");
                var undoButton = React.DOM.button(
                {}, "Undo");
                var hintButton = React.DOM.button(
                {}, "Hint");
                var redoButton = React.DOM.button(
                {}, "Redo");
                var menuButton = React.DOM.button(
                {}, "Menu");

                var rows = [];

                var cells = [];
                cells.push(React.DOM.td(
                {
                    key: "pencilButtonCell",
                }, pencilButton));
                cells.push(React.DOM.td(
                {
                    key: "eraseButtonCell",
                }, eraseButton));
                rows.push(React.DOM.tr(
                {
                    key: "row0",
                }, cells));

                cells = [];
                cells.push(React.DOM.td(
                {
                    key: "undoButtonCell",
                }, undoButton));
                cells.push(React.DOM.td(
                {
                    key: "hintButtonCell",
                }, hintButton));
                rows.push(React.DOM.tr(
                {
                    key: "row1",
                }, cells));

                cells = [];
                cells.push(React.DOM.td(
                {
                    key: "redoButtonCell",
                }, redoButton));
                cells.push(React.DOM.td(
                {
                    key: "menuButtonCell",
                }, menuButton));
                rows.push(React.DOM.tr(
                {
                    key: "row2",
                }, cells));

                var tbody = React.DOM.tbody(
                {}, rows);

                var table = React.DOM.table(
                {
                    className: "buttonAreaTable",
                }, tbody);

                return React.DOM.div(
                {
                    className: "buttonAreaContainer",
                }, table);
            },

            createCandidatePad: function()
            {
                var isNumberPadDisabled = true;
                var connector = ReactRedux.connect(Connector.NumberPad.mapStateToProps)(NumberPad);

                var table = React.createElement(connector,
                {
                    callback: this.myCandidateCallback,
                    className: "candidatePadTable",
                    isDisabled: isNumberPadDisabled,
                });

                return React.DOM.div(
                {
                    className: "candidatePadContainer",
                }, table);
            },

            createControlTable: function()
            {
                var candidatePad = this.createCandidatePad();
                var numberPad = this.createNumberPad();
                var buttonArea = this.createButtonArea();

                var candidatePadCell = React.DOM.div(
                {
                    key: "candidatePadCell",
                    className: "candidatePadCell",
                }, candidatePad);
                var numberPadCell = React.DOM.div(
                {
                    key: "numberPadCell",
                    className: "numberPadCell",
                }, numberPad);
                var buttonAreaCell = React.DOM.div(
                {
                    key: "buttonAreaCell",
                    className: "buttonAreaCell",
                }, buttonArea);

                var candidatePadRow = React.DOM.div(
                {
                    key: "candidatePadRow",
                    className: "candidatePadRow",
                }, candidatePadCell);
                var numberPadRow = React.DOM.div(
                {
                    key: "numberPadRow",
                    className: "numberPadRow",
                }, numberPadCell);
                var buttonAreaRow = React.DOM.div(
                {
                    key: "buttonAreaRow",
                    className: "buttonAreaRow",
                }, buttonAreaCell);

                return React.DOM.div(
                {
                    key: "controlTableContainer",
                    className: "controlTableContainer",
                }, candidatePadRow, numberPadRow, buttonAreaRow);
            },

            createNumberPad: function()
            {
                var isNumberPadDisabled = this.props.isNumberPadDisabled;
                LOGGER.info("isNumberPadDisabled ? " + isNumberPadDisabled);
                var connector = ReactRedux.connect(Connector.NumberPad.mapStateToProps)(NumberPad);

                var table = React.createElement(connector,
                {
                    callback: this.myNumberCallback,
                    className: "numberPadTable",
                    isDisabled: isNumberPadDisabled,
                });

                return React.DOM.div(
                {
                    className: "numberPadContainer",
                }, table);
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
