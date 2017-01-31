define(["PuzzleFormat", "Unit", "process/Move", "process/PuzzleFactory"],
    function(PuzzleFormat, Unit, Move, PuzzleFactory)
    {
        var SudokuSolver = {

            countCandidateInUnit: function(puzzle, candidate, unit)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateNotNull("candidate", candidate);
                InputValidator.validateNotNull("unit", unit);

                var answer = 0;

                for (var i = 0; i < unit.length; i++)
                {
                    var cellName = unit[i];
                    var index = Unit.cellNameToIndex(cellName);
                    var value = puzzle[index];

                    if (Array.isArray(value) && value.vizziniContains(candidate))
                    {
                        answer++;
                    }

                    LOGGER.trace(i + " value = " + value + " answer = " + answer);
                }

                return answer;
            },

            createMoveBatchRemoveCandidates: function(puzzle, indices, candidates, source)
            {
                return new Move.BatchRemoveCandidates(puzzle, indices, candidates, source);
            },

            createMoveRemoveCellCandidate: function(puzzle, index, candidate, source)
            {
                return new Move.RemoveCellCandidate(puzzle, index, candidate, source);
            },

            createMoveSetCellValue: function(puzzle, N, index, value, source)
            {
                return new Move.SetCellValue(puzzle, N, index, value, source);
            },

            findCellsWithCandidateLength: function(puzzle, length)
            {
                var indices = [];
                var i, index, value;

                for (i = 0; i < puzzle.length; i++)
                {
                    value = puzzle[i];

                    if (Array.isArray(value) && value.length === length)
                    {
                        indices.push(i);
                    }
                }

                return indices;
            },

            findSingleCandidateCell: function(puzzle, N)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);

                var answer;

                for (var i = 0; i < puzzle.length && answer === undefined; i++)
                {
                    var cellName = Unit.indexToCellName(i);
                    var value = puzzle[i];

                    if (Array.isArray(value) && value.length === 1)
                    {
                        answer = this.createMoveSetCellValue(puzzle, N, i, value[0], "naked single");
                    }
                }

                return answer;
            },

            findSingleCandidateUnitCell: function(puzzle, N, unit)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);
                InputValidator.validateNotNull("unit", unit);

                var answer;

                for (var v = 0; v < N && answer === undefined; v++)
                {
                    var myCount = this.countCandidateInUnit(puzzle, v, unit);

                    if (myCount === 1)
                    {
                        var myIndex = this.firstIndexWithCandidate(puzzle, v, unit);
                        answer = this.createMoveSetCellValue(puzzle, N, myIndex, v, "naked single");
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
                    var cellName = unit[i];
                    var index = Unit.cellNameToIndex(cellName);
                    var value = puzzle[index];

                    if (Array.isArray(value) && value.vizziniContains(candidate))
                    {
                        answer = index;
                    }
                }

                return answer;
            },

            findNakedPairMove: function(puzzle, index, peers)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("index", index);
                InputValidator.validateNotNull("peers", peers);

                var answer;
                var value = puzzle[index];

                for (var j = 0; j < peers.length && answer === undefined; j++)
                {
                    var peerIndex = peers[j];

                    if (peerIndex > index && value.toString() === puzzle[peerIndex].toString())
                    {
                        // Find the other peers which contains the pair's candidates.
                        var otherPeers = peers.slice();
                        otherPeers.vizziniRemove(peerIndex);
                        var candidatePeers = otherPeers.filter(filterOtherPeers);

                        if (candidatePeers.length > 0)
                        {
                            answer = this.createMoveBatchRemoveCandidates(puzzle, candidatePeers, value, "naked pair");
                        }
                    }
                }

                return answer;

                function filterOtherPeers(index)
                {
                    var myValue = puzzle[index];
                    return Array.isArray(myValue) && (myValue.vizziniContains(value[0]) || myValue.vizziniContains(value[1]));
                }
            },

            forwardSearch: function(puzzle, N)
            {
                // Try two candidate cell values.
                var indices = this.findCellsWithCandidateLength(puzzle, 2);

                var answer;

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];
                    var value = puzzle[index];

                    for (var j = 0; j < value.length && answer === undefined; j++)
                    {
                        var puzzleClone = PuzzleFormat.parse(PuzzleFormat.format(puzzle));
                        puzzleClone[index] = value[j];
                        PuzzleFactory.adjustPossibilites(puzzleClone, N);
                        this.solve(puzzleClone);

                        if (this.isDone(puzzleClone))
                        {
                            answer = this.createMoveSetCellValue(puzzle, N, index, value[j], "forward search");
                        }
                    }
                }

                return answer;
            },

            getMove: function(puzzle, N)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);

                var answer = this.getNakedSingle(puzzle, N);

                if (answer === undefined)
                {
                    answer = this.getNakedPair(puzzle, N);
                }

                if (answer === undefined)
                {
                    answer = this.forwardSearch(puzzle, N);
                }

                return answer;
            },

            getNakedPair: function(puzzle, N)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);

                var indices = this.findCellsWithCandidateLength(puzzle, 2);

                var answer;

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];

                    var peers = Unit.getBlockPeerIndices(index);
                    answer = this.findNakedPairMove(puzzle, index, peers);

                    if (answer === undefined)
                    {
                        peers = Unit.getColumnPeerIndices(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }

                    if (answer === undefined)
                    {
                        peers = Unit.getRowPeerIndices(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }
                }

                return answer;
            },

            getNakedSingle: function(puzzle, N)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);

                var answer = this.findSingleCandidateCell(puzzle, N);

                var unit;

                if (answer === undefined)
                {
                    // Look for one candidate in a block.
                    for (var b = 0; b < N && answer === undefined; b++)
                    {
                        unit = Unit.BLOCKS[b];
                        answer = this.findSingleCandidateUnitCell(puzzle, N, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for one candidate in a column.
                    for (var c = 0; c < N && answer === undefined; c++)
                    {
                        unit = Unit.COLUMNS[c];
                        answer = this.findSingleCandidateUnitCell(puzzle, N, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for one candidate in a row.
                    for (var r = 0; r < N && answer === undefined; r++)
                    {
                        unit = Unit.ROWS[r];
                        answer = this.findSingleCandidateUnitCell(puzzle, N, unit);
                    }
                }

                return answer;
            },

            isDone: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                for (var i = 0; i < puzzle.length; i++)
                {
                    var value = puzzle[i];

                    if (Array.isArray(value))
                    {
                        return false;
                    }
                }

                return true;
            },

            solve: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                LOGGER.trace("solve() start");

                var N = Math.sqrt(puzzle.length);
                PuzzleFactory.adjustPossibilites(puzzle, N);
                var start = new Date().getTime();
                var maxTries = 100;
                var count = 0;

                while (!this.isDone(puzzle) && count < maxTries)
                {
                    var move = this.getMove(puzzle, N);

                    if (move !== undefined)
                    {
                        move.execute();
                    }

                    count++;
                }

                LOGGER.time("solve()", start, new Date().getTime());
                LOGGER.trace("solve() end");
            },
        };

        return SudokuSolver;
    });
