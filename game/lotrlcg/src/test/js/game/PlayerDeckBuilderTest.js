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
        var heroInstances = result.heroInstances();
        assert.ok(heroInstances);
        assert.equal(heroInstances.length, 3);
        var playerInstances = result.playerInstances();
        assert.ok(playerInstances);
        assert.equal(playerInstances.length, 40);
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
        var heroInstances = result.heroInstances();
        assert.ok(heroInstances);
        assert.equal(heroInstances.length, 3);
        var playerInstances = result.playerInstances();
        assert.ok(playerInstances);
        assert.equal(playerInstances.length, 40);
    });
});
