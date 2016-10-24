define(["RangeFilter"], function(RangeFilter)
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

    QUnit.test("RangeFilter.fromObject()", function(assert)
    {
        // Setup.
        var object = {
            type: "RangeFilter",
            columnKey: "pilotSkill",
            isMinEnabled: false,
            minValue: 1,
            isMaxEnabled: true,
            maxValue: 10,
        };

        // Run.
        var result = RangeFilter.fromObject(object);

        // Verify.
        assert.ok(result);
        assert.equal(result.columnKey(), "pilotSkill");
        assert.equal(result.isMinEnabled(), false);
        assert.equal(result.minValue(), 1);
        assert.equal(result.isMaxEnabled(), true);
        assert.equal(result.maxValue(), 10);
    });

    QUnit.test("passes()", function(assert)
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

    QUnit.test("toObject()", function(assert)
    {
        // Setup.
        var columnKey = "factionKey";
        var isMinEnabled = false;
        var minValue = 1;
        var isMaxEnabled = true;
        var maxValue = 10;
        var filter = new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);

        // Run.
        var result = filter.toObject();

        // Verify.
        assert.ok(result);
        assert.equal(result.type, "RangeFilter");
        assert.equal(result.columnKey, columnKey);
        assert.equal(result.isMinEnabled, isMinEnabled);
        assert.equal(result.minValue, minValue);
        assert.equal(result.isMaxEnabled, isMaxEnabled);
        assert.equal(result.maxValue, maxValue);
    });
});
