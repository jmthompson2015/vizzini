define(["Unit"],
    function(Unit)
    {
        "use strict";
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

            isUnitValid: function(grid, unit)
            {
                InputValidator.validateNotEmpty("grid", grid);
                InputValidator.validateNotEmpty("unit", unit);

                var answer = true;
                var counts = [];

                for (var i = 0; i < unit.length; i++)
                {
                    var index = unit[i];
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

                var unit = new Unit(Math.sqrt(grid.length));

                return this.isUnitsValid(grid, unit.ROWS) &&
                    this.isUnitsValid(grid, unit.COLUMNS) &&
                    this.isUnitsValid(grid, unit.BLOCKS);
            },
        };

        return SudokuValidator;
    });
