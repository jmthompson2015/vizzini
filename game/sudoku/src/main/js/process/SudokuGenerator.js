define(["GridFactory", "PuzzleFormat", "Unit"],
    function(GridFactory, PuzzleFormat, Unit)
    {
        "use strict";
        var SudokuGenerator = {

            generate: function()
            {
                var answer = GridFactory.createDefaultSolution();
                var N = Math.sqrt(answer.length);
                var unit = new Unit(N);

                // Shuffle intra-block columns.
                answer = this.shuffleIntraBlockUnits(answer, unit.COLUMNS, 0, 2);
                answer = this.shuffleIntraBlockUnits(answer, unit.COLUMNS, 3, 5);
                answer = this.shuffleIntraBlockUnits(answer, unit.COLUMNS, 6, 8);

                // Shuffle intra-block rows.
                answer = this.shuffleIntraBlockUnits(answer, unit.ROWS, 0, 2);
                answer = this.shuffleIntraBlockUnits(answer, unit.ROWS, 3, 5);
                answer = this.shuffleIntraBlockUnits(answer, unit.ROWS, 6, 8);

                // Shuffle block-columns.

                // Shuffle block-rows.

                // Remove values.
                // FIXME: implement remove values.

                return answer;
            },

            shuffleBlockUnits: function(grid)
            {
                var answer = grid;

                // FIXME: implement shuffleBlockUnits().

                return answer;
            },

            shuffleIntraBlockUnits: function(grid, units, low, high)
            {
                var answer = grid;

                for (var i = 0; i < 3; i++)
                {
                    var index0 = Math.vizziniRandomIntFromRange(low, high);
                    var index1 = Math.vizziniRandomIntFromRange(low, high);
                    answer = this.swapUnits(grid, units[index0], units[index1]);
                }

                return answer;
            },

            swapUnits: function(grid, unit0, unit1)
            {
                InputValidator.validateNotNull("grid", grid);
                InputValidator.validateNotNull("unit0", unit0);
                InputValidator.validateNotNull("unit1", unit1);

                if (unit0.length !== unit1.length)
                {
                    throw "Size mismatch: unit0.length = " + unit0.length + " uni1.length = " + unit1.length;
                }

                var puzzle0 = PuzzleFormat.parse(grid);
                var puzzle = PuzzleFormat.parse(grid);

                for (var i = 0; i < unit0.length; i++)
                {
                    var index0 = unit0[i];
                    var index1 = unit1[i];
                    puzzle = puzzle.withCell(index0, puzzle0.get(index1));
                    puzzle = puzzle.withCell(index1, puzzle0.get(index0));
                }

                return PuzzleFormat.format(puzzle);
            },
        };

        return SudokuGenerator;
    });
