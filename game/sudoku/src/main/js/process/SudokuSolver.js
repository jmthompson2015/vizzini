define(["Cell", "Unit", "process/Move"],
    function(Cell, Unit, Move)
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
                    var index = unit[i];
                    var cell = puzzle.get(index);

                    if (cell.isCandidates === true && cell.candidates().includes(candidate))
                    {
                        answer++;
                    }
                }

                return answer;
            },

            createMoveBatchRemoveCandidates: function(puzzle, indices, candidates, source)
            {
                return new Move.BatchRemoveCandidates(puzzle, indices, candidates, source);
            },

            createMoveSetCellValue: function(puzzle, index, value, source)
            {
                return new Move.SetCellValue(puzzle, index, value, source);
            },

            findCellsWithCandidateLength: function(puzzle, length)
            {
                var indices = [];
                var i, index, value;

                for (i = 0; i < puzzle.cells().size; i++)
                {
                    var cell = puzzle.get(i);

                    if (cell.isCandidates === true && cell.candidates().size === length)
                    {
                        indices.push(i);
                    }
                }

                return indices;
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

            findSingleCandidateCell: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer;

                for (var i = 0; i < puzzle.cells().size && answer === undefined; i++)
                {
                    var cellName = Unit.indexToCellName(i);
                    var cell = puzzle.get(i);

                    if (cell.isCandidates === true && cell.candidates().size === 1)
                    {
                        answer = this.createMoveSetCellValue(puzzle, i, cell.candidates().get(0), "naked single");
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
                        answer = this.createMoveSetCellValue(puzzle, myIndex, v, "naked single");
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

            forwardSearch: function(puzzle)
            {
                // Try two candidate cell values.
                var indices = this.findCellsWithCandidateLength(puzzle, 2);

                var answer;

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];
                    var cell = puzzle.get(index);
                    var candidates = cell.candidates();

                    for (var j = 0; j < candidates.size && answer === undefined; j++)
                    {
                        var candidate = candidates.get(j);
                        var puzzleClone = puzzle.withCell(index, new Cell.Value(candidate));
                        puzzleClone = puzzleClone.adjustCandidates();
                        puzzleClone = this.solve(puzzleClone);

                        if (this.isDone(puzzleClone))
                        {
                            answer = this.createMoveSetCellValue(puzzle, index, candidate, "forward search");
                        }
                    }
                }

                return answer;
            },

            getMove: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer = this.getNakedSingle(puzzle);

                if (answer === undefined)
                {
                    answer = this.getNakedPair(puzzle);
                }

                if (answer === undefined)
                {
                    answer = this.forwardSearch(puzzle);
                }

                return answer;
            },

            getNakedPair: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var indices = this.findCellsWithCandidateLength(puzzle, 2);

                var answer;

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];

                    var peers = Unit.getBlockPeers(index);
                    answer = this.findNakedPairMove(puzzle, index, peers);

                    if (answer === undefined)
                    {
                        peers = Unit.getColumnPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }

                    if (answer === undefined)
                    {
                        peers = Unit.getRowPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }
                }

                return answer;
            },

            getNakedSingle: function(puzzle)
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
                        unit = Unit.BLOCKS[b];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for one candidate in a column.
                    for (var c = 0; c < N && answer === undefined; c++)
                    {
                        unit = Unit.COLUMNS[c];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for one candidate in a row.
                    for (var r = 0; r < N && answer === undefined; r++)
                    {
                        unit = Unit.ROWS[r];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                return answer;
            },

            isDone: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                for (var i = 0; i < puzzle.cells().size; i++)
                {
                    var cell = puzzle.get(i);

                    if (cell.isCandidates === true)
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

                var myPuzzle = puzzle;
                myPuzzle = myPuzzle.adjustCandidates();
                var start = new Date().getTime();
                var maxTries = 81;
                var count = 0;

                while (!this.isDone(myPuzzle) && count < maxTries)
                {
                    var move = this.getMove(myPuzzle);

                    if (move === undefined)
                    {
                        break;
                    }

                    myPuzzle = move.execute();
                    count++;
                }

                LOGGER.time("solve()", start, new Date().getTime());
                LOGGER.trace("solve() end");

                return myPuzzle;
            },
        };

        return SudokuSolver;
    });
