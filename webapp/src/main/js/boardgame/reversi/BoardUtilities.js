/*
 * Provides utility methods for a Reversi board.
 */
function BoardUtilities(geometry, formatter)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);

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
            LOGGER.trace("x, y = " + x + ", " + y);

            if (geometry.isOnBoard(x, y, 0))
            {
                var position = geometry.computeIndex(x, y, 0);
                LOGGER.trace("position = " + position);
                var token = boardString[position];
                LOGGER.trace("token = " + token);

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
        LOGGER.trace("boardString = _" + boardString + "_");
        LOGGER.trace("index = " + index);

        var answer = boardString;

        if (index)
        {
            var oldToken = boardString[index];
            LOGGER.trace("oldToken = _" + oldToken + "_");

            if (oldToken && oldToken !== " ")
            {
                var newToken = this.nextMover(oldToken);
                LOGGER.trace("newToken = _" + newToken + "_");
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

    this.getAliases = function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = [];

        answer[answer.length] = new BoardAlias(board);

        var values = Rotation.values2D;

        for (var i = 0; i < values.length; i++)
        {
            maybeAdd(this.rotateBoard(board, values[i]));
        }

        answer.sort();

        return answer;

        function maybeAdd(b)
        {
            if (!answer.contains(b))
            {
                answer[answer.length] = b;
            }
        }
    }

    this.getMoves = function(board, adjudicator)
    {
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

    this.move = function(board, index)
    {
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

                    if (geometry.isOnBoard(x, y, 0))
                    {
                        var position = geometry.computeIndex(x, y, 0);
                        boardString = this.flipTokenAt(boardString, position);
                    }
                }
            }
        }

        var newBoard = boardString.slice(0, index) + whoseMove
                + boardString.slice(index + 1);

        return formatter.toBoard(newBoard, this.nextMover(whoseMove));
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

    this.rotateBoard = function(board, rotation)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer;

        if (!rotation)
        {
            answer = new BoardAlias(board);
        }
        else if (Rotation.values2D.contains(rotation))
        {
            var boardString = formatter.toBoardString(board);
            var whoseMove = formatter.toWhoseMove(board);
            var newBoard = "";

            for (var i = 0; i < geometry.getMaxCells(); i++)
            {
                newBoard += boardString[geometry.unrotate(i, rotation)];
            }

            newBoard = formatter.toBoard(newBoard, whoseMove);

            answer = new BoardAlias(newBoard, rotation);
        }
        else
        {
            throw "Unknown rotation: " + rotation;
        }

        return answer;
    }
}
