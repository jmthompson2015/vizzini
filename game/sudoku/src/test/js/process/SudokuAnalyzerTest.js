define(["PuzzleFormat", "SudokuToGo", "SudokuWiki", "process/SudokuAnalyzer"],
    function(PuzzleFormat, SudokuToGo, SudokuWiki, SudokuAnalyzer)
    {
        "use strict";
        QUnit.module("SudokuAnalyzer");

        QUnit.test("analyze() easy 1", function(assert)
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

        QUnit.test("analyze() hard 66", function(assert)
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

        QUnit.test("analyze() diabolical 87", function(assert)
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

        QUnit.test("analyze() Escargot", function(assert)
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
            assert.equal(result.emptyCount, 57);
            assert.ok(!result.isSolved);

            assert.ok(result.moves);
            assert.equal(result.moves.length, 0);

            assert.ok(result.solvedGrid);
            assert.ok(result.solvedPuzzle);

            assert.ok(result.sourceCounts);
            assert.equal(Object.keys(result.sourceCounts).length, 0);
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
                LOGGER.info(message);
            }

            assert.expect(0);
        });
    });
