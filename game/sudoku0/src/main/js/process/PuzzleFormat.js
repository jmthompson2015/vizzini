// require(InputValidator);
// require(SudokuValidator);
// require(Unit);

/*
 * Provides a formatter and parser for a Sudoku puzzle.
 */
define(["Unit", "process/Puzzle", "process/SudokuValidator"],
    function(Unit, Puzzle, SudokuValidator)
    {
        var PuzzleFormat = {
            format: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer = "";
                var cellCount = puzzle.getCellCount();

                for (var i = 0; i < cellCount; i++)
                {
                    var cellName = Unit.indexToCellName(i);
                    var value = puzzle.get(cellName);

                    if (value.length === 1)
                    {
                        answer += value;
                    }
                    else
                    {
                        answer += SudokuValidator.BLANK;
                    }
                }

                return answer;
            },

            parse: function(grid)
            {
                InputValidator.validateNotEmpty("grid", grid);

                var answer = new Puzzle();
                var cellCount = answer.getCellCount();

                // Assign values from the grid.
                for (var i = 0; i < cellCount; i++)
                {
                    var cellName = Unit.indexToCellName(i);
                    var value = grid[i];

                    if (value !== SudokuValidator.BLANK)
                    {
                        answer.set(cellName, value);
                    }
                }

                return answer;
            },
        };

        return PuzzleFormat;
    });
