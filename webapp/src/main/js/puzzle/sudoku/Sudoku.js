function Sudoku()
{
    var grid = GridFactory.createEasy();
    var puzzle = PuzzleFormat.parse(grid);

    this.getPuzzle = function()
    {
        return puzzle;
    }
}
