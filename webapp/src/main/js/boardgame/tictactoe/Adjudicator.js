/*
 * Provides an adjudicator for Tic-Tac-Toe.
 */
function Adjudicator(geometry, formatter, boardUtils)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);
    InputValidator.validateNotNull("boardUtils", boardUtils);

    this.isActionLegalFor = function(boardString, index)
    {
        return (boardString[index] === " ");
    }

    this.isGameOver = function(board)
    {
        var answer = false;

        if (board)
        {
            answer = (boardUtils.getTokenCount(board) === 9)
                    || this.isWinner(board, "X") || this.isWinner(board, "o");
        }

        return answer;
    }

    this.isWinner = function(board, team)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = false;

        // Rows.
        var pattern = team + team + team;
        answer = board.indexOf(pattern) >= 0;

        if (!answer)
        {
            // Columns.
            var boardString = formatter.toBoardString(board);

            for (var i = 0; !answer && i < geometry.getMaxFile(); i++)
            {
                answer = boardString[i] === team && boardString[i + 3] === team
                        && boardString[i + 6] === team;
            }

            // Diagonals.
            if (!answer)
            {
                answer = boardString[0] === team && boardString[4] === team
                        && boardString[8] === team;
            }

            if (!answer)
            {
                answer = boardString[2] === team && boardString[4] === team
                        && boardString[6] === team;
            }
        }

        LOGGER.trace("isWinner(\"" + team + "\") ? " + answer);

        return answer;
    }
}
