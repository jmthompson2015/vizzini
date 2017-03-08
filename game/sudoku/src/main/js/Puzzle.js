define(["Unit"], function(Unit)
{
    "use strict";

    function Puzzle(cells, unitIn, grid, solution)
    {
        InputValidator.validateNotNull("cells", cells);
        // unit optional.
        // grid optional.
        // solution optional.

        var N;
        var n;
        var unit = unitIn;

        this.cells = function()
        {
            return cells;
        };

        this.unit = function()
        {
            if (unit === undefined)
            {
                unit = new Unit(this.N());
            }

            return unit;
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
            if (N === undefined)
            {
                N = Math.sqrt(cells.length);
            }

            return N;
        };

        this.n = function()
        {
            if (n === undefined)
            {
                n = Math.sqrt(this.N());
            }

            return n;
        };
    }

    Puzzle.prototype.adjustCandidates = function()
    {
        var answer = this;
        var size = this.cells().length;

        for (var i = 0; i < size; i++)
        {
            var cell = answer.cells()[i];

            if (cell.isValue === true)
            {
                answer = answer.removeValueFromPeers(i);
            }
        }

        return answer;
    };

    Puzzle.prototype.candidateIndicesInUnit = function(candidate, unit)
    {
        InputValidator.validateNotNull("candidate", candidate);
        InputValidator.validateNotNull("unit", unit);

        var answer = [];
        var cells = this.cells();

        for (var i = 0; i < unit.length; i++)
        {
            var index = unit[i];
            var cell = cells[index];

            if (cell.isCandidates === true && cell.candidates().includes(candidate))
            {
                answer.push(index);
            }
        }

        return answer;
    };

    Puzzle.prototype.clueIndices = function()
    {
        var answer = [];
        var cells = this.cells();

        for (var i = 0; i < cells.length; i++)
        {
            var cell = cells[i];

            if (cell.isValue === true && cell.isClue())
            {
                answer.push(i);
            }
        }

        return answer;
    };

    Puzzle.prototype.conflictIndices = function(cell)
    {
        InputValidator.validateNotNull("cell", cell);

        var answer = [];

        if (cell.isValue === true)
        {
            var size = this.cells().length;

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

    Puzzle.prototype.findCellsWithCandidateLength = function(length)
    {
        InputValidator.validateIsNumber("length", length);

        var answer = [];
        var size = this.cells().length;

        for (var i = 0; i < size; i++)
        {
            var cell = this.get(i);

            if (cell.isCandidates === true && cell.candidates().length === length)
            {
                answer.push(i);
            }
        }

        return answer;
    };

    Puzzle.prototype.get = function(index)
    {
        InputValidator.validateIsNumber("index", index);

        return this.cells()[index];
    };

    Puzzle.prototype.isConflictCell = function(index)
    {
        InputValidator.validateIsNumber("index", index);

        var answer = false;
        var cell0 = this.get(index);

        if (cell0.isValue === true)
        {
            var value0 = cell0.value();
            var peers = this.unit().getPeers(index);

            for (var i = 0; i < peers.length; i++)
            {
                var peer = peers[i];
                var cell = this.get(peer);

                if (cell.isValue === true && cell.value() === value0)
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
        var cell0 = answer.cells()[index];

        if (cell0.isValue === true)
        {
            var value = cell0.value();
            var peers = this.unit().getPeers(index);

            peers.forEach(function(myIndex)
            {
                var cell = answer.cells()[myIndex];

                if (cell.isCandidates === true && cell.candidates().includes(value))
                {
                    var newCell = cell.withoutCandidate(value);
                    answer = answer.withCell(myIndex, newCell);
                }
            });
        }

        return answer;
    };

    Puzzle.prototype.sameCandidateIndices = function(cell)
    {
        // cell optional.

        var answer = [];

        if (cell && cell.isValue === true)
        {
            var size = this.cells().length;

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

    Puzzle.prototype.sameValueIndices = function(cell)
    {
        // cell optional.

        var answer = [];

        if (cell && cell.isValue === true)
        {
            var size = this.cells().length;

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

    Puzzle.prototype.withCandidate = function(index, candidate)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateIsNumber("candidate", candidate);

        var answer = this;
        var cell = this.get(index);

        if (cell.isCandidates === true)
        {
            var newCell = this.get(index).withCandidate(candidate);
            answer = this.withCell(index, newCell);
        }

        return answer;
    };

    Puzzle.prototype.withCell = function(index, cell)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateNotNull("cell", cell);

        var newCells = this.cells().slice();
        newCells.splice(index, 1, cell);

        return new Puzzle(newCells, this.unit(), this.grid(), this.solution());
    };

    Puzzle.prototype.withCells = function(indices, cells)
    {
        InputValidator.validateNotNull("indices", indices);
        InputValidator.validateNotNull("cells", cells);

        var newCells = this.cells().slice();

        indices.forEach(function(index, i)
        {
            var cell = cells[i];
            newCells.splice(index, 1, cell);
        });

        return new Puzzle(newCells, this.unit(), this.grid(), this.solution());
    };

    Puzzle.prototype.withoutCandidate = function(index, candidate)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateIsNumber("candidate", candidate);

        var answer = this;
        var cell = this.get(index);

        if (cell.isCandidates === true)
        {
            var newCell = cell.withoutCandidate(candidate);
            answer = this.withCell(index, newCell);
        }

        return answer;
    };

    Puzzle.prototype.withoutCandidates = function(indices, candidates)
    {
        InputValidator.validateNotNull("indices", indices);
        InputValidator.validateNotNull("candidates", candidates);

        var newCells = this.cells();

        indices.forEach(function(index, i)
        {
            var cell = newCells[index].withoutCandidates(candidates);
            newCells.splice(index, 1, cell);
        });

        return new Puzzle(newCells, this.unit(), this.grid(), this.solution());
    };

    return Puzzle;
});
