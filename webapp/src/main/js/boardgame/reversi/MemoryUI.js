/*
 * Provides a user interface for a memory for reversi.
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
        var statistics = memory.getStatistics("8/8/8/3Bw3/3wB3/8/8/8 B");

        if (statistics)
        {
            var games = statistics.w + statistics.d + statistics.l;
            var blackWinsPercent = Math.round(100.0 * statistics.l / games);
            var drawsPercent = Math.round(100.0 * statistics.d / games);
            var whiteWinsPercent = Math.round(100.0 * statistics.w / games);

            LOGGER.info("games, wins, draws, losses = " + games + ", "
                    + statistics.w + ", " + statistics.d + ", " + statistics.l);
            document.getElementById("games").innerHTML = games;
            document.getElementById("blackWins").innerHTML = statistics.l
                    + " (" + blackWinsPercent + "%)";
            document.getElementById("draws").innerHTML = statistics.d + " ("
                    + drawsPercent + "%)";
            document.getElementById("whiteWins").innerHTML = statistics.w
                    + " (" + whiteWinsPercent + "%)";
        }
        else
        {
            document.getElementById("games").innerHTML = 0;
            document.getElementById("blackWins").innerHTML = 0;
            document.getElementById("draws").innerHTML = 0;
            document.getElementById("whiteWins").innerHTML = 0;
        }
    }
}
