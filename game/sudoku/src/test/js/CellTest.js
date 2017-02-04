define(["Cell"],
    function(Cell)
    {
        "use strict";
        QUnit.module("Cell");

        QUnit.test("Cell.Candidates()", function(assert)
        {
            // Setup.
            var candidates = Immutable.List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

            // Run.
            var result = new Cell.Candidates(candidates);

            // Verify.
            assert.ok(result);
            assert.ok(result.isCandidates);
            assert.ok(!result.isValue);
            assert.ok(result.candidates());
            assert.equal(result.candidates().size, 9);
        });

        QUnit.test("Cell.Candidates.withCandidate()", function(assert)
        {
            // Setup.
            var candidates = Immutable.List.of(4, 5, 6);
            var cell = new Cell.Candidates(candidates);

            // Run.
            var result = cell.withCandidate(1);

            // Verify.
            assert.ok(result);
            assert.ok(result.isCandidates);
            assert.ok(!result.isValue);
            assert.ok(result.candidates());
            assert.equal(result.candidates().size, 4);
            assert.equal(result.candidates().get(0), 1);
            assert.equal(result.candidates().get(1), 4);
            assert.equal(result.candidates().get(2), 5);
            assert.equal(result.candidates().get(3), 6);
        });

        QUnit.test("Cell.Candidates.withoutCandidate()", function(assert)
        {
            // Setup.
            var candidates = Immutable.List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
            var cell = new Cell.Candidates(candidates);

            // Run.
            var result = cell.withoutCandidate(8);

            // Verify.
            assert.ok(result);
            assert.ok(result.isCandidates);
            assert.ok(!result.isValue);
            assert.ok(result.candidates());
            assert.equal(result.candidates().size, 8);
            assert.equal(result.candidates().get(6), 7);
            assert.equal(result.candidates().get(7), 9);
        });

        QUnit.test("Cell.Candidates.withoutCandidate() missing", function(assert)
        {
            // Setup.
            var candidates = Immutable.List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
            var cell = new Cell.Candidates(candidates);

            // Run.
            var result = cell.withoutCandidate(12);

            // Verify.
            assert.ok(result);
            assert.ok(result.isCandidates);
            assert.ok(!result.isValue);
            assert.ok(result.candidates());
            assert.equal(result.candidates().size, 9);
            assert.equal(result.candidates().get(6), 7);
            assert.equal(result.candidates().get(7), 8);
            assert.equal(result.candidates().get(8), 9);
        });

        QUnit.test("Cell.Candidates.withoutCandidates()", function(assert)
        {
            // Setup.
            var candidates = Immutable.List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
            var cell = new Cell.Candidates(candidates);

            // Run.
            var result = cell.withoutCandidates([6, 8]);

            // Verify.
            assert.ok(result);
            assert.ok(result.isCandidates);
            assert.ok(!result.isValue);
            assert.ok(result.candidates());
            assert.equal(result.candidates().size, 7);
            assert.equal(result.candidates().get(4), 5);
            assert.equal(result.candidates().get(5), 7);
            assert.equal(result.candidates().get(6), 9);
        });

        QUnit.test("Cell.Value()", function(assert)
        {
            // Setup.
            var value = 8;
            var isClue = true;

            // Run.
            var result = new Cell.Value(value, isClue);

            // Verify.
            assert.ok(result);
            assert.ok(!result.isCandidates);
            assert.ok(result.isValue);
            assert.equal(result.value(), 8);
            assert.equal(result.isClue(), true);
        });
    });
