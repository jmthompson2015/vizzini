define(["PuzzleFactory", "SudokuToGo"],
    function(PuzzleFactory, SudokuToGo)
    {
        "use strict";
        QUnit.module("PuzzleFactory");

        QUnit.test("create() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;

            // Run.
            var result = PuzzleFactory.create(grid);

            // Verify.
            assert.ok(result);
            assert.equal(result[0], "3");
            assert.equal(result[8], "4");
            assert.equal(result[72], "6");
            assert.equal(result[80].join(""), "127");
        });
    });
