define([ "QuestCard", "Scenario" ], function(QuestCard, Scenario)
{
    "use strict";
    QUnit.module("QuestCard");

    QUnit.test("QuestCard properties Flies and Spiders", function(assert)
    {
        var cardKey = QuestCard.PTM1A_FLIES_AND_SPIDERS;
        var properties = QuestCard.properties[cardKey];
        assert.equal(properties.name, "Flies and Spiders");
        assert.equal(properties.sequence, "1A");
        assert.equal(properties.value, "ptm1aFliesAndSpiders");
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
        assert.equal(result.length, 13);
        var i = 0;
        assert.equal(result[i++], QuestCard.PTM1A_FLIES_AND_SPIDERS);
        assert.equal(result[i++], QuestCard.PTM1B_FLIES_AND_SPIDERS);
        assert.equal(result[i++], QuestCard.PTM2A_A_FORK_IN_THE_ROAD);
        assert.equal(result[i++], QuestCard.PTM2B_A_FORK_IN_THE_ROAD);
        assert.equal(result[i++], QuestCard.PTM3A_A_CHOSEN_PATH);
        assert.equal(result[i++], QuestCard.PTM3B1_BEORNS_PATH);
        assert.equal(result[i++], QuestCard.PTM3B2_DONT_LEAVE_THE_PATH);
        assert.equal(result[i++], QuestCard.THFG1A_THE_HUNT_BEGINS);
        assert.equal(result[i++], QuestCard.THFG1B_THE_HUNT_BEGINS);
        assert.equal(result[i++], QuestCard.THFG2A_A_NEW_TERROR_ABROAD);
        assert.equal(result[i++], QuestCard.THFG2B_A_NEW_TERROR_ABROAD);
        assert.equal(result[i++], QuestCard.THFG3A_ON_THE_TRAIL);
        assert.equal(result[i++], QuestCard.THFG3B_ON_THE_TRAIL);
    });

    QUnit.test("QuestCard.valuesByScenario()", function(assert)
    {
        // Run.
        var result = QuestCard.valuesByScenario(Scenario.PASSAGE_THROUGH_MIRKWOOD);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 7);
    });
});
