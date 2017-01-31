define(["Unit"],
    function(Unit)
    {
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

        Puzzle.prototype.get = function(index)
        {
            InputValidator.validateIsNumber("index", index);

            return this.cells().get(index);
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

        return Puzzle;
    });
