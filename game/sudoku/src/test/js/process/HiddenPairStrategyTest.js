define(["Cell", "PuzzleFormat", "SudokuToGo", "process/Move", "process/Strategy"],
    function(Cell, PuzzleFormat, SudokuToGo, Move, Strategy)
    {
        "use strict";
        QUnit.module("Strategy.HiddenPair");

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

        QUnit.test("HiddenPair.getMove() medium 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [6, 26].join(","));
            assert.equal(result.candidates().join(","), [1, 2, 3, 5, 6, 8, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });

        QUnit.test("HiddenPair.getMove() medium 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [33, 34].join(","));
            assert.equal(result.candidates().join(","), [1, 2, 3, 4, 6, 8, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });

        QUnit.test("HiddenPair.getMove() hard 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [39, 41].join(","));
            assert.equal(result.candidates().join(","), [2, 3, 4, 5, 6, 7, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });

        QUnit.test("HiddenPair.getMove() hard 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [18, 19].join(","));
            assert.equal(result.candidates().join(","), [1, 2, 4, 5, 6, 8, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });

        QUnit.test("HiddenPair.getMove() diabolical 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [2, 11].join(","));
            assert.equal(result.candidates().join(","), [1, 2, 4, 6, 7, 8, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });

        QUnit.test("HiddenPair.getMove() diabolical 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = Strategy.HiddenPair.getMove(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.indices().join(","), [67, 76].join(","));
            assert.equal(result.candidates().join(","), [1, 2, 4, 5, 6, 7, 9].join(","));
            assert.equal(result.source(), "hidden pair");
        });
    });
