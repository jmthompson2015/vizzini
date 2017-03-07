define(["Cell", "process/Move", "process/HiddenPairStrategy", "process/HiddenSingleStrategy", "process/NakedPairStrategy", "process/NakedSingleStrategy"],
    function(Cell, Move, HiddenPairStrategy, HiddenSingleStrategy, NakedPairStrategy, NakedSingleStrategy)
    {
        "use strict";

        function SudokuSolver(useForwardSearchIn, strategiesIn)
        {
            // useForwardSearch optional. default: true
            // strategies optional.

            var useForwardSearch = (useForwardSearchIn !== undefined ? useForwardSearchIn : true);
            var strategies = (strategiesIn !== undefined ? strategiesIn : [NakedSingleStrategy, HiddenSingleStrategy, NakedPairStrategy, HiddenPairStrategy]);

            this.useForwardSearch = function()
            {
                return useForwardSearch;
            };

            this.strategies = function()
            {
                return strategies;
            };
        }

        SudokuSolver.prototype.forwardSearch = function(puzzle)
        {
            InputValidator.validateNotNull("puzzle", puzzle);

            var answer;

            for (var k = 2; k < 4 && answer === undefined; k++)
            {
                var indices = puzzle.findCellsWithCandidateLength(k);
                var useForwardSearch = false;
                var solver = new SudokuSolver(useForwardSearch);

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];
                    var cell = puzzle.get(index);
                    var candidates = cell.candidates();

                    for (var j = 0; j < candidates.size && answer === undefined; j++)
                    {
                        var candidate = candidates.get(j);
                        var puzzleClone = puzzle.withCell(index, new Cell.Value(candidate));
                        puzzleClone = puzzleClone.adjustCandidates();
                        puzzleClone = solver.solve(puzzleClone);

                        if (solver.isDone(puzzleClone))
                        {
                            answer = new Move.SetCellValue(puzzle, index, candidate, "forward search " + k);
                        }
                    }
                }
            }

            return answer;
        };

        SudokuSolver.prototype.getMove = function(puzzle)
        {
            InputValidator.validateNotNull("puzzle", puzzle);

            var answer;
            var strategies = this.strategies();

            for (var i = 0; i < strategies.length && answer === undefined; i++)
            {
                var strategy = strategies[i];
                answer = strategy.getMove(puzzle);
            }

            if (this.useForwardSearch() && answer === undefined)
            {
                answer = this.forwardSearch(puzzle);
            }

            return answer;
        };

        SudokuSolver.prototype.isDone = function(puzzle)
        {
            InputValidator.validateNotNull("puzzle", puzzle);

            for (var i = 0; i < puzzle.cells().size; i++)
            {
                var cell = puzzle.get(i);

                if (cell.isCandidates === true)
                {
                    return false;
                }
            }

            return true;
        };

        SudokuSolver.prototype.solve = function(puzzle)
        {
            InputValidator.validateNotNull("puzzle", puzzle);

            LOGGER.trace("solve() start");

            var myPuzzle = puzzle;
            myPuzzle = myPuzzle.adjustCandidates();
            var start = new Date().getTime();
            var maxTries = 81;
            var count = 0;

            while (!this.isDone(myPuzzle) && count < maxTries)
            {
                var move = this.getMove(myPuzzle);

                if (move === undefined)
                {
                    break;
                }

                myPuzzle = move.execute();
                count++;
            }

            LOGGER.time("solve()", start, new Date().getTime());
            LOGGER.trace("solve() end");

            return myPuzzle;
        };

        return SudokuSolver;
    });
