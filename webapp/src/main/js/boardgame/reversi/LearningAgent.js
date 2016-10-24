function LearningAgent(geometry, boardUtils, adjudicator, team, memory)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("boardUtils", boardUtils);
    InputValidator.validateNotNull("adjudicator", adjudicator);
    InputValidator.validateNotEmpty("team", team);
    InputValidator.validateNotNull("memory", memory);

    this.getMemory = function()
    {
        return memory;
    }

    this.getTeam = function()
    {
        return team;
    }

    this.getMove = function(board)
    {
        var start = new Date().getTime();
        var answer;

        if (LOGGER.isDebugEnabled())
        {
            LOGGER.debug("board = " + board);
        }

        var moves = boardUtils.getMoves(board, adjudicator);
        moves.vizziniShuffle();

        if (LOGGER.isDebugEnabled())
        {
            LOGGER.debug("moves = " + moves);
        }

        // Find the best rated move.
        var bestRating;
        var bestMove2;

        for (var i = 0; i < moves.length; i++)
        {
            var move = moves[i];
            var newBoard = boardUtils.move(board, move);

            var boardAlias = boardUtils.getAlias(newBoard);

            if (LOGGER.isDebugEnabled())
            {
                LOGGER.debug("boardAlias = " + boardAlias);
            }

            var board2 = boardAlias.getBoard();
            var move2 = geometry.rotate(move, boardAlias.getRotation());
            var statistics = memory.getStatistics(board2);
            var rating = computeRating(statistics);

            if (!bestRating || rating > bestRating)
            {
                bestRating = rating;
                bestMove2 = move2;
                answer = geometry.unrotate(move2, boardAlias.getRotation());

                if (LOGGER.isDebugEnabled())
                {
                    LOGGER.debug(answer + " bestRating = " + bestRating);
                }
            }
        }

        if (LOGGER.isDebugEnabled())
        {
            LOGGER.debug("best move = " + answer);
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("LearningAgent.getMove()", start, new Date().getTime());
        }

        return answer;
    }

    function computeRating(statistics)
    {
        var answer;

        if (!statistics)
        {
            // Prefer untried moves.
            answer = 1000;
        }
        else
        {
            answer = 2 * statistics.w + statistics.d - 2 * statistics.l;
        }

        return answer;
    }
}
