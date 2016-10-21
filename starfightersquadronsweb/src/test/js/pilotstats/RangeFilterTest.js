define(["pilotstats/RangeFilter"], function(RangeFilter)
{
    "use strict";
    QUnit.module("RangeFilter");

    QUnit.test("RangeFilter()", function(assert)
    {
        // Setup.
        var columnKey = "pilotSkill";
        var isMinEnabled = false;
        var minValue = 1;
        var isMaxEnabled = false;
        var maxValue = 10;

        // Run.
        var result = new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);

        // Verify.
        assert.equal(result.columnKey(), columnKey);
        assert.equal(result.isMinEnabled(), isMinEnabled);
        assert.equal(result.minValue(), minValue);
        assert.equal(result.isMaxEnabled(), isMaxEnabled);
        assert.equal(result.maxValue(), maxValue);
    });

    QUnit.test("RangeFilter()", function(assert)
    {
        // Setup.
        var columnKey = "pilotSkill";
        var isMinEnabled = false;
        var minValue = 1;
        var isMaxEnabled = false;
        var maxValue = 10;
        var data = {
            pilotSkill: 5,
        };

        // Run / Verify.
        assert.ok((new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue)).passes(data));
        assert.ok((new RangeFilter("bogus", isMinEnabled, minValue, isMaxEnabled, maxValue)).passes(data));
        assert.ok((new RangeFilter(columnKey, true, minValue, isMaxEnabled, maxValue)).passes(data));
        assert.ok((new RangeFilter(columnKey, isMinEnabled, 6, isMaxEnabled, maxValue)).passes(data));
        assert.ok((new RangeFilter(columnKey, isMinEnabled, minValue, true, maxValue)).passes(data));
        assert.ok((new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, 4)).passes(data));

        assert.ok(!(new RangeFilter(columnKey, true, 6, isMaxEnabled, maxValue)).passes(data));
        assert.ok(!(new RangeFilter(columnKey, isMinEnabled, minValue, true, 4)).passes(data));
    });
});
