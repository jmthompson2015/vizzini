define(["Cell", "Puzzle", "PuzzleFormat", "SudokuToGo"],
    function(Cell, Puzzle, PuzzleFormat, SudokuToGo)
    {
        "use strict";
        QUnit.module("Puzzle");

        QUnit.test("Puzzle()", function(assert)
        {
            // Setup.
            var candidates = Immutable.List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
            var myCells = [];

            for (var i = 0; i < 81; i++)
            {
                myCells.push(new Cell.Candidates(candidates));
            }

            var cells = Immutable.List(myCells);

            // Run.
            var result = new Puzzle(cells);

            // Verify.
            assert.ok(result);
            assert.equal(result.grid(), undefined);
            assert.equal(result.solution(), undefined);
            assert.equal(result.N(), 9);
            assert.equal(result.n(), 3);
            assert.ok(result.cells());
            assert.equal(result.cells().size, 81);

            var cell0 = result.get(0);
            assert.ok(cell0);
            assert.ok(cell0.candidates);
            assert.equal(cell0.candidates(), candidates);
        });

        QUnit.test("adjustCandidates()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var cell0 = puzzle.cells().get(0);
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().size, 9);
            var cell1 = puzzle.cells().get(1);
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().size, 9);

            // Run.
            var result = puzzle.adjustCandidates();

            // Verify.
            assert.ok(result);
            cell0 = result.cells().get(0);
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().size, 1);
            cell1 = result.cells().get(1);
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().size, 2);
        });

        QUnit.test("clueIndices()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = puzzle.clueIndices();

            // Verify.
            assert.ok(result);
            LOGGER.info("result = " + result);
            var expected = [2, 5, 7, 8, 11, 15, 17, 18, 20, 21, 23, 24, 26, 28, 30, 34, 35, 45, 46, 50, 52, 54, 56, 57, 59, 60, 62, 63, 65, 69, 72, 73, 75, 78];
            assert.equal(result.length, expected.length);
            expected.forEach(function(index, i)
            {
                assert.equal(result[i], index);
            });
        });

        QUnit.test("conflictIndices()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var index = 19;

            // Run.
            var result = puzzle.conflictIndices(puzzle.get(index));

            // Verify.
            assert.ok(result);
            LOGGER.info("result = " + result);
            assert.equal(result.length, 0);

            // Run.
            puzzle = puzzle.withCell(index, new Cell.Value(6));
            result = puzzle.conflictIndices(puzzle.get(index));

            // Verify.
            assert.ok(result);
            LOGGER.info("result = " + result);
            var expected = [2, 19, 24, 46];
            assert.equal(result.length, expected.length);
            expected.forEach(function(index, i)
            {
                assert.equal(result[i], index);
            });
        });

        QUnit.test("removeValueFromPeers()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var index = 2;
            var cell0 = puzzle.cells().get(0);
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().size, 9);
            assert.ok(cell0.candidates().includes(6));
            var cell1 = puzzle.cells().get(1);
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().size, 9);
            assert.ok(cell1.candidates().includes(6));

            // Run.
            var result = puzzle.removeValueFromPeers(index);

            // Verify.
            assert.ok(result);
            cell0 = result.cells().get(0);
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().size, 8);
            assert.ok(!cell0.candidates().includes(6));
            cell1 = result.cells().get(1);
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().size, 8);
            assert.ok(!cell1.candidates().includes(6));
        });

        QUnit.test("sameCandidateIndices()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var index = 2;

            // Run.
            var result = puzzle.sameCandidateIndices(puzzle.get(index));

            // Verify.
            assert.ok(result);
            LOGGER.info("result = " + result);
            var expected = [13, 14, 40, 41, 70];
            assert.equal(result.length, expected.length);
            expected.forEach(function(index, i)
            {
                assert.equal(result[i], index);
            });
        });

        QUnit.test("sameValueIndices()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var index = 2;

            // Run.
            var result = puzzle.sameValueIndices(puzzle.get(index));

            // Verify.
            assert.ok(result);
            LOGGER.info("result = " + result);
            var expected = [2, 24, 35, 46, 57, 72];
            assert.equal(result.length, expected.length);
            expected.forEach(function(index, i)
            {
                assert.equal(result[i], index);
            });
        });

        QUnit.test("withCell()", function(assert)
        {
            // Setup.
            var puzzle = createBlankPuzzle();
            var index = 3;
            var cell = new Cell.Value(8);
            assert.equal(puzzle.get(index).candidates().join(""), "123456789");

            // Run.
            var result = puzzle.withCell(index, cell);

            // Verify.
            assert.ok(result);
            assert.equal(result.get(index).value(), 8);
        });

        QUnit.test("withCells()", function(assert)
        {
            // Setup.
            var puzzle = createBlankPuzzle();
            var indices = [1, 2, 3, 8];
            var values = [4, 3, 2, 1];
            var cells = [];
            var i;

            for (i = 0; i < values.length; i++)
            {
                cells.push(new Cell.Value(values[i]));
            }

            // Run.
            var result = puzzle.withCells(indices, cells);

            // Verify.
            assert.ok(result);

            for (i = 0; i < indices.length; i++)
            {
                var cell = result.get(indices[i]);
                assert.ok(cell);
                assert.ok(cell.value);
                assert.equal(cell.value(), values[i]);
            }
        });

        QUnit.test("withoutCandidate()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var index = 0;
            var candidate = 6;
            var cell0 = puzzle.get(0);
            assert.equal(cell0.candidates().size, 9);
            assert.equal(cell0.candidates().includes(6), true);
            assert.equal(cell0.candidates().includes(8), true);

            // Run.
            var result = puzzle.withoutCandidate(index, candidate);

            // Verify.
            assert.ok(result);
            cell0 = result.get(0);
            assert.equal(cell0.candidates().size, 8);
            assert.equal(cell0.candidates().includes(6), false);
        });

        QUnit.test("withoutCandidates()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var indices = [0, 1];
            var candidates = [6, 8];
            var cell0 = puzzle.get(0);
            assert.equal(cell0.candidates().size, 9);
            assert.equal(cell0.candidates().includes(6), true);
            assert.equal(cell0.candidates().includes(8), true);
            var cell1 = puzzle.get(1);
            assert.equal(cell1.candidates().size, 9);
            assert.equal(cell1.candidates().includes(6), true);
            assert.equal(cell1.candidates().includes(8), true);

            // Run.
            var result = puzzle.withoutCandidates(indices, candidates);

            // Verify.
            assert.ok(result);
            cell0 = result.get(0);
            assert.equal(cell0.candidates().size, 7);
            assert.equal(cell0.candidates().includes(6), false);
            assert.equal(cell0.candidates().includes(8), false);
            cell1 = result.get(1);
            assert.equal(cell1.candidates().size, 7);
            assert.equal(cell1.candidates().includes(6), false);
            assert.equal(cell1.candidates().includes(8), false);
        });

        function createBlankPuzzle()
        {
            var candidates = Immutable.List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
            var myCells = [];

            for (var i = 0; i < 81; i++)
            {
                myCells.push(new Cell.Candidates(candidates));
            }

            var cells = Immutable.List(myCells);

            return new Puzzle(cells);
        }
    });
