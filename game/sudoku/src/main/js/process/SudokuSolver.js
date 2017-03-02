define(["Cell", "process/Strategy"],
    function(Cell, Strategy)
    {
        "use strict";

        function SudokuSolver(strategiesIn)
        {
            // strategies optional.

            var strategies = (strategiesIn !== undefined ? strategiesIn : [Strategy.NakedSingle, Strategy.NakedPair]);

            this.strategies = function()
            {
                return strategies;
            };
        }

        SudokuSolver.prototype.forwardSearch = function(puzzle)
        {
            // Try two candidate cell values.
            var indices = Strategy.findCellsWithCandidateLength(puzzle, 2);

            var answer;

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
                    puzzleClone = this.solve(puzzleClone);

                    if (this.isDone(puzzleClone))
                    {
                        answer = Strategy.createMoveSetCellValue(puzzle, index, candidate, "forward search");
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

            if (answer === undefined)
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
