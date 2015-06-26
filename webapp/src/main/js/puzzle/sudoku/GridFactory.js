var GridFactory =
{
    createEasy: function()
    {
        // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 1, Easy
        return "..6..8.74" // row A
                + "..5...1.9" // row B
                + "9.74.16.5" // row C
                + ".3.1...46" // row D
                + "........." // row E
                + "16...9.2." // row F
                + "2.36.54.8" // row G
                + "7.4...9.." // row H
                + "68.9..3.."; // row I
    },

    createDiabolical: function()
    {
        // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 86, Diabolical
        return "17.....8.86.9...7....3..5..2...3......62.18......4...3..9..3....2...9.35.5.....62";
    },
}
