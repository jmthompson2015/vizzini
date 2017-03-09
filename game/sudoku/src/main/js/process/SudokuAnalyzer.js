define(["Difficulty", "PuzzleFormat", "process/SudokuSolver", "process/SudokuValidator"],
    function(Difficulty, PuzzleFormat, SudokuSolver, SudokuValidator)
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
                var difficulty = this.determineDifficulty(isSolved, sourceCounts);

                return (
                {
                    clueCount: clueCount,
                    difficulty: difficulty,
                    emptyCount: emptyCount,
                    isSolved: isSolved,
                    moves: moves,
                    solvedGrid: solvedGrid,
                    solvedPuzzle: puzzle,
                    sourceCounts: sourceCounts,
                });
            },

            determineDifficulty: function(isSolved, sourceCounts)
            {
                var answer;

                if (!isSolved)
                {
                    answer = Difficulty.IMPOSSIBLE;
                }
                else if (sourceCounts["forward search 2"] !== undefined ||
                    sourceCounts["forward search 3"] !== undefined ||
                    sourceCounts["forward search 4"] !== undefined ||
                    sourceCounts["forward search 5"] !== undefined)
                {
                    answer = Difficulty.DIABOLICAL;
                }
                else if (sourceCounts["hidden pair"] !== undefined)
                {
                    answer = Difficulty.DEVIOUS;
                }
                else if (sourceCounts["naked pair"] !== undefined)
                {
                    answer = Difficulty.HARD;
                }
                else if (sourceCounts["hidden single"] !== undefined)
                {
                    answer = Difficulty.MEDIUM;
                }
                else if (sourceCounts["naked single"] !== undefined)
                {
                    answer = Difficulty.EASY;
                }

                return answer;
            },
        };

        return SudokuAnalyzer;
    });
