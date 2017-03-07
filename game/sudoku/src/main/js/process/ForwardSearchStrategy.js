/*
 * @see http://norvig.com/sudoku.html
 */
define(["Cell", "process/Move"],
    function(Cell, Move)
    {
        "use strict";
        var ForwardSearchStrategy = {

            getMove: function(puzzle, solver)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateNotNull("solver", solver);

                var answer;

                for (var k = 2; k < 4 && answer === undefined; k++)
                {
                    var indices = puzzle.findCellsWithCandidateLength(k);

                    for (var i = 0; i < indices.length && answer === undefined; i++)
                    {
                        var index = indices[i];
                        var cell = puzzle.get(index);
                        var candidates = cell.candidates();

                        for (var j = 0; j < candidates.size && answer === undefined; j++)
                        {
                            var candidate = candidates.get(j);
                            var puzzleClone = puzzle.withCell(index, new Cell.Value(candidate));
                            puzzleClone = puzzleClone.removeValueFromPeers(index);
                            puzzleClone = solver.solve(puzzleClone);

                            if (solver.isDone(puzzleClone))
                            {
                                answer = new Move.SetCellValue(puzzle, index, candidate, "forward search " + k);
                            }
                        }
                    }
                }

                return answer;
            },
        };

        return ForwardSearchStrategy;
    });
