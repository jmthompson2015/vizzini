define(["Difficulty", "PuzzleFormat", "SudokuToGo", "SudokuWiki", "process/SudokuAnalyzer"],
    function(Difficulty, PuzzleFormat, SudokuToGo, SudokuWiki, SudokuAnalyzer)
    {
        "use strict";
        QUnit.module("SudokuAnalyzer");

        QUnit.test("analyze() Sudoku To Go 01", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 34);
            assert.equal(result.difficulty, Difficulty.EASY);
            assert.equal(result.emptyCount, 47);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 47);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 1);
            assert.equal(result.sourceCounts["naked single"], 47);
        });

        QUnit.test("analyze() Sudoku To Go 02", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_2].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 33);
            assert.equal(result.difficulty, Difficulty.EASY);
            assert.equal(result.emptyCount, 48);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 48);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 1);
            assert.equal(result.sourceCounts["naked single"], 48);
        });

        QUnit.test("analyze() Sudoku To Go 31", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_31].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 30);
            assert.equal(result.difficulty, Difficulty.EASY);
            assert.equal(result.emptyCount, 51);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 51);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 1);
            assert.equal(result.sourceCounts["naked single"], 51);
        });

        QUnit.test("analyze() Sudoku To Go 32", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.MEDIUM_32].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 32);
            assert.equal(result.difficulty, Difficulty.MEDIUM);
            assert.equal(result.emptyCount, 49);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 49);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 2);
            assert.equal(result.sourceCounts["naked single"], 36);
            assert.equal(result.sourceCounts["hidden single"], 13);
        });

        QUnit.test("analyze() Sudoku To Go 66", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_66].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 28);
            assert.equal(result.difficulty, Difficulty.DEVIOUS);
            assert.equal(result.emptyCount, 53);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 55);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 3);
            assert.equal(result.sourceCounts["naked single"], 44);
            assert.equal(result.sourceCounts["hidden single"], 9);
            assert.equal(result.sourceCounts["hidden pair"], 2);
        });

        QUnit.test("analyze() Sudoku To Go 67", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.HARD_67].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 27);
            assert.equal(result.difficulty, Difficulty.MEDIUM);
            assert.equal(result.emptyCount, 54);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 54);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 2);
            assert.equal(result.sourceCounts["naked single"], 50);
            assert.equal(result.sourceCounts["hidden single"], 4);
        });

        QUnit.test("analyze() Sudoku To Go 86", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_86].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 26);
            assert.equal(result.difficulty, Difficulty.HARD);
            assert.equal(result.emptyCount, 55);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 56);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 3);
            assert.equal(result.sourceCounts["naked single"], 40);
            assert.equal(result.sourceCounts["hidden single"], 15);
            assert.equal(result.sourceCounts["naked pair"], 1);
        });

        QUnit.test("analyze() Sudoku To Go 87", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.DIABOLICAL_87].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 25);
            assert.equal(result.difficulty, Difficulty.DEVIOUS);
            assert.equal(result.emptyCount, 56);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 59);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 4);
            assert.equal(result.sourceCounts["naked single"], 50);
            assert.equal(result.sourceCounts["hidden single"], 6);
            assert.equal(result.sourceCounts["naked pair"], 2);
            assert.equal(result.sourceCounts["hidden pair"], 1);
        });

        QUnit.test("analyze() Sudoku To Go 100", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.PUZZLE_100].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 24);
            assert.equal(result.difficulty, Difficulty.DIABOLICAL);
            assert.equal(result.emptyCount, 57);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 61);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 5);
            assert.equal(result.sourceCounts["naked single"], 40);
            assert.equal(result.sourceCounts["hidden single"], 16);
            assert.equal(result.sourceCounts["naked pair"], 1);
            assert.equal(result.sourceCounts["hidden pair"], 3);
            assert.equal(result.sourceCounts["forward search 2"], 1);
        });

        QUnit.skip("analyze() Escargot", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.ESCARGOT].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 24);
            assert.equal(result.difficulty, Difficulty.DIABOLICAL);
            assert.equal(result.emptyCount, 57);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 60);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 6);
        });

        QUnit.skip("analyze() Arto Inkala's Puzzle", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.ARTO_INKALAS_PUZZLE].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 21);
            assert.equal(result.difficulty, Difficulty.DIABOLICAL);
            assert.equal(result.emptyCount, 60);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 64);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 6);
        });

        QUnit.skip("analyze() Unsolvable #49", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.UNSOLVABLE_49].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 22);
            assert.equal(result.difficulty, Difficulty.DIABOLICAL);
            assert.equal(result.emptyCount, 59);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 59);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 4);
        });

        QUnit.skip("analyze() Unsolvable #28", function(assert)
        {
            // Setup.
            var grid = SudokuWiki.properties[SudokuWiki.UNSOLVABLE_28].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();

            // Run.
            var result = SudokuAnalyzer.analyze(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.clueCount, 22);
            assert.equal(result.difficulty, Difficulty.DIABOLICAL);
            assert.equal(result.emptyCount, 59);
            assert.ok(result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 73);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 6);
        });

        QUnit.test("statistics", function(assert)
        {
            var values = SudokuToGo.values();

            values.forEach(function(value)
            {
                var name = SudokuToGo.properties[value].name;
                var grid = SudokuToGo.properties[value].grid;
                var puzzle = PuzzleFormat.parse(grid);
                puzzle = puzzle.adjustCandidates();
                var analysis = SudokuAnalyzer.analyze(puzzle);
                print(name, analysis);
            });

            values = SudokuWiki.values();

            values.forEach(function(value)
            {
                var name = SudokuWiki.properties[value].name;
                var grid = SudokuWiki.properties[value].grid;
                var puzzle = PuzzleFormat.parse(grid);
                puzzle = puzzle.adjustCandidates();
                var analysis = SudokuAnalyzer.analyze(puzzle);
                print(name, analysis);
            });

            function print(name, analysis)
            {
                var message = analysis.emptyCount;
                message += " " + analysis.clueCount;
                message += " " + analysis.moves.length;
                message += " " + name;
                message += " " + JSON.stringify(analysis.sourceCounts);
                message += " " + Difficulty.properties[analysis.difficulty].name;
                LOGGER.info(message);
            }

            assert.expect(0);
        });
    });
