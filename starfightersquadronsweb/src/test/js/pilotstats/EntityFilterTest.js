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

    QUnit.test("EntityFilter()", function(assert)
    {
        // Setup.
        var columnKey = "faction";
        var values0 = [Team.REBEL, Team.RESISTANCE];
        var values1 = [Team.FIRST_ORDER, Team.IMPERIAL];
        var data = (
        {
            faction: Team.IMPERIAL,
        });

        // Run / Verify.
        assert.ok(!(new EntityFilter(columnKey, values0)).passes(data));
        assert.ok(!(new EntityFilter("bogus", values0)).passes(data));
        assert.ok((new EntityFilter(columnKey, values1)).passes(data));
    });
});
