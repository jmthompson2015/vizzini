/*
 * See http://www.sudokuwiki.org/Arto_Inkala_Sudoku
 */
define(function()
{
    "use strict";
    var SudokuWiki = {
        ESCARGOT: "escargot",
        ARTO_INKALAS_PUZZLE: "artoInkalasPuzzle",
        UNSOLVABLE_49: "unsolvable49",
        UNSOLVABLE_28: "unsolvable28",

        properties:
        {
            "escargot":
            {
                // See http://www.sudokuwiki.org/sudoku.htm?bd=100007090030020008009600500005300900010080002600004000300000010041000007007000300
                name: "Escargot",
                grid: "1....7.9." + // row A
                    ".3..2...8" + // row B
                    "..96..5.." + // row C
                    "..53..9.." + // row D
                    ".1..8...2" + // row E
                    "6....4..." + // row F
                    "3......1." + // row G
                    ".41.....7" + // row H
                    "..7...3..", // row I
                value: "escargot",
            },
            "artoInkalasPuzzle":
            {
                // See http://www.sudokuwiki.org/sudoku.htm?bd=800000000003600000070090200050007000000045700000100030001000068008500010090000400
                name: "Arto Inkala's Puzzle",
                grid: "8........" + // row A
                    "..36....." + // row B
                    ".7..9.2.." + // row C
                    ".5...7..." + // row D
                    "....457.." + // row E
                    "...1...3." + // row F
                    "..1....68" + // row G
                    "..85...1." + // row H
                    ".9....4..", // row I
                value: "artoInkalasPuzzle",
            },
            "unsolvable49":
            {
                // See http://www.sudokuwiki.org/Weekly_Sudoku.asp?puz=49
                name: "Unsolvable #49",
                grid: "..28....." + // row A
                    ".3..6...7" + // row B
                    "1......4." + // row C
                    "6...9...." + // row D
                    ".5.6....9" + // row E
                    "....57.6." + // row F
                    "...3..1.." + // row G
                    ".7...6..8" + // row H
                    "4......2.", // row I
                value: "unsolvable49",
            },
            "unsolvable28":
            {
                // See http://www.sudokuwiki.org/Weekly_Sudoku.asp?puz=28
                name: "Unsolvable #28",
                grid: "6....894." + // row A
                    "9....61.." + // row B
                    ".7..4...." + // row C
                    "2..61...." + // row D
                    "......2.." + // row E
                    ".89..2..." + // row F
                    "....6...5" + // row G
                    ".......3." + // row H
                    "8....16..", // row I
                value: "unsolvable28",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SudokuWiki.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(SudokuWiki);
    }

    return SudokuWiki;
});
