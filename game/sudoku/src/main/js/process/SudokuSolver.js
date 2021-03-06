define(["process/ForwardSearchStrategy", "process/HiddenPairStrategy", "process/HiddenSingleStrategy", "process/NakedPairStrategy", "process/NakedSingleStrategy"],
    function(ForwardSearchStrategy, HiddenPairStrategy, HiddenSingleStrategy, NakedPairStrategy, NakedSingleStrategy)
    {
        "use strict";

        function SudokuSolver(useForwardSearchIn, strategiesIn)
        {
            // useForwardSearch optional. default: true
            // strategies optional. default: four basic strategies + forward search

            var useForwardSearch = (useForwardSearchIn !== undefined ? useForwardSearchIn : true);
            var basicStrategies = [NakedSingleStrategy, HiddenSingleStrategy, NakedPairStrategy, HiddenPairStrategy];
            var strategies = (strategiesIn !== undefined ? strategiesIn : basicStrategies);

            if (useForwardSearch)
            {
                strategies.push(ForwardSearchStrategy);
            }

            this.useForwardSearch = function()
            {
                return useForwardSearch;
            };

            this.strategies = function()
            {
                return strategies;
            };
        }

        SudokuSolver.prototype.getMove = function(puzzle, depthIn)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            // depth optional. default: 0

            var answer;
            var depth = (depthIn !== undefined ? depthIn : 0);
            var strategies = this.strategies();

            for (var i = 0; i < strategies.length && answer === undefined; i++)
            {
                var strategy = strategies[i];

                if (strategy === ForwardSearchStrategy)
                {
                    // Depth limit.
                    if (depth < 1)
                    {
                        answer = strategy.getMove(puzzle, this, depth);
                    }
                    else
                    {
                        var useForwardSearch = false;
                        var solver = new SudokuSolver(useForwardSearch);
                        answer = strategy.getMove(puzzle, solver, depth);
                    }
                }
                else
                {
                    answer = strategy.getMove(puzzle);
                }
            }

            return answer;
        };

        SudokuSolver.prototype.isDone = function(puzzle)
        {
            InputValidator.validateNotNull("puzzle", puzzle);

            var size = puzzle.size();

            for (var i = 0; i < size; i++)
            {
                var cell = puzzle.get(i);

                if (cell.isCandidates === true)
                {
                    return false;
                }
            }

            return true;
        };

        SudokuSolver.prototype.solve = function(puzzle, depth)
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
                var move = this.getMove(myPuzzle, depth);

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
