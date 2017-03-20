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
                // depth optional. default: 0

                var answer;
                var depth = (depthIn !== undefined ? depthIn : 0);
                var indices = [];

                for (var k = 2; k < 6; k++)
                {
                    var myIndices = puzzle.findCellsWithCandidateLength(k);
                    indices = indices.concat(myIndices);
                }

                var length = indices.length;
                var cells = puzzle.cells();

                for (var i = 0; i < length && answer === undefined; i++)
                {
                    var index = indices[i];
                    var cell = cells[index];
                    var candidates = cell.candidates();
                    var cLength = candidates.length;

                    for (var j = 0; j < cLength && answer === undefined; j++)
                    {
                        var candidate = candidates[j];
                        var puzzleClone = puzzle.withCell(index, new Cell.Value(candidate));
                        puzzleClone = puzzleClone.removeValueFromPeers(index);
                        puzzleClone = solver.solve(puzzleClone, depth + 1);

                        if (solver.isDone(puzzleClone))
                        {
                            answer = new Move.SetCellValue(puzzle, index, candidate, "forward search " + candidates.length);
                            break;
                        }
                    }
                }

                return answer;
            },
        };

        return ForwardSearchStrategy;
    });
