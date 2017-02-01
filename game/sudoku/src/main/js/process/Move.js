define(["Cell", "process/Action"],
    function(Cell, Action)
    {
        "use strict";
        var Move = {};

        Move.BatchRemoveCandidates = function(puzzle, indices, candidates, source)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
            InputValidator.validateNotNull("indices", indices);
            InputValidator.validateNotNull("candidates", candidates);
            InputValidator.validateNotNull("source", source);

            this.indices = function()
            {
                return indices;
            };

            this.candidates = function()
            {
                return candidates;
            };

            this.source = function()
            {
                return source;
            };

            this.execute = function(store)
            {
                LOGGER.trace("Move.BatchRemoveCandidates.execute()");

                if (store !== undefined)
                {
                    store.dispatch(Action.batchRemoveCandidates(indices, candidates));
                }
                else
                {
                    return puzzle.withoutCandidates(indices, candidates);
                }
            };

            this.toString = function()
            {
                return "BatchRemoveCandidates indices=[" + indices + "] candidates=[" + candidates + "] source=" + source;
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
                    return puzzle.withoutCandidate(index, candidate);
                }
            };

            this.toString = function()
            {
                return "RemoveCellCandidate index=" + index + " candidate=" + candidate + " source=" + source;
            };
        };

        Move.SetCellValue = function(puzzle, index, value, source)
        {
            InputValidator.validateNotNull("puzzle", puzzle);
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
                    return puzzle.withCell(index, new Cell.Value(value)).adjustCandidates();
                }
            };

            this.toString = function()
            {
                return "SetCellValue index=" + index + " value=" + value + " source=" + source;
            };
        };

        return Move;
    });
