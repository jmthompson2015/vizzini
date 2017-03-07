/*
 * @see http://www.sudokuwiki.org/Strategy_Families
 */
define(["process/Move"],
    function(Move)
    {
        "use strict";
        var NakedSingleStrategy = {

            getMove: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var answer;
                var size = puzzle.cells().size;

                for (var i = 0; i < size && answer === undefined; i++)
                {
                    var cell = puzzle.get(i);

                    if (cell.isCandidates === true && cell.candidates().size === 1)
                    {
                        answer = new Move.SetCellValue(puzzle, i, cell.candidates().get(0), "naked single");
                    }
                }

                return answer;
            },
        };

        return NakedSingleStrategy;
    });
