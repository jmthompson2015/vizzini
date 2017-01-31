define(["GridFactory", "SudokuToGo", "process/Action", "process/PuzzleFactory", "process/Reducer", "process/Selector"],
    function(GridFactory, SudokuToGo, Action, PuzzleFactory, Reducer, Selector)
    {
        "use strict";
        QUnit.module("Selector");

        QUnit.test("n()", function(assert)
        {
            // Setup.
            var store = createStore();
            var n = 3;

            // Run.
            var result = Selector.n(store.getState());

            // Verify.
            assert.equal(result, n);
        });

        QUnit.test("N()", function(assert)
        {
            // Setup.
            var store = createStore();
            var N = 9;

            // Run.
            var result = Selector.N(store.getState());

            // Verify.
            assert.equal(result, N);
        });

        QUnit.test("puzzle()", function(assert)
        {
            // Setup.
            var store = createStore();
            var defaultGrid = GridFactory.createEmpty();
            var defaultPuzzle = PuzzleFactory.create(defaultGrid);

            // Run.
            var result = Selector.puzzle(store.getState());

            // Verify.
            assert.equal(result.join(""), defaultPuzzle.join(""));

            // Run.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            store.dispatch(Action.setPuzzle(puzzle));
            result = Selector.puzzle(store.getState());

            // Verify.
            assert.equal(result, puzzle);
        });

        QUnit.test("selectedIndex()", function(assert)
        {
            // Setup.
            var store = createStore();
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            store.dispatch(Action.setPuzzle(puzzle));

            // Run.
            var result = Selector.selectedIndex(store.getState());

            // Verify.
            assert.equal(result, undefined);

            // Run.
            var selectedIndex = 12;
            store.dispatch(Action.setSelectedIndex(selectedIndex));
            result = Selector.selectedIndex(store.getState());

            // Verify.
            assert.equal(result, selectedIndex);
        });

        QUnit.test("value()", function(assert)
        {
            // Setup.
            var store = createStore();
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFactory.create(grid);
            store.dispatch(Action.setPuzzle(puzzle));
            var index = 18;

            // Run.
            var result = Selector.value(store.getState(), index);

            // Verify.
            assert.equal(result, 9);
        });

        function createStore()
        {
            var store = Redux.createStore(Reducer.root);

            return store;
        }
    });
