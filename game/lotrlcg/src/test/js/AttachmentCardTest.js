define([ "AttachmentCard" ], function(AttachmentCard)
{
    "use strict";
    QUnit.module("AttachmentCard");

    QUnit.test("AttachmentCard properties Celebrían's Stone", function(assert)
    {
        var cardKey = AttachmentCard.CELEBRIANS_STONE;
        var properties = AttachmentCard.properties[cardKey];
        assert.equal(properties.name, "Celebrían's Stone");
        assert.equal(properties.value, "celebriansStone");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = AttachmentCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(AttachmentCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = AttachmentCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(AttachmentCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return AttachmentCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("AttachmentCard.values()", function(assert)
    {
        // Run.
        var result = AttachmentCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 28);
        assert.equal(result[0], AttachmentCard.AROD);
        assert.equal(result[27], AttachmentCard.UNEXPECTED_COURAGE);
    });
});
