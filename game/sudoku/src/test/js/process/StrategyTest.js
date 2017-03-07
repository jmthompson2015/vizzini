define(["Cell", "PuzzleFormat", "SudokuToGo", "process/Move", "process/Strategy"],
    function(Cell, PuzzleFormat, SudokuToGo, Move, Strategy)
    {
        "use strict";
        QUnit.module("Strategy");

        QUnit.test("HiddenPair.getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [29, 38].join(","));
            assert.equal(result.candidates().join(","), [1, 3, 4, 5, 6, 7, 8].join(","));
            assert.equal(result.source(), "hidden pair");
        });

        QUnit.test("HiddenPair.getMove() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [66, 68].join(","));
            assert.equal(result.candidates().join(","), [1, 2, 3, 4, 5, 7, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });

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

        QUnit.test("NakedPair.findNakedPairMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var index = 18;
            var peers = puzzle.unit().getBlockPeers(index);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.findNakedPairMove(puzzle, index, peers);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(""), [2, 11, 20].join(""));
            assert.equal(result.candidates().join(""), [4, 9].join(""));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("NakedPair.findNakedPairMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var index = 16;
            var peers = puzzle.unit().getBlockPeers(index);
            puzzle = puzzle.adjustCandidates();
            var indices = [39, 30, 41, 44, 36, 50, 34, 58, 22, 13, 4, -1, -1, 7, 8, 35, 53, 17, 16, 52, 51, 33, 61, 70, 63, 80, 69, 68, 64, 28, 27, 29, 67, 72, 56, 59, 5, 60, 73, 74, 75, 76, 77, 78, 20, 19, 21, 12, 3, 11, 10, 0, 2, 6, 24, 45, 46, 47];
            var values = [8, 3, 4, 2, 9, 5, 7, 2, 5, 4, 7, -1, -1, 8, 4, 1, 6, 5, 6, 4, 8, 9, 9, 5, 6, 3, 1, 9, 8, 4, 5, 8, 3, 4, 7, 6, 1, 4, 9, 5, 1, 8, 7, 6, 4, 6, 2, 9, 6, 1, 2, 3, 9, 2, 3, 2, 1, 3];
            for (var i = 0; i < 11; i++)
            {
                puzzle = puzzle.withCell(indices[i], new Cell.Value(values[i]));
            }
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.findNakedPairMove(puzzle, index, peers);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(""), [6, 7, 8, 24].join(""));
            assert.equal(result.candidates().join(""), [5, 6].join(""));
            assert.equal(result.source(), "naked pair");

            // Run.
            puzzle = result.execute();
            peers = puzzle.unit().getRowPeers(index);
            result = Strategy.NakedPair.findNakedPairMove(puzzle, index, peers);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(""), [10, 12].join(""));
            assert.equal(result.candidates().join(""), [5, 6].join(""));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("NakedPair.getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(""), [2, 11, 20].join(""));
            assert.equal(result.candidates().join(""), [4, 9].join(""));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("NakedPair.getMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var indices = [39, 30, 41, 44, 36, 50, 34, 58, 22, 13, 4];
            var values = [8, 3, 4, 2, 9, 5, 7, 2, 5, 4, 7];
            for (var i = 0; i < indices.length; i++)
            {
                var move = new Move.SetCellValue(puzzle, indices[i], values[i], "naked single");
                puzzle = move.execute();
            }

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(""), [6, 7, 8, 24].join(""));
            assert.equal(result.candidates().join(""), [5, 6].join(""));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("NakedSingle.getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 0);
            assert.equal(result.value(), 3);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("NakedSingle.getMove() easy 1 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.equal(result, undefined);

            // Run.
            puzzle = puzzle.withCell(0, new Cell.Value(3));
            puzzle = puzzle.adjustCandidates();
            result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 6);
            assert.equal(result.value(), 2);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("NakedSingle.getMove() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 6);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("NakedSingle.getMove() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 10);
            assert.equal(result.value(), 6);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("NakedSingle.getMove() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 51);
            assert.equal(result.value(), 9);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("NakedSingle.getMove() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(!result);
        });

        QUnit.test("NakedSingle.getMove() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 12);
            assert.equal(result.value(), 1);
            assert.equal(result.source(), "naked single");
        });

        QUnit.test("NakedSingle.getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(!result);
        });

        QUnit.test("NakedSingle.getMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedSingle.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 39);
            assert.equal(result.value(), 8);
            assert.equal(result.source(), "naked single");
        });
    });
