/*
 * @see http://www.sudokuwiki.org/Strategy_Families
 */
define(["process/Move"],
    function(Move)
    {
        "use strict";
        var Strategy = {

            HiddenPair:
            {
                candidateIndicesInUnit: function(puzzle, candidate, unit)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateNotNull("candidate", candidate);
                    InputValidator.validateNotNull("unit", unit);

                    var answer = [];

                    for (var i = 0; i < unit.length; i++)
                    {
                        var index = unit[i];
                        var cell = puzzle.get(index);

                        if (cell.isCandidates === true && cell.candidates().includes(candidate))
                        {
                            answer.push(index);
                        }
                    }

                    return answer;
                },

                findDualCandidatesUnitCell: function(puzzle, unit)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateNotNull("unit", unit);

                    var answer;
                    var N = puzzle.N();
                    var allCandidates = [];

                    for (var i = 1; i <= N; i++)
                    {
                        allCandidates.push(i);
                    }

                    var valueToIndices = {};

                    for (var v = 1; v <= N; v++)
                    {
                        valueToIndices[v] = this.candidateIndicesInUnit(puzzle, v, unit);
                    }

                    for (var v0 = 1; v0 < N && answer === undefined; v0++)
                    {
                        var indices0 = valueToIndices[v0];

                        if (indices0.length === 2)
                        {
                            var cell00 = puzzle.get(indices0[0]);
                            var cell01 = puzzle.get(indices0[1]);

                            for (var v1 = v0 + 1; v1 <= N && answer === undefined; v1++)
                            {
                                var indices1 = valueToIndices[v1];

                                if (indices1.length === 2 && indices0[0] === indices1[0] && indices0[1] === indices1[1] &&
                                    (cell00.candidates().size > 2 || cell01.candidates().size > 2))
                                {
                                    var candidates = allCandidates.slice();
                                    candidates.vizziniRemove(v0);
                                    candidates.vizziniRemove(v1);
                                    answer = new Move.BatchRemoveCandidates(puzzle, indices0, Immutable.List(candidates), "hidden pair");
                                }
                            }
                        }
                    }

                    return answer;
                },

                getMove: function(puzzle)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);

                    var answer;
                    var N = puzzle.N();
                    var unit;

                    // Look for dual candidates in a block.
                    for (var b = 0; b < N && answer === undefined; b++)
                    {
                        unit = puzzle.unit().BLOCKS[b];
                        answer = this.findDualCandidatesUnitCell(puzzle, unit);
                    }

                    if (answer === undefined)
                    {
                        // Look for dual candidates in a column.
                        for (var c = 0; c < N && answer === undefined; c++)
                        {
                            unit = puzzle.unit().COLUMNS[c];
                            answer = this.findDualCandidatesUnitCell(puzzle, unit);
                        }
                    }

                    if (answer === undefined)
                    {
                        // Look for dual candidates in a row.
                        for (var r = 0; r < N && answer === undefined; r++)
                        {
                            unit = puzzle.unit().ROWS[r];
                            answer = this.findDualCandidatesUnitCell(puzzle, unit);
                        }
                    }

                    return answer;
                },
            },

            HiddenSingle:
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

                findSingleCandidateUnitCell: function(puzzle, unit)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);
                    InputValidator.validateNotNull("unit", unit);

                    var answer;
                    var N = puzzle.N();

                    for (var v = 1; v <= N && answer === undefined; v++)
                    {
                        var myCount = this.countCandidateInUnit(puzzle, v, unit);

                        if (myCount === 1)
                        {
                            var myIndex = this.firstIndexWithCandidate(puzzle, v, unit);
                            answer = new Move.SetCellValue(puzzle, myIndex, v, "hidden single");
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

                    var answer;
                    var N = puzzle.N();
                    var unit;

                    // Look for a single candidate in a block.
                    for (var b = 0; b < N && answer === undefined; b++)
                    {
                        unit = puzzle.unit().BLOCKS[b];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }

                    if (answer === undefined)
                    {
                        // Look for a single candidate in a column.
                        for (var c = 0; c < N && answer === undefined; c++)
                        {
                            unit = puzzle.unit().COLUMNS[c];
                            answer = this.findSingleCandidateUnitCell(puzzle, unit);
                        }
                    }

                    if (answer === undefined)
                    {
                        // Look for a single candidate in a row.
                        for (var r = 0; r < N && answer === undefined; r++)
                        {
                            unit = puzzle.unit().ROWS[r];
                            answer = this.findSingleCandidateUnitCell(puzzle, unit);
                        }
                    }

                    return answer;
                },
            },

            NakedPair:
            {
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
                                    answer = new Move.BatchRemoveCandidates(puzzle, candidatePeers, cell.candidates(), "naked pair");
                                }
                            }
                        }
                    }

                    return answer;

                    function filterOtherPeers(index)
                    {
                        var myCell = puzzle.get(index);
                        var candidate0 = cell.candidates().get(0);
                        var candidate1 = cell.candidates().get(1);
                        return (myCell.isCandidates === true) && (myCell.candidates().includes(candidate0) || myCell.candidates().includes(candidate1));
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
                getMove: function(puzzle)
                {
                    InputValidator.validateNotNull("puzzle", puzzle);

                    var answer;
                    var size = puzzle.cells().size;

                    for (var i = 0; i < size && answer === undefined; i++)
                    {
                        var cell = puzzle.get(i);

                        if (cell.isCandidates === true && cell.candidates().size === 1)
                        {
                            answer = new Move.SetCellValue(puzzle, i, cell.candidates().get(0), "naked single");
                        }
                    }

                    return answer;
                },
            },
        };

        return Strategy;
    });
