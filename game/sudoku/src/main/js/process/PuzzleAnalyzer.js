define(["Unit"],
    function(Unit)
    {
        var PuzzleAnalyzer = {
            isConflictCell: function(puzzle, index)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("index", index);

                var answer = false;
                var cell0 = puzzle.get(index);

                if (cell0.isValue)
                {
                    var value0 = cell0.value();
                    var cellName = Unit.indexToCellName(index);
                    var peers = Unit.getPeers(cellName);

                    for (var i = 0; i < peers.length; i++)
                    {
                        var peer = peers[i];
                        var myIndex = Unit.cellNameToIndex(peer);
                        var cell = puzzle.get(myIndex);

                        if (cell.isValue && cell.value() === value0)
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
                var cell = puzzle.get(index);

                if (cell.isCandidates)
                {
                    answer = cell.candidates().includes(selectedValue);
                }

                return answer;
            },

            isSameValueCell: function(puzzle, selectedValue, index)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                // selectedValue optional.
                InputValidator.validateIsNumber("index", index);

                var cell = puzzle.get(index);

                return (cell.isValue === true && cell.value() === selectedValue);
            },
        };

        return PuzzleAnalyzer;
    });
