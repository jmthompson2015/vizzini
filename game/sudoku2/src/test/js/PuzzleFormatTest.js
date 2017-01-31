define(["PuzzleFormat", "SudokuToGo"],
    function(PuzzleFormat, SudokuToGo)
    {
        "use strict";
        QUnit.module("PuzzleFormat");

        QUnit.test("createEmpty()", function(assert)
        {
            // Setup.

            // Run.
            var result = PuzzleFormat.createEmpty();

            // Verify.
            assert.ok(result);
            for (var i = 0; i < 81; i++)
            {
                assert.equal(result.get(i).candidates().join(""), "123456789");
            }
        });

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
            assert.equal(result.get(0).candidates().join(""), "123456789");
            assert.equal(result.get(8).value(), 4);
            assert.equal(result.get(72).value(), 6);
            assert.equal(result.get(80).candidates().join(""), "123456789");
        });

        QUnit.test("parse() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;

            // Run.
            var result = PuzzleFormat.parse(grid);

            // Verify.
            assert.ok(result);
            assert.equal(result.get(0).value(), 4);
            assert.equal(result.get(1).candidates().join(""), "123456789");
            assert.equal(result.get(8).value(), 7);
            assert.equal(result.get(72).value(), 6);
            assert.equal(result.get(79).candidates().join(""), "123456789");
            assert.equal(result.get(80).value(), 8);
        });
    });
