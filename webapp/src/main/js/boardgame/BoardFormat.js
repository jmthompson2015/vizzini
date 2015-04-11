/*
 * Provides a formatter for converting between a board and a board string.
 */
function BoardFormat(geometry)
{
    InputValidator.validateNotNull("geometry", geometry);

    // Expanded board length is MAX plus separators.
    var boardLength = geometry.getMaxCells() + geometry.getMaxLevel()
            * (geometry.getMaxRank() - 1) + geometry.getMaxLevel() - 1;

    this.getBoardLength = function()
    {
        return boardLength;
    }

    this.toBoard = function(boardString, whoseMove)
    {
        InputValidator.validateNotEmpty("boardString", boardString);
        InputValidator.validateNotEmpty("whoseMove", whoseMove);

        var newBoard = "";
        var maxCells = geometry.getMaxCells();
        var maxFile = geometry.getMaxFile();
        var maxRank = geometry.getMaxRank();
        var perLevel = maxFile * maxRank;

        for (var i = 0; i < geometry.getMaxCells(); i++)
        {
            newBoard += boardString[i];

            if (i % perLevel === perLevel - 1 && i < maxCells - 1)
            {
                newBoard += "|";
            }
            else if (i % maxFile === maxFile - 1 && i < maxCells - 1)
            {
                newBoard += "/";
            }
        }

        return compress(newBoard) + " " + whoseMove;
    }

    this.toBoardString = function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        var answer = expand(board);
        answer = answer.slice(0, boardLength);
        answer = answer.replace(/\//g, "");
        answer = answer.replace(/\|/g, "");

        return answer;
    }

    this.toWhoseMove = function(board)
    {
        InputValidator.validateNotEmpty("board", board);

        return board.slice(board.length - 1);
    }

    function compress(board)
    {
        var answer = "";
        var count = 0;

        for (var i = 0; i < board.length; i++)
        {
            var letter = board.charAt(i);

            if (i < boardLength && letter === " ")
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

        if (count > 0)
        {
            answer += count;
        }

        return answer;
    }

    function expand(board)
    {
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
    }
}
