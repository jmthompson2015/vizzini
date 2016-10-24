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
        var answer;

        LOGGER.debug("board = " + board);
        var moves = boardUtils.getMoves(board, adjudicator);
        moves.vizziniShuffle();
        LOGGER.debug("moves = " + moves);

        // Find the best rated move.
        var bestRating;
        var bestMove2;

        for (var i = 0; i < moves.length; i++)
        {
            var move = moves[i];
            var newBoard = boardUtils.move(board, move);

            var aliases = boardUtils.getAliases(newBoard);
            var boardAlias = aliases[0];
            LOGGER.debug("boardAlias = " + boardAlias);
            var board2 = boardAlias.getBoard();
            var move2 = geometry.rotate(move, boardAlias.getRotation());
            var statistics = memory.getStatistics(board2);
            var rating = computeRating(statistics);

            if (!bestRating || rating > bestRating)
            {
                bestRating = rating;
                bestMove2 = move2;
                answer = geometry.unrotate(move2, boardAlias.getRotation());
                LOGGER.debug(answer + " bestRating = " + bestRating);
            }
        }

        LOGGER.debug("best move = " + answer);

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
