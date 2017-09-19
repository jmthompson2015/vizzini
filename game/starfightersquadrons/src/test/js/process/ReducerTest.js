define(["DamageCard", "Event", "Maneuver", "Phase", "Pilot", "PlayFormat", "Position", "RangeRuler", "Team",
  "process/Action", "process/AttackDice", "process/DefenseDice", "process/Environment", "process/Reducer", "process/SimpleAgent", "process/TargetLock", "process/Token"],
   function(DamageCard, Event, Maneuver, Phase, Pilot, PlayFormat, Position, RangeRuler, Team,
      Action, AttackDice, DefenseDice, Environment, Reducer, SimpleAgent, TargetLock, Token)
   {
      "use strict";
      QUnit.module("Reducer");

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

      QUnit.test("addTargetLock()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var position = new Position(100, 200, 45);
         var agent0 = new SimpleAgent("Alpha", Team.REBEL);
         var attacker = new Token(store, Pilot.LUKE_SKYWALKER, agent0);
         var agent1 = new SimpleAgent("Bravo", Team.IMPERIAL);
         var defender = new Token(store, Pilot.ACADEMY_PILOT, agent1);
         assert.equal(store.getState().targetLocks.size, 0);
         var targetLock = Immutable.Map(
         {
            attackerId: attacker.id(),
            defenderId: defender.id(),
            id: "A",
         });

         // Run.
         store.dispatch(Action.addTargetLock(targetLock));

         // Verify.
         assert.equal(store.getState().targetLocks.size, 1);
         assert.equal(store.getState().targetLocks.get(0).get("id"), "A");
         assert.equal(store.getState().targetLocks.get(0).get("attackerId"), attacker.id());
         assert.equal(store.getState().targetLocks.get(0).get("defenderId"), defender.id());
      });

      QUnit.test("dequeueEvent()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent("Rebel", Team.REBEL);
         var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
         store.dispatch(Action.placeToken(new Position(100, 200, 45), token));
         var token2 = new Token(store, Pilot.BIGGS_DARKLIGHTER, agent);
         store.dispatch(Action.placeToken(new Position(200, 200, 45), token2));

         store.dispatch(Action.enqueueEvent(Event.AFTER_EXECUTE_MANEUVER, token));
         store.dispatch(Action.enqueueEvent(Event.SHIP_ACTION_PERFORMED, token2));

         assert.equal(store.getState().eventQueue.size, 2);
         var eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), Event.AFTER_EXECUTE_MANEUVER);
         assert.equal(eventData0.get("eventToken"), token);
         var eventData1 = store.getState().eventQueue.get(1);
         assert.ok(eventData1);
         assert.equal(eventData1.get("eventKey"), Event.SHIP_ACTION_PERFORMED);
         assert.equal(eventData1.get("eventToken"), token2);

         // Run.
         store.dispatch(Action.dequeueEvent());

         // Verify.
         assert.equal(store.getState().eventQueue.size, 1);
         eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), Event.SHIP_ACTION_PERFORMED);
         assert.equal(eventData0.get("eventToken"), token2);

         // Run.
         store.dispatch(Action.dequeueEvent());

         // Verify.
         assert.equal(store.getState().eventQueue.size, 0);
      });

      QUnit.test("dequeuePhase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent("Rebel", Team.REBEL);
         var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
         store.dispatch(Action.placeToken(new Position(100, 200, 45), token));
         var token2 = new Token(store, Pilot.BIGGS_DARKLIGHTER, agent);
         store.dispatch(Action.placeToken(new Position(200, 200, 45), token2));

         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_REVEAL_DIAL, token));
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_EXECUTE_MANEUVER, token2));

         assert.equal(store.getState().phaseQueue.size, 2);
         var phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ACTIVATION_REVEAL_DIAL);
         assert.equal(phaseData0.get("phaseToken"), token);
         var phaseData1 = store.getState().phaseQueue.get(1);
         assert.ok(phaseData1);
         assert.equal(phaseData1.get("phaseKey"), Phase.ACTIVATION_EXECUTE_MANEUVER);
         assert.equal(phaseData1.get("phaseToken"), token2);

         // Run.
         store.dispatch(Action.dequeuePhase());

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 1);
         phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ACTIVATION_EXECUTE_MANEUVER);
         assert.equal(phaseData0.get("phaseToken"), token2);

         // Run.
         store.dispatch(Action.dequeuePhase());

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 0);
      });

      QUnit.test("discardDamage()", function(assert)
      {
         // Setup.
         var damageDeck = DamageCard.createDeckV2();
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
         var damageDeck = DamageCard.createDeckV2();
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

      QUnit.test("enqueueEvent()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent("Rebel", Team.REBEL);
         var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
         store.dispatch(Action.placeToken(new Position(100, 200, 45), token));
         assert.equal(store.getState().eventQueue.size, 0);

         // Run.
         store.dispatch(Action.enqueueEvent(Event.AFTER_EXECUTE_MANEUVER, token));

         // Verify.
         assert.equal(store.getState().eventQueue.size, 1);
         var eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), Event.AFTER_EXECUTE_MANEUVER);
         assert.equal(eventData0.get("eventToken"), token);

         // Run.
         var token2 = new Token(store, Pilot.BIGGS_DARKLIGHTER, agent);
         store.dispatch(Action.placeToken(new Position(200, 200, 45), token2));
         store.dispatch(Action.enqueueEvent(Event.SHIP_ACTION_PERFORMED, token2));

         // Verify.
         assert.equal(store.getState().eventQueue.size, 2);
         eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), Event.AFTER_EXECUTE_MANEUVER);
         assert.equal(eventData0.get("eventToken"), token);
         var eventData1 = store.getState().eventQueue.get(1);
         assert.ok(eventData1);
         assert.equal(eventData1.get("eventKey"), Event.SHIP_ACTION_PERFORMED);
         assert.equal(eventData1.get("eventToken"), token2);
      });

      QUnit.test("enqueuePhase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent("Rebel", Team.REBEL);
         var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);
         store.dispatch(Action.placeToken(new Position(100, 200, 45), token));
         assert.equal(store.getState().phaseQueue.size, 0);

         // Run.
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_REVEAL_DIAL, token));

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 1);
         var phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ACTIVATION_REVEAL_DIAL);
         assert.equal(phaseData0.get("phaseToken"), token);

         // Run.
         var token2 = new Token(store, Pilot.BIGGS_DARKLIGHTER, agent);
         store.dispatch(Action.placeToken(new Position(200, 200, 45), token2));
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_EXECUTE_MANEUVER, token2));

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 2);
         phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ACTIVATION_REVEAL_DIAL);
         assert.equal(phaseData0.get("phaseToken"), token);
         var phaseData1 = store.getState().phaseQueue.get(1);
         assert.ok(phaseData1);
         assert.equal(phaseData1.get("phaseKey"), Phase.ACTIVATION_EXECUTE_MANEUVER);
         assert.equal(phaseData1.get("phaseToken"), token2);
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
         assert.equal(store.getState().tokens.keySeq().size, 1);

         var token0 = Token.get(store, token.id());
         assert.ok(token0.equals(token));
         assert.equal(store.getState().tokenIdToPosition[token.id()], fromPosition);

         // Run.
         store.dispatch(Action.moveToken(fromPosition, toPosition));

         // Verify.
         assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
         assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
         assert.equal(store.getState().tokens.keySeq().size, 1);

         var token1 = Token.get(store, token.id());
         assert.ok(token1.equals(token));
         assert.equal(store.getState().tokenIdToPosition[token.id()], toPosition);
      });

      QUnit.test("placeToken()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var position = new Position(100, 200, 45);
         var agent = new SimpleAgent("Charlie", Team.REBEL);
         assert.equal(Object.keys(store.getState().positionToTokenId).length, 0);
         assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 0);
         assert.equal(store.getState().tokens.keySeq().size, 0);
         var token = new Token(store, Pilot.LUKE_SKYWALKER, agent);

         // Run.
         store.dispatch(Action.placeToken(position, token));

         // Verify.
         assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
         assert.equal(store.getState().positionToTokenId[position], token.id(), "positionToTokenId[position] = " + store.getState().positionToTokenId[position]);
         assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
         assert.equal(store.getState().tokenIdToPosition[token.id()], position, "tokenIdToPosition[" + token.id() + "] = " + store.getState().tokenIdToPosition[token.id()]);
         assert.equal(store.getState().tokens.keySeq().size, 1);
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
         var targetLock = TargetLock.newInstance(store, attacker, defender);
         //  store.dispatch(Action.addTargetLock(targetLock));
         assert.equal(store.getState().targetLocks.size, 1);
         assert.equal(store.getState().targetLocks.get(0).get("id"), "A");
         assert.equal(store.getState().targetLocks.get(0).get("attackerId"), attacker.id());
         assert.equal(store.getState().targetLocks.get(0).get("defenderId"), defender.id());

         // Run.
         //  store.dispatch(Action.removeTargetLock(targetLock));
         targetLock.delete();

         // Verify.
         assert.equal(store.getState().targetLocks.size, 0);
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
         assert.equal(store.getState().tokens.keySeq().size, 2);

         // Run.
         store.dispatch(Action.removeToken( /* position0, */ token0));

         // Verify.
         assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
         assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
         assert.equal(store.getState().tokens.keySeq().size, 1);
      });

      QUnit.test("removeTokenAt()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         store.dispatch(Action.setEnvironment(environment));
         var agent = new SimpleAgent("Charlie", Team.REBEL);
         var position0 = new Position(10, 20, 0);
         var token0 = new Token(store, Pilot.LUKE_SKYWALKER, agent);
         store.dispatch(Action.placeToken(position0, token0));
         var position1 = new Position(100, 200, 45);
         var token1 = new Token(store, Pilot.HAN_SOLO, agent);
         store.dispatch(Action.placeToken(position1, token1));
         assert.equal(Object.keys(store.getState().positionToTokenId).length, 2);
         assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 2);
         assert.equal(store.getState().tokens.keySeq().size, 2);

         // Run.
         store.dispatch(Action.removeTokenAt(position0));

         // Verify.
         assert.equal(Object.keys(store.getState().positionToTokenId).length, 1);
         assert.equal(Object.keys(store.getState().tokenIdToPosition).length, 1);
         assert.equal(store.getState().tokens.keySeq().size, 1);
      });

      QUnit.test("replenishDamageDeck()", function(assert)
      {
         // Setup.
         var damageDeck = DamageCard.createDeckV2();
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
         var token0 = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var token1 = new Token(store, Pilot.ROOKIE_PILOT, new SimpleAgent("Rebel", Team.REBEL));
         assert.ok(!store.getState().activeTokenId);

         // Run.
         store.dispatch(Action.setActiveToken(token0));

         // Verify.
         assert.equal(store.getState().activeTokenId, token0.id());

         // Run.
         store.dispatch(Action.setActiveToken(token1));

         // Verify.
         assert.equal(store.getState().activeTokenId, token1.id());
      });

      QUnit.test("setDamageDeck()", function(assert)
      {
         // Setup.
         var damageDeck = DamageCard.createDeckV2();
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

      QUnit.test("setTokenActivationAction()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var activationAction = {};
         assert.ok(!store.getState().tokenIdToActivationAction[token.id()]);

         // Run.
         store.dispatch(Action.setTokenActivationAction(token.id(), activationAction));

         // Verify.
         assert.ok(store.getState().tokenIdToActivationAction[token.id()]);
         assert.equal(store.getState().tokenIdToActivationAction[token.id()], activationAction);
      });

      QUnit.test("setTokenAttackDice()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         assert.ok(store.getState().tokenIdToAttackDice[token.id()] === undefined);
         var attackDice = new AttackDice(store, token.id(), 3);

         // Run.
         store.dispatch(Action.setTokenAttackDice(token.id(), attackDice.values()));

         // Verify.
         assert.ok(store.getState().tokenIdToAttackDice[token.id()] !== undefined);
         assert.equal(store.getState().tokenIdToAttackDice[token.id()], attackDice.values());
      });

      QUnit.test("setTokenCombatAction()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var combatAction = {};
         assert.ok(!store.getState().tokenIdToCombatAction[token.id()]);

         // Run.
         store.dispatch(Action.setTokenCombatAction(token, combatAction));

         // Verify.
         assert.ok(store.getState().tokenIdToCombatAction[token.id()]);
         assert.equal(store.getState().tokenIdToCombatAction[token.id()], combatAction);
      });

      QUnit.test("setTokenDamageDealer()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damageDealer = {};
         assert.ok(!store.getState().tokenIdToDamageDealer[token.id()]);

         // Run.
         store.dispatch(Action.setTokenDamageDealer(token, damageDealer));

         // Verify.
         assert.ok(store.getState().tokenIdToDamageDealer[token.id()]);
         assert.equal(store.getState().tokenIdToDamageDealer[token.id()], damageDealer);
      });

      QUnit.test("setTokenDefenderHit()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         assert.ok(!store.getState().tokenIdToIsDefenderHit[token.id()]);

         // Run.
         store.dispatch(Action.setTokenDefenderHit(token, true));

         // Verify.
         assert.equal(store.getState().tokenIdToIsDefenderHit[token.id()], true);

         // Run.
         store.dispatch(Action.setTokenDefenderHit(token, false));

         // Verify.
         assert.equal(store.getState().tokenIdToIsDefenderHit[token.id()], false);
      });

      QUnit.test("setTokenDefenseDice()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         assert.ok(store.getState().tokenIdToDefenseDice[token.id()] === undefined);
         var defenseDice = new DefenseDice(store, token.id(), 3);

         // Run.
         store.dispatch(Action.setTokenDefenseDice(token.id(), defenseDice.values()));

         // Verify.
         assert.ok(store.getState().tokenIdToDefenseDice[token.id()] !== undefined);
         assert.equal(store.getState().tokenIdToDefenseDice[token.id()], defenseDice.values());
      });

      QUnit.test("setTokenInFiringArc()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         assert.ok(!store.getState().tokenIdToIsInFiringArc[token.id()]);

         // Run.
         store.dispatch(Action.setTokenInFiringArc(token, true));

         // Verify.
         assert.equal(store.getState().tokenIdToIsInFiringArc[token.id()], true);

         // Run.
         store.dispatch(Action.setTokenInFiringArc(token, false));

         // Verify.
         assert.equal(store.getState().tokenIdToIsInFiringArc[token.id()], false);
      });

      QUnit.test("setTokenManeuver()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var maneuverKey0 = Maneuver.STRAIGHT_1_STANDARD;
         var maneuverKey1 = Maneuver.BANK_RIGHT_2_STANDARD;
         assert.ok(!store.getState().tokenIdToManeuver[token.id()]);

         // Run.
         var maneuver0 = Maneuver.properties[maneuverKey0];
         store.dispatch(Action.setTokenManeuver(token, maneuver0));

         // Verify.
         assert.ok(store.getState().tokenIdToManeuver[token.id()]);
         assert.equal(store.getState().tokenIdToManeuver[token.id()], maneuver0);

         // Run.
         var maneuver1 = Maneuver.properties[maneuverKey1];
         store.dispatch(Action.setTokenManeuver(token, maneuver1));

         // Verify.
         assert.ok(store.getState().tokenIdToManeuver[token.id()]);
         assert.equal(store.getState().tokenIdToManeuver[token.id()], maneuver1);
      });

      QUnit.test("setTokenManeuverAction()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var maneuverAction = {};
         assert.ok(!store.getState().tokenIdToManeuverAction[token.id()]);

         // Run.
         store.dispatch(Action.setTokenManeuverAction(token.id(), maneuverAction));

         // Verify.
         assert.ok(store.getState().tokenIdToManeuverAction[token.id()]);
         assert.equal(store.getState().tokenIdToManeuverAction[token.id()], maneuverAction);
      });

      QUnit.test("setTokenRange()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var rangeKey = RangeRuler.TWO;
         assert.ok(!store.getState().tokenIdToRange[token.id()]);

         // Run.
         store.dispatch(Action.setTokenRange(token, rangeKey));

         // Verify.
         assert.ok(store.getState().tokenIdToRange[token.id()]);
         assert.equal(store.getState().tokenIdToRange[token.id()], rangeKey);
      });

      QUnit.test("setTokenTouching()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         assert.ok(!store.getState().tokenIdToIsTouching[token.id()]);

         // Run.
         store.dispatch(Action.setTokenTouching(token, true));

         // Verify.
         assert.equal(store.getState().tokenIdToIsTouching[token.id()], true);

         // Run.
         store.dispatch(Action.setTokenTouching(token, false));

         // Verify.
         assert.equal(store.getState().tokenIdToIsTouching[token.id()], false);
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
   });
