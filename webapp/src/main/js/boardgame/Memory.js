/*
 * Provides a memory for board game experience.
 */
function Memory()
{
    // Map of board to statistics.
    this.boardToStatistics = {};

    this.addWin = function(board)
    {
        var answer = this.getStatistics(board, true);
        answer.w++;

        return answer;
    }

    this.addDraw = function(board)
    {
        var answer = this.getStatistics(board, true);
        answer.d++;

        return answer;
    }

    this.addLoss = function(board)
    {
        var answer = this.getStatistics(board, true);
        answer.l++;

        return answer;
    }

    this.getStatistics = function(board, isCreating)
    {
        var answer = this.boardToStatistics[board];

        if (!answer && isCreating)
        {
            // Create it.
            answer =
            {
                w: 0, // wins
                d: 0, // draws
                l: 0, // losses
            }

            this.boardToStatistics[board] = answer;
        }

        return answer;
    }
}
