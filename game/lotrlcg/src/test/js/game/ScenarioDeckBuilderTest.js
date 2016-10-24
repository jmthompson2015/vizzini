define([ "game/ScenarioDeckBuilder" ], function(ScenarioDeckBuilder)
{
    "use strict";
    QUnit.module("ScenarioDeckBuilder");

    QUnit.test("buildDeck() Passage Through Mirkwood", function(assert)
    {
        // Setup.
        var deckBuilder = ScenarioDeckBuilder.CoreSetPassageThroughMirkwoodDeckBuilder;
        assert.equal(deckBuilder.name(), "Passage Through Mirkwood (Core #1)");
        assert.equal(deckBuilder.year(), 2011);
        assert.equal(deckBuilder.description(), "Passage Through Mirkwood");

        // Run.
        var result = deckBuilder.buildDeck();

        // Verify.
        assert.ok(result);
        var questInstances = result.questInstances();
        assert.ok(questInstances);
        assert.equal(questInstances.length, 6);
        var encounterInstances = result.encounterInstances();
        assert.ok(encounterInstances);
        assert.equal(encounterInstances.length, 36);
    });

    QUnit.test("buildDeck() The Hunt for Gollum", function(assert)
    {
        // Setup.
        var deckBuilder = ScenarioDeckBuilder.TheHuntForGollumDeckBuilder;
        assert.equal(deckBuilder.name(), "The Hunt for Gollum");
        assert.equal(deckBuilder.year(), 2011);
        assert.equal(deckBuilder.description(), "The Hunt for Gollum");

        // Run.
        var result = deckBuilder.buildDeck();

        // Verify.
        assert.ok(result);
        var questInstances = result.questInstances();
        assert.ok(questInstances);
        assert.equal(questInstances.length, 6);
        var encounterInstances = result.encounterInstances();
        assert.ok(encounterInstances);
        assert.equal(encounterInstances.length, 48);
    });
});
