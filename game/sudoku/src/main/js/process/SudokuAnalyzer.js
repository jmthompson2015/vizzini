define(["PuzzleFormat", "process/SudokuSolver", "process/SudokuValidator"],
    function(PuzzleFormat, SudokuSolver, SudokuValidator)
    {
        var SudokuAnalyzer = {

            analyze: function(puzzleIn, useForwardSearchIn)
            {
                InputValidator.validateNotNull("puzzle", puzzleIn);
                // useForwardSearch optional. default: true

                var puzzle = puzzleIn;
                var useForwardSearch = (useForwardSearchIn !== undefined ? useForwardSearchIn : true);
                var clueCount = puzzle.clueIndices().length;
                var cellCount = puzzle.N() * puzzle.N();
                var emptyCount = cellCount - clueCount;

                var sourceCounts = {};
                var moves = [];
                var solver = new SudokuSolver(useForwardSearch);
                var move = solver.getMove(puzzle);

                while (!solver.isDone(puzzle) && move)
                {
                    moves.push(move);
                    var source = move.source();
                    var sourceCount = sourceCounts[source];
                    var count = (sourceCount !== undefined ? sourceCount : 0);
                    sourceCounts[source] = count + 1;
                    puzzle = move.execute();

                    move = solver.getMove(puzzle);
                }

                var solvedGrid = PuzzleFormat.format(puzzle);
                var isSolved = SudokuValidator.isValid(solvedGrid);

                return (
                {
                    clueCount: clueCount,
                    emptyCount: emptyCount,
                    isSolved: isSolved,
                    moves: moves,
                    solvedGrid: solvedGrid,
                    solvedPuzzle: puzzle,
                    sourceCounts: sourceCounts,
                });
            },
        };

        return SudokuAnalyzer;
    });
