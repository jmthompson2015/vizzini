/*
 * Provides a user interface for an environment for Tic-Tac-Toe.
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

        var element = document.getElementById(id);
        var myValue;

        if (value === " ")
        {
            HtmlUtilities.removeClass(element, "cell-o");
            HtmlUtilities.removeClass(element, "cell-x");
            myValue = index;
        }
        else
        {
            myValue = value.toUpperCase();

            if (myValue === "X")
            {
                HtmlUtilities.addClass(element, "cell-x");
            }
            else if (myValue === "O")
            {
                HtmlUtilities.addClass(element, "cell-o");
            }
        }

        element.innerHTML = myValue;
    }

    function updateDisplay(board)
    {
        var boardString = formatter.toBoardString(board);

        for (var i = 0; i < 9; i++)
        {
            updateCell(i, "cell" + i, boardString[i]);
        }
    }
}
