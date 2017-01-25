define(["process/Action", "process/Selector", "process/SudokuSolver", "process/ui/BoardUI", "process/ui/Connector", "process/ui/NumberPad"],
    function(Action, Selector, SudokuSolver, BoardUI, Connector, NumberPad)
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
                var store = this.context.store;
                var puzzle = Selector.puzzle(store.getState());

                var isPencilDisabled = true;
                var isEraseDisabled = true;
                var isUndoDisabled = true;
                var isHintDisabled = SudokuSolver.isDone(puzzle);
                var isRedoDisabled = true;
                var isMenuDisabled = true;

                var pencilButton = React.DOM.button(
                {
                    disabled: isPencilDisabled,
                }, "Pencil");
                var eraseButton = React.DOM.button(
                {
                    disabled: isEraseDisabled,
                    onClick: this.performEraseAction,
                }, "Erase");
                var undoButton = React.DOM.button(
                {
                    disabled: isUndoDisabled,
                }, "Undo");
                var hintButton = React.DOM.button(
                {
                    disabled: isHintDisabled,
                    onClick: this.performHintAction,
                }, "Hint");
                var redoButton = React.DOM.button(
                {
                    disabled: isRedoDisabled,
                }, "Redo");
                var menuButton = React.DOM.button(
                {
                    disabled: isMenuDisabled,
                }, "Menu");

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

            performHintAction: function()
            {
                LOGGER.info("performHintAction()");

                var store = this.context.store;
                var puzzle = Selector.puzzle(store.getState());
                var N = Selector.N(store.getState());
                var action = SudokuSolver.getAction(puzzle, N);

                if (action !== undefined)
                {
                    store.dispatch(Action.setCellValue(action.index, action.value));
                }
            },
        });

        return SudokuUI;
    });
