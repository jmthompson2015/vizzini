/*
 * Provides a user interface for a memory for tic-tac-toe.
 */
function MemoryUI(memoryIn)
{
    InputValidator.validateNotNull("memory", memoryIn);

    var memory = memoryIn;

    this.gameOver = function(source, winner, loser)
    {
        this.updateStatistics();
    }

    this.updateStatistics = function()
    {
        var statistics = memory.getStatistics("3/3/3 X");

        if (statistics)
        {
            var games = statistics.w + statistics.d + statistics.l;
            var xWinsPercent = Math.round(100.0 * statistics.l / games);
            var drawsPercent = Math.round(100.0 * statistics.d / games);
            var oWinsPercent = Math.round(100.0 * statistics.w / games);

            LOGGER.info("games, wins, draws, losses = " + games + ", "
                    + statistics.w + ", " + statistics.d + ", " + statistics.l);
            document.getElementById("games").innerHTML = games;
            document.getElementById("xWins").innerHTML = statistics.l + " ("
                    + xWinsPercent + "%)";
            document.getElementById("draws").innerHTML = statistics.d + " ("
                    + drawsPercent + "%)";
            document.getElementById("oWins").innerHTML = statistics.w + " ("
                    + oWinsPercent + "%)";
        }
        else
        {
            document.getElementById("games").innerHTML = 0;
            document.getElementById("xWins").innerHTML = 0;
            document.getElementById("draws").innerHTML = 0;
            document.getElementById("oWins").innerHTML = 0;
        }
    }
}
