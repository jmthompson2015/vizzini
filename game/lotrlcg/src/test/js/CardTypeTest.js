define([ "CardType" ], function(CardType)
{
    "use strict";
    QUnit.module("CardType");

    QUnit.test("CardType properties Leadership", function(assert)
    {
        var cardType = CardType.ATTACHMENT;
        var properties = CardType.properties[cardType];
        assert.equal(properties.name, "Attachment");
        assert.equal(properties.value, "attachment");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = CardType.values();
        var ownPropertyNames = Object.getOwnPropertyNames(CardType);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = CardType[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(CardType.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return CardType[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("CardType.values()", function(assert)
    {
        // Run.
        var result = CardType.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 9);
        var i = 0;
        assert.equal(result[i++], CardType.ATTACHMENT);
        assert.equal(result[i++], CardType.ALLY);
        assert.equal(result[i++], CardType.ENEMY);
        assert.equal(result[i++], CardType.EVENT);
        assert.equal(result[i++], CardType.HERO);
        assert.equal(result[i++], CardType.LOCATION);
        assert.equal(result[i++], CardType.OBJECTIVE);
        assert.equal(result[i++], CardType.QUEST);
        assert.equal(result[i++], CardType.TREACHERY);
    });
});
