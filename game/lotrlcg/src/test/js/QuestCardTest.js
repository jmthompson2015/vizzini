define([ "QuestCard" ], function(QuestCard)
{
    "use strict";
    QUnit.module("QuestCard");

    QUnit.test("QuestCard properties A Chosen Path: Beorn's Path", function(assert)
    {
        var cardKey = QuestCard.A_CHOSEN_PATH_BEORNS_PATH;
        var properties = QuestCard.properties[cardKey];
        assert.equal(properties.name, "A Chosen Path: Beorn's Path");
        assert.equal(properties.value, "aChosenPathBeornsPath");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = QuestCard.values();
        var ownPropertyNames = Object.getOwnPropertyNames(QuestCard);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = QuestCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(QuestCard.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return QuestCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("QuestCard.values()", function(assert)
    {
        // Run.
        var result = QuestCard.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 4);
        var i = 0;
        assert.equal(result[i++], QuestCard.A_CHOSEN_PATH_BEORNS_PATH);
        assert.equal(result[i++], QuestCard.A_CHOSEN_PATH_DONT_LEAVE_THE_PATH);
        assert.equal(result[i++], QuestCard.A_FORK_IN_THE_ROAD);
        assert.equal(result[i++], QuestCard.FLIES_AND_SPIDERS);
    });
});
