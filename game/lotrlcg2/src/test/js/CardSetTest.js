define([ "CardSet", "CardSetType" ], function(CardSet, CardSetType)
{
    "use strict";
    QUnit.module("CardSet");

    QUnit.test("CardSet properties Core", function(assert)
    {
        var cardSet = CardSet.CORE;
        var properties = CardSet.properties[cardSet];
        assert.equal(properties.name, "Core");
        assert.equal(properties.type, CardSetType.CORE);
        assert.equal(properties.value, "core");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = CardSet.values();
        var ownPropertyNames = Object.getOwnPropertyNames(CardSet);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = CardSet[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(CardSet.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return CardSet[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("CardSet.values()", function(assert)
    {
        // Run.
        var result = CardSet.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 18);
        var i = 0;
        assert.equal(result[i++], CardSet.CORE);
        assert.equal(result[i++], CardSet.D1_THE_REDHORN_GATE);
        assert.equal(result[i++], CardSet.D2_ROAD_TO_RIVENDELL);
        assert.equal(result[i++], CardSet.D3_THE_WATCHER_IN_THE_WATER);
        assert.equal(result[i++], CardSet.D4_THE_LONG_DARK);
        assert.equal(result[i++], CardSet.D5_FOUNDATIONS_OF_STONE);
        assert.equal(result[i++], CardSet.D6_SHADOW_AND_FLAME);
        assert.equal(result[i++], CardSet.KHAZAD_DUM);
        assert.equal(result[i++], CardSet.ON_THE_DOORSTEP);
        assert.equal(result[i++], CardSet.OVER_HILL_AND_UNDER_HILL);
        assert.equal(result[i++], CardSet.SOM1_THE_HUNT_FOR_GOLLUM);
        assert.equal(result[i++], CardSet.SOM2_CONFLICT_AT_THE_CARROCK);
        assert.equal(result[i++], CardSet.SOM3_A_JOURNEY_TO_RHOSGOBEL);
        assert.equal(result[i++], CardSet.SOM4_THE_HILLS_OF_EMYN_MUIL);
        assert.equal(result[i++], CardSet.SOM5_THE_DEAD_MARSHES);
        assert.equal(result[i++], CardSet.SOM6_RETURN_TO_MIRKWOOD);
        assert.equal(result[i++], CardSet.THE_GREY_HAVENS);
        assert.equal(result[i++], CardSet.THE_TREASON_OF_SARUMAN);
    });
});
