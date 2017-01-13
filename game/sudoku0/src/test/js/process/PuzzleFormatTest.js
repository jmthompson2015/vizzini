define(["process/GridFactory", "process/PuzzleFormat"],
    function(GridFactory, PuzzleFormat)
    {
        "use strict";
        QUnit.module("PuzzleFormat");

        QUnit.test("format()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = PuzzleFormat.format(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 81);
            assert.equal(result, grid);
        });

        QUnit.test("parse()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();

            // Run.
            var result = PuzzleFormat.parse(grid);

            // Verify.
            assert.ok(result);
            assert.equal(result.get("A1"), "123456789");
            assert.equal(result.get("A9"), "4");
            assert.equal(result.get("I1"), "6");
            assert.equal(result.get("I9"), "123456789");
        });

        QUnit.test("parse() and eliminate()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();

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
