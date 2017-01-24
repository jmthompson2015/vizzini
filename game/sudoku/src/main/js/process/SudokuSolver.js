define(["Unit", "process/PuzzleFactory"],
    function(Unit, PuzzleFactory)
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

            firstIndexWithCandidate: function(puzzle, candidate, unit)
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
                        answer = index;
                        break;
                    }
                }

                return answer;
            },

            getUnfilledSquares: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer = this._getUnfilledSquares(puzzle);

                answer.sort(function(cellName0, cellName1)
                {
                    var index0 = Unit.cellNameToIndex(cellName0);
                    var index1 = Unit.cellNameToIndex(cellName1);
                    var value0 = puzzle[index0];
                    var value1 = puzzle[index1];

                    return value1 - value0;
                });

                return answer;
            },

            _getUnfilledSquares: function(puzzle)
            {
                var answer = [];

                for (var i = 0; i < puzzle.length; i++)
                {
                    var cellName = Unit.indexToCellName(i);

                    if (Array.isArray(puzzle[i]))
                    {
                        answer[answer.length] = cellName;
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

                    if (Array.isArray(value) && value.length > 1)
                    {
                        return false;
                    }
                }

                return true;
            },

            propagateConstraints: function(puzzle, N)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);

                LOGGER.trace("propagateConstraints() start");
                var start = new Date().getTime();
                var maxTries = 100;
                var count = 0;

                while (!this.isDone(puzzle) && count < maxTries)
                {
                    var start1 = new Date().getTime();

                    for (var i = 0; i < puzzle.length; i++)
                    {
                        var cellName = Unit.indexToCellName(i);
                        var value = puzzle[i];

                        if (Array.isArray(value) && value.length === 1)
                        {
                            puzzle[i] = value[0];
                        }
                    }

                    PuzzleFactory.adjustPossibilites(puzzle, N);

                    var unit;

                    // Look for one possibility in a block.
                    for (var b = 0; b < N; b++)
                    {
                        unit = Unit.BLOCKS[b];
                        this.resolveSingleCandidateUnit(puzzle, N, unit);
                    }

                    // Look for one possibility in a column.
                    for (var c = 0; c < N; c++)
                    {
                        unit = Unit.COLUMNS[c];
                        this.resolveSingleCandidateUnit(puzzle, N, unit);
                    }

                    // Look for one possibility in a row.
                    for (var r = 0; r < N; r++)
                    {
                        unit = Unit.ROWS[r];
                        this.resolveSingleCandidateUnit(puzzle, N, unit);
                    }

                    LOGGER.time(count + " propagateConstraints() scan", start1, new Date().getTime());

                    count++;
                }

                LOGGER.info(count + " isDone(puzzle) ? " + this.isDone(puzzle));
                LOGGER.time("propagateConstraints()", start, new Date().getTime());
                LOGGER.trace("propagateConstraints() end");
            },

            resolveSingleCandidateUnit: function(puzzle, N, unit)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("N", N);
                InputValidator.validateNotNull("unit", unit);

                for (var v = 0; v < N; v++)
                {
                    var myCount = this.countCandidateInUnit(puzzle, v, unit);

                    if (myCount === 1)
                    {
                        var myIndex = this.firstIndexWithCandidate(puzzle, v, unit);

                        puzzle[myIndex] = v;
                        PuzzleFactory.adjustPossibilites(puzzle, N);
                    }
                }
            },

            solve: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                LOGGER.trace("solve() start");
                var start = new Date().getTime();

                var N = Math.sqrt(puzzle.length);
                this.propagateConstraints(puzzle, N);

                LOGGER.time("solve()", start, new Date().getTime());
                LOGGER.trace("solve() end");
            },
        };

        return SudokuSolver;
    });
