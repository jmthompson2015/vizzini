define(["SudokuToGo", "process/Move", "process/PuzzleFactory"],
    function(SudokuToGo, Move, PuzzleFactory)
    {
        "use strict";
        QUnit.module("Move");

        QUnit.test("removeCellCandidate()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            var N = Math.sqrt(puzzle.length);
            var index = 4;
            var candidate = 5;
            var source = "test";
            var move = new Move.RemoveCellCandidate(puzzle, N, index, candidate, source);
            assert.equal(puzzle[index].length, 4);
            assert.equal(puzzle[index].vizziniContains(candidate), true);

            // Run.
            move.execute();

            // Verify.
            assert.equal(puzzle[index].length, 3);
            assert.equal(puzzle[index].vizziniContains(candidate), false);
        });

        QUnit.test("setCellValue()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            var N = Math.sqrt(puzzle.length);
            var index = 12;
            var value = 8;
            var source = "test";
            var move = new Move.SetCellValue(puzzle, N, index, value, source);
            assert.equal(puzzle[index].length, 3);

            // Run.
            move.execute();

            // Verify.
            assert.equal(puzzle[index], value);
        });
    });
