define(["Cell", "PuzzleFormat", "SudokuToGo", "process/Move", "process/HiddenSingleStrategy"],
    function(Cell, PuzzleFormat, SudokuToGo, Move, HiddenSingleStrategy)
    {
        "use strict";
        QUnit.module("HiddenSingleStrategy");

        QUnit.test("HiddenSingle.findSingleCandidateUnitCell()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var unit = puzzle.unit().BLOCKS[0];

            // Run.
            var result = HiddenSingleStrategy.findSingleCandidateUnitCell(puzzle, unit);

            // Verify.
            assert.equal(result, undefined);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = HiddenSingleStrategy.findSingleCandidateUnitCell(puzzle, unit);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 1);
        });

        QUnit.test("HiddenSingle.getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 1);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 6);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 5);
            assert.equal(result.value(), 6);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 10);
            assert.equal(result.value(), 1);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 49);
            assert.equal(result.value(), 7);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 13);
            assert.equal(result.value(), 5);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 40);
            assert.equal(result.value(), 9);
            assert.equal(result.source(), "hidden single");
        });

        QUnit.test("HiddenSingle.getMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = HiddenSingleStrategy.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 30);
            assert.equal(result.value(), 3);
            assert.equal(result.source(), "hidden single");
        });
    });
