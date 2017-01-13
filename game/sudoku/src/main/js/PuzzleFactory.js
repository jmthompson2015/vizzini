define(["GridFactory", "PuzzleFormat", "Unit"],
    function(GridFactory, PuzzleFormat, Unit)
    {
        var PuzzleFactory = {};

        PuzzleFactory.adjustPossibilites = function(puzzle, N)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            InputValidator.validateIsNumber("N", N);

            for (var i = 0; i < (N * N); i++)
            {
                PuzzleFactory.removeValueFromPeers(puzzle, i);
            }
        };

        PuzzleFactory.createEasy = function()
        {
            var grid = GridFactory.createEasy();
            var answer = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(answer, 9);

            return answer;
        };

        PuzzleFactory.removeValueFromPeers = function(puzzle, index)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            InputValidator.validateIsNumber("index", index);

            var value = puzzle[index];
            var cellName = Unit.indexToCellName(index);
            var peers = Unit.getPeers(cellName);

            peers.forEach(function(name)
            {
                var myIndex = Unit.cellNameToIndex(name);

                if (Array.isArray(puzzle[myIndex]))
                {
                    puzzle[myIndex].vizziniRemove(value);
                }
            });
        };

        return PuzzleFactory;
    });
