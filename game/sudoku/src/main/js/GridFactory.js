define(function()
{
    var GridFactory = {
        createDefaultSolution: function()
        {
            return "123456789" + // row A
                "456789123" + // row B
                "789123456" + // row C
                "234567891" + // row D
                "567891234" + // row E
                "891234567" + // row F
                "345678912" + // row G
                "678912345" + // row H
                "912345678"; // row I
        },

        createDiabolical86: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 86, Diabolical
            return "17.....8." + // row A
                "86.9...7." + // row B
                "...3..5.." + // row C
                "2...3...." + // row D
                "..62.18.." + // row E
                "....4...3" + // row F
                "..9..3..." + // row G
                ".2...9.35" + // row H
                ".5.....62" // row I
            ;
        },

        createDiabolical86Solution: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 86, Diabolical
            return "173456289" + // row A
                "865912374" + // row B
                "942387516" + // row C
                "287635491" + // row D
                "436291857" + // row E
                "591748623" + // row F
                "619523748" + // row G
                "724869135" + // row H
                "358174962" // row I
            ;
        },

        createDiabolical87: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 87, Diabolical
            return ".5......." + // row A
                "8....37.." + // row B
                "7....8.19" + // row C
                "....62..." + // row D
                ".76.1.53." + // row E
                "...79...." + // row F
                "13.5....8" + // row G
                "..24....7" + // row H
                ".......2." // row I
            ;
        },

        createEasy1: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 1, Easy
            return "..6..8.74" + // row A
                "..5...1.9" + // row B
                "9.74.16.5" + // row C
                ".3.1...46" + // row D
                "........." + // row E
                "16...9.2." + // row F
                "2.36.54.8" + // row G
                "7.4...9.." + // row H
                "68.9..3.."; // row I
        },

        createEasy1Solution: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 1, Easy
            return "316598274" + // row A
                "845267139" + // row B
                "927431685" + // row C
                "539182746" + // row D
                "472356891" + // row E
                "168749523" + // row F
                "293675418" + // row G
                "754813962" + // row H
                "681924357"; // row I
        },

        createEasy2: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 2, Easy
            return "4..2..197" + // row A
                ".5.....3." + // row B
                ".31.67.8." + // row C
                "....8...4" + // row D
                "..63745.." + // row E
                "1...9...." + // row F
                ".8.42.65." + // row G
                ".9.....2." + // row H
                "612..5..8"; // row I
        },

        createEmpty: function()
        {
            var answer = "";

            for (var i = 0; i < (9 * 9); i++)
            {
                answer += ".";
            }

            return answer;
        },

        createHard66: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 66, Hard
            return ".8762...5" + // row A
                "...31...." + // row B
                "..6..7..." + // row C
                "71....5.8" + // row D
                ".6.....7." + // row E
                "8.4....13" + // row F
                "...7..3.." + // row G
                "....93..." + // row H
                "5...8692."; // row I
        },

        createHard67: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 67, Hard
            return ".5.4.37.." + // row A
                "2....7..3" + // row B
                "..129.8.." + // row C
                ".....5..." + // row D
                ".5..2..7." + // row E
                "...6....." + // row F
                "..7.692.." + // row G
                "1..8....5" + // row H
                "..65.4.3."; // row I
        },

        createMedium31: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 31, Medium
            return ".......89" + // row A
                "9..487..5" + // row B
                "......36." + // row C
                "53...9.2." + // row D
                "1..2.5..6" + // row E
                ".7.6...43" + // row F
                ".27......" + // row G
                "8..563..2" + // row H
                "61......."; // row I
        },

        createMedium32: function()
        {
            // Sudoku To Go, Volume 12, 2008.12.09, Puzzle 32, Medium
            return ".4......." + // row A
                ".....4893" + // row B
                ".3..8.6.." + // row C
                "18.36...4" + // row D
                ".537.821." + // row E
                "7...15.38" + // row F
                "..4.3..6." + // row G
                "6718....." + // row H
                ".......8."; // row I
        },
    };

    return GridFactory;
});
