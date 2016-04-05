define([ "EnemyCard" ], function(EnemyCard)
{
    "use strict";
    QUnit.module("EnemyCard");

    QUnit.test("EnemyCard properties Black Forest Bats", function(assert)
    {
        var cardKey = EnemyCard.BLACK_FOREST_BATS;
        var properties = EnemyCard.properties[cardKey];
        assert.equal(properties.name, "Black Forest Bats");
        assert.equal(properties.value, "blackForestBats");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = EnemyCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(EnemyCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = EnemyCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(EnemyCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return EnemyCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("EnemyCard.values()", function(assert)
    {
        // Run.
        var result = EnemyCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 10);
        var i = 0;
        assert.equal(result[i++], EnemyCard.BLACK_FOREST_BATS);
        assert.equal(result[i++], EnemyCard.CHIEFTAIN_UFTHAK);
        assert.equal(result[i++], EnemyCard.DOL_GULDUR_BEASTMASTER);
        assert.equal(result[i++], EnemyCard.DOL_GULDUR_ORCS);
        assert.equal(result[i++], EnemyCard.EAST_BIGHT_PATROL);
        assert.equal(result[i++], EnemyCard.FOREST_SPIDER);
        assert.equal(result[i++], EnemyCard.GOBLIN_SNIPER);
        assert.equal(result[i++], EnemyCard.HUMMERHORNS);
        assert.equal(result[i++], EnemyCard.KING_SPIDER);
        assert.equal(result[i++], EnemyCard.UNGOLIANTS_SPAWN);
    });
});
