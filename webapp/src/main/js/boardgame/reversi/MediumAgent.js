function MediumAgent(boardUtils, adjudicator, team)
{
    InputValidator.validateNotNull("boardUtils", boardUtils);
    InputValidator.validateNotNull("adjudicator", adjudicator);
    InputValidator.validateNotEmpty("team", team);

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

        var moves = boardUtils.getMoves(board, adjudicator);
        moves.shuffle();

        // Take a corner if available.
        var corners = filterCorners(moves);
        var answer = getBestMove(board, corners);

        if (!answer)
        {
            // Take a side if available.
            var sides = filterSides(board, moves);
            answer = getBestMove(board, sides);
        }

        if (!answer)
        {
            // Take a square that is not an X or C square.
            var middles = filterMiddles(moves);
            answer = getBestMove(board, middles);
        }

        if (!answer)
        {
            // Take anything.
            answer = moves.randomElement();
        }

        if (LOGGER.isDebugEnabled())
        {
            LOGGER.debug("best move = " + answer);
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("MediumAgent.getMove()", start, new Date().getTime());
        }

        return answer;
    }

    function filterCorners(moves)
    {
        var answer = [];

        for (var i = 0; i < moves.length; i++)
        {
            var move = moves[i];

            if (boardUtils.isCorner(move))
            {
                answer[answer.length] = move;
            }
        }

        return answer;
    }

    function filterMiddles(moves)
    {
        var answer = [];

        for (var i = 0; i < moves.length; i++)
        {
            var move = moves[i];

            // Don't allow an X square.
            if (boardUtils.isMiddle(move) && !boardUtils.isXSquare(move))
            {
                answer[answer.length] = move;
            }
        }

        return answer;
    }

    function filterSides(board, moves)
    {
        var answer = [];

        for (var i = 0; i < moves.length; i++)
        {
            var move = moves[i];

            if (boardUtils.isSide(move))
            {
                if (boardUtils.isCSquare(move))
                {
                    // Only allow a C square if we already have the corner.
                    var whoseMove = formatter.toWhoseMove(board);
                    var corner = boardUtils.getCornerFor(move);

                    if (corner && boardUtils.get(board, corner) === whoseMove)
                    {
                        answer[answer.length] = move;
                    }
                }
                else
                {
                    answer[answer.length] = move;
                }
            }
        }

        return answer;
    }

    function getBestMove(board, moves)
    {
        var answer;

        if (moves.length > 0)
        {
            // Find the move which results in the lowest mobility for the
            // opponent.
            var minMobility;

            for (var i = 0; i < moves.length; i++)
            {
                var move = moves[i];
                var newBoard = boardUtils.move(board, move);
                var mobility = boardUtils.getMoves(newBoard, adjudicator).length;

                if (!minMobility || mobility < minMobility)
                {
                    minMobility = mobility;
                    answer = move;
                }
            }
        }

        return answer;
    }
}
