define([ "CardSet", "CardSetType", "CardSubset" ], function(CardSet, CardSetType, CardSubset)
{
    "use strict";
    QUnit.module("CardSubset");

    QUnit.test("CardSubset properties The Hunt for Gollum", function(assert)
    {
        var cardSubset = CardSubset.SOM1_THE_HUNT_FOR_GOLLUM;
        var properties = CardSubset.properties[cardSubset];
        assert.equal(properties.name, "The Hunt for Gollum");
        assert.equal(properties.cardSetKey, CardSet.SHADOWS_OF_MIRKWOOD);
        assert.equal(properties.number, 1);
        assert.equal(properties.typeKey, CardSetType.ADVENTURE_PACK);
        assert.equal(properties.value, "som1TheHuntForGollum");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = CardSubset.values();
        var ownPropertyNames = Object.getOwnPropertyNames(CardSubset);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = CardSubset[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(CardSubset.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return CardSubset[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("CardSubset.values()", function(assert)
    {
        // Run.
        var result = CardSubset.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 24);
        var i = 0;
        assert.equal(result[i++], CardSubset.ATS1_THE_STEWARDS_FEAR);
        assert.equal(result[i++], CardSubset.ATS2_THE_DRUADAN_FOREST);
        assert.equal(result[i++], CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN);
        assert.equal(result[i++], CardSubset.ATS4_ASSAULT_ON_OSGILIATH);
        assert.equal(result[i++], CardSubset.ATS5_THE_BLOOD_OF_GONDOR);
        assert.equal(result[i++], CardSubset.ATS6_THE_MORGUL_VALE);
        assert.equal(result[i++], CardSubset.D1_THE_REDHORN_GATE);
        assert.equal(result[i++], CardSubset.D2_ROAD_TO_RIVENDELL);
        assert.equal(result[i++], CardSubset.D3_THE_WATCHER_IN_THE_WATER);
        assert.equal(result[i++], CardSubset.D4_THE_LONG_DARK);
        assert.equal(result[i++], CardSubset.D5_FOUNDATIONS_OF_STONE);
        assert.equal(result[i++], CardSubset.D6_SHADOW_AND_FLAME);
        assert.equal(result[i++], CardSubset.SOM1_THE_HUNT_FOR_GOLLUM);
        assert.equal(result[i++], CardSubset.SOM2_CONFLICT_AT_THE_CARROCK);
        assert.equal(result[i++], CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL);
        assert.equal(result[i++], CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL);
        assert.equal(result[i++], CardSubset.SOM5_THE_DEAD_MARSHES);
        assert.equal(result[i++], CardSubset.SOM6_RETURN_TO_MIRKWOOD);
        assert.equal(result[i++], CardSubset.TRM1_THE_DUNLAND_TRAP);
        assert.equal(result[i++], CardSubset.TRM2_THE_THREE_TRIALS);
        assert.equal(result[i++], CardSubset.TRM3_TROUBLE_IN_THARBAD);
        assert.equal(result[i++], CardSubset.TRM4_THE_NIN_IN_EILPH);
        assert.equal(result[i++], CardSubset.TRM5_CELEBRIMBORS_SECRET);
        assert.equal(result[i++], CardSubset.TRM6_THE_ANTLERED_CROWN);
    });
});
