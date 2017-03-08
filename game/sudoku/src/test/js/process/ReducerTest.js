define(["PuzzleFormat", "SudokuToGo", "process/Action", "process/Reducer"],
    function(PuzzleFormat, SudokuToGo, Action, Reducer)
    {
        "use strict";
        QUnit.module("Reducer");

        QUnit.test("addCellCandidate()", function(assert)
        {
            // Setup.
            var store = createStore();
            var index = 3;
            var candidate = 4;
            assert.equal(store.getState().puzzle.get(index).candidates().length, 3);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidate), false);

            // Run.
            store.dispatch(Action.addCellCandidate(index, candidate));

            // Verify.
            assert.equal(store.getState().puzzle.get(index).candidates().length, 4);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidate), true);
        });

        QUnit.test("batchRemoveCandidates()", function(assert)
        {
            // Setup.
            var store = createStore();
            var index = 43;
            var indices = [index];
            var candidates = [3, 8];
            assert.equal(store.getState().puzzle.get(index).candidates().length, 5);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidates[0]), true);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidates[1]), true);

            // Run.
            store.dispatch(Action.batchRemoveCandidates(indices, candidates));

            // Verify.
            assert.equal(store.getState().puzzle.get(index).candidates().length, 3);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidates[0]), false);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidates[1]), false);
        });

        QUnit.test("removeCellCandidate()", function(assert)
        {
            // Setup.
            var store = createStore();
            var index = 4;
            var candidate = 5;
            assert.equal(store.getState().puzzle.get(index).candidates().length, 4);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidate), true);

            // Run.
            store.dispatch(Action.removeCellCandidate(index, candidate));

            // Verify.
            assert.equal(store.getState().puzzle.get(index).candidates().length, 3);
            assert.equal(store.getState().puzzle.get(index).candidates().includes(candidate), false);
        });

        QUnit.test("setCellValue()", function(assert)
        {
            // Setup.
            var store = createStore();
            var index = 0;
            var value = 6;

            // Run.
            store.dispatch(Action.setCellValue(index, value));

            // Verify.
            assert.equal(store.getState().puzzle.get(index).value(), value);
        });

        QUnit.test("setPuzzle()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var grid = SudokuToGo.properties[SudokuToGo.EASY_1].grid;
            var puzzle = PuzzleFormat.parse(grid);

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
            var puzzle = PuzzleFormat.parse(grid);
            puzzle = puzzle.adjustCandidates();
            store.dispatch(Action.setPuzzle(puzzle));

            return store;
        }
    });
