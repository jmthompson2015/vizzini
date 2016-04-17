define([ "game/Selector", "../../../test/js/game/TestData" ], function(Selector, TestData)
{
    "use strict";
    QUnit.module("Selector");

    QUnit.test("allies()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state = store.getState();

        // Run.
        var result = Selector.allies(state, state.agents[0].handIds);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 6);
    });

    QUnit.test("enemies() engagement area", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state = store.getState();

        // Run.
        var result = Selector.enemies(state, state.agents[0].engagementAreaIds);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
    });

    QUnit.test("enemies() staging area", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state = store.getState();

        // Run.
        var result = Selector.enemies(state, state.stagingAreaIds);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
    });

    QUnit.test("heroes()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state = store.getState();

        // Run.
        var result = Selector.heroes(state, state.agents[0].playAreaIds);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 3);
    });

    QUnit.test("locations() staging area", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state = store.getState();

        // Run.
        var result = Selector.locations(state, state.stagingAreaIds);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
    });
});
