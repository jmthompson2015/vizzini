/*
 * Provides utility methods for a Reversi board.
 */
function BoardUtilities(geometry, formatter)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);

    var CORNERS = [ 0, 7, 56, 63 ];
    var X_SQUARES = [ 9, 14, 49, 54 ];
    var C_SQUARES = [ 1, 6, 8, 15, 48, 55, 57, 62 ];

    this.createStartBoard = function()
    {
        return "8/8/8/3wB3/3Bw3/8/8/8 B";
    }

    this.determineLineLength = function(boardString, team, index, direction)
    {
        InputValidator.validateNotEmpty("boardString", boardString);
        InputValidator.validateNotEmpty("team", team);
        InputValidator.validateNotNull("index", index);
        InputValidator.validateNotNull("direction", direction);

        var answer = -1;

        var isLooking = true;
        var j = 0;
        var file = geometry.toFile(index);
        var rank = geometry.toRank(index);

        while ((answer < 0) && isLooking)
        {
            j++;
            var x = file + (j * direction[0]);
            var y = rank + (j * direction[1]);

            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("x, y = " + x + ", " + y);
            }

            if (geometry.isOnBoard(x, y, 0))
            {
                var position = geometry.computeIndex(x, y, 0);

                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace("position = " + position);
                }

                var token = boardString[position];

                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace("token = " + token);
                }

                if (token === " ")
                {
                    isLooking = false;
                }
                else if (team === token)
                {
                    if (j > 1)
                    {
                        answer = j - 1;
                    }

                    isLooking = false;
                }
            }
            else
            {
                isLooking = false;
            }
        }

        return answer;
    }

    this.flipTokenAt = function(boardString, index)
    {
        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace("boardString = _" + boardString + "_");
            LOGGER.trace("index = " + index);
        }

        var answer = boardString;

        if (index)
        {
            var oldToken = boardString[index];

            if (LOGGER.isTraceEnabled())
            {
                LOGGER.trace("oldToken = _" + oldToken + "_");
            }

            if (oldToken && oldToken !== " ")
            {
                var newToken = this.nextMover(oldToken);

                if (LOGGER.isTraceEnabled())
                {
                    LOGGER.trace("newToken = _" + newToken + "_");
                }

                answer = boardString.slice(0, index) + newToken
                        + boardString.slice(index + 1);
            }
        }

        return answer;
    }

    this.get = function(board, index)
    {
        InputValidator.validateNotEmpty("board", board);
        InputValidator.validateInRange("index", index, 0, geometry
                .getMaxCells() - 1);

        var boardString = formatter.toBoardString(board);

        return boardString[index];
    }

    this.getAlias = function(board)
    {
        var start = new Date().getTime();
        InputValidator.validateNotEmpty("board", board);

        var boardString = formatter.toBoardString(board);
        var whoseMove = formatter.toWhoseMove(board);

        var newBoardString = boardString;
        var newRotation;

        var values = Rotation.values2D;

        for (var i = 0; i < values.length; i++)
        {
            var board2 = this.rotateBoard(boardString, values[i]);

            if (board2 < newBoardString)
            {
                newBoardString = board2;
                newRotation = values[i];
            }
        }

        var newBoard = formatter.toBoard(newBoardString, whoseMove);

        var answer = new BoardAlias(newBoard, newRotation);

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("BoardUtilities.getAlias()", start, new Date()
                    .getTime());
        }

        return answer;
    }

    this.getCornerFor = function(index)
    {
        var answer;

        var file = geometry.toFile(index);
        var rank = geometry.toRank(index);

        if (file < 4 && rank < 4)
        {
            answer = 0;
        }
        else if (file >= 4 && rank < 4)
        {
            answer = 7;
        }
        else if (file < 4 && rank >= 4)
        {
            answer = 56;
        }
        else if (file >= 4 && rank >= 4)
        {
            answer = 63;
        }

        return answer;
    }

    this.getMoves = function(board, adjudicator)
    {
        var start = new Date().getTime();
        InputValidator.validateNotEmpty("board", board);
        InputValidator.validateNotNull("adjudicator", adjudicator);

        var answer = [];

        var b = formatter.toBoardString(board);
        var whoseMove = formatter.toWhoseMove(board);

        for (var i = 0; i < geometry.getMaxCells(); i++)
        {
            if (adjudicator.isActionLegalFor(b, whoseMove, i))
            {
                answer[answer.length] = i;
            }
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("BoardUtilities.getMoves()", start, new Date()
                    .getTime());
        }

        return answer;
    }

    this.getTokenCount = function(board)
    {
        var answer = 0;
        var b = formatter.toBoardString(board);

        for (var i = 0; i < geometry.getMaxCells(); i++)
        {
            if (b[i] !== " ")
            {
                answer++;
            }
        }

        return answer;
    }

    this.getTokenCountFor = function(board, team)
    {
        var answer = 0;
        var b = formatter.toBoardString(board);

        for (var i = 0; i < geometry.getMaxCells(); i++)
        {
            if (b[i] === team)
            {
                answer++;
            }
        }

        return answer;
    }

    this.isCorner = function(index)
    {
        return CORNERS.contains(index);
    }

    this.isCSquare = function(index)
    {
        return C_SQUARES.contains(index);
    }

    this.isMiddle = function(index)
    {
        var file = geometry.toFile(index);
        var rank = geometry.toRank(index);

        return ((0 < file && file < 7) && (0 < rank && rank < 7));
    }

    this.isSide = function(index)
    {
        var file = geometry.toFile(index);
        var rank = geometry.toRank(index);

        return ((file === 0 || file === 7) && (0 < rank && rank < 7))
                || ((0 < file && file < 7) && (rank === 0 || rank === 7));
    }

    this.isXSquare = function(index)
    {
        return X_SQUARES.contains(index);
    }

    this.move = function(board, index)
    {
        var start = new Date().getTime();
        InputValidator.validateNotEmpty("board", board);
        InputValidator.validateInRange("index", index, 0, geometry
                .getMaxCells() - 1);

        var boardString = formatter.toBoardString(board);
        var whoseMove = formatter.toWhoseMove(board);
        var file = geometry.toFile(index);
        var rank = geometry.toRank(index);
        var directions = geometry.directions();

        for (var j = 0; j < directions.length; j++)
        {
            var direction = directions[j];
            var length = this.determineLineLength(boardString, whoseMove,
                    index, direction);

            if (length > 0)
            {
                for (var i = 1; i <= length; i++)
                {
                    var x = file + (i * direction[0]);
                    var y = rank + (i * direction[1]);
                    var position = geometry.computeIndex(x, y, 0);
                    boardString = this.flipTokenAt(boardString, position);
                }
            }
        }

        var newBoard = boardString.slice(0, index) + whoseMove
                + boardString.slice(index + 1);

        var answer = formatter.toBoard(newBoard, this.nextMover(whoseMove));

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("BoardUtilities.move()", start, new Date().getTime());
        }

        return answer;
    }

    this.nextMover = function(whoseMove)
    {
        var answer;

        if (whoseMove)
        {
            answer = (whoseMove === "B" ? "w" : "B");
        }

        return answer;
    }

    this.rotateBoard = function(boardString, rotation)
    {
        InputValidator.validateNotEmpty("boardString", boardString);

        var answer;

        if (!rotation)
        {
            answer = board;
        }
        else if (Rotation.values2D.contains(rotation))
        {
            var newBoard = "";

            for (var i = 0; i < geometry.getMaxCells(); i++)
            {
                newBoard += boardString[geometry.unrotate(i, rotation)];
            }

            answer = newBoard;
        }
        else
        {
            throw "Unknown rotation: " + rotation;
        }

        return answer;
    }
}
