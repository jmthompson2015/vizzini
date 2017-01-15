define(["PuzzleFactory", "SudokuToGo", "process/Action", "process/Reducer"],
    function(PuzzleFactory, SudokuToGo, Action, Reducer)
    {
        "use strict";
        QUnit.module("Reducer");

        QUnit.test("setCellValue()", function(assert)
        {
            // Setup.
            var store = createStore();
            var index = 0;
            var value = 6;

            // Run.
            store.dispatch(Action.setCellValue(index, value));

            // Verify.
            assert.equal(store.getState().puzzle[index], value);
        });

        QUnit.test("setPuzzle()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);

            // Run.
            store.dispatch(Action.setPuzzle(puzzle));

            // Verify.
            assert.equal(store.getState().puzzle, puzzle);
        });

        QUnit.test("setSelectedIndex()", function(assert)
        {
            // Setup.
            var store = createStore();
            var index = 0;

            // Run.
            store.dispatch(Action.setSelectedIndex(index));

            // Verify.
            assert.equal(store.getState().selectedIndex, index);
        });

        function createStore()
        {
            var store = Redux.createStore(Reducer.root);
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            store.dispatch(Action.setPuzzle(puzzle));

            return store;
        }
    });
