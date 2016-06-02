define([ "EnvironmentFactory", "Pilot", "SimpleAgent", "TargetLock", "Team", "Token", "process/Reducer" ], function(
        EnvironmentFactory, Pilot, SimpleAgent, TargetLock, Team, Token, Reducer)
{
    "use strict";
    QUnit.module("TargetLock");

    QUnit.test("TargetLock properties", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var store = environment.store();

        var token0 = environment.tokens()[0]; // TIE Fighter
        var token1 = environment.tokens()[1]; // TIE Fighter
        var token2 = environment.tokens()[2]; // X-Wing

        var targetLock02 = new TargetLock(store, token0, token2);
        var targetLock12 = new TargetLock(store, token1, token2);
        var targetLock20 = new TargetLock(store, token2, token0);

        // Run / Verify.
        assert.ok(targetLock02);
        assert.equal(targetLock02.id(), "A");
        assert.equal(targetLock02.attacker(), token0);
        assert.equal(targetLock02.defender(), token2);

        assert.ok(targetLock12);
        assert.equal(targetLock12.id(), "B");
        assert.equal(targetLock12.attacker(), token1);
        assert.equal(targetLock12.defender(), token2);

        assert.ok(targetLock20);
        assert.equal(targetLock20.id(), "C");
        assert.equal(targetLock20.attacker(), token2);
        assert.equal(targetLock20.defender(), token0);
    });

    QUnit.test("TargetLock ids past Z", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var attacker = new Token(store, Pilot.DARTH_VADER, imperialAgent);
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var defender = new Token(store, Pilot.DASH_RENDAR, rebelAgent);

        // Run / Verify.
        var targetLock = new TargetLock(store, attacker, defender);
        assert.equal(targetLock.id(), "A");
        var i;

        for (i = 0; i < 25; i++)
        {
            targetLock = new TargetLock(store, attacker, defender);
        }

        assert.equal(targetLock.id(), "Z");
        targetLock = new TargetLock(store, attacker, defender);
        assert.equal(targetLock.id(), "AA");

        for (i = 0; i < 25; i++)
        {
            targetLock = new TargetLock(store, attacker, defender);
        }

        assert.equal(targetLock.id(), "ZZ");
        targetLock = new TargetLock(store, attacker, defender);
        assert.equal(targetLock.id(), "A");
    });
});
