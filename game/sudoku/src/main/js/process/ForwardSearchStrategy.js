/*
 * @see http://norvig.com/sudoku.html
 */
define(["Cell", "process/Move"],
    function(Cell, Move)
    {
        "use strict";
        var ForwardSearchStrategy = {

            getMove: function(puzzle, solver, depthIn)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateNotNull("solver", solver);
                // depth optional. default: 0

                var answer;
                var depth = (depthIn !== undefined ? depthIn : 0);
                var indices = [];

                for (var k = 2; k < 6; k++)
                {
                    var myIndices = puzzle.findCellsWithCandidateLength(k);
                    indices = indices.concat(myIndices);
                }

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];
                    var cell = puzzle.get(index);
                    var candidates = cell.candidates();

                    for (var j = 0; j < candidates.length && answer === undefined; j++)
                    {
                        var candidate = candidates[j];
                        var puzzleClone = puzzle.withCell(index, new Cell.Value(candidate));
                        puzzleClone = puzzleClone.removeValueFromPeers(index);
                        puzzleClone = solver.solve(puzzleClone, depth + 1);

                        if (solver.isDone(puzzleClone))
                        {
                            answer = new Move.SetCellValue(puzzle, index, candidate, "forward search " + candidates.length);
                        }
                    }
                }

                return answer;
            },
        };

        return ForwardSearchStrategy;
    });
