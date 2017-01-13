// require(InputValidator);
// require(Unit);

/*
 * Provides a validator for a Sudoku puzzle.
 */
define(["Unit"],
    function(Unit)
    {
        var SudokuValidator = {
            BLANK: ".",

            countValidUnits: function(grid, units)
            {
                InputValidator.validateNotEmpty("grid", grid);
                InputValidator.validateNotEmpty("units", units);

                var answer = 0;

                for (var i = 0; i < units.length; i++)
                {
                    var unit = units[i];

                    if (this.isUnitValid(grid, unit))
                    {
                        answer++;
                    }
                }

                return answer;
            },

            isCellValid: function(grid, index)
            {
                InputValidator.validateNotEmpty("grid", grid);
                InputValidator.validateNotNull("index", index);

                var answer = true;
                var cellName = Unit.indexToCellName(index);
                var peers = Unit.getPeers(cellName);

                return this.isCellValidPeers(grid, index, peers);
            },

            isCellValidPeers: function(grid, index, peers)
            {
                InputValidator.validateNotEmpty("grid", grid);
                InputValidator.validateNotNull("index", index);
                InputValidator.validateNotNull("peers", peers);

                var answer = true;
                var value = grid[index];

                for (var i = 0; i < peers.length; i++)
                {
                    var peer = peers[i];
                    var myIndex = Unit.cellNameToIndex(peer);
                    var myValue = grid[myIndex];

                    if (myValue === value)
                    {
                        return false;
                    }
                }

                return answer;
            },

            isUnitValid: function(grid, unit)
            {
                InputValidator.validateNotEmpty("grid", grid);
                InputValidator.validateNotEmpty("unit", unit);

                var answer = true;
                var counts = {};

                for (var i = 0; i < unit.length; i++)
                {
                    var cellName = unit[i];
                    var index = Unit.cellNameToIndex(cellName);
                    var value = grid[index];

                    if (value === this.BLANK || counts[value] !== undefined)
                    {
                        return false;
                    }

                    counts[value] = 1;
                }

                return answer;
            },

            isUnitsValid: function(grid, units)
            {
                InputValidator.validateNotEmpty("grid", grid);
                InputValidator.validateNotEmpty("units", units);

                return this.countValidUnits(grid, units) === units.length;
            },

            isValid: function(grid)
            {
                InputValidator.validateNotEmpty("grid", grid);

                return this.isUnitsValid(grid, Unit.ROWS) &&
                    this.isUnitsValid(grid, Unit.COLUMNS) &&
                    this.isUnitsValid(grid, Unit.BLOCKS);
            },
        };

        return SudokuValidator;
    });
