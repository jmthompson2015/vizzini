define(["GameColumns"], function(GameColumns)
{
    "use strict";
    QUnit.module("GameColumns");

    QUnit.test("GameColumns", function(assert)
    {
        var length = 14;
        assert.equal(GameColumns.length, length);

        assert.equal(GameColumns[0].key, "usernames");
        assert.equal(GameColumns[0].label, "Owner");
        assert.equal(GameColumns[0].className, "displayInlineBlock");

        assert.equal(GameColumns[1].key, "boardGameRank");
        assert.equal(GameColumns[1].label, "Board Game Rank");
        assert.equal(GameColumns[1].className, "numberCell");

        assert.equal(GameColumns[length - 1].key, "mechanics");
        assert.equal(GameColumns[length - 1].label, "Mechanic");
        assert.equal(GameColumns[length - 1].className, undefined);
    });
});
