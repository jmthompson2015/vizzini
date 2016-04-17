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

    QUnit.test("traits", function(assert)
    {
        EnemyCard.values().forEach(function(cardKey)
        {
            var card = EnemyCard.properties[cardKey];
            card.traitKeys.forEach(function(traitKey)
            {
                assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
            });
        });
    });

    QUnit.test("EnemyCard.values()", function(assert)
    {
        // Run.
        var result = EnemyCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 14);
        assert.equal(result[0], EnemyCard.BLACK_FOREST_BATS);
        assert.equal(result[13], EnemyCard.UNGOLIANTS_SPAWN);
    });
});
