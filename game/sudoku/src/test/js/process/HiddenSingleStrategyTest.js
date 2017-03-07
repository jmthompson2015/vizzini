define(["Cell", "PuzzleFormat", "SudokuToGo", "process/Move", "process/Strategy"],
    function(Cell, PuzzleFormat, SudokuToGo, Move, Strategy)
    {
        "use strict";
        QUnit.module("Strategy.HiddenSingle");

        QUnit.test("HiddenSingle.countCandidateInUnit() block 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().BLOCKS[0];

            // Run.
            var result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 5);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("HiddenSingle.countCandidateInUnit() block 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().BLOCKS[1];

            // Run.
            var result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 6);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 2);
        });

        QUnit.test("HiddenSingle.countCandidateInUnit() column 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().COLUMNS[0];

            // Run.
            var result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 4);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("HiddenSingle.countCandidateInUnit() column 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().COLUMNS[2];

            // Run.
            var result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 4);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("HiddenSingle.countCandidateInUnit() row 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().ROWS[0];

            // Run.
            var result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 5);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("HiddenSingle.countCandidateInUnit() row 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().ROWS[2];

            // Run.
            var result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 3);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("HiddenSingle.findSingleCandidateUnitCell()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var unit = puzzle.unit().BLOCKS[0];

            // Run.
            var result = Strategy.HiddenSingle.findSingleCandidateUnitCell(puzzle, unit);

            // Verify.
            assert.equal(result, undefined);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = Strategy.HiddenSingle.findSingleCandidateUnitCell(puzzle, unit);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 1);
        });

        QUnit.test("HiddenSingle.firstIndexWithCandidate() row 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 1;
            var unit = puzzle.unit().ROWS[0];
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenSingle.firstIndexWithCandidate(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 1);
        });

        QUnit.test("HiddenSingle.getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

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
            var result = Strategy.HiddenSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 30);
            assert.equal(result.value(), 3);
            assert.equal(result.source(), "hidden single");
        });
    });
