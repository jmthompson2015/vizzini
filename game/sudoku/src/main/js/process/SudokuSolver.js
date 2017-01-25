define(["PuzzleFormat", "Unit", "process/PuzzleFactory"],
    function(PuzzleFormat, Unit, PuzzleFactory)
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

            createAction: function(index, value)
            {
                InputValidator.validateIsNumber("index", index);
                InputValidator.validateIsNumber("value", value);

                return (
                {
                    index: index,
                    value: value,
                });
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
                        answer = this.createAction(i, value[0]);
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
                        answer = this.createAction(myIndex, v);
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

            getAction: function(puzzle, N)
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

                if (answer === undefined)
                {
                    // Try two candidate cell values.
                    var length = 2;
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

                    for (i = 0; i < indices.length && answer === undefined; i++)
                    {
                        index = indices[i];
                        value = puzzle[index];

                        for (var j = 0; j < value.length && answer === undefined; j++)
                        {
                            var puzzleClone = PuzzleFormat.parse(PuzzleFormat.format(puzzle));
                            puzzleClone[index] = value[j];
                            PuzzleFactory.adjustPossibilites(puzzleClone, N);
                            this.solve(puzzleClone);

                            if (this.isDone(puzzleClone))
                            {
                                answer = this.createAction(index, value[j]);
                            }
                        }
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
                    var action = this.getAction(puzzle, N);

                    if (action !== undefined)
                    {
                        puzzle[action.index] = action.value;
                        PuzzleFactory.adjustPossibilites(puzzle, N);
                    }

                    count++;
                }

                LOGGER.time("solve()", start, new Date().getTime());
                LOGGER.trace("solve() end");
            },
        };

        return SudokuSolver;
    });
