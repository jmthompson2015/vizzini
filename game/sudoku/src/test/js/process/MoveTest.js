define(["PuzzleFormat", "SudokuToGo", "process/Move"],
    function(PuzzleFormat, SudokuToGo, Move)
    {
        "use strict";
        QUnit.module("Move");

        QUnit.test("batchRemoveCandidates()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var N = Math.sqrt(puzzle.length);
            var indices = [4];
            var candidates = [5];
            var source = "test";
            var move = new Move.BatchRemoveCandidates(puzzle, indices, candidates, source);
            assert.equal(puzzle.get(indices[0]).candidates().size, 4);
            assert.equal(puzzle.get(indices[0]).candidates().includes(candidates[0]), true);

            // Run.
            var result = move.execute();

            // Verify.
            assert.ok(result);
            assert.equal(result.get(indices[0]).candidates().size, 3);
            assert.equal(result.get(indices[0]).candidates().includes(candidates[0]), false);
        });

        QUnit.test("removeCellCandidate()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var N = Math.sqrt(puzzle.length);
            var index = 4;
            var candidate = 5;
            var source = "test";
            var move = new Move.RemoveCellCandidate(puzzle, index, candidate, source);
            assert.equal(puzzle.get(index).candidates().size, 4);
            assert.equal(puzzle.get(index).candidates().includes(candidate), true);

            // Run.
            var result = move.execute();

            // Verify.
            assert.equal(result.get(index).candidates().size, 3);
            assert.equal(result.get(index).candidates().includes(candidate), false);
        });

        QUnit.test("setCellValue()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var index = 12;
            var value = 8;
            var source = "test";
            var move = new Move.SetCellValue(puzzle, index, value, source);
            assert.equal(puzzle.get(index).isCandidates, true);
            assert.equal(puzzle.get(index).candidates().size, 3);

            // Run.
            var result = move.execute();

            // Verify.
            assert.equal(result.get(index).isValue, true);
            assert.equal(result.get(index).value(), value);
        });
    });
