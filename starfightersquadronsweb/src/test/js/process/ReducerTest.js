define([ "DamageCard", "Phase", "Pilot", "PlayFormat", "Position", "SimpleAgent", "Team", "Token", "UpgradeCard",
        "process/Action", "process/Reducer" ], function(DamageCard, Phase, Pilot, PlayFormat, Position, SimpleAgent,
        Team, Token, UpgradeCard, Action, Reducer)
{
    "use strict";
    QUnit.module("Reducer");

    QUnit.test("addCount()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var tokenId = 1;
        var property = "focus";
        assert.ok(!store.getState().tokenIdToCounts[tokenId]);

        // Run.
        store.dispatch(Action.addCount(tokenId, property));

        // Verify.
        assert.ok(store.getState().tokenIdToCounts[tokenId]);
        assert.equal(store.getState().tokenIdToCounts[tokenId][property], 1);

        // Run.
        store.dispatch(Action.addCount(tokenId, property, 2));

        // Verify.
        assert.ok(store.getState().tokenIdToCounts[tokenId]);
        assert.equal(store.getState().tokenIdToCounts[tokenId][property], 3);

        // Run.
        store.dispatch(Action.addCount(tokenId, property, -4));

        // Verify.
        assert.ok(store.getState().tokenIdToCounts[tokenId]);
        assert.equal(store.getState().tokenIdToCounts[tokenId][property], 0);
    });

    QUnit.test("addRound()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        assert.equal(store.getState().round, 0);

        // Run.
        store.dispatch(Action.addRound());

        // Verify.
        assert.equal(store.getState().round, 1);

        // Run.
        store.dispatch(Action.addRound(2));

        // Verify.
        assert.equal(store.getState().round, 3);
    });

    QUnit.test("discardDamage()", function(assert)
    {
        // Setup.
        var damageDeck = DamageCard.createDeck();
        var store = Redux.createStore(Reducer.root);
        store.dispatch(Action.setDamageDeck(damageDeck));
        var damage = damageDeck[0];
        store.dispatch(Action.drawDamage(damage));
        assert.equal(store.getState().damageDeck.length, 32);
        assert.equal(store.getState().damageDiscardPile.length, 0);

        // Run.
        store.dispatch(Action.discardDamage(damage));

        // Verify.
        assert.equal(store.getState().damageDeck.length, 32);
        assert.equal(store.getState().damageDiscardPile.length, 1);
    });

    QUnit.test("drawDamage()", function(assert)
    {
        // Setup.
        var damageDeck = DamageCard.createDeck();
        var store = Redux.createStore(Reducer.root);
        store.dispatch(Action.setDamageDeck(damageDeck));
        var damage = damageDeck[0];
        assert.equal(store.getState().damageDeck.length, 33);
        assert.equal(store.getState().damageDiscardPile.length, 0);

        // Run.
        store.dispatch(Action.drawDamage(damage));

        // Verify.
        assert.equal(store.getState().damageDeck.length, 32);
        assert.equal(store.getState().damageDiscardPile.length, 0);
    });

    QUnit.test("placeToken()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var position = new Position(100, 200, 45);
        var agent = new SimpleAgent("Charlie", Team.REBEL);
        var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
        assert.equal(Object.keys(store.getState().positionToToken).length, 0);
        assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 0);

        // Run.
        store.dispatch(Action.placeToken(position, token));

        // Verify.
        assert.equal(Object.keys(store.getState().positionToToken).length, 1);
        assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
    });

    QUnit.test("removeToken()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var agent = new SimpleAgent("Charlie", Team.REBEL);
        var position0 = new Position(10, 20, 0);
        var token0 = new Token(store, Pilot.LUKE_SKYWALKER, agent);
        store.dispatch(Action.placeToken(position0, token0));
        var position1 = new Position(100, 200, 45);
        var token1 = new Token(store, Pilot.HAN_SOLO, agent);
        store.dispatch(Action.placeToken(position1, token1));
        assert.equal(Object.keys(store.getState().positionToToken).length, 2);
        assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 2);

        // Run.
        store.dispatch(Action.removeToken(/* position0, */token0));

        // Verify.
        assert.equal(Object.keys(store.getState().positionToToken).length, 1);
        assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
    });

    QUnit.test("removeTokenAt()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var agent = new SimpleAgent("Charlie", Team.REBEL);
        var position0 = new Position(10, 20, 0);
        var token0 = new Token(store, Pilot.LUKE_SKYWALKER, agent);
        store.dispatch(Action.placeToken(position0, token0));
        var position1 = new Position(100, 200, 45);
        var token1 = new Token(store, Pilot.HAN_SOLO, agent);
        store.dispatch(Action.placeToken(position1, token1));
        assert.equal(Object.keys(store.getState().positionToToken).length, 2);
        assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 2);

        // Run.
        store.dispatch(Action.removeTokenAt(position0));

        // Verify.
        assert.equal(Object.keys(store.getState().positionToToken).length, 1);
        assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
    });

    QUnit.test("replenishDamageDeck()", function(assert)
    {
        // Setup.
        var damageDeck = DamageCard.createDeck();
        var store = Redux.createStore(Reducer.root);
        store.dispatch(Action.setDamageDeck(damageDeck));
        for (var i = 0; i < 33; i++)
        {
            var damage = store.getState().damageDeck[0];
            store.dispatch(Action.drawDamage(damage));
            store.dispatch(Action.discardDamage(damage));
        }
        assert.equal(store.getState().damageDeck.length, 0);
        assert.equal(store.getState().damageDiscardPile.length, 33);

        // Run.
        store.dispatch(Action.replenishDamageDeck());

        // Verify.
        assert.equal(store.getState().damageDeck.length, 33);
        assert.equal(store.getState().damageDiscardPile.length, 0);
    });

    QUnit.test("setActiveToken()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        assert.ok(!store.getState().activeTokenId);

        // Run.
        store.dispatch(Action.setActiveToken(1));

        // Verify.
        assert.equal(store.getState().activeTokenId, 1);

        // Run.
        store.dispatch(Action.setActiveToken(2));

        // Verify.
        assert.equal(store.getState().activeTokenId, 2);
    });

    QUnit.test("setCount()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var tokenId = 1;
        var property = "focus";
        store.dispatch(Action.addCount(tokenId, property));
        assert.ok(store.getState().tokenIdToCounts[tokenId]);
        assert.equal(store.getState().tokenIdToCounts[tokenId][property], 1);

        // Run.
        store.dispatch(Action.setCount(tokenId, property, 12));

        // Verify.
        assert.ok(store.getState().tokenIdToCounts[tokenId]);
        assert.equal(store.getState().tokenIdToCounts[tokenId][property], 12);
    });

    QUnit.test("setDamageDeck()", function(assert)
    {
        // Setup.
        var damageDeck = DamageCard.createDeck();
        var store = Redux.createStore(Reducer.root);
        assert.equal(store.getState().damageDeck.length, 0);

        // Run.
        store.dispatch(Action.setDamageDeck(damageDeck));

        // Verify.
        assert.equal(store.getState().damageDeck.length, 33);
        assert.equal(store.getState().damageDeck[0], damageDeck[0]);
    });

    QUnit.test("setFirstAgent()", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Bob", Team.IMPERIAL);
        var store = Redux.createStore(Reducer.root);
        assert.ok(!store.getState().firstAgent);

        // Run.
        store.dispatch(Action.setFirstAgent(agent));

        // Verify.
        assert.equal(store.getState().firstAgent, agent);
    });

    QUnit.test("setPhase()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        assert.equal(store.getState().phaseKey, Phase.SETUP);

        // Run.
        store.dispatch(Action.setPhase(Phase.ACTIVATION_START));

        // Verify.
        assert.equal(store.getState().phaseKey, Phase.ACTIVATION_START);

        // Run.
        store.dispatch(Action.setPhase(Phase.COMBAT_MODIFY_ATTACK_DICE));

        // Verify.
        assert.equal(store.getState().phaseKey, Phase.COMBAT_MODIFY_ATTACK_DICE);
    });

    QUnit.test("setPlayFormat()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        assert.equal(store.getState().playFormatKey, undefined);

        // Run.
        store.dispatch(Action.setPlayFormat(PlayFormat.STANDARD));

        // Verify.
        assert.equal(store.getState().playFormatKey, PlayFormat.STANDARD);

        // Run.
        store.dispatch(Action.setPlayFormat(PlayFormat.EPIC));

        // Verify.
        assert.equal(store.getState().playFormatKey, PlayFormat.EPIC);
    });

    QUnit.test("setSecondAgent()", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Mike", Team.REBEL);
        var store = Redux.createStore(Reducer.root);
        assert.ok(!store.getState().secondAgent);

        // Run.
        store.dispatch(Action.setSecondAgent(agent));

        // Verify.
        assert.equal(store.getState().secondAgent, agent);
    });
});
