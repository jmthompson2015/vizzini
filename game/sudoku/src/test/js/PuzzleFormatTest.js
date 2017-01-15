define(["PuzzleFormat", "SudokuToGo"],
    function(PuzzleFormat, SudokuToGo)
    {
        "use strict";
        QUnit.module("PuzzleFormat");

        QUnit.test("format() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = PuzzleFormat.format(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 81);
            assert.equal(result, grid);
        });

        QUnit.test("parse() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;

            // Run.
            var result = PuzzleFormat.parse(grid);

            // Verify.
            assert.ok(result);
            assert.equal(result[0].join(""), "123456789");
            assert.equal(result[8], "4");
            assert.equal(result[72], "6");
            assert.equal(result[80].join(""), "123456789");
        });

        QUnit.test("parse() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;

            // Run.
            var result = PuzzleFormat.parse(grid);

            // Verify.
            assert.ok(result);
            assert.equal(result[0], "4");
            assert.equal(result[1].join(""), "123456789");
            assert.equal(result[8], "7");
            assert.equal(result[72], "6");
            assert.equal(result[79].join(""), "123456789");
            assert.equal(result[80], "8");
        });
    });
