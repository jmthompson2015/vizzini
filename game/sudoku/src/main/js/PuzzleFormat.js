define(["Cell", "Puzzle"],
    function(Cell, Puzzle)
    {
        "use strict";
        var PuzzleFormat = {
            BLANK: ".",

            format: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer = "";
                var cells = puzzle.cells();

                for (var i = 0; i < cells.size; i++)
                {
                    var cell = cells.get(i);

                    if (cell.isCandidates)
                    {
                        answer += PuzzleFormat.BLANK;
                    }
                    else
                    {
                        answer += cell.value();
                    }
                }

                return answer;
            },

            parse: function(grid)
            {
                InputValidator.validateNotNull("grid", grid);

                var N = Math.sqrt(grid.length);
                var emptyPuzzle = this.createEmpty(N);
                var cells = emptyPuzzle.cells();

                // Assign values from the grid.
                for (var i = 0; i < cells.size; i++)
                {
                    var value = grid[i];

                    if (value !== PuzzleFormat.BLANK)
                    {
                        var cell = new Cell.Value(Number(value), true);
                        cells = cells.set(i, cell);
                    }
                }

                return new Puzzle(cells, emptyPuzzle.unit(), grid);
            },

            createCandidates: function(N)
            {
                InputValidator.validateIsNumber("N", N);

                var myCandidates = [];

                for (var i = 1; i <= N; i++)
                {
                    myCandidates.push(i);
                }

                return Immutable.List(myCandidates);
            },

            createEmpty: function(NIn)
            {
                var N = (NIn !== undefined ? NIn : 9);
                var candidates = this.createCandidates(N);
                var myCells = [];

                // Initialize.
                for (var i = 0; i < (N * N); i++)
                {
                    myCells[i] = new Cell.Candidates(candidates);
                }

                var cells = Immutable.List(myCells);

                return new Puzzle(cells);
            },
        };

        return PuzzleFormat;
    });
