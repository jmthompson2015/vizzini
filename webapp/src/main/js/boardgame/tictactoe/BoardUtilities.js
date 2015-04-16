/*
 * Provides utility methods for a Tic-Tac-Toe board.
 */
function BoardUtilities(geometry, formatter)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);

    this.createStartBoard = function()
    {
        return "3/3/3 X";
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

        for (var i = 0; i < geometry.getMaxCells(); i++)
        {
            if (adjudicator.isActionLegalFor(b, i))
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

    this.move = function(board, index)
    {
        InputValidator.validateNotEmpty("board", board);
        InputValidator.validateInRange("index", index, 0, geometry
                .getMaxCells() - 1);

        var boardString = formatter.toBoardString(board);
        var whoseMove = formatter.toWhoseMove(board);

        var newBoard = boardString.slice(0, index) + whoseMove
                + boardString.slice(index + 1);

        return formatter.toBoard(newBoard, this.nextMover(whoseMove));
    }

    this.nextMover = function(whoseMove)
    {
        var answer;

        if (whoseMove)
        {
            answer = (whoseMove === "X" ? "o" : "X");
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
