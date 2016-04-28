define([ "AllyCard" ], function(AllyCard)
{
    "use strict";
    QUnit.module("AllyCard");

    QUnit.test("AllyCard properties Daughter of the Nimrodel", function(assert)
    {
        var cardKey = AllyCard.DAUGHTER_OF_THE_NIMRODEL;
        var properties = AllyCard.properties[cardKey];
        assert.equal(properties.name, "Daughter of the Nimrodel");
        assert.equal(properties.value, "daughterOfTheNimrodel");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = AllyCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(AllyCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = AllyCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(AllyCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return AllyCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("traits", function(assert)
    {
        AllyCard.values().forEach(function(cardKey)
        {
            var card = AllyCard.properties[cardKey];
            card.traitKeys.forEach(function(traitKey)
            {
                assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
            });
        });
    });

    QUnit.test("AllyCard.values()", function(assert)
    {
        // Run.
        var result = AllyCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 81);
        assert.equal(result[0], AllyCard.ANBORN);
        assert.equal(result[80], AllyCard.ZIGIL_MINER);
    });
});
