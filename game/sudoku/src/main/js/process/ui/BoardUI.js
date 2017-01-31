define(["Unit", "process/ui/CandidatesUI"],
    function(Unit, CandidatesUI)
    {
        var BoardUI = React.createClass(
        {
            propTypes:
            {
                callback: React.PropTypes.func.isRequired,
                // n: React.PropTypes.number.isRequired,
                puzzle: React.PropTypes.object.isRequired,
                conflictIndices: React.PropTypes.array.isRequired,
                sameValueIndices: React.PropTypes.array.isRequired,
                sameCandidateIndices: React.PropTypes.array.isRequired,

                selectedIndex: React.PropTypes.number,
                selectedValue: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]),
            },

            render: function()
            {
                // var n = this.props.n;
                // var N = n * n;
                var puzzle = this.props.puzzle;
                var n = puzzle.n();
                var N = puzzle.N();
                var conflictIndices = this.props.conflictIndices;
                var sameValueIndices = this.props.sameValueIndices;
                var sameCandidateIndices = this.props.sameCandidateIndices;
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
                        var cell = puzzle.get(index);
                        var isCandidates = (cell.isCandidates !== undefined ? cell.isCandidates : false);
                        var isConstant = puzzle.clueIndices().vizziniContains(index);
                        var isSelected = (selectedIndex === index);
                        var className, element;

                        if (isCandidates)
                        {
                            className = "candidatesCell";
                        }
                        else if (conflictIndices.vizziniContains(index))
                        {
                            className = "conflictCell";
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
                        else if (sameValueIndices.vizziniContains(index))
                        {
                            className += " highlightedNumberCell";
                        }
                        else if (sameCandidateIndices.vizziniContains(index))
                        {
                            className += " highlightedCandidateCell";
                        }

                        element = React.createElement(BoardUI.CellUI,
                        {
                            n: n,
                            cell: cell,
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
                cell: React.PropTypes.object.isRequired,
            },

            render: function()
            {
                var answer;
                var cell = this.props.cell;

                if (cell.isCandidates === true)
                {
                    answer = React.createElement(CandidatesUI,
                    {
                        n: this.props.n,
                        candidates: cell.candidates().toJS(),
                    });
                }
                else
                {
                    answer = React.DOM.span(
                    {}, cell.value());
                }

                return answer;
            },
        });

        return BoardUI;
    });
