/*
 * @see http://www.sudokuwiki.org/Strategy_Families
 */
define(["process/Move"],
    function(Move)
    {
        "use strict";
        var HiddenSingleStrategy = {

            findSingleCandidateUnitCell: function(puzzle, unit)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateNotNull("unit", unit);

                var answer;
                var N = puzzle.N();

                for (var v = 1; v <= N && answer === undefined; v++)
                {
                    var indices = puzzle.candidateIndicesInUnit(v, unit);

                    if (indices.length === 1)
                    {
                        answer = new Move.SetCellValue(puzzle, indices[0], v, "hidden single");
                    }
                }

                return answer;
            },

            getMove: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer;
                var N = puzzle.N();
                var unit;

                // Look for a single candidate in a block.
                for (var b = 0; b < N && answer === undefined; b++)
                {
                    unit = puzzle.unit().BLOCKS[b];
                    answer = this.findSingleCandidateUnitCell(puzzle, unit);
                }

                if (answer === undefined)
                {
                    // Look for a single candidate in a column.
                    for (var c = 0; c < N && answer === undefined; c++)
                    {
                        unit = puzzle.unit().COLUMNS[c];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for a single candidate in a row.
                    for (var r = 0; r < N && answer === undefined; r++)
                    {
                        unit = puzzle.unit().ROWS[r];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                return answer;
            },
        };

        return HiddenSingleStrategy;
    });
