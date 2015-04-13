/*
 * Provides an adjudicator for Reversi.
 */
function Adjudicator(geometry, formatter, boardUtils)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);
    InputValidator.validateNotNull("boardUtils", boardUtils);

    // Directions.
    this.DIRECTIONS = [ [ -1, -1 ], [ 0, -1 ], [ 1, -1 ], [ -1, 0 ], [ 1, 0 ],
            [ -1, 1 ], [ 0, 1 ], [ 1, 1 ], ];

    this.isActionAvailableFor = function(board, whoseMove)
    {
        return whoseMove === formatter.toWhoseMove(board)
                && boardUtils.getMoves(board, this).length > 0;
    }

    this.isActionLegalFor = function(boardString, team, index)
    {
        var answer = false;

        if (boardString[index] === " ")
        {
            var file = geometry.toFile(index);
            var rank = geometry.toRank(index);

            // Look around for an opposite agent's token, then one of ours.
            for (var i = 0; !answer && (i < this.DIRECTIONS.length); i++)
            {
                var direction = this.DIRECTIONS[i];
                var x = file + direction[0];
                var y = rank + direction[1];

                if (geometry.isOnBoard(x, y, 0))
                {
                    var position = geometry.computeIndex(x, y, 0);
                    var token = boardString[position];

                    if ((token !== " ") && team !== token)
                    {
                        var lineLength = boardUtils.determineLineLength(
                                boardString, team, index, direction);
                        answer = lineLength > 0;
                    }
                }
            }
        }

        return answer;
    }

    this.isGameOver = function(board)
    {
        var answer = false;

        if (board)
        {
            LOGGER.trace("isActionAvailableFor(\"B\")"
                    + this.isActionAvailableFor(board, "B"));
            LOGGER.trace("isActionAvailableFor(\"w\")"
                    + this.isActionAvailableFor(board, "w"));

            answer = (boardUtils.getTokenCount(board) === 64)
                    || !(this.isActionAvailableFor(board, "B") || this
                            .isActionAvailableFor(board, "w"));
        }

        return answer;
    }

    this.isWinner = function(board, team)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = false;

        var isGameOver = this.isGameOver(board);
        LOGGER.trace("isGameOver ? " + isGameOver);

        if (isGameOver)
        {
            var blackCount = boardUtils.getTokenCountFor(board, "B");
            var whiteCount = boardUtils.getTokenCountFor(board, "w");
            LOGGER.trace("blackCount = " + blackCount);
            LOGGER.trace("whiteCount = " + whiteCount);

            if (team === "B" && blackCount > whiteCount)
            {
                answer = true;
            }
            else if (team === "w" && whiteCount > blackCount)
            {
                answer = true;
            }

        }

        LOGGER.trace("isWinner(\"" + team + "\") ? " + answer);

        return answer;
    }
}
