define(["Cell", "Puzzle", "PuzzleFormat", "SudokuToGo", "Unit"],
    function(Cell, Puzzle, PuzzleFormat, SudokuToGo, Unit)
    {
        "use strict";
        QUnit.module("Puzzle");

        QUnit.test("Puzzle()", function(assert)
        {
            // Setup.
            var candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var cells = [];

            for (var i = 0; i < 81; i++)
            {
                cells.push(new Cell.Candidates(candidates));
            }

            // Run.
            var result = new Puzzle(cells);

            // Verify.
            assert.ok(result);
            assert.equal(result.grid(), undefined);
            assert.equal(result.solution(), undefined);
            assert.equal(result.N(), 9);
            assert.equal(result.n(), 3);
            assert.ok(result.cells());
            assert.equal(result.cells().length, 81);

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
            var unit = new Unit(puzzle.N());
            var cell0 = puzzle.cells()[0];
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().length, 9);
            var cell1 = puzzle.cells()[1];
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().length, 9);

            // Run.
            var result = puzzle.adjustCandidates(unit);

            // Verify.
            assert.ok(result);
            cell0 = result.cells()[0];
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().length, 1);
            cell1 = result.cells()[1];
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().length, 2);
        });

        QUnit.test("candidateIndicesInUnit() block 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().BLOCKS[0];

            // Run.
            var result = puzzle.candidateIndicesInUnit(candidate, unit);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 5);
            assert.equal(result.join(","), [0, 1, 9, 10, 19].join(","));
        });

        QUnit.test("candidateIndicesInUnit() column 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().COLUMNS[0];

            // Run.
            var result = puzzle.candidateIndicesInUnit(candidate, unit);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 4);
            assert.equal(result.join(","), [0, 9, 27, 36].join(","));
        });

        QUnit.test("candidateIndicesInUnit() row 0", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var candidate = 6;
            var unit = puzzle.unit().ROWS[0];

            // Run.
            var result = puzzle.candidateIndicesInUnit(candidate, unit);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 5);
            assert.equal(result.join(","), [0, 1, 3, 4, 6].join(","));
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
            // LOGGER.info("result = " + result);
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
            // LOGGER.info("result = " + result);
            assert.equal(result.length, 0);

            // Run.
            puzzle = puzzle.withCell(index, new Cell.Value(6));
            result = puzzle.conflictIndices(puzzle.get(index));

            // Verify.
            assert.ok(result);
            // LOGGER.info("result = " + result);
            var expected = [2, 19, 24, 46];
            assert.equal(result.length, expected.length);
            expected.forEach(function(index, i)
            {
                assert.equal(result[i], index);
            });
        });

        QUnit.test("findCellsWithCandidateLength() 2", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

            // Run.
            var result = puzzle.findCellsWithCandidateLength(2);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 0);

            // Run.
            puzzle = puzzle.adjustCandidates();
            result = puzzle.findCellsWithCandidateLength(2);

            // Verify.
            assert.ok(result);
            assert.equal(result.length, 14);
        });

        QUnit.test("removeValueFromPeers()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            var index = 2;
            var cell0 = puzzle.cells()[0];
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().length, 9);
            assert.ok(cell0.candidates().includes(6));
            var cell1 = puzzle.cells()[1];
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().length, 9);
            assert.ok(cell1.candidates().includes(6));

            // Run.
            var result = puzzle.removeValueFromPeers(index);

            // Verify.
            assert.ok(result);
            cell0 = result.cells()[0];
            assert.equal(cell0.isCandidates, true);
            assert.equal(cell0.candidates().length, 8);
            assert.ok(!cell0.candidates().includes(6));
            cell1 = result.cells()[1];
            assert.equal(cell1.isCandidates, true);
            assert.equal(cell1.candidates().length, 8);
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
            // LOGGER.info("result = " + result);
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
            // LOGGER.info("result = " + result);
            var expected = [2, 24, 35, 46, 57, 72];
            assert.equal(result.length, expected.length);
            expected.forEach(function(index, i)
            {
                assert.equal(result[i], index);
            });
        });

        QUnit.test("withCandidate()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            var index = 3;
            var candidate = 4;
            var cell = puzzle.get(index);
            assert.equal(cell.candidates().length, 3);
            assert.equal(cell.candidates().includes(2), true);
            assert.equal(cell.candidates().includes(3), true);
            assert.equal(cell.candidates().includes(4), false);
            assert.equal(cell.candidates().includes(5), true);

            // Run.
            var result = puzzle.withCandidate(index, candidate);

            // Verify.
            assert.ok(result);
            cell = result.get(index);
            assert.equal(cell.candidates().length, 4);
            assert.equal(cell.candidates().includes(2), true);
            assert.equal(cell.candidates().includes(3), true);
            assert.equal(cell.candidates().includes(4), true);
            assert.equal(cell.candidates().includes(5), true);
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
            assert.equal(cell0.candidates().length, 9);
            assert.equal(cell0.candidates().includes(6), true);
            assert.equal(cell0.candidates().includes(8), true);

            // Run.
            var result = puzzle.withoutCandidate(index, candidate);

            // Verify.
            assert.ok(result);
            cell0 = result.get(0);
            assert.equal(cell0.candidates().length, 8);
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
            assert.equal(cell0.candidates().length, 9);
            assert.equal(cell0.candidates().includes(6), true);
            assert.equal(cell0.candidates().includes(8), true);
            var cell1 = puzzle.get(1);
            assert.equal(cell1.candidates().length, 9);
            assert.equal(cell1.candidates().includes(6), true);
            assert.equal(cell1.candidates().includes(8), true);

            // Run.
            var result = puzzle.withoutCandidates(indices, candidates);

            // Verify.
            assert.ok(result);
            cell0 = result.get(0);
            assert.equal(cell0.candidates().length, 7);
            assert.equal(cell0.candidates().includes(6), false);
            assert.equal(cell0.candidates().includes(8), false);
            cell1 = result.get(1);
            assert.equal(cell1.candidates().length, 7);
            assert.equal(cell1.candidates().includes(6), false);
            assert.equal(cell1.candidates().includes(8), false);
        });

        function createBlankPuzzle()
        {
            var candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var cells = [];

            for (var i = 0; i < 81; i++)
            {
                cells.push(new Cell.Candidates(candidates));
            }

            return new Puzzle(cells);
        }
    });
