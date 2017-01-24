define(["Unit"],
    function(Unit)
    {
        var PuzzleAnalyzer = {
            isConflictCell: function(puzzle, index)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("index", index);

                var answer = false;
                var cellValue = puzzle[index];

                if (!Array.isArray(cellValue))
                {
                    var cellName = Unit.indexToCellName(index);
                    var peers = Unit.getPeers(cellName);

                    for (var i = 0; i < peers.length; i++)
                    {
                        var peer = peers[i];
                        var myIndex = Unit.cellNameToIndex(peer);
                        var value = puzzle[myIndex];

                        if (!Array.isArray(value) && value === cellValue)
                        {
                            answer = true;
                            break;
                        }
                    }
                }

                return answer;
            },

            isSameCandidateCell: function(puzzle, selectedValue, index)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                // selectedValue optional.
                InputValidator.validateIsNumber("index", index);

                var answer = false;
                var cellValue = puzzle[index];

                if (Array.isArray(cellValue))
                {
                    answer = cellValue.vizziniContains(selectedValue);
                }

                return answer;
            },

            isSameValueCell: function(puzzle, selectedValue, index)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                // selectedValue optional.
                InputValidator.validateIsNumber("index", index);

                var cellValue = puzzle[index];

                return (cellValue === selectedValue);
            },
        };

        return PuzzleAnalyzer;
    });
