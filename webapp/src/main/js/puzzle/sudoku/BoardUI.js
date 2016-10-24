var BoardUI = React.createClass(
{
    getInitialState: function()
    {
        return (
        {
            puzzle: this.props.puzzle
        });
    },

    componentDidMount: function()
    {
        this.state.puzzle.bind("change", this.puzzleChanged);
    },

    componentWillUnmount: function()
    {
        this.state.puzzle.unbind("change", this.puzzleChanged);
    },

    render: function()
    {
        var originalPuzzle = this.props.puzzle;
        var rows = [];

        for (var j = 0; j < 9; j++)
        {
            var cells = [];

            for (var i = 0; i < 9; i++)
            {
                var index = Unit.coordinatesToIndex(i, j);
                var cellName = Unit.indexToCellName(index);
                var value = this.state.puzzle.get(cellName);
                var originalValue = originalPuzzle.get(cellName);

                if (value.length === 1)
                {
                    var className;

                    if (originalValue.length === 1)
                    {
                        className = "originalValueCell";
                    }
                    else
                    {
                        var grid = PuzzleFormat.format(this.state.puzzle);
                        var isValid = SudokuValidator.isCellValid(grid, index);
                        var className = (isValid ? "valueCell"
                                : "invalidValueCell");
                    }

                    var element = React.createElement(BoardUI.CellUI,
                    {
                        value: value
                    });
                    cells.push(React.DOM.td(
                    {
                        key: i,
                        id: cellName,
                        className: className
                    }, element));
                }
                else
                {
                    var element = React.createElement(BoardUI.CandidatesCellUI,
                    {
                        values: value
                    });
                    cells.push(React.DOM.td(
                    {
                        key: i,
                        id: cellName,
                        className: "valuesCell"
                    }, element));
                }
            }

            rows.push(React.DOM.tr(
            {
                key: j
            }, cells));
        }

        return React.DOM.table(
        {
            id: "boardTable"
        }, rows);
    },

    puzzleChanged: function()
    {
        this.setState(
        {
            puzzle: this.state.puzzle
        });
    },
});

BoardUI.CellUI = React.createClass(
{
    render: function()
    {
        return React.DOM.span({}, this.props.value);
    }
});

BoardUI.CandidatesCellUI = React.createClass(
{
    render: function()
    {
        var rows = [];

        for (var j = 0; j < 3; j++)
        {
            var cells = [];

            for (var i = 0; i < 3; i++)
            {
                var index = (j * 3) + i;
                var value = Number(index + 1).toString();

                if (this.props.values.indexOf(value) >= 0)
                {
                    cells.push(React.DOM.td(
                    {
                        key: i
                    }, value));
                }
                else
                {
                    cells.push(React.DOM.td(
                    {
                        key: i
                    }, " "));
                }
            }

            rows.push(React.DOM.tr(
            {
                key: j
            }, cells));
        }

        return React.DOM.table({}, rows);
    }
});
