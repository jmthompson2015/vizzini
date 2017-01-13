define(["Unit"],
    function(Unit)
    {
        var PuzzleFormat = {
            BLANK: ".",

            format: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer = "";
                var cellCount = puzzle.length;

                for (var i = 0; i < cellCount; i++)
                {
                    var value = puzzle[i];

                    if (Array.isArray(value))
                    {
                        answer += PuzzleFormat.BLANK;
                    }
                    else
                    {
                        answer += value;
                    }
                }

                return answer;
            },

            parse: function(grid)
            {
                InputValidator.validateNotEmpty("grid", grid);

                var answer = this.createEmpty();
                var cellCount = answer.length;

                // Assign values from the grid.
                for (var i = 0; i < cellCount; i++)
                {
                    var value = grid[i];

                    if (value !== PuzzleFormat.BLANK)
                    {
                        answer[i] = Number(value);
                        answer.constantIndices.push(i);
                    }
                }

                return answer;
            },

            createEmpty: function(NIn)
            {
                var N = (NIn !== undefined ? NIn : 9);
                var answer = [];
                answer.constantIndices = [];

                // Initialize.
                for (var i = 0; i < (N * N); i++)
                {
                    answer[i] = Unit.DEFAULT_CELL.slice();
                }

                return answer;
            },
        };

        return PuzzleFormat;
    });
