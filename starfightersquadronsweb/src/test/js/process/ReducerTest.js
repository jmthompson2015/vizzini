define(["Count", "DamageCard", "Phase", "Pilot", "PlayFormat", "Position", "process/SimpleAgent", "process/TargetLock", "Team", "process/Token", "UpgradeCard", "Value", "process/Action", "process/Reducer"],
    function(Count, DamageCard, Phase, Pilot, PlayFormat, Position, SimpleAgent, TargetLock, Team, Token, UpgradeCard, Value, Action, Reducer)
    {
        "use strict";
        QUnit.module("Reducer");

        QUnit.test("addCloakCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.CLOAK;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addCloakCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addCloakCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = "focus";
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addCount(token, property));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addCount(token, property, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);

            // Run.
            store.dispatch(Action.addCount(token, property, -4));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);
        });

        QUnit.test("addEnergyCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.ENERGY;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addEnergyCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addEnergyCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addEvadeCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.EVADE;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addEvadeCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addEvadeCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addFocusCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.FOCUS;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addFocusCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addFocusCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addIonCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.ION;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addIonCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addIonCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addReinforceCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.REINFORCE;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addReinforceCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addReinforceCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
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

        QUnit.test("addShieldCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.SHIELD;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addShieldCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addShieldCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addStressCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.STRESS;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addStressCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addStressCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
        });

        QUnit.test("addTargetLock()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var position = new Position(100, 200, 45);
            var agent0 = new SimpleAgent("Alpha", Team.REBEL);
            var attacker = new Token(store, Pilot.LUKE_SKYWALKER, agent0);
            var agent1 = new SimpleAgent("Bravo", Team.IMPERIAL);
            var defender = new Token(store, Pilot.ACADEMY_PILOT, agent1);
            assert.equal(store.getState().targetLocks.length, 0);
            var targetLock = new TargetLock(store, attacker, defender);

            // Run.
            store.dispatch(Action.addTargetLock(targetLock));

            // Verify.
            assert.equal(store.getState().targetLocks.length, 1);
            assert.equal(store.getState().targetLocks[0].id(), "A");
            assert.equal(store.getState().targetLocks[0].attacker(), attacker);
            assert.equal(store.getState().targetLocks[0].defender(), defender);
        });

        QUnit.test("addTokenCriticalDamage()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var damageKey0 = DamageCard.BLINDED_PILOT;
            var damageKey1 = DamageCard.CONSOLE_FIRE;
            assert.ok(!store.getState().tokenIdToCriticalDamages[token.id()]);

            // Run.
            store.dispatch(Action.addTokenCriticalDamage(token, damageKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 1);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);

            // Run.
            store.dispatch(Action.addTokenCriticalDamage(token, damageKey1));

            // Verify.
            assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 2);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][1], damageKey1);
        });

        QUnit.test("addTokenDamage()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var tokenId = 1;
            var damageKey0 = DamageCard.BLINDED_PILOT;
            var damageKey1 = DamageCard.CONSOLE_FIRE;
            assert.ok(!store.getState().tokenIdToDamages[tokenId]);

            // Run.
            store.dispatch(Action.addTokenDamage(tokenId, damageKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToDamages[tokenId]);
            assert.equal(store.getState().tokenIdToDamages[tokenId].length, 1);
            assert.equal(store.getState().tokenIdToDamages[tokenId][0], damageKey0);

            // Run.
            store.dispatch(Action.addTokenDamage(tokenId, damageKey1));

            // Verify.
            assert.ok(store.getState().tokenIdToDamages[tokenId]);
            assert.equal(store.getState().tokenIdToDamages[tokenId].length, 2);
            assert.equal(store.getState().tokenIdToDamages[tokenId][0], damageKey0);
            assert.equal(store.getState().tokenIdToDamages[tokenId][1], damageKey1);
        });

        QUnit.test("addTokenUpgrade()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
            var upgradeKey1 = UpgradeCard.CALCULATION;
            assert.ok(!store.getState().tokenIdToUpgrades[token.id()]);

            // Run.
            store.dispatch(Action.addTokenUpgrade(token, upgradeKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 1);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);

            // Run.
            store.dispatch(Action.addTokenUpgrade(token, upgradeKey1));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 2);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()][1], upgradeKey1);
        });

        QUnit.test("addTokenUpgradeEnergy()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var tokenId = 1;
            var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
            var upgradeKey1 = UpgradeCard.CALCULATION;
            assert.ok(!store.getState().tokenIdToUpgradeEnergy[tokenId]);

            // Run.
            store.dispatch(Action.addTokenUpgradeEnergy(tokenId, upgradeKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId]);
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey0]);
            assert.ok(!store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey1]);
            assert.equal(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey0], 1);

            // Run.
            store.dispatch(Action.addTokenUpgradeEnergy(tokenId, upgradeKey1, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId]);
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey0]);
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey1]);
            assert.equal(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey0], 1);
            assert.equal(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey1], 2);
        });

        QUnit.test("addWeaponsDisabledCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.WEAPONS_DISABLED;
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 0);

            // Run.
            store.dispatch(Action.addWeaponsDisabledCount(token));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.addWeaponsDisabledCount(token, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 3);
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

        QUnit.test("incrementNextTargetLockId()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            assert.equal(store.getState().nextTargetLockId, 0);

            // Run.
            store.dispatch(Action.incrementNextTargetLockId());

            // Verify.
            assert.equal(store.getState().nextTargetLockId, 1);

            // Run.
            store.dispatch(Action.incrementNextTargetLockId());

            // Verify.
            assert.equal(store.getState().nextTargetLockId, 2);

            for (var i = 3; i < 52; i++)
            {
                store.dispatch(Action.incrementNextTargetLockId());
            }

            assert.equal(store.getState().nextTargetLockId, 51);

            // Run.
            store.dispatch(Action.incrementNextTargetLockId());

            // Verify.
            assert.equal(store.getState().nextTargetLockId, 0);
        });

        QUnit.test("incrementNextTokenId()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            assert.equal(store.getState().nextTokenId, 1);

            // Run.
            store.dispatch(Action.incrementNextTokenId());

            // Verify.
            assert.equal(store.getState().nextTokenId, 2);

            // Run.
            store.dispatch(Action.incrementNextTokenId());

            // Verify.
            assert.equal(store.getState().nextTokenId, 3);
        });

        QUnit.test("moveToken()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var fromPosition = new Position(100, 200, 45);
            var toPosition = new Position(120, 220, 45);
            var agent = new SimpleAgent("Charlie", Team.REBEL);
            var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
            store.dispatch(Action.placeToken(fromPosition, token));
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
            assert.equal(Object.keys(store.getState().tokens).length, 1);

            assert.equal(store.getState().tokens[token.id()], token);
            assert.equal(store.getState().tokenIdToPosition[token.id()], fromPosition);

            // Run.
            store.dispatch(Action.moveToken(fromPosition, toPosition));

            // Verify.
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
            assert.equal(Object.keys(store.getState().tokens).length, 1);

            assert.equal(store.getState().tokens[token.id()], token);
            assert.equal(store.getState().tokenIdToPosition[token.id()], toPosition);
        });

        QUnit.test("placeToken()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var position = new Position(100, 200, 45);
            var agent = new SimpleAgent("Charlie", Team.REBEL);
            var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 0);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 0);
            assert.equal(Object.keys(store.getState().tokens).length, 0);

            // Run.
            store.dispatch(Action.placeToken(position, token));

            // Verify.
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
            assert.equal(Object.keys(store.getState().tokens).length, 1);
        });

        QUnit.test("removeTargetLock()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var position = new Position(100, 200, 45);
            var agent0 = new SimpleAgent("Alpha", Team.REBEL);
            var attacker = new Token(store, Pilot.LUKE_SKYWALKER, agent0);
            var agent1 = new SimpleAgent("Bravo", Team.IMPERIAL);
            var defender = new Token(store, Pilot.ACADEMY_PILOT, agent1);
            var targetLock = new TargetLock(store, attacker, defender);
            store.dispatch(Action.addTargetLock(targetLock));
            assert.equal(store.getState().targetLocks.length, 1);
            assert.equal(store.getState().targetLocks[0].id(), "A");
            assert.equal(store.getState().targetLocks[0].attacker(), attacker);
            assert.equal(store.getState().targetLocks[0].defender(), defender);

            // Run.
            store.dispatch(Action.removeTargetLock(targetLock));

            // Verify.
            assert.equal(store.getState().targetLocks.length, 0);
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
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 2);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 2);
            assert.equal(Object.keys(store.getState().tokens).length, 2);

            // Run.
            store.dispatch(Action.removeToken( /* position0, */ token0));

            // Verify.
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
            assert.equal(Object.keys(store.getState().tokens).length, 1);
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
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 2);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 2);
            assert.equal(Object.keys(store.getState().tokens).length, 2);

            // Run.
            store.dispatch(Action.removeTokenAt(position0));

            // Verify.
            assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
            assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
            assert.equal(Object.keys(store.getState().tokens).length, 1);
        });

        QUnit.test("removeTokenCriticalDamage()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var damageKey0 = DamageCard.BLINDED_PILOT;
            var damageKey1 = DamageCard.CONSOLE_FIRE;
            store.dispatch(Action.addTokenCriticalDamage(token, damageKey0));
            store.dispatch(Action.addTokenCriticalDamage(token, damageKey1));
            assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 2);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][1], damageKey1);

            // Run.
            store.dispatch(Action.removeTokenCriticalDamage(token, damageKey1));

            // Verify.
            assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 1);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);

            // Run.
            store.dispatch(Action.removeTokenCriticalDamage(token, damageKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
            assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 0);
        });

        QUnit.test("removeTokenDamage()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var tokenId = 1;
            var damageKey0 = DamageCard.BLINDED_PILOT;
            var damageKey1 = DamageCard.CONSOLE_FIRE;
            store.dispatch(Action.addTokenDamage(tokenId, damageKey0));
            store.dispatch(Action.addTokenDamage(tokenId, damageKey1));
            assert.ok(store.getState().tokenIdToDamages[tokenId]);
            assert.equal(store.getState().tokenIdToDamages[tokenId].length, 2);
            assert.equal(store.getState().tokenIdToDamages[tokenId][0], damageKey0);
            assert.equal(store.getState().tokenIdToDamages[tokenId][1], damageKey1);

            // Run.
            store.dispatch(Action.removeTokenDamage(tokenId, damageKey1));

            // Verify.
            assert.ok(store.getState().tokenIdToDamages[tokenId]);
            assert.equal(store.getState().tokenIdToDamages[tokenId].length, 1);
            assert.equal(store.getState().tokenIdToDamages[tokenId][0], damageKey0);

            // Run.
            store.dispatch(Action.removeTokenDamage(tokenId, damageKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToDamages[tokenId]);
            assert.equal(store.getState().tokenIdToDamages[tokenId].length, 0);
        });

        QUnit.test("removeTokenUpgrade()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
            var upgradeKey1 = UpgradeCard.CALCULATION;
            store.dispatch(Action.addTokenUpgrade(token, upgradeKey0));
            store.dispatch(Action.addTokenUpgrade(token, upgradeKey1));
            assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 2);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()][1], upgradeKey1);

            // Run.
            store.dispatch(Action.removeTokenUpgrade(token, upgradeKey1));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 1);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);

            // Run.
            store.dispatch(Action.removeTokenUpgrade(token, upgradeKey0));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
            assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 0);
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

        QUnit.test("resetNextTokenId()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            store.dispatch(Action.incrementNextTokenId());
            store.dispatch(Action.incrementNextTokenId());
            assert.equal(store.getState().nextTokenId, 3);

            // Run.
            store.dispatch(Action.resetNextTokenId());

            // Verify.
            assert.equal(store.getState().nextTokenId, 1);
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

        QUnit.test("setCloakCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.CLOAK;
            store.dispatch(Action.addCloakCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setCloakCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
        });

        QUnit.test("setCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = "focus";
            store.dispatch(Action.addCount(token, property));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setCount(token, property, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
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

        QUnit.test("setEnergyCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.ENERGY;
            store.dispatch(Action.addEnergyCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setEnergyCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
        });

        QUnit.test("setEvadeCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.EVADE;
            store.dispatch(Action.addEvadeCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setEvadeCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
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

        QUnit.test("setFocusCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.FOCUS;
            store.dispatch(Action.addFocusCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setFocusCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
        });

        QUnit.test("setIonCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.ION;
            store.dispatch(Action.addIonCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setIonCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
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

        QUnit.test("setPlayAreaScale()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            assert.equal(store.getState().playAreaScale, 1.0);

            // Run.
            store.dispatch(Action.setPlayAreaScale(0.75));

            // Verify.
            assert.equal(store.getState().playAreaScale, 0.75);
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

        QUnit.test("setReinforceCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.REINFORCE;
            store.dispatch(Action.addReinforceCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setReinforceCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
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

        QUnit.test("setShieldCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.SHIELD;
            store.dispatch(Action.addShieldCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setShieldCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
        });

        QUnit.test("setStressCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.STRESS;
            store.dispatch(Action.addStressCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setStressCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
        });

        QUnit.test("setTokenUpgradeEnergy()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var tokenId = 1;
            var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
            var upgradeKey1 = UpgradeCard.CALCULATION;
            assert.ok(!store.getState().tokenIdToUpgradeEnergy[tokenId]);

            // Run.
            store.dispatch(Action.setTokenUpgradeEnergy(tokenId, upgradeKey0, 1));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId]);
            assert.equal(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey0], 1);
            assert.ok(!store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey1], 0);

            // Run.
            store.dispatch(Action.setTokenUpgradeEnergy(tokenId, upgradeKey1, 2));

            // Verify.
            assert.ok(store.getState().tokenIdToUpgradeEnergy[tokenId]);
            assert.equal(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey0], 1);
            assert.equal(store.getState().tokenIdToUpgradeEnergy[tokenId][upgradeKey1], 2);
        });

        QUnit.test("setUserMessage()", function(assert)
        {
            // Setup.
            var userMessage = "This is an important message!";
            var store = Redux.createStore(Reducer.root);
            assert.ok(!store.getState().userMessage);

            // Run.
            store.dispatch(Action.setUserMessage(userMessage));

            // Verify.
            assert.equal(store.getState().userMessage, userMessage);
        });

        QUnit.test("setValue()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Value.AGILITY;
            store.dispatch(Action.setValue(token, property));
            assert.ok(store.getState().tokenIdToValues[token.id()]);
            assert.equal(store.getState().tokenIdToValues[token.id()][property], 0);

            // Run.
            store.dispatch(Action.setValue(token, property, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToValues[token.id()]);
            assert.equal(store.getState().tokenIdToValues[token.id()][property], 12);
        });

        QUnit.test("setWeaponsDisabledCount()", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
            store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
            var property = Count.WEAPONS_DISABLED;
            store.dispatch(Action.addWeaponsDisabledCount(token));
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 1);

            // Run.
            store.dispatch(Action.setWeaponsDisabledCount(token, 12));

            // Verify.
            assert.ok(store.getState().tokenIdToCounts[token.id()]);
            assert.equal(store.getState().tokenIdToCounts[token.id()][property], 12);
        });
    });
