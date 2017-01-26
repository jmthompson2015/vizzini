define(["process/PuzzleFactory"],
    function(PuzzleFactory)
    {
        var Move = {};

        Move.RemoveCellCandidate = function(puzzle, N, index, candidate, source)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            InputValidator.validateIsNumber("N", N);
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateIsNumber("candidate", candidate);
            InputValidator.validateNotNull("source", source);

            this.index = function()
            {
                return index;
            };

            this.candidate = function()
            {
                return candidate;
            };

            this.source = function()
            {
                return source;
            };

            this.execute = function()
            {
                LOGGER.info("Move.RemoveCellCandidate.execute()");

                puzzle[index].vizziniRemove(candidate);
                PuzzleFactory.adjustPossibilites(puzzle, N);
            };
        };

        Move.SetCellValue = function(puzzle, N, index, value, source)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            InputValidator.validateIsNumber("N", N);
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateIsNumber("value", value);
            InputValidator.validateNotNull("source", source);

            this.index = function()
            {
                return index;
            };

            this.value = function()
            {
                return value;
            };

            this.source = function()
            {
                return source;
            };

            this.execute = function()
            {
                LOGGER.trace("Move.SetCellValue.execute()");

                puzzle[index] = value;
                PuzzleFactory.adjustPossibilites(puzzle, N);
            };
        };

        return Move;
    });
