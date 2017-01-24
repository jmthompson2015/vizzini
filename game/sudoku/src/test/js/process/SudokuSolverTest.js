define(["GridFactory", "PuzzleFormat", "SudokuToGo", "Unit", "process/PuzzleFactory", "process/SudokuSolver"],
    function(GridFactory, PuzzleFormat, SudokuToGo, Unit, PuzzleFactory, SudokuSolver)
    {
        "use strict";
        QUnit.module("SudokuSolver");

        QUnit.test("countCandidateInUnit() block 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = Unit.BLOCKS[0];

            // Run.
            var result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 5);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("countCandidateInUnit() block 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = Unit.BLOCKS[1];

            // Run.
            var result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 6);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 2);
        });

        QUnit.test("countCandidateInUnit() column 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = Unit.COLUMNS[0];

            // Run.
            var result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 4);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("countCandidateInUnit() column 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = Unit.COLUMNS[2];

            // Run.
            var result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 4);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("countCandidateInUnit() row 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = Unit.ROWS[0];

            // Run.
            var result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 5);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("countCandidateInUnit() row 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = Unit.ROWS[2];

            // Run.
            var result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 3);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.countCandidateInUnit(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 0);
        });

        QUnit.test("firstIndexWithCandidate() row 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 1;
            var unit = Unit.ROWS[0];
            PuzzleFactory.adjustPossibilites(puzzle, 9);

            // Run.
            var result = SudokuSolver.firstIndexWithCandidate(puzzle, candidate, unit);

            // Verify.
            assert.equal(result, 1);
        });

        QUnit.test("getUnfilledSquares()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = SudokuSolver.getUnfilledSquares(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 0);

            for (var i = 0; i < 81; i++)
            {
                var value = puzzle[i];
                assert.ok(!Array.isArray(value));
            }
        });

        QUnit.test("getUnfilledSquares() easy", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = SudokuSolver.getUnfilledSquares(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 47);

            for (var i = 0; i < 81; i++)
            {
                var cellName = Unit.indexToCellName(i);
                var value = puzzle[i];

                if (result.vizziniContains(cellName))
                {
                    assert.ok(value.length > 1);
                }
                else
                {
                    assert.ok(!Array.isArray(value));
                    // assert.ok(value);
                }
            }
        });

        QUnit.test("isDone()", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = SudokuSolver.isDone(puzzle);

            // Verify.
            assert.equal(result, true);
        });

        QUnit.test("isDone() easy", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = SudokuSolver.isDone(puzzle);

            // Verify.
            assert.equal(result, false);
        });

        QUnit.test("solve() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "6", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });

        QUnit.test("solve() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "4", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "7", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "6", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "8", "I9");
        });

        QUnit.test("solve() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "7", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "9", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "6", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "4", "I9");
        });

        QUnit.test("solve() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "9", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "1", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "3", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });

        QUnit.skip("solve() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "5", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "5", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });

        QUnit.skip("solve() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "5", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "5", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });

        QUnit.skip("solve() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "5", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "5", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });

        QUnit.skip("solve() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "5", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "5", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });
    });
