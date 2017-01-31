define(["PuzzleFormat", "SudokuToGo", "process/PuzzleFactory"],
    function(PuzzleFormat, SudokuToGo, PuzzleFactory)
    {
        "use strict";
        QUnit.module("PuzzleFactory");

        QUnit.skip("create() easy 1", function(assert)
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

        QUnit.skip("removeValueFromPeers() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var index = 2;

            // Run.
            PuzzleFactory.removeValueFromPeers(puzzle, index);

            // Verify.
            var indices = [0, 1, 3, 4, 6, 9, 10, 19, 29, 38, 47, 74];

            for (var i = 0; i < indices.length; i++)
            {
                var myIndex = indices[i];
                assert.equal(puzzle[myIndex].join(""), "12345789", myIndex);
            }

            assert.equal(puzzle[8], "4");
            assert.equal(puzzle[72], "6");
            assert.equal(puzzle[80].join(""), "123456789");
        });
    });
