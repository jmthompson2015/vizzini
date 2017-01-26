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

            createMoveRemoveCellCandidate: function(puzzle, N, index, value, source)
            {
                return new Move.RemoveCellCandidate(puzzle, N, index, value, source);
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
                        answer = this.createMoveSetCellValue(puzzle, N, i, value[0], "single candidate cell");
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
                        answer = this.createMoveSetCellValue(puzzle, N, myIndex, v, "single candidate unit cell");
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
                            answer = this.createMoveSetCellValue(puzzle, N, index, value[j], "candidate look-ahead");
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

                var answer;

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
