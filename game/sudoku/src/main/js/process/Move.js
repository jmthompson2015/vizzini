define(["process/Action", "process/PuzzleFactory"],
    function(Action, PuzzleFactory)
    {
        var Move = {};

        Move.BatchRemoveCandidates = function(puzzle, indices, candidates, source)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            InputValidator.validateNotNull("indices", indices);
            InputValidator.validateNotNull("candidates", candidates);
            InputValidator.validateNotNull("source", source);

            this.source = function()
            {
                return source;
            };

            this.execute = function(store)
            {
                LOGGER.trace("Move.BatchRemoveCandidates.execute()");

                if (store !== undefined)
                {
                    // FIXME: create batch remove candidates in Reducer.
                }
                else
                {
                    indices.forEach(function(index)
                    {
                        var value = puzzle[index];

                        if (Array.isArray(value))
                        {
                            candidates.forEach(function(candidate)
                            {
                                value.vizziniRemove(candidate);
                            });
                        }
                    });
                }
            };
        };

        Move.RemoveCellCandidate = function(puzzle, index, candidate, source)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
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
                LOGGER.trace("Move.RemoveCellCandidate.execute()");

                if (store !== undefined)
                {
                    store.dispatch(Action.removeCellCandidate(index, candidate));
                }
                else
                {
                    puzzle[index].vizziniRemove(candidate);
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
