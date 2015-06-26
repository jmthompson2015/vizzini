// require(InputValidator);
// require(Logger);
// require(MicroEvent);
// require(Unit);

/*
 * Provides a puzzle for Sudoku.
 */
function Puzzle()
{
    var that = this;
    var values = {};
    var dimension = 9;
    var cellCount = dimension * dimension;
    var defaultValue = "";

    // Initialize default value.
    {
        LOGGER.trace("Puzzle defaultValue initialize start");

        // To start, every square can be any digit.
        for (var i = 1; i <= dimension; i++)
        {
            defaultValue += i;
        }

        LOGGER.trace("defaultValue = _" + defaultValue + "_");
        LOGGER.trace("Puzzle defaultValue initialize end");
    }

    // Initialize values.
    {
        LOGGER.trace("Puzzle values initialize start");

        // To start, every square can be any digit.
        for (var i = 0; i < cellCount; i++)
        {
            var cellName = Unit.indexToCellName(i);
            values[cellName] = defaultValue;
        }

        LOGGER.trace("Puzzle values initialize end");
    }

    this.eliminate = function(cellName, value, isRecursive)
    {
        InputValidator.validateNotEmpty("cellName", cellName);
        InputValidator.validateNotEmpty("value", value);
        if (value.length > 1) { throw "value.length = " + value.length; }

        var peers = Unit.getPeers(cellName);

        for (var i = 0; i < peers.length; i++)
        {
            var peer = peers[i];
            var oldValue = this.get(peer);

            if (oldValue.indexOf(value) >= 0)
            {
                var newValue = oldValue.replace(value, "");

                if (newValue.length === 0)
                {
                    // Error
                    throw "Removed last value: cellName = " + cellName
                            + " value = " + value + " newValue.length = "
                            + newValue.length;
                }
                else
                {
                    values[peer] = newValue;

                    if (isRecursive && newValue.length === 1)
                    {
                        this.eliminate(peer, newValue, isRecursive);
                    }
                }
            }
        }

        that.trigger("change");
    }

    this.get = function(cellName)
    {
        return values[cellName];
    }

    this.getCellCount = function()
    {
        return cellCount;
    }

    this.getFilledSquares = function()
    {
        var answer = [];

        for (var i = 0; i < cellCount; i++)
        {
            var cellName = Unit.indexToCellName(i);

            if (this.isFilled(cellName))
            {
                answer[answer.length] = cellName;
            }
        }

        return answer;
    }

    this.getUnfilledSquares = function()
    {
        var answer = [];

        for (var i = 0; i < cellCount; i++)
        {
            var cellName = Unit.indexToCellName(i);

            if (!this.isFilled(cellName))
            {
                answer[answer.length] = cellName;
            }
        }

        return answer;
    }

    this.isFilled = function(cellName)
    {
        var value = values[cellName];

        return value.length === 1;
    }

    this.set = function(cellName, value)
    {
        InputValidator.validateNotEmpty("cellName", cellName);
        InputValidator.validateNotEmpty("value", value);
        if (value.length > 1) { throw "value.length = " + value.length; }

        values[cellName] = value;
        that.trigger("change");
    }
}

MicroEvent.mixin(Puzzle);
