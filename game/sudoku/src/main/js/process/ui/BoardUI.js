define(["Unit", "process/ui/CandidatesUI"],
    function(Unit, CandidatesUI)
    {
        var BoardUI = React.createClass(
        {
            propTypes:
            {
                callback: React.PropTypes.func.isRequired,
                n: React.PropTypes.number.isRequired,
                puzzle: React.PropTypes.array.isRequired,

                selectedIndex: React.PropTypes.number,
                selectedValue: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]),
            },

            render: function()
            {
                var n = this.props.n;
                var N = n * n;
                var puzzle = this.props.puzzle;
                var selectedIndex = this.props.selectedIndex;
                var selectedValue = this.props.selectedValue;
                var rows = [];

                for (var j = 0; j < N; j++)
                {
                    var cells = [];

                    for (var i = 0; i < N; i++)
                    {
                        var index = Unit.coordinatesToIndex(i, j);
                        var cellName = Unit.indexToCellName(index);
                        var values = puzzle[index];
                        var isCandidates = Array.isArray(values);
                        var isConstant = puzzle.constantIndices.vizziniContains(index);
                        var isSelected = (selectedIndex === index);
                        var isHighlighted1 = (selectedValue === values);
                        var isHighlighted2 = (Array.isArray(values) && values.vizziniContains(selectedValue));
                        var className, element;

                        if (isCandidates)
                        {
                            className = "candidatesCell";
                        }
                        else if (isConstant)
                        {
                            className = "constantCell";
                        }
                        else
                        {
                            className = "valueCell";
                        }

                        if (isSelected)
                        {
                            className += " selectedCell";
                        }
                        else if (isHighlighted1)
                        {
                            className += " highlightedNumberCell";
                        }
                        else if (isHighlighted2)
                        {
                            className += " highlightedCandidateCell";
                        }

                        element = React.createElement(BoardUI.CellUI,
                        {
                            n: n,
                            values: values,
                        });

                        cells.push(React.DOM.td(
                        {
                            key: "cell" + i,
                            id: cellName,
                            className: className,
                            onClick: this.selectCell,
                            "data-index": index,
                        }, element));
                    }

                    rows.push(React.DOM.tr(
                    {
                        key: "row" + j,
                    }, cells));
                }

                var tbody = React.DOM.tbody(
                {}, rows);

                return React.DOM.table(
                {
                    className: "boardUI"
                }, tbody);
            },

            selectCell: function(event)
            {
                var element = event.currentTarget;
                var selectedIndex = parseInt(element.dataset.index);
                var callback = this.props.callback;
                callback(selectedIndex);
            },
        });

        BoardUI.CellUI = React.createClass(
        {
            propTypes:
            {
                n: React.PropTypes.number.isRequired,
                values: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]),
            },

            render: function()
            {
                var answer;
                var values = this.props.values;

                if (Array.isArray(values))
                {
                    answer = React.createElement(CandidatesUI,
                    {
                        n: this.props.n,
                        candidates: values,
                    });
                }
                else
                {
                    answer = React.DOM.span(
                    {}, values);
                }

                return answer;
            },
        });

        return BoardUI;
    });
