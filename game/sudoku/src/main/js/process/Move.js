define(["process/Action", "process/PuzzleFactory"],
    function(Action, PuzzleFactory)
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

            this.execute = function(store)
            {
                LOGGER.info("Move.RemoveCellCandidate.execute()");

                if (store !== undefined)
                {
                    store.dispatch(Action.removeCellCandidate(index, candidate));
                }
                else
                {
                    puzzle[index].vizziniRemove(candidate);
                    PuzzleFactory.adjustPossibilites(puzzle, N);
                }
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

            this.execute = function(store)
            {
                LOGGER.trace("Move.SetCellValue.execute()");

                if (store !== undefined)
                {
                    store.dispatch(Action.setCellValue(index, value));
                }
                else
                {
                    puzzle[index] = value;
                    PuzzleFactory.adjustPossibilites(puzzle, N);
                }
            };
        };

        return Move;
    });
