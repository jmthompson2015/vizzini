define(["GridFactory", "PuzzleFormat", "SudokuToGo", "SudokuWiki", "Unit", "process/PuzzleFactory", "process/SudokuSolver"],
    function(GridFactory, PuzzleFormat, SudokuToGo, SudokuWiki, Unit, PuzzleFactory, SudokuSolver)
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

        QUnit.test("findSingleCandidateCell() 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = SudokuSolver.findSingleCandidateCell(puzzle, 9);

            // Verify.
            assert.equal(result, undefined);

            // Run.
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.findSingleCandidateCell(puzzle, 9);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 0);
            assert.equal(result.value(), 3);
        });

        QUnit.test("findSingleCandidateCell() 6", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = SudokuSolver.findSingleCandidateCell(puzzle, 9);

            // Verify.
            assert.equal(result, undefined);

            // Run.
            puzzle[0] = 3;
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            result = SudokuSolver.findSingleCandidateCell(puzzle, 9);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 6);
            assert.equal(result.value(), 2);
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

        QUnit.test("getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [0, 6, 1, 3, 4, 19, 10, 9, 16, 22, 25, 27, 36, 47, 55, 37, 61, 58, 64, 70, 71, 68, 66, 67, 74, 79, 43, 38, 29, 39, 41, 44, 48, 12, 13, 14, 32, 31, 33, 40, 42, 49, 51, 53, 76, 77, 80];
            var values = [3, 2, 1, 5, 9, 2, 4, 8, 3, 3, 8, 5, 4, 8, 9, 7, 1, 7, 5, 6, 2, 3, 8, 1, 1, 5, 9, 2, 9, 3, 6, 1, 7, 2, 6, 7, 2, 8, 7, 5, 8, 4, 5, 3, 2, 4, 7];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [1, 2, 5, 4, 21, 18, 24, 15, 17, 26, 37, 28, 43, 34, 44, 33, 36, 46, 52, 51, 53, 50, 48, 30, 12, 14, 13, 32, 47, 56, 11, 9, 29, 27, 54, 59, 62, 63, 65, 68, 69, 66, 71, 67, 75, 76, 78, 79];
            var values = [6, 8, 3, 5, 9, 2, 4, 2, 6, 5, 2, 7, 1, 6, 9, 3, 8, 4, 7, 8, 2, 6, 5, 1, 8, 1, 4, 2, 3, 7, 9, 7, 5, 9, 3, 9, 1, 5, 4, 8, 7, 6, 3, 1, 7, 3, 9, 4];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [10, 16, 15, 11, 45, 49, 50, 30, 31, 40, 47, 51, 58, 65, 38, 29, 37, 1, 4, 2, 3, 5, 19, 20, 22, 23, 21, 54, 59, 61, 64, 70, 43, 42, 6, 0, 18, 26, 69, 33, 35, 60, 62, 57, 74, 75, 76, 77, 78, 79, 80];
            var values = [6, 1, 2, 3, 2, 1, 8, 7, 4, 3, 9, 5, 9, 4, 8, 6, 4, 5, 2, 1, 3, 6, 8, 2, 5, 1, 9, 3, 4, 5, 9, 7, 9, 7, 4, 7, 4, 7, 1, 8, 1, 6, 8, 1, 5, 8, 7, 2, 9, 3, 4];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [51, 44, 10, 5, 25, 36, 40, 32, 29, 48, 68, 72, 54, 2, 11, 47, 46, 74, 20, 23, 59, 77, 3, 69, 78, 76, 73, 55, 75, 57, 12, 9, 13, 4, 21, 18, 0, 26, 60, 6, 7, 8, 33, 34, 62, 67, 70, 71, 80];
            var values = [9, 6, 1, 3, 4, 4, 9, 2, 9, 4, 9, 3, 8, 8, 6, 2, 6, 5, 7, 1, 7, 6, 6, 3, 4, 2, 9, 2, 1, 5, 2, 5, 7, 5, 9, 2, 9, 5, 1, 7, 2, 1, 5, 7, 9, 4, 5, 2, 7];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [49, 31, 40, 29, 74, 75, 58, 22, 5, 80, 73, 15, 51, 64, 70, 6, 18, 0, 7, 34, 30, 32, 50, 14, 16, 21, 41, 48, 39, 46, 19, 26, 17, 24, 25, 36, 38, 11, 9, 10, 44, 42, 55, 59, 54, 61, 56, 62, 63, 65, 66, 69, 71];
            var values = [7, 6, 3, 3, 1, 4, 5, 4, 9, 7, 3, 7, 6, 7, 5, 1, 1, 3, 4, 9, 2, 4, 5, 8, 6, 5, 1, 9, 8, 2, 9, 2, 9, 8, 3, 9, 5, 2, 4, 5, 4, 2, 4, 2, 6, 8, 9, 1, 2, 8, 1, 4, 6];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [12, 4, 2, 0, 13, 23, 26, 25, 57, 39, 30, 67, 68, 76, 78, 15, 16, 69, 65, 64, 70, 72, 55, 10, 11, 54, 73, 80, 35, 36, 42, 33, 28, 19, 18, 27, 31, 44, 34, 7, 8, 29, 38, 41, 45, 46, 47, 49, 50, 51, 52, 53, 61, 62];
            var values = [1, 8, 9, 6, 5, 6, 4, 5, 3, 9, 7, 7, 2, 1, 9, 6, 9, 4, 3, 9, 6, 8, 4, 8, 4, 5, 2, 7, 6, 4, 3, 1, 3, 7, 3, 9, 4, 8, 2, 1, 2, 8, 5, 1, 7, 1, 2, 3, 8, 5, 4, 9, 8, 1];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [58, 57, 62, 37, 72, 54, 60, -1, 20, 52, -1, -1, 25, 17, 26, 8, 44, 35, 61, 55, 69, 78, 51, 33, 13, 47, 36, 18, 19, 63, 45, 29, 75, 48, 50, 23, 22, 30, 3, 32, 14, 5, 4, 2, 6, 11, 15, 34, 28, 40, 43, 46, 66, 65, 67, 74, 76, 77];
            var values = [2, 5, 8, 3, 3, 6, 7, -1, 2, 2, -1, -1, 1, 4, 6, 9, 7, 1, 4, 1, 1, 9, 6, 4, 1, 1, 4, 9, 4, 7, 5, 7, 1, 7, 8, 7, 8, 6, 4, 5, 2, 6, 5, 3, 2, 5, 3, 9, 8, 9, 5, 9, 8, 4, 6, 8, 7, 4];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
        });

        QUnit.test("getMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [39, 30, 41, 44, 36, 50, 34, 58, 22, 13, 4, -1, -1, 7, 8, 35, 53, 17, 16, 52, 51, 33, 61, 70, 63, 80, 69, 68, 64, 28, 27, 29, 67, 72, 56, 59, 5, 60, 73, 74, 75, 76, 77, 78, 20, 19, 21, 12, 3, 11, 10, 0, 2, 6, 24, 45, 46, 47];
            var values = [8, 3, 4, 2, 9, 5, 7, 2, 5, 4, 7, -1, -1, 8, 4, 1, 6, 5, 6, 4, 8, 9, 9, 5, 6, 3, 1, 9, 8, 4, 5, 8, 3, 4, 7, 6, 1, 4, 9, 5, 1, 8, 7, 6, 4, 6, 2, 9, 6, 1, 2, 3, 9, 2, 3, 2, 1, 3];

            // Run / Verify.
            runGetMove(assert, puzzle, indices, values);
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
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "6", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "7", "J9");
        });

        QUnit.test("solve() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "4", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "7", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "6", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "8", "J9");
        });

        QUnit.test("solve() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "7", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "9", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "6", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "4", "J9");
        });

        QUnit.test("solve() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "9", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "1", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "3", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "7", "J9");
        });

        QUnit.test("solve() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "5", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "5", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "7", "J9");
        });

        QUnit.test("solve() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "6", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "2", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "8", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "7", "J9");
        });

        QUnit.test("solve() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "1", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "9", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "3", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "2", "J9");
        });

        QUnit.test("solve() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            // LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            // LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "3", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "4", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "3", "J9");
        });

        QUnit.skip("solve() Unsolvable #28", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.UNSOLVABLE_28].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "6", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "8", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "3", "J9");
        });

        QUnit.skip("solve() Unsolvable #49", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.UNSOLVABLE_49].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "6", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "8", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "3", "J9");
        });

        QUnit.skip("solve() Arto Inkala's Puzzle", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.ARTO_INKALAS_PUZZLE].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "6", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "8", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "3", "J9");
        });

        QUnit.skip("solve() Escargot", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.ESCARGOT].grid;
            LOGGER.info("0 grid = " + grid);
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            SudokuSolver.solve(puzzle);
            LOGGER.info("1 grid = " + PuzzleFormat.format(puzzle));

            // Verify.
            assert.ok(SudokuSolver.isDone(puzzle));
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "6", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("J1")], "8", "J1");
            assert.equal(puzzle[Unit.cellNameToIndex("J9")], "3", "J9");
        });

        function runActions(grid)
        {
            if (false)
            {
                var puzzle = PuzzleFormat.parse(grid);
                PuzzleFactory.adjustPossibilites(puzzle, 9);
                var indices = [];
                var values = [];
                var sourceCounts = {};
                var result = SudokuSolver.getMove(puzzle, 9);

                while (!SudokuSolver.isDone(puzzle) && result)
                {
                    if (result.index)
                    {
                        indices.push(result.index());
                        values.push(result.value());
                    }
                    else
                    {
                        indices.push(-1);
                        values.push(-1);
                    }

                    var count = (sourceCounts[result.source()] !== undefined ? sourceCounts[result.source()] : 0);
                    sourceCounts[result.source()] = count + 1;
                    result.execute();
                    result = SudokuSolver.getMove(puzzle, 9);
                }

                LOGGER.info("indices.length = " + indices.length);
                var clues = puzzle.constantIndices.length;
                LOGGER.info("empty = " + (81 - clues) + " clues = " + clues);
                LOGGER.info("var indices = [" + indices + "];");
                LOGGER.info("var values = [" + values + "];");
                LOGGER.info("var sourceCounts = " + JSON.stringify(sourceCounts));
            }
        }

        function runGetMove(assert, puzzle, indices, values)
        {
            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getMove(puzzle, 9);

                // Verify.
                assert.ok(result);
                if (result.index)
                {
                    assert.equal(result.index(), indices[i]);
                    assert.equal(result.value(), values[i]);
                }
                result.execute();
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        }
    });
