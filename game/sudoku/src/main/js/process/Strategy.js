define(["Cell", "process/Move"],
    function(Cell, Move)
    {
        "use strict";
        var Strategy = {

            NakedPair:
            {
                createMoveBatchRemoveCandidates: function(puzzle, indices, candidates, source)
                {
                    return new Move.BatchRemoveCandidates(puzzle, indices, candidates, source);
                },

                findNakedPairMove: function(puzzle, index, peers)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateIsNumber("index", index);
                    InputValidator.validateNotNull("peers", peers);

                    var answer;
                    var cell = puzzle.get(index);

                    if (cell.isCandidates === true)
                    {
                        for (var j = 0; j < peers.length && answer === undefined; j++)
                        {
                            var peerIndex = peers[j];
                            var myCell = puzzle.get(peerIndex);

                            if (peerIndex > index && (myCell.isCandidates === true) && (cell.candidates().toString() === myCell.candidates().toString()))
                            {
                                // Find the other peers which contains the pair's candidates.
                                var otherPeers = peers.slice();
                                otherPeers.vizziniRemove(peerIndex);
                                var candidatePeers = otherPeers.filter(filterOtherPeers);

                                if (candidatePeers.length > 0)
                                {
                                    answer = this.createMoveBatchRemoveCandidates(puzzle, candidatePeers, cell.candidates(), "naked pair");
                                }
                            }
                        }
                    }

                    return answer;

                    function filterOtherPeers(index)
                    {
                        var myCell = puzzle.get(index);
                        return (myCell.isCandidates === true) && (myCell.candidates().includes(cell.candidates().get(0)) || myCell.candidates().includes(cell.candidates().get(1)));
                    }
                },

                getMove: function(puzzle)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);

                    var indices = puzzle.findCellsWithCandidateLength(2);

                    var answer;

                    for (var i = 0; i < indices.length && answer === undefined; i++)
                    {
                        var index = indices[i];

                        var peers = puzzle.unit().getBlockPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);

                        if (answer === undefined)
                        {
                            peers = puzzle.unit().getColumnPeers(index);
                            answer = this.findNakedPairMove(puzzle, index, peers);
                        }

                        if (answer === undefined)
                        {
                            peers = puzzle.unit().getRowPeers(index);
                            answer = this.findNakedPairMove(puzzle, index, peers);
                        }
                    }

                    return answer;
                },
            },

            NakedSingle:
            {
                countCandidateInUnit: function(puzzle, candidate, unit)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateNotNull("candidate", candidate);
                    InputValidator.validateNotNull("unit", unit);

                    var answer = 0;

                    for (var i = 0; i < unit.length; i++)
                    {
                        var index = unit[i];
                        var cell = puzzle.get(index);

                        if (cell.isCandidates === true && cell.candidates().includes(candidate))
                        {
                            answer++;
                        }
                    }

                    return answer;
                },

                findSingleCandidateCell: function(puzzle)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);

                    var answer;

                    for (var i = 0; i < puzzle.cells().size && answer === undefined; i++)
                    {
                        var cellName = puzzle.unit().indexToCellName(i);
                        var cell = puzzle.get(i);

                        if (cell.isCandidates === true && cell.candidates().size === 1)
                        {
                            answer = new Move.SetCellValue(puzzle, i, cell.candidates().get(0), "naked single");
                        }
                    }

                    return answer;
                },

                findSingleCandidateUnitCell: function(puzzle, unit)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateNotNull("unit", unit);

                    var answer;
                    var N = puzzle.N();

                    for (var v = 0; v < N && answer === undefined; v++)
                    {
                        var myCount = this.countCandidateInUnit(puzzle, v, unit);

                        if (myCount === 1)
                        {
                            var myIndex = this.firstIndexWithCandidate(puzzle, v, unit);
                            answer = new Move.SetCellValue(puzzle, myIndex, v, "naked single");
                        }
                    }

                    return answer;
                },

                firstIndexWithCandidate: function(puzzle, candidate, unit)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateNotNull("candidate", candidate);
                    InputValidator.validateNotNull("unit", unit);

                    var answer;

                    for (var i = 0; i < unit.length && answer === undefined; i++)
                    {
                        var index = unit[i];
                        var cell = puzzle.get(index);

                        if (cell.isCandidates === true && cell.candidates().includes(candidate))
                        {
                            answer = index;
                        }
                    }

                    return answer;
                },

                getMove: function(puzzle)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);

                    var answer = this.findSingleCandidateCell(puzzle);
                    var N = puzzle.N();
                    var unit;

                    if (answer === undefined)
                    {
                        // Look for one candidate in a block.
                        for (var b = 0; b < N && answer === undefined; b++)
                        {
                            unit = puzzle.unit().BLOCKS[b];
                            answer = this.findSingleCandidateUnitCell(puzzle, unit);
                        }
                    }

                    if (answer === undefined)
                    {
                        // Look for one candidate in a column.
                        for (var c = 0; c < N && answer === undefined; c++)
                        {
                            unit = puzzle.unit().COLUMNS[c];
                            answer = this.findSingleCandidateUnitCell(puzzle, unit);
                        }
                    }

                    if (answer === undefined)
                    {
                        // Look for one candidate in a row.
                        for (var r = 0; r < N && answer === undefined; r++)
                        {
                            unit = puzzle.unit().ROWS[r];
                            answer = this.findSingleCandidateUnitCell(puzzle, unit);
                        }
                    }

                    return answer;
                },
            },
        };

        return Strategy;
    });
