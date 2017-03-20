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
                var answer;
                var N = puzzle.N();

                for (var v = 1; v <= N && answer === undefined; v++)
                {
                    var indices = puzzle.candidateIndicesInUnit(v, unit, 1);

                    if (indices.length === 1)
                    {
                        answer = new Move.SetCellValue(puzzle, indices[0], v, "hidden single");
                        break;
                    }
                }

                return answer;
            },

            getMove: function(puzzle)
            {
                var answer;
                var N = puzzle.N();
                var puzzleUnit = puzzle.unit();
                var unit;

                // Look for a single candidate in a block.
                for (var b = 0; b < N && answer === undefined; b++)
                {
                    unit = puzzleUnit.BLOCKS[b];
                    answer = this.findSingleCandidateUnitCell(puzzle, unit);
                }

                if (answer === undefined)
                {
                    // Look for a single candidate in a column.
                    for (var c = 0; c < N && answer === undefined; c++)
                    {
                        unit = puzzleUnit.COLUMNS[c];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for a single candidate in a row.
                    for (var r = 0; r < N && answer === undefined; r++)
                    {
                        unit = puzzleUnit.ROWS[r];
                        answer = this.findSingleCandidateUnitCell(puzzle, unit);
                    }
                }

                return answer;
            },
        };

        return HiddenSingleStrategy;
    });
