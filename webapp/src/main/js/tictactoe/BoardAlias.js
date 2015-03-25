/*
 * Provides a board alias.
 */
function BoardAlias(board, rotation)
{
    InputValidator.validateNotEmpty("board", board);

    this.getBoard = function()
    {
        return board;
    }

    this.getRotation = function()
    {
        return rotation;
    }

    this.equals = function(another)
    {
        return (board === another.getBoard());
    }

    this.toString = function()
    {
        return board + " " + rotation;
    }
}
