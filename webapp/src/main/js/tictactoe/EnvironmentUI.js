/*
 * Provides a user interface for an environment for tic-tac-toe.
 */
function EnvironmentUI(environmentIn)
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
        if (winner)
        {
            setStatus(winner.getTeam().toUpperCase() + " wins!");
        }
        else if (loser)
        {
            setStatus(loser.getTeam().toUpperCase() + " forfeits!");
        }
        else
        {
            setStatus("Game is a draw.");
        }
        
        var memory = environment.getMemory();
        var statistics = memory.getStatistics("3/3/3 X");
        LOGGER.info("wins, draws, losses = "+statistics.w+", "+statistics.d+", "+statistics.l);
        document.getElementById("xWins").innerHTML = statistics.l;
        document.getElementById("draws").innerHTML = statistics.d;
        document.getElementById("oWins").innerHTML = statistics.w;
    }

    this.statusChange = function(source, oldValue, newValue)
    {
        setStatus(newValue);
    }

    function setStatus(message)
    {
        document.getElementById("status").innerHTML = message;
    }

    function updateCell(id, value)
    {
        var myValue = (value === " " ? "&nbsp;" : value.toUpperCase());
        var element = document.getElementById(id);
        element.innerHTML = myValue;

        if (value === " ")
        {
            HtmlUtilities.removeClass(element, "cell-o");
            HtmlUtilities.removeClass(element, "cell-x");
        }
        else if (myValue === "X")
        {
            HtmlUtilities.addClass(element, "cell-x");
        }
        else if (myValue === "O")
        {
            HtmlUtilities.addClass(element, "cell-o");
        }
    }

    function updateDisplay(board)
    {
        var boardString = BoardUtilities.getBoardString(board);

        for (var i = 0; i < 9; i++)
        {
            updateCell("cell" + i, boardString[i]);
        }
    }
}
