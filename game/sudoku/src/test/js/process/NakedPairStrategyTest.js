define(["Cell", "PuzzleFormat", "SudokuToGo", "process/Move", "process/Strategy"],
    function(Cell, PuzzleFormat, SudokuToGo, Move, Strategy)
    {
        "use strict";
        QUnit.module("Strategy.NakedPair");

        QUnit.test("findNakedPairMove() diabolical 86", function(assert)
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
            assert.equal(result.indices().join(","), [2, 11, 20].join(","));
            assert.equal(result.candidates().join(","), [4, 9].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("findNakedPairMove() diabolical 87", function(assert)
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
            assert.equal(result.indices().join(","), [6, 7, 8, 24].join(","));
            assert.equal(result.candidates().join(","), [5, 6].join(","));
            assert.equal(result.source(), "naked pair");

            // Run.
            puzzle = result.execute();
            peers = puzzle.unit().getRowPeers(index);
            result = Strategy.NakedPair.findNakedPairMove(puzzle, index, peers);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [10, 12].join(","));
            assert.equal(result.candidates().join(","), [5, 6].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() easy 1", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [43].join(","));
            assert.equal(result.candidates().join(","), [3, 8].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() easy 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [17, 26].join(","));
            assert.equal(result.candidates().join(","), [2, 4].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [54, 74].join(","));
            assert.equal(result.candidates().join(","), [4, 9].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [33].join(","));
            assert.equal(result.candidates().join(","), [2, 9].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [31, 40, 49].join(","));
            assert.equal(result.candidates().join(","), [4, 5].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [30, 31, 39, 49].join(","));
            assert.equal(result.candidates().join(","), [1, 8].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.NakedPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [2, 11, 20].join(","));
            assert.equal(result.candidates().join(","), [4, 9].join(","));
            assert.equal(result.source(), "naked pair");
        });

        QUnit.test("getMove() diabolical 87", function(assert)
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
            assert.equal(result.indices().join(","), [6, 7, 8, 24].join(","));
            assert.equal(result.candidates().join(","), [5, 6].join(","));
            assert.equal(result.source(), "naked pair");
        });
    });
