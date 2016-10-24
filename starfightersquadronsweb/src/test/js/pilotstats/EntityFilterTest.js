define(["Team", "pilotstats/EntityFilter"], function(Team, EntityFilter)
{
    "use strict";
    QUnit.module("EntityFilter");

    QUnit.test("EntityFilter()", function(assert)
    {
        // Setup.
        var columnKey = "faction";
        var values = [Team.FIRST_ORDER, Team.IMPERIAL];

        // Run.
        var result = new EntityFilter(columnKey, values);

        // Verify.
        assert.equal(result.columnKey(), columnKey);
        assert.equal(result.values(), values);
    });

    QUnit.test("EntityFilter.fromObject()", function(assert)
    {
        // Setup.
        var object = {
            type: "EntityFilter",
            columnKey: "factionKey",
            values: [Team.FIRST_ORDER, Team.IMPERIAL],
        };

        // Run.
        var result = EntityFilter.fromObject(object);

        // Verify.
        assert.ok(result);
        assert.equal(result.columnKey(), "factionKey");
        assert.ok(result.values());
        var values = result.values();
        assert.equal(values.length, 2);
        assert.equal(values[0], Team.FIRST_ORDER);
        assert.equal(values[1], Team.IMPERIAL);
    });

    QUnit.test("passes()", function(assert)
    {
        // Setup.
        var columnKey = "factionKey";
        var values0 = [Team.REBEL, Team.RESISTANCE];
        var values1 = [Team.FIRST_ORDER, Team.IMPERIAL];
        var data = (
        {
            factionKey: Team.IMPERIAL,
        });

        // Run / Verify.
        assert.ok(!(new EntityFilter(columnKey, values0)).passes(data));
        assert.ok(!(new EntityFilter("bogus", values0)).passes(data));
        assert.ok((new EntityFilter(columnKey, values1)).passes(data));
    });

    QUnit.test("toObject()", function(assert)
    {
        // Setup.
        var columnKey = "factionKey";
        var values = [Team.FIRST_ORDER, Team.IMPERIAL];
        var filter = new EntityFilter(columnKey, values);

        // Run.
        var result = filter.toObject();

        // Verify.
        assert.ok(result);
        assert.equal(result.type, "EntityFilter");
        assert.equal(result.columnKey, "factionKey");
        assert.ok(result.values);
        assert.equal(result.values.length, 2);
        assert.equal(result.values[0], Team.FIRST_ORDER);
        assert.equal(result.values[1], Team.IMPERIAL);
    });
});
