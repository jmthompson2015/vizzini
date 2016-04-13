define([ "LocationCard" ], function(LocationCard)
{
    "use strict";
    QUnit.module("LocationCard");

    QUnit.test("LocationCard properties Enchanted Stream", function(assert)
    {
        var cardKey = LocationCard.ENCHANTED_STREAM;
        var properties = LocationCard.properties[cardKey];
        assert.equal(properties.name, "Enchanted Stream");
        assert.equal(properties.value, "enchantedStream");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = LocationCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(LocationCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = LocationCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(LocationCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return LocationCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("traits", function(assert)
    {
        LocationCard.values().forEach(function(cardKey)
        {
            var card = LocationCard.properties[cardKey];
            card.traitKeys.forEach(function(traitKey)
            {
                assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
            });
        });
    });

    QUnit.test("LocationCard.values()", function(assert)
    {
        // Run.
        var result = LocationCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 6);
        var i = 0;
        assert.equal(result[i++], LocationCard.ENCHANTED_STREAM);
        assert.equal(result[i++], LocationCard.FOREST_GATE);
        assert.equal(result[i++], LocationCard.GREAT_FOREST_WEB);
        assert.equal(result[i++], LocationCard.MOUNTAINS_OF_MIRKWOOD);
        assert.equal(result[i++], LocationCard.NECROMANCERS_PASS);
        assert.equal(result[i++], LocationCard.OLD_FOREST_ROAD);
    });
});
