define(["GameColumns"], function(GameColumns)
{
    "use strict";
    QUnit.module("GameColumns");

    QUnit.test("GameColumns", function(assert)
    {
        var length = 13;
        assert.equal(GameColumns.length, length);

        assert.equal(GameColumns[0].key, "boardGameRank");
        assert.equal(GameColumns[0].label, "Board Game Rank");
        assert.equal(GameColumns[0].className, "numberCell");

        assert.equal(GameColumns[length - 1].key, "mechanics");
        assert.equal(GameColumns[length - 1].label, "Mechanic");
        assert.equal(GameColumns[length - 1].className, undefined);
    });
});
