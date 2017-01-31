define(["GridFactory", "PuzzleFormat", "SudokuToGo", "process/Action", "process/Reducer", "process/Selector"],
    function(GridFactory, PuzzleFormat, SudokuToGo, Action, Reducer, Selector)
    {
        "use strict";
        QUnit.module("Selector");

        QUnit.test("candidates()", function(assert)
        {
            // Setup.
            var store = createStore();
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            store.dispatch(Action.setPuzzle(puzzle));
            var index = 1;

            // Run.
            var result = Selector.candidates(store.getState(), index);

            // Verify.
            assert.equal(result.size, 2);
        });

        QUnit.test("puzzle()", function(assert)
        {
            // Setup.
            var store = createStore();
            var defaultGrid = GridFactory.createEmpty();
            var defaultPuzzle = PuzzleFormat.parse(defaultGrid);
            defaultPuzzle = defaultPuzzle.adjustCandidates();

            // Run.
            var result = Selector.puzzle(store.getState());

            // Verify.
            assert.equal(PuzzleFormat.format(result), PuzzleFormat.format(defaultPuzzle));

            // Run.
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
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
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
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
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
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
