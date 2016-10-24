define(["Team", "pilotstats/Action", "pilotstats/EntityFilter", "pilotstats/RangeFilter"], function(Team, Action, EntityFilter, RangeFilter)
{
    "use strict";
    QUnit.module("Action");

    QUnit.test("removeFilters()", function(assert)
    {
        // Setup.
        var filter = createRangeFilter();

        // Run.
        var result = Action.removeFilters(filter);

        // Verify.
        assert.ok(result);
        assert.equal(result.type, Action.REMOVE_FILTERS);
    });

    QUnit.test("setDefaultFilters()", function(assert)
    {
        // Setup.
        var filter = createRangeFilter();

        // Run.
        var result = Action.setDefaultFilters(filter);

        // Verify.
        assert.ok(result);
        assert.equal(result.type, Action.SET_DEFAULT_FILTERS);
    });

    QUnit.test("setFilters()", function(assert)
    {
        // Setup.
        var filters = [];
        filters.push(createEntityFilter());
        filters.push(createRangeFilter());

        // Run.
        var result = Action.setFilters(filters);

        // Verify.
        assert.ok(result);
        assert.equal(result.type, Action.SET_FILTERS);
        assert.equal(result.filters, filters);
    });

    function createEntityFilter()
    {
        var columnKey = "faction";
        var values = [Team.FIRST_ORDER, Team.IMPERIAL];

        return new EntityFilter(columnKey, values);
    }

    function createRangeFilter()
    {
        var columnKey = "pilotSkill";
        var isMinEnabled = false;
        var minValue = 1;
        var isMaxEnabled = false;
        var maxValue = 10;

        return new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);
    }
});
