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
                var answer;
                var size = puzzle.size();

                for (var i = 0; i < size && answer === undefined; i++)
                {
                    var cell = puzzle.get(i);

                    if (cell.isCandidates === true && cell.candidates().length === 1)
                    {
                        answer = new Move.SetCellValue(puzzle, i, cell.candidates()[0], "naked single");
                        break;
                    }
                }

                return answer;
            },
        };

        return NakedSingleStrategy;
    });
