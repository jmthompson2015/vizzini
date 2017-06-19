define(["Count", "DamageCard", "Maneuver", "Phase", "Pilot", "PlayFormat", "Position", "RangeRuler", "process/AttackDice", "process/DefenseDice", "process/SimpleAgent", "process/TargetLock", "Team", "process/Token", "UpgradeCard", "Value", "process/Action", "process/Reducer"],
   function(Count, DamageCard, Maneuver, Phase, Pilot, PlayFormat, Position, RangeRuler, AttackDice, DefenseDice, SimpleAgent, TargetLock, Team, Token, UpgradeCard, Value, Action, Reducer)
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
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damageKey0 = DamageCard.BLINDED_PILOT;
         var damageKey1 = DamageCard.CONSOLE_FIRE;
         assert.ok(!store.getState().tokenIdToDamages[token.id()]);

         // Run.
         store.dispatch(Action.addTokenDamage(token, damageKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(Action.addTokenDamage(token, damageKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);
         assert.equal(store.getState().tokenIdToDamages[token.id()][1], damageKey1);
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
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
         var upgradeKey1 = UpgradeCard.CALCULATION;
         assert.ok(!store.getState().tokenIdToUpgradeEnergy[token.id()]);

         // Run.
         store.dispatch(Action.addTokenUpgradeEnergy(token, upgradeKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0]);
         assert.ok(!store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);

         // Run.
         store.dispatch(Action.addTokenUpgradeEnergy(token, upgradeKey1, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0]);
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1], 2);
      });

      QUnit.test("addTokenUpgradePerRound()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
         var upgradeKey1 = UpgradeCard.CALCULATION;

         // Run.
         store.dispatch(Action.addTokenUpgradePerRound(token, upgradeKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()]);
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey0]);
         assert.ok(!store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey1]);
         assert.equal(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey0], 1);

         // Run.
         store.dispatch(Action.addTokenUpgradePerRound(token, upgradeKey1, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()]);
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey0]);
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey1]);
         assert.equal(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey0], 1);
         assert.equal(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey1], 2);
      });

      QUnit.test("addTokenUsedDamage()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damageKey0 = DamageCard.BLINDED_PILOT;
         var damageKey1 = DamageCard.CONSOLE_FIRE;
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()].length, 0);

         // Run.
         store.dispatch(Action.addTokenUsedDamage(token, damageKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedDamages[token.id()]);
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(Action.addTokenUsedDamage(token, damageKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedDamages[token.id()]);
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()][0], damageKey0);
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()][1], damageKey1);
      });

      QUnit.test("addTokenUsedPilot()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var pilotKey0 = Pilot.ACADEMY_PILOT;
         var pilotKey1 = Pilot.AIREN_CRACKEN;
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()].length, 0);

         // Run.
         store.dispatch(Action.addTokenUsedPilot(token, pilotKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedPilots[token.id()]);
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()][0], pilotKey0);

         // Run.
         store.dispatch(Action.addTokenUsedPilot(token, pilotKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedPilots[token.id()]);
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()][0], pilotKey0);
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()][1], pilotKey1);
      });

      QUnit.test("addTokenUsedUpgrade()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var upgradeKey0 = UpgradeCard.A_WING_TEST_PILOT;
         var upgradeKey1 = UpgradeCard.ACCURACY_CORRECTOR;
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()].length, 0);

         // Run.
         store.dispatch(Action.addTokenUsedUpgrade(token, upgradeKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()][0], upgradeKey0);

         // Run.
         store.dispatch(Action.addTokenUsedUpgrade(token, upgradeKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()][0], upgradeKey0);
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()][1], upgradeKey1);
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

      QUnit.test("clearTokenUsedDamages()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damageKey0 = DamageCard.BLINDED_PILOT;
         var damageKey1 = DamageCard.CONSOLE_FIRE;
         store.dispatch(Action.addTokenUsedDamage(token, damageKey0));
         store.dispatch(Action.addTokenUsedDamage(token, damageKey1));
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()].length, 2);

         // Run.
         store.dispatch(Action.clearTokenUsedDamages(token));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedDamages[token.id()]);
         assert.equal(store.getState().tokenIdToUsedDamages[token.id()].length, 0);
      });

      QUnit.test("clearTokenUsedPilots()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var pilotKey0 = Pilot.ACADEMY_PILOT;
         var pilotKey1 = Pilot.AIREN_CRACKEN;
         store.dispatch(Action.addTokenUsedPilot(token, pilotKey0));
         store.dispatch(Action.addTokenUsedPilot(token, pilotKey1));
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()].length, 2);

         // Run.
         store.dispatch(Action.clearTokenUsedPilots(token));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedPilots[token.id()]);
         assert.equal(store.getState().tokenIdToUsedPilots[token.id()].length, 0);
      });

      QUnit.test("clearTokenUsedUpgrades()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var upgradeKey0 = UpgradeCard.A_WING_TEST_PILOT;
         var upgradeKey1 = UpgradeCard.ACCURACY_CORRECTOR;
         store.dispatch(Action.addTokenUsedUpgrade(token, upgradeKey0));
         store.dispatch(Action.addTokenUsedUpgrade(token, upgradeKey1));
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()].length, 2);

         // Run.
         store.dispatch(Action.clearTokenUsedUpgrades(token));

         // Verify.
         assert.ok(store.getState().tokenIdToUsedUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUsedUpgrades[token.id()].length, 0);
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
         var targetLock = new TargetLock(store, attacker.id(), defender.id());
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
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damageKey0 = DamageCard.BLINDED_PILOT;
         var damageKey1 = DamageCard.CONSOLE_FIRE;
         store.dispatch(Action.addTokenDamage(token, damageKey0));
         store.dispatch(Action.addTokenDamage(token, damageKey1));
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);
         assert.equal(store.getState().tokenIdToDamages[token.id()][1], damageKey1);

         // Run.
         store.dispatch(Action.removeTokenDamage(token, damageKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(Action.removeTokenDamage(token, damageKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 0);
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
         var damageDeck = DamageCard.createDeckV2();
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

      QUnit.test("setTokenActivationAction()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var activationAction = {};
         assert.ok(!store.getState().tokenIdToActivationAction[token.id()]);

         // Run.
         store.dispatch(Action.setTokenActivationAction(token, activationAction));

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

      QUnit.test("setTokenUpgradeEnergy()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
         var upgradeKey1 = UpgradeCard.CALCULATION;
         assert.ok(!store.getState().tokenIdToUpgradeEnergy[token.id()]);

         // Run.
         store.dispatch(Action.setTokenUpgradeEnergy(token, upgradeKey0, 1));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);
         assert.ok(!store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1], 0);

         // Run.
         store.dispatch(Action.setTokenUpgradeEnergy(token, upgradeKey1, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1], 2);
      });

      QUnit.test("setTokenUpgradePerRound()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var upgradeKey0 = UpgradeCard.ADRENALINE_RUSH;
         var upgradeKey1 = UpgradeCard.CALCULATION;

         // Run.
         store.dispatch(Action.setTokenUpgradePerRound(token, upgradeKey0, 1));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()]);
         assert.equal(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey0], 1);
         assert.ok(!store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey1], 0);

         // Run.
         store.dispatch(Action.setTokenUpgradePerRound(token, upgradeKey1, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradePerRound[token.id()]);
         assert.equal(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey0], 1);
         assert.equal(store.getState().tokenIdToUpgradePerRound[token.id()][upgradeKey1], 2);
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
