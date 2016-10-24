define([ "EncounterSet", "ObjectiveCard", "Trait" ], function(EncounterSet, ObjectiveCard, Trait)
{
    "use strict";
    QUnit.module("ObjectiveCard");

    QUnit.test("ObjectiveCard properties Signs of Gollum", function(assert)
    {
        var cardKey = ObjectiveCard.SIGNS_OF_GOLLUM;
        var properties = ObjectiveCard.properties[cardKey];
        assert.equal(properties.name, "Signs of Gollum");
        assert.equal(properties.encounterSetKey, EncounterSet.THE_HUNT_FOR_GOLLUM);
        assert.equal(properties.value, "signsOfGollum");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = ObjectiveCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(ObjectiveCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = ObjectiveCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(ObjectiveCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return ObjectiveCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("traits", function(assert)
    {
        ObjectiveCard.values().forEach(function(cardKey)
        {
            var card = ObjectiveCard.properties[cardKey];
            card.traitKeys.forEach(function(traitKey)
            {
                assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
            });
        });
    });

    QUnit.test("ObjectiveCard.values()", function(assert)
    {
        // Run.
        var result = ObjectiveCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        assert.equal(result[0], ObjectiveCard.SIGNS_OF_GOLLUM);
    });
});
