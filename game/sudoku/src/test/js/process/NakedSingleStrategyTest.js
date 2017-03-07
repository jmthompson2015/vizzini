define(["Cell", "PuzzleFormat", "SudokuToGo", "process/Move", "process/NakedSingleStrategy"],
    function(Cell, PuzzleFormat, SudokuToGo, Move, NakedSingleStrategy)
    {
        "use strict";
        QUnit.module("NakedSingleStrategy");

        QUnit.test("getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 0);
            assert.equal(result.value(), 3);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("getMove() easy 1-2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.equal(result, undefined);

            // Run.
            puzzle = puzzle.withCell(0, new Cell.Value(3));
            puzzle = puzzle.adjustCandidates();
            result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 6);
            assert.equal(result.value(), 2);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("getMove() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 6);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("getMove() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 10);
            assert.equal(result.value(), 6);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("getMove() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 51);
            assert.equal(result.value(), 9);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("getMove() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(!result);
        });

        QUnit.test("getMove() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 12);
            assert.equal(result.value(), 1);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(!result);
        });

        QUnit.test("getMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = NakedSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 39);
            assert.equal(result.value(), 8);
            assert.equal(result.source(), "naked single");
        });
    });
