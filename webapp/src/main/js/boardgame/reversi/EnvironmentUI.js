/*
 * Provides a user interface for an environment for reversi.
 */
function EnvironmentUI(geometry, formatter, boardUtils, environmentIn)
{
    InputValidator.validateNotNull("environment", environmentIn);

    var environment = environmentIn;

    environment.addBoardListener(this);
    environment.addGameOverListener(this);
    environment.addStatusListener(this);

    this.boardChange = function(source, oldValue, newValue)
    {
        environment = newValue;
        updateDisplay(newValue);
    }

    this.gameOver = function(source, winner, loser)
    {
        var message;

        if (winner)
        {
            message = winner.getTeam().toUpperCase() + " wins!";
        }
        else if (loser)
        {
            message = loser.getTeam().toUpperCase() + " forfeits!";
        }
        else
        {
            message = "Game is a draw.";
        }

        this.statusChange(source, null, message);
    }

    this.statusChange = function(source, oldValue, newValue)
    {
        setStatus(newValue);
    }

    function setStatus(message)
    {
        document.getElementById("status").innerHTML = message;
    }

    function updateCell(index, id, value)
    {
        InputValidator.validateNotNull("id", id);
        InputValidator.validateNotNull("value", value);

        LOGGER.trace("id = " + id + " value = " + value);

        var myValue;

        if (value === " ")
        {
            // myValue = "&nbsp;";
            myValue = index;
        }
        else
        {
            myValue = "<img src=\"";
            myValue += (value === "B" ? EnvironmentUI.BLACK_TOKEN
                    : EnvironmentUI.WHITE_TOKEN);
            myValue += "\"/>";
        }

        var element = document.getElementById(id);
        element.innerHTML = myValue;
    }

    function updateDisplay(board)
    {
        LOGGER.trace("EnvironmentUI.updateDisplay()");
        var boardString = formatter.toBoardString(board);

        for (var i = 0; i < geometry.getMaxCells(); i++)
        {
            updateCell(i, "cell" + i, boardString[i]);
        }

        var blackCount = boardUtils.getTokenCountFor(board, "B");
        var whiteCount = boardUtils.getTokenCountFor(board, "w");

        document.getElementById("blackCount").innerHTML = blackCount;
        document.getElementById("whiteCount").innerHTML = whiteCount;
    }
}

EnvironmentUI.BLACK_TOKEN = "../../resources/boardgame/reversi/BlackCircle32.png";

EnvironmentUI.WHITE_TOKEN = "../../resources/boardgame/reversi/WhiteCircle32.png";
