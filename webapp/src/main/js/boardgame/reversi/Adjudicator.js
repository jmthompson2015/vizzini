/*
 * Provides an adjudicator for Reversi.
 */
function Adjudicator(geometry, formatter, boardUtils)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);
    InputValidator.validateNotNull("boardUtils", boardUtils);

    this.isActionAvailableFor = function(boardString, whoseMove)
    {
        var board = formatter.toBoard(boardString, whoseMove);
        var moves = boardUtils.getMoves(board, this);

        return (moves.length > 0);
    }

    this.isActionLegalFor = function(boardString, team, index)
    {
        var answer = false;

        if (boardString[index] === " ")
        {
            var file = geometry.toFile(index);
            var rank = geometry.toRank(index);
            var directions = geometry.directions();
            var opponent = boardUtils.nextMover(team);

            // Look around for an opposite agent's token, then one of ours.
            for (var i = 0; !answer && (i < directions.length); i++)
            {
                var direction = directions[i];
                var lineLength = boardUtils.determineLineLength(boardString,
                        team, index, direction);
                answer = (lineLength > 0);
            }
        }

        return answer;
    }

    this.isGameOver = function(board)
    {
        var answer = false;

        if (board)
        {
            answer = (boardUtils.getTokenCount(board) === 64);

            if (answer)
            {
                LOGGER.info("boardUtils.getTokenCount(\"" + board + "\") = "
                        + boardUtils.getTokenCount(board));
            }
            else
            {
                var boardString = formatter.toBoardString(board);
                var whoseMove = formatter.toWhoseMove(board);
                answer = !this.isActionAvailableFor(boardString, whoseMove);

                if (answer)
                {
                    LOGGER.info("isActionAvailableFor(\"" + board + "\", \""
                            + whoseMove + "\") ? false");

                    answer = !this.isActionAvailableFor(boardString, boardUtils
                            .nextMover(whoseMove));

                    if (answer)
                    {
                        LOGGER.info("isActionAvailableFor(\"" + board
                                + "\", \"" + boardUtils.nextMover(whoseMove)
                                + "\") ? false");
                    }
                }
            }
        }

        return answer;
    }

    this.isWinner = function(board, team)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = false;

        if (this.isGameOver(board))
        {
            var blackCount = boardUtils.getTokenCountFor(board, "B");
            var whiteCount = boardUtils.getTokenCountFor(board, "w");

            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("blackCount = " + blackCount);
                LOGGER.trace("whiteCount = " + whiteCount);
            }

            if (team === "B" && blackCount > whiteCount)
            {
                answer = true;
            }
            else if (team === "w" && whiteCount > blackCount)
            {
                answer = true;
            }
        }

        return answer;
    }
}
