define([ "GameColumns" ], function(GameColumns)
{
    "use strict";
    QUnit.module("GameColumns");

    QUnit.test("GameColumns", function(assert)
    {
        assert.equal(GameColumns.length, 12);

        assert.equal(GameColumns[0].key, "boardGameRank");
        assert.equal(GameColumns[0].label, "Board Game Rank");
        assert.equal(GameColumns[0].className, "numberCell");

        assert.equal(GameColumns[GameColumns.length - 1].key, "mechanics");
        assert.equal(GameColumns[GameColumns.length - 1].label, "Mechanic");
        assert.equal(GameColumns[GameColumns.length - 1].className, undefined);
    });
});
