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

        createDiabolical: function()
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

        createDiabolicalSolution: function()
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

        createEasy: function()
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

        createEasySolution: function()
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

        createEmpty: function()
        {
            var answer = "";

            for (var i = 0; i < (9 * 9); i++)
            {
                answer += ".";
            }

            return answer;
        },
    };

    return GridFactory;
});
