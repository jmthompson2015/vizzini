define(["PuzzleFormat", "SudokuToGo", "SudokuWiki", "process/ForwardSearchStrategy", "process/SudokuSolver"],
    function(PuzzleFormat, SudokuToGo, SudokuWiki, ForwardSearchStrategy, SudokuSolver)
    {
        "use strict";
        QUnit.module("ForwardSearchStrategy");

        QUnit.test("getMove() Sudoku To Go 001", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 1);
            assert.equal(result.value(), 1);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 002", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 4);
            assert.equal(result.value(), 5);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 031", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 3);
            assert.equal(result.value(), 3);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 032", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 9);
            assert.equal(result.value(), 5);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 066", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 5);
            assert.equal(result.value(), 9);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 067", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 2);
            assert.equal(result.value(), 9);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 086", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 17);
            assert.equal(result.value(), 4);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 087", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 20);
            assert.equal(result.value(), 4);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.test("getMove() Sudoku To Go 100", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.PUZZLE_100].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = false;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 8);
            assert.equal(result.value(), 9);
            assert.equal(result.source(), "forward search 2");
        });

        QUnit.skip("getMove() Sudoku Wiki Escargot", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.ESCARGOT].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var useForwardSearch = true;
            var solver = new SudokuSolver(useForwardSearch);

            // Run.
            var result = ForwardSearchStrategy.getMove(puzzle, solver);

            // Verify.
            assert.ok(result);
            assert.equal(result.index(), 6);
            assert.equal(result.value(), 4);
            assert.equal(result.source(), "forward search 3");
        });
    });
