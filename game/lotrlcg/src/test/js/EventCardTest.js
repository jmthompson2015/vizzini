define([ "EventCard" ], function(EventCard)
{
    "use strict";
    QUnit.module("EventCard");

    QUnit.test("EventCard properties Sneak Attack", function(assert)
    {
        var cardKey = EventCard.SNEAK_ATTACK;
        var properties = EventCard.properties[cardKey];
        assert.equal(properties.name, "Sneak Attack");
        assert.equal(properties.value, "sneakAttack");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = EventCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(EventCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = EventCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(EventCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return EventCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("EventCard.values()", function(assert)
    {
        // Run.
        var result = EventCard.values();

        // Verify.
        assert.ok(result);
        var length = 134;
        assert.equal(result.length, length);
        assert.equal(result[0], EventCard.A_ELBERETH_GILTHONIEL);
        assert.equal(result[length - 1], EventCard.WORD_OF_COMMAND);
    });
});
