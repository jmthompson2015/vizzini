define(["SudokuToGo", "process/PuzzleAnalyzer", "process/PuzzleFactory"],
    function(SudokuToGo, PuzzleAnalyzer, PuzzleFactory)
    {
        "use strict";
        QUnit.module("PuzzleAnalyzer");

        QUnit.test("isConflictCell()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);

            // Run / Verify.
            for (var i = 0; i < 81; i++)
            {
                assert.equal(PuzzleAnalyzer.isConflictCell(puzzle, i), false);
            }
        });

        QUnit.test("isConflictCell() block", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            puzzle[16] = 6;

            // Run / Verify.
            var cells = [16, 24];

            for (var i = 0; i < 81; i++)
            {
                assert.equal(PuzzleAnalyzer.isConflictCell(puzzle, i), cells.vizziniContains(i), "i = " + i);
            }
        });

        QUnit.test("isConflictCell() column", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            puzzle[71] = 6;

            // Run / Verify.
            var cells = [35, 71];

            for (var i = 0; i < 81; i++)
            {
                assert.equal(PuzzleAnalyzer.isConflictCell(puzzle, i), cells.vizziniContains(i), "i = " + i);
            }
        });

        QUnit.test("isConflictCell() row", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            puzzle[22] = 6;

            // Run / Verify.
            var cells = [22, 24];

            for (var i = 0; i < 81; i++)
            {
                assert.equal(PuzzleAnalyzer.isConflictCell(puzzle, i), cells.vizziniContains(i), "i = " + i);
            }
        });

        QUnit.test("isSameCandidateCell()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            var selectedValue = 6;

            // Run / Verify.
            var cells = [13, 14, 40, 41, 70];

            for (var i = 0; i < 81; i++)
            {
                assert.equal(PuzzleAnalyzer.isSameCandidateCell(puzzle, selectedValue, i), cells.vizziniContains(i), "i = " + i);
            }
        });

        QUnit.test("isSameValueCell()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            var selectedValue = 6;

            // Run / Verify.
            var cells = [2, 24, 35, 46, 57, 72];

            for (var i = 0; i < 81; i++)
            {
                assert.equal(PuzzleAnalyzer.isSameValueCell(puzzle, selectedValue, i), cells.vizziniContains(i), "i = " + i);
            }
        });
    });
