define(["process/GridFactory", "process/Puzzle", "process/PuzzleFormat"],
    function(GridFactory, Puzzle, PuzzleFormat)
    {
        "use strict";
        QUnit.module("Puzzle");

        QUnit.test("eliminate() non-recursive", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);
            var isRecursive = false;

            // Run.
            var filled = puzzle.getFilledSquares();

            filled.forEach(function(cellName)
            {
                var value = puzzle.get(cellName);
                puzzle.eliminate(cellName, value, isRecursive);
            });

            // Verify.
            assert.equal(puzzle.getUnfilledSquares().length, 41);
            assert.equal(puzzle.get("A1"), "3", "A1");
            assert.equal(puzzle.get("A2"), "12", "A2");
            assert.equal(puzzle.get("A3"), "6", "A3");
            assert.equal(puzzle.get("A4"), "235", "A4");
            assert.equal(puzzle.get("A5"), "2359", "A5");
            assert.equal(puzzle.get("A6"), "8", "A6");
            assert.equal(puzzle.get("A7"), "2", "A7");
            assert.equal(puzzle.get("A8"), "7", "A8");
            assert.equal(puzzle.get("A9"), "4", "A9");
            assert.equal(puzzle.get("I1"), "6", "I1");
            assert.equal(puzzle.get("I9"), "127", "I9");
        });

        QUnit.test("eliminate() recursive", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);
            var isRecursive = true;

            // Run.
            var filled = puzzle.getFilledSquares();

            filled.forEach(function(cellName)
            {
                var value = puzzle.get(cellName);
                puzzle.eliminate(cellName, value, isRecursive);
            });

            // Verify.
            assert.equal(puzzle.getUnfilledSquares().length, 0);
            assert.equal(puzzle.get("A1"), "3", "A1");
            assert.equal(puzzle.get("A2"), "1", "A2");
            assert.equal(puzzle.get("A3"), "6", "A3");
            assert.equal(puzzle.get("A4"), "5", "A4");
            assert.equal(puzzle.get("A5"), "9", "A5");
            assert.equal(puzzle.get("A6"), "8", "A6");
            assert.equal(puzzle.get("A7"), "2", "A7");
            assert.equal(puzzle.get("A8"), "7", "A8");
            assert.equal(puzzle.get("A9"), "4", "A9");
            assert.equal(puzzle.get("I1"), "6", "I1");
            assert.equal(puzzle.get("I9"), "7", "I9");
        });

        QUnit.test("get()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);

            // Run / Verify.
            assert.equal(puzzle.get("A1"), "123456789", "A1");
            assert.equal(puzzle.get("A9"), "4", "A9");
            assert.equal(puzzle.get("I1"), "6", "I1");
            assert.equal(puzzle.get("I9"), "123456789", "I9");
        });

        QUnit.test("getFilledSquares()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = puzzle.getFilledSquares();

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 34);
            assert.equal(result[0], "A3", "A3");
            assert.equal(result[3], "A9", "A9");
            assert.equal(result[30], "I1", "I1");
            assert.equal(result[33], "I7", "I7");
        });

        QUnit.test("getUnfilledSquares()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = puzzle.getUnfilledSquares();

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 47);
            assert.equal(result[0], "A1", "A1");
            assert.equal(result[4], "A7", "A7");
            assert.equal(result[42], "I3", "I3");
            assert.equal(result[46], "I9", "I9");
        });

        QUnit.test("isFilled()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);

            // Run / Verify.
            assert.ok(!puzzle.isFilled("A1"), "A1");
            assert.ok(puzzle.isFilled("A9"), "A9");
            assert.ok(puzzle.isFilled("I1"), "I1");
            assert.ok(!puzzle.isFilled("I9"), "I9");
        });

        QUnit.test("set()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createEasy();
            var puzzle = PuzzleFormat.parse(grid);
            assert.equal(puzzle.get("A1"), "123456789", "A1");
            assert.equal(puzzle.get("I9"), "123456789", "I9");

            // Run.
            puzzle.set("A1", "3");
            puzzle.set("I9", "7");

            // Verify.
            assert.equal(puzzle.get("A1"), "3", "A1");
            assert.equal(puzzle.get("A9"), "4", "A9");
            assert.equal(puzzle.get("I1"), "6", "I1");
            assert.equal(puzzle.get("I9"), "7", "I9");
        });
    });
