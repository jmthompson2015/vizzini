define(["process/SudokuSolver"],
    function(SudokuSolver)
    {
        var SudokuAnalyzer = {

            analyze: function(puzzleIn)
            {
                InputValidator.validateNotNull("puzzle", puzzleIn);

                var puzzle = puzzleIn;
                var clueCount = puzzle.clueIndices().length;
                var cellCount = puzzle.N() * puzzle.N();
                var emptyCount = cellCount - clueCount;

                var sourceCounts = {};
                var moves = [];
                var solver = new SudokuSolver();
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

                return (
                {
                    clueCount: clueCount,
                    emptyCount: emptyCount,
                    sourceCounts: sourceCounts,
                    moves: moves,
                });
            },
        };

        return SudokuAnalyzer;
    });
