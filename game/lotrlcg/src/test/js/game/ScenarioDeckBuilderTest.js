define([ "game/ScenarioDeckBuilder" ], function(ScenarioDeckBuilder)
{
    "use strict";
    QUnit.module("ScenarioDeckBuilder");

    QUnit.test("buildDeck() Beorn's Path #1", function(assert)
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
        var questTokens = result.questTokens();
        assert.ok(questTokens);
        assert.equal(questTokens.length, 4);
        var encounterTokens = result.encounterTokens();
        assert.ok(encounterTokens);
        assert.equal(encounterTokens.length, 36);
    });
});
