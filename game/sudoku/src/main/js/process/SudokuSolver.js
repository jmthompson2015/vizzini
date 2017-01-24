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

                for (var i = 0; i < puzzle.length; i++)
                {
                    var cellName = Unit.indexToCellName(i);
                    var value = puzzle[i];

                    if (Array.isArray(value) && value.length === 1)
                    {
                        answer = this.createAction(i, value[0]);
                        break;
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

                for (var v = 0; v < N; v++)
                {
                    var myCount = this.countCandidateInUnit(puzzle, v, unit);

                    if (myCount === 1)
                    {
                        var myIndex = this.firstIndexWithCandidate(puzzle, v, unit);
                        answer = this.createAction(myIndex, v);
                        break;
                    }
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
