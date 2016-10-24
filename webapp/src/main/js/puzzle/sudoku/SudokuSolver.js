var SudokuSolver =
{
    getUnfilledSquares: function(puzzle)
    {
        InputValidator.validateNotNull("puzzle", puzzle);

        var answer = puzzle.getUnfilledSquares();

        answer.sort(function(cellName0, cellName1)
        {
            var value0 = puzzle.get(cellName0);
            var value1 = puzzle.get(cellName1);

            return value1 - value0;
        });

        return answer;
    },

    isDone: function(puzzle)
    {
        InputValidator.validateNotNull("puzzle", puzzle);

        var cellCount = puzzle.getCellCount();

        for (var i = 0; i < cellCount; i++)
        {
            var cellName = Unit.indexToCellName(i);
            var value = puzzle.get(cellName);

            if (value.length > 1) { return false; }
        }

        return true;
    },

    propagateConstraints: function(puzzle)
    {
        InputValidator.validateNotNull("puzzle", puzzle);

        LOGGER.trace("propagateConstraints() start");
        var start = new Date().getTime();
        var maxTries = 100;
        var count = 0;
        var isRecursive = true;
        var cellCount = puzzle.getCellCount();

        while (!this.isDone(puzzle) && count < maxTries)
        {
            var start1 = new Date().getTime();

            for (var i = 0; i < cellCount; i++)
            {
                var cellName = Unit.indexToCellName(i);
                var value = puzzle.get(cellName);

                if (value.length === 1)
                {
                    puzzle.eliminate(cellName, value, isRecursive);
                }
            }

            LOGGER.time(count + " propagateConstraints() scan", start1,
                    new Date().getTime());

            count++;
        }

        LOGGER.time("propagateConstraints()", start, new Date().getTime());
        LOGGER.trace("propagateConstraints() end");
    },

    solve: function(puzzle)
    {
        InputValidator.validateNotNull("puzzle", puzzle);

        LOGGER.trace("solve() start");
        var start = new Date().getTime();

        this.propagateConstraints(puzzle);

        LOGGER.time("solve()", start, new Date().getTime());
        LOGGER.trace("solve() end");
    },
}
