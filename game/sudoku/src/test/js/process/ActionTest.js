define(["SudokuToGo", "process/Action", "process/PuzzleFactory"],
    function(SudokuToGo, Action, PuzzleFactory)
    {
        "use strict";
        QUnit.module("Action");

        QUnit.test("setCellValue()", function(assert)
        {
            // Setup.
            var index = 12;
            var value = 8;

            // Run.
            var result = Action.setCellValue(index, value);

            // Verify.
            assert.ok(result);
            assert.equal(result.type, Action.SET_CELL_VALUE);
            assert.equal(result.index, index);
            assert.equal(result.value, value);
        });

        QUnit.test("setPuzzle()", function(assert)
        {
            // Setup.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);

            // Run.
            var result = Action.setPuzzle(puzzle);

            // Verify.
            assert.ok(result);
            assert.equal(result.type, Action.SET_PUZZLE);
            assert.equal(result.puzzle, puzzle);
        });

        QUnit.test("setSelectedIndex()", function(assert)
        {
            // Setup.
            var index = 12;

            // Run.
            var result = Action.setSelectedIndex(index);

            // Verify.
            assert.ok(result);
            assert.equal(result.type, Action.SET_SELECTED_INDEX);
            assert.equal(result.index, index);
        });
    });
