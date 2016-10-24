define(["UpgradeRestriction", "UpgradeType", "upgradestats/EntityFilter"], function(UpgradeRestriction, UpgradeType, EntityFilter)
{
    "use strict";
    QUnit.module("EntityFilter");

    QUnit.test("EntityFilter()", function(assert)
    {
        // Setup.
        var columnKey = "faction";
        var values = [UpgradeType.ASTROMECH, UpgradeType.BOMB];

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
            columnKey: "typeKey",
            values: [UpgradeType.ASTROMECH, UpgradeType.BOMB],
        };

        // Run.
        var result = EntityFilter.fromObject(object);

        // Verify.
        assert.ok(result);
        assert.equal(result.columnKey(), "typeKey");
        assert.ok(result.values());
        var values = result.values();
        assert.equal(values.length, 2);
        assert.equal(values[0], UpgradeType.ASTROMECH);
        assert.equal(values[1], UpgradeType.BOMB);
    });

    QUnit.test("passes() faction", function(assert)
    {
        // Setup.
        var columnKey = "typeKey";
        var values0 = [UpgradeType.CANNON, UpgradeType.CREW];
        var values1 = [UpgradeType.ASTROMECH, UpgradeType.BOMB];
        var data = (
        {
            typeKey: UpgradeType.BOMB,
        });

        // Run / Verify.
        assert.ok(!(new EntityFilter(columnKey, values0)).passes(data));
        assert.ok(!(new EntityFilter("bogus", values0)).passes(data));
        assert.ok((new EntityFilter(columnKey, values1)).passes(data));
    });

    QUnit.test("passes() restrictions", function(assert)
    {
        // Setup.
        var columnKey = "restrictionKeys";
        var values0 = [UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.REBEL_ONLY];
        var values1 = [UpgradeRestriction.TIE_FIGHTER_ONLY, UpgradeRestriction.IMPERIAL_ONLY];
        var data = (
        {
            restrictionKeys: [UpgradeRestriction.A_WING_ONLY],
        });

        // Run / Verify.
        assert.ok((new EntityFilter(columnKey, values0)).passes(data));
        assert.ok(!(new EntityFilter("bogus", values0)).passes(data));
        assert.ok(!(new EntityFilter(columnKey, values1)).passes(data));
        assert.ok((new EntityFilter(columnKey, [])).passes(data));
    });

    QUnit.test("toObject()", function(assert)
    {
        // Setup.
        var columnKey = "factionKey";
        var values = [UpgradeType.ASTROMECH, UpgradeType.BOMB];
        var filter = new EntityFilter(columnKey, values);

        // Run.
        var result = filter.toObject();

        // Verify.
        assert.ok(result);
        assert.equal(result.type, "EntityFilter");
        assert.equal(result.columnKey, "factionKey");
        assert.ok(result.values);
        assert.equal(result.values.length, 2);
        assert.equal(result.values[0], UpgradeType.ASTROMECH);
        assert.equal(result.values[1], UpgradeType.BOMB);
    });
});
