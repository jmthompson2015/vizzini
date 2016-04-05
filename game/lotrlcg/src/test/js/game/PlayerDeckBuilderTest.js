define([ "game/PlayerDeckBuilder" ], function(PlayerDeckBuilder)
{
    "use strict";
    QUnit.module("PlayerDeckBuilder");

    QUnit.test("buildDeck() Beorn's Path #1", function(assert)
    {
        // Setup.
        var deckBuilder = PlayerDeckBuilder.BeornsPath1DeckBuilder;
        assert.equal(deckBuilder.name(), "Beorn's Path #1");
        assert.equal(deckBuilder.year(), 2013);
        assert.equal(deckBuilder.description(), "Leadership/Lore");

        // Run.
        var result = deckBuilder.buildDeck();

        // Verify.
        assert.ok(result);
        var heroTokens = result.heroTokens();
        assert.ok(heroTokens);
        assert.equal(heroTokens.length, 3);
        var playerTokens = result.playerTokens();
        assert.ok(playerTokens);
        assert.equal(playerTokens.length, 40);
    });

    QUnit.test("buildDeck() Beorn's Path #2", function(assert)
    {
        // Setup.
        var deckBuilder = PlayerDeckBuilder.BeornsPath2DeckBuilder;
        assert.equal(deckBuilder.name(), "Beorn's Path #2");
        assert.equal(deckBuilder.year(), 2013);
        assert.equal(deckBuilder.description(), "Spirit/Tactics");

        // Run.
        var result = deckBuilder.buildDeck();

        // Verify.
        assert.ok(result);
        var heroTokens = result.heroTokens();
        assert.ok(heroTokens);
        assert.equal(heroTokens.length, 3);
        var playerTokens = result.playerTokens();
        assert.ok(playerTokens);
        assert.equal(playerTokens.length, 40);
    });
});
