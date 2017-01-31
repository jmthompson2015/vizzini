define(["Unit"],
    function(Unit)
    {
        "use strict";

        function Puzzle(cells, grid, solution)
        {
            InputValidator.validateNotEmpty("cells", cells);
            // grid optional.
            // solution optional.

            var N = Math.sqrt(cells.size);
            var n = Math.sqrt(N);

            this.cells = function()
            {
                return cells;
            };

            this.grid = function()
            {
                return grid;
            };

            this.solution = function()
            {
                return solution;
            };

            this.N = function()
            {
                return N;
            };

            this.n = function()
            {
                return n;
            };
        }

        Puzzle.prototype.adjustCandidates = function()
        {
            var answer = this;
            var size = this.cells().size;

            for (var i = 0; i < size; i++)
            {
                var cell = answer.cells().get(i);

                if (cell.isValue)
                {
                    answer = answer.removeValueFromPeers(i);
                }
            }

            return answer;
        };

        Puzzle.prototype.clueIndices = function()
        {
            var answer = [];
            var cells = this.cells();

            for (var i = 0; i < cells.size; i++)
            {
                var cell = cells.get(i);

                if (cell.isValue && cell.isClue())
                {
                    answer.push(i);
                }
            }

            return answer;
        };

        Puzzle.prototype.determineConflictIndices = function(cell)
        {
            InputValidator.validateNotNull("cell", cell);

            var answer = [];

            if (cell.isValue === true)
            {
                var size = this.cells().size;

                for (var i = 0; i < size; i++)
                {
                    if (this.isConflictCell(i))
                    {
                        answer.push(i);
                    }
                }
            }

            return answer;
        };

        Puzzle.prototype.determineSameCandidateIndices = function(cell)
        {
            // cell optional.

            var answer = [];

            if (cell && cell.isValue === true)
            {
                var size = this.cells().size;

                for (var i = 0; i < size; i++)
                {
                    if (this.isSameCandidateCell(cell.value(), i))
                    {
                        answer.push(i);
                    }
                }
            }

            return answer;
        };

        Puzzle.prototype.determineSameValueIndices = function(cell)
        {
            // cell optional.

            var answer = [];

            if (cell && cell.isValue === true)
            {
                var size = this.cells().size;

                for (var i = 0; i < size; i++)
                {
                    if (this.isSameValueCell(cell.value(), i))
                    {
                        answer.push(i);
                    }
                }
            }

            return answer;
        };

        Puzzle.prototype.get = function(index)
        {
            InputValidator.validateIsNumber("index", index);

            return this.cells().get(index);
        };

        Puzzle.prototype.isConflictCell = function(index)
        {
            InputValidator.validateIsNumber("index", index);

            var answer = false;
            var cell0 = this.get(index);

            if (cell0.isValue)
            {
                var value0 = cell0.value();
                var cellName = Unit.indexToCellName(index);
                var peers = Unit.getPeers(cellName);

                for (var i = 0; i < peers.length; i++)
                {
                    var peer = peers[i];
                    var myIndex = Unit.cellNameToIndex(peer);
                    var cell = this.get(myIndex);

                    if (cell.isValue && cell.value() === value0)
                    {
                        answer = true;
                        break;
                    }
                }
            }

            return answer;
        };

        Puzzle.prototype.isSameCandidateCell = function(selectedValue, index)
        {
            // selectedValue optional.
            InputValidator.validateIsNumber("index", index);

            var cell = this.get(index);

            return (cell.isCandidates === true && cell.candidates().includes(selectedValue));
        };

        Puzzle.prototype.isSameValueCell = function(selectedValue, index)
        {
            // selectedValue optional.
            InputValidator.validateIsNumber("index", index);

            var cell = this.get(index);

            return (cell.isValue === true && cell.value() === selectedValue);
        };

        Puzzle.prototype.removeValueFromPeers = function(index)
        {
            InputValidator.validateIsNumber("index", index);

            var answer = this;
            var cell0 = answer.cells().get(index);

            if (cell0.isValue)
            {
                var value = cell0.value();
                var cellName0 = Unit.indexToCellName(index);
                var peers = Unit.getPeers(cellName0);

                peers.forEach(function(cellName)
                {
                    var myIndex = Unit.cellNameToIndex(cellName);
                    var cell = answer.cells().get(myIndex);

                    if (cell.isCandidates && cell.candidates().includes(value))
                    {
                        var newCell = cell.withoutCandidate(value);
                        answer = answer.withCell(myIndex, newCell);
                    }
                });
            }

            return answer;
        };

        Puzzle.prototype.withCell = function(index, cell)
        {
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateNotNull("cell", cell);

            var oldCells = this.cells();
            var newCells = oldCells.set(index, cell);

            return new Puzzle(newCells, this.grid(), this.solution());
        };

        Puzzle.prototype.withCells = function(indices, cells)
        {
            InputValidator.validateNotNull("indices", indices);
            InputValidator.validateNotNull("cells", cells);

            var newCells = this.cells();

            indices.forEach(function(index, i)
            {
                var cell = cells[i];
                newCells = newCells.set(index, cell);
            });

            return new Puzzle(newCells, this.grid(), this.solution());
        };

        Puzzle.prototype.withoutCandidate = function(index, candidate)
        {
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateIsNumber("candidate", candidate);

            var newCell = this.get(index).withoutCandidate(candidate);

            return this.withCell(index, newCell);
        };

        Puzzle.prototype.withoutCandidates = function(indices, candidates)
        {
            InputValidator.validateNotNull("indices", indices);
            InputValidator.validateNotNull("candidates", candidates);

            var newCells = this.cells();

            indices.forEach(function(index, i)
            {
                var cell = newCells.get(index).withoutCandidates(candidates);
                newCells = newCells.set(index, cell);
            });

            return new Puzzle(newCells, this.grid(), this.solution());
        };

        return Puzzle;
    });
