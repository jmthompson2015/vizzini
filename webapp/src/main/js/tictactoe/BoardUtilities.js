/*
 * Provides utility methods for a tic-tac-toe board.
 * 
 * <pre>
 * 0 | 1 | 2
 * 3 | 4 | 5
 * 6 | 7 | 8
 * </pre>
 */
var BoardUtilities =
{
    MAX: 9,
    MAX_X: 3,
    
    /* Expanded board length is MAX plus separators or  MAX + MAX_X - 1. */
    BOARD_LENGTH: 11,

    compress: function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = "";

        var count = 0;

        for (var i = 0; i < board.length; i++)
        {
            var letter = board.charAt(i);

            if (i < this.BOARD_LENGTH)
            {
                if (letter === " ")
                {
                    count++;
                }
                else
                {
                    if (count > 0)
                    {
                        answer += count;
                    }

                    answer += letter;
                    count = 0;
                }
            }
            else
            {
                if (count > 0)
                {
                    answer += count;
                }

                answer += letter;
                count = 0;
            }
        }

        if (count > 0)
        {
            answer += count;
        }

        return answer;
    },

    createStartBoard: function()
    {
        return "3/3/3 X";
    },

    expand: function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = "";

        for (var i = 0; i < board.length; i++)
        {
            var letter = board.charAt(i);
            var number = parseInt(letter);

            if (Number.isInteger(number))
            {
                // Add space(s)
                for (var j = 0; j < number; j++)
                {
                    answer += " ";
                }
            }
            else
            {
                answer += letter;
            }
        }

        return answer;
    },

    get: function(board, index)
    {
        InputValidator.validateNotEmpty("board", board);
        InputValidator.validateInRange("index", index, 0, this.MAX - 1);

        var boardString = this.getBoardString(board);

        return boardString[index];
    },

    getAliases: function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = [];

        answer[answer.length] = new BoardAlias(board);

        var values = Rotation.values;

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
    },

    getBoardString: function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = this.expand(board);
        answer = answer.slice(0, this.BOARD_LENGTH);
        answer = answer.replace(/\//g, "");

        return answer;
    },

    getFile: function(index)
    {
        InputValidator.validateInRange("index", index, 0, this.MAX - 1);

        return index % this.MAX_X;
    },

    getMoves: function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = [];

        if (board === "3/3/3 X")
        {
            // Special case for empty board.
            answer[answer.length] = 0;
            answer[answer.length] = 1;
            answer[answer.length] = 4;
        }
        else
        {
            var b = this.getBoardString(board);

            for (var i = 0; i < this.MAX; i++)
            {
                if (b[i] === " ")
                {
                    answer[answer.length] = i;
                }
            }
        }

        return answer;
    },

    getRank: function(index)
    {
        InputValidator.validateInRange("index", index, 0, this.MAX - 1);

        return Math.floor(index / this.MAX_X);
    },

    getWhoseMove: function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        return board.slice(board.length - 1);
    },

    isWinner: function(board, team)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = false;

        // Rows.
        var pattern = team + team + team;
        answer = board.indexOf(pattern) >= 0;

        if (!answer)
        {
            // Columns.
            var boardString = this.getBoardString(board);

            for (var i = 0; !answer && i < this.MAX_X; i++)
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

        return answer;
    },

    move: function(board, index)
    {
        InputValidator.validateNotEmpty("board", board);
        InputValidator.validateInRange("index", index, 0, this.MAX - 1);

        var newBoard = this.getBoardString(board);
        var whoseMove = this.getWhoseMove(board);
        newBoard = newBoard.slice(0, index) + whoseMove
                + newBoard.slice(index + 1);
        newBoard = newBoard.slice(0, 3) + "/" + newBoard.slice(3, 6) + "/"
                + newBoard.slice(6);

        return this.compress(newBoard) + " " + this.nextMover(whoseMove);
    },

    nextMover: function(whoseMove)
    {
        var answer;

        if (whoseMove)
        {
            answer = (whoseMove === "X" ? "o" : "X");
        }

        return answer;
    },

    rotate: function(index, rotation)
    {
        InputValidator.validateNotNull("index", index);
        InputValidator.validateInRange("index", index, 0, this.MAX - 1);

        if (typeof index !== "number") { throw "index is not a number: " + move; }

        var answer;

        if (!rotation)
        {
            answer = index;
        }
        else if (rotation === Rotation.X180)
        {
            var xrots = [ 6, 7, 8, 3, 4, 5, 0, 1, 2 ];
            answer = xrots[index];
        }
        else if (rotation === Rotation.Y180)
        {
            var yrots = [ 2, 1, 0, 5, 4, 3, 8, 7, 6 ];
            answer = yrots[index];
        }
        else if (rotation === Rotation.Z090)
        {
            var zrots = [ 2, 5, 8, 1, 4, 7, 0, 3, 6 ];
            answer = zrots[index];
        }
        else if (rotation === Rotation.Z180)
        {
            answer = this.MAX - 1 - index;
        }
        else if (rotation === Rotation.Z270)
        {
            var zrots = [ 6, 3, 0, 7, 4, 1, 8, 5, 2 ];
            answer = zrots[index];
        }
        else
        {
            throw "Unknown rotation: " + rotation;
        }

        return answer;
    },

    rotateBoard: function(board, rotation)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer;

        if (!rotation)
        {
            answer = new BoardAlias(answer);
        }
        else if (Rotation.values.contains(rotation))
        {
            var boardString = this.getBoardString(board);
            var whoseMove = this.getWhoseMove(board);
            var newBoard = "";

            for (var i = 0; i < this.MAX; i++)
            {
                newBoard += boardString[this.unrotate(i, rotation)];

                if (i % this.MAX_X === 2 && i < this.MAX - 1)
                {
                    newBoard += "/";
                }
            }

            newBoard = this.compress(newBoard) + " " + whoseMove;

            answer = new BoardAlias(newBoard, rotation);
        }
        else
        {
            throw "Unknown rotation: " + rotation;
        }

        return answer;
    },

    unrotate: function(index, rotation)
    {
        InputValidator.validateNotNull("index", index);
        InputValidator.validateInRange("index", index, 0, this.MAX - 1);

        var answer;

        if (!rotation)
        {
            answer = index;
        }
        else if (rotation === Rotation.X180 || rotation === Rotation.Y180
                || rotation === Rotation.Z180)
        {
            answer = this.rotate(index, rotation);
        }
        else if (rotation === Rotation.Z090)
        {
            answer = this.rotate(index, Rotation.Z270);
        }
        else if (rotation === Rotation.Z270)
        {
            answer = this.rotate(index, Rotation.Z090);
        }
        else
        {
            throw "Unknown rotation: " + rotation;
        }

        return answer;
    }
}
