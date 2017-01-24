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
            assert.equal(result.index, 0);
            assert.equal(result.value, 3);
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
            assert.equal(result.index, 6);
            assert.equal(result.value, 2);
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

        QUnit.test("getAction() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [0, 6, 1, 3, 4, 19, 10, 9, 16, 22, 25, 27, 36, 47, 55, 37, 61, 58, 64, 70, 71, 68, 66, 67, 74, 79, 43, 38, 29, 39, 41, 44, 48, 12, 13, 14, 32, 31, 33, 40, 42, 49];
            var values = [3, 2, 1, 5, 9, 2, 4, 8, 3, 3, 8, 5, 4, 8, 9, 7, 1, 7, 5, 6, 2, 3, 8, 1, 1, 5, 9, 2, 9, 3, 6, 1, 7, 2, 6, 7, 2, 8, 7, 5, 8, 4];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [1, 2, 5, 4, 21, 18, 24, 15, 17, 26, 37, 28, 43, 34, 44, 33, 36, 46, 52, 51, 53, 50, 48, 30, 12, 14, 13, 32, 47, 56, 11, 9, 29, 27, 54, 59, 62, 63, 65, 68, 69, 66, 71];
            var values = [6, 8, 3, 5, 9, 2, 4, 2, 6, 5, 2, 7, 1, 6, 9, 3, 8, 4, 7, 8, 2, 6, 5, 1, 8, 1, 4, 2, 3, 7, 9, 7, 5, 9, 3, 9, 1, 5, 4, 8, 7, 6, 3];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [10, 16, 15, 11, 45, 49, 50, 30, 31, 40, 47, 51, 58, 65, 38, 29, 37, 1, 4, 2, 3, 5, 19, 20, 22, 23, 21, 54, 59, 61, 64, 70, 43, 42, 6, 0, 18, 26, 69, 33, 35, 60, 62];
            var values = [6, 1, 2, 3, 2, 1, 8, 7, 4, 3, 9, 5, 9, 4, 8, 6, 4, 5, 2, 1, 3, 6, 8, 2, 5, 1, 9, 3, 4, 5, 9, 7, 9, 7, 4, 7, 4, 7, 1, 8, 1, 6, 8];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [51, 44, 10, 5, 25, 36, 40, 32, 29, 48, 68, 72, 54, 2, 11, 47, 46, 74, 20, 23, 59, 77, 3, 69, 78, 76, 73, 55, 75, 57, 12, 9, 13, 4, 21, 18, 0, 26, 60, 6, 7, 8, 33];
            var values = [9, 6, 1, 3, 4, 4, 9, 2, 9, 4, 9, 3, 8, 8, 6, 2, 6, 5, 7, 1, 7, 6, 6, 3, 4, 2, 9, 2, 1, 5, 2, 5, 7, 5, 9, 2, 9, 5, 1, 7, 2, 1, 5];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [49, 31, 40, 29, 74, 75, 58, 22, 5, 80, 73, 15, 51, 64, 70];
            var values = [7, 6, 3, 3, 1, 4, 5, 4, 9, 7, 3, 7, 6, 7, 5];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [12, 4, 2, 0, 13, 23, 26, 25, 57, 39, 30, 67, 68, 76, 78, 15, 16, 69, 65, 64, 70, 72, 55, 10, 11, 38, 29, 41, 42, 33, 36, 44, 50, 51, 54, 73, 80, 46, 28, 45, 18, 19, 27, 35, 34, 31, 49, 52, 7];
            var values = [1, 8, 9, 6, 5, 6, 4, 5, 3, 9, 7, 7, 2, 1, 9, 6, 9, 4, 3, 9, 6, 8, 4, 8, 4, 8, 2, 1, 3, 1, 4, 6, 8, 5, 5, 2, 7, 1, 6, 7, 3, 7, 9, 8, 4, 3, 4, 2, 1];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [58, 57, 62, 37, 72, 54, 60];
            var values = [2, 5, 8, 3, 3, 6, 7];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
        });

        QUnit.test("getAction() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            runActions(grid);
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [39, 30, 41, 44, 36, 50, 34, 58, 22, 13, 4];
            var values = [8, 3, 4, 2, 9, 5, 7, 2, 5, 4, 7];

            for (var i = 0; i < indices.length; i++)
            {
                // Run.
                var result = SudokuSolver.getAction(puzzle, 9);

                // Verify.
                assert.ok(result);
                assert.equal(result.index, indices[i]);
                assert.equal(result.value, values[i]);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
            }

            assert.equal(SudokuSolver.isDone(puzzle), true);
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

        QUnit.test("solve() hard 66", function(assert)
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

        QUnit.test("solve() hard 67", function(assert)
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
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "6", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "2", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "8", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "7", "I9");
        });

        QUnit.test("solve() diabolical 86", function(assert)
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
            assert.equal(puzzle[Unit.cellNameToIndex("A1")], "1", "A1");
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "9", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "3", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "2", "I9");
        });

        QUnit.test("solve() diabolical 87", function(assert)
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
            assert.equal(puzzle[Unit.cellNameToIndex("A9")], "4", "A9");
            assert.equal(puzzle[Unit.cellNameToIndex("I1")], "4", "I1");
            assert.equal(puzzle[Unit.cellNameToIndex("I9")], "3", "I9");
        });

        function runActions(grid)
        {
            var puzzle = PuzzleFormat.parse(grid);
            PuzzleFactory.adjustPossibilites(puzzle, 9);
            var indices = [];
            var values = [];
            var result = SudokuSolver.getAction(puzzle, 9);

            while (!SudokuSolver.isDone(puzzle) && result)
            {
                indices.push(result.index);
                values.push(result.value);
                puzzle[result.index] = result.value;
                PuzzleFactory.adjustPossibilites(puzzle, 9);
                result = SudokuSolver.getAction(puzzle, 9);
            }

            LOGGER.info("var indices = [" + indices + "];");
            LOGGER.info("var values = [" + values + "];");
        }
    });
