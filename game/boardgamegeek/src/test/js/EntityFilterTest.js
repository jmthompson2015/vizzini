define(["EntityFilter", "GameData"], function(EntityFilter, GameData)
{
    "use strict";
    QUnit.module("EntityFilter");

    QUnit.test("EntityFilter()", function(assert)
    {
        // Setup.
        var columnKey = "id";
        var values = [1, 2];

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
            columnKey: "id",
            values: [1, 2],
        };

        // Run.
        var result = EntityFilter.fromObject(object);

        // Verify.
        assert.ok(result);
        assert.equal(result.columnKey(), "id");
        assert.ok(result.values());
        var values = result.values();
        assert.equal(values.length, 2);
        assert.equal(values[0], 1);
        assert.equal(values[1], 2);
    });

    QUnit.test("passes() designers 1", function(assert)
    {
        // Setup.
        var columnKey = "designers";
        var values0 = [1, 2];
        var values1 = [3, 4];
        var type = "boardgamedesigner";
        var data = {
            designers: [
                {
                    type: type,
                    id: 1,
                    name: "Alpha",
                },
            ],
        };

        // Run / Verify.
        assert.ok((new EntityFilter(columnKey, values0)).passes(data));
        assert.ok(!(new EntityFilter("bogus", values0)).passes(data));
        assert.ok(!(new EntityFilter(columnKey, values1)).passes(data));
    });

    QUnit.test("passes() designers 2", function(assert)
    {
        // Setup.
        var columnKey = "designers";
        var values0 = [1, 2];
        var values1 = [3, 4];
        var type = "boardgamedesigner";
        var data = {
            designers: [
                {
                    type: type,
                    id: 1,
                    name: "Alpha",
                },
                {
                    type: type,
                    id: 5,
                    name: "Echo",
                }
            ],
        };

        // Run / Verify.
        assert.ok((new EntityFilter(columnKey, values0)).passes(data));
        assert.ok(!(new EntityFilter("bogus", values0)).passes(data));
        assert.ok(!(new EntityFilter(columnKey, values1)).passes(data));
        assert.ok((new EntityFilter(columnKey, [])).passes(data));
    });

    QUnit.test("toObject()", function(assert)
    {
        // Setup.
        var columnKey = "id";
        var values = [1, 2];
        var filter = new EntityFilter(columnKey, values);

        // Run.
        var result = filter.toObject();

        // Verify.
        assert.ok(result);
        assert.equal(result.type, "EntityFilter");
        assert.equal(result.columnKey, "id");
        assert.ok(result.values);
        assert.equal(result.values.length, 2);
        assert.equal(result.values[0], 1);
        assert.equal(result.values[1], 2);
    });
});
