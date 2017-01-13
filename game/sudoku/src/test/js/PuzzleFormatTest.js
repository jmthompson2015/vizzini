define(["GridFactory", "PuzzleFormat"],
    function(GridFactory, PuzzleFormat)
    {
        "use strict";
        QUnit.module("PuzzleFormat");

        QUnit.test("format() easy 1", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy1();
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
            var grid = GridFactory.createEasy1();

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
            var grid = GridFactory.createEasy2();

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

        QUnit.skip("parse() and eliminate()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy1();

            // Run.
            var result = PuzzleFormat.parse(grid);
            assert.ok(result);
            var filled = result.getFilledSquares();
            var isRecursive = false;

            filled.forEach(function(cellName)
            {
                var value = result.get(cellName);
                result.eliminate(cellName, value, isRecursive);
            });

            // Verify.
            assert.ok(result);
            assert.equal(result.get("A1"), "3");
            assert.equal(result.get("A9"), "4");
            assert.equal(result.get("I1"), "6");
            assert.equal(result.get("I9"), "127");
        });
    });
