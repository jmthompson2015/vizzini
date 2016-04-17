define([ "TreacheryCard" ], function(TreacheryCard)
{
    "use strict";
    QUnit.module("TreacheryCard");

    QUnit.test("TreacheryCard properties Caught in a Web", function(assert)
    {
        var cardKey = TreacheryCard.CAUGHT_IN_A_WEB;
        var properties = TreacheryCard.properties[cardKey];
        assert.equal(properties.name, "Caught in a Web");
        assert.equal(properties.value, "caughtInAWeb");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = TreacheryCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(TreacheryCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = TreacheryCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(TreacheryCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return TreacheryCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("traits", function(assert)
    {
        TreacheryCard.values().forEach(function(cardKey)
        {
            var card = TreacheryCard.properties[cardKey];
            if (card.traitKeys)
            {
                card.traitKeys.forEach(function(traitKey)
                {
                    assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
                });
            }
        });
    });

    QUnit.test("TreacheryCard.values()", function(assert)
    {
        // Run.
        var result = TreacheryCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 11);
        assert.equal(result[0], TreacheryCard.CAUGHT_IN_A_WEB);
        assert.equal(result[10], TreacheryCard.TREACHEROUS_FOG);
    });
});
