define(["Ability", "Count", "DamageCard", "Phase", "Pilot", "Position", "ShipAction", "Team", "UpgradeCard",
  "process/Action", "process/DamageAbility3", "process/PilotAbility3", "process/Reducer", "process/ShipActionAbility", "process/SimpleAgent", "process/Token", "process/TokenAction", "process/UpgradeAbility3"],
   function(Ability, Count, DamageCard, Phase, Pilot, Position, ShipAction, Team, UpgradeCard,
      Action, DamageAbility3, PilotAbility3, Reducer, ShipActionAbility, SimpleAgent, Token, TokenAction, UpgradeAbility3)
   {
      "use strict";
      QUnit.module("TokenReducer");

      QUnit.test("addCloakCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.CLOAK;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addCloakCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addCloakCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = "focus";
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addCount(token, property));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addCount(token, property, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);

         // Run.
         store.dispatch(TokenAction.addCount(token, property, -4));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);
      });

      QUnit.test("addEnergyCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.ENERGY;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addEnergyCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addEnergyCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addEvadeCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.EVADE;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addEvadeCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addEvadeCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addFocusCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.FOCUS;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addFocusCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addFocusCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addIonCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.ION;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addIonCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addIonCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addReinforceCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.REINFORCE;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addReinforceCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addReinforceCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addShieldCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.SHIELD;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addShieldCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addShieldCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("addStressCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.STRESS;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addStressCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addStressCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
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
         store.dispatch(TokenAction.addTokenCriticalDamage(token, damageKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(TokenAction.addTokenCriticalDamage(token, damageKey1));

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
         store.dispatch(TokenAction.addTokenDamage(token, damageKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(TokenAction.addTokenDamage(token, damageKey1));

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
         store.dispatch(TokenAction.addTokenUpgrade(token, upgradeKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);

         // Run.
         store.dispatch(TokenAction.addTokenUpgrade(token, upgradeKey1));

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
         store.dispatch(TokenAction.addTokenUpgradeEnergy(token, upgradeKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0]);
         assert.ok(!store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);

         // Run.
         store.dispatch(TokenAction.addTokenUpgradeEnergy(token, upgradeKey1, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0]);
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1], 2);
      });

      QUnit.test("addTokenUsedAbility()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         assert.equal(token.usedAbilities().length, 0);

         // Run.
         store.dispatch(TokenAction.addTokenUsedAbility(token, damage));

         // Verify.
         assert.equal(token.usedAbilities().length, 1);
         assert.equal(token.usedAbilities()[0].source(), DamageCard);

         // Run.
         store.dispatch(TokenAction.addTokenUsedAbility(token, pilot));

         // Verify.
         assert.equal(token.usedAbilities().length, 2);
         assert.equal(token.usedAbilities()[0].source(), DamageCard);
         assert.equal(token.usedAbilities()[1].source(), Pilot);

         // Run.
         store.dispatch(TokenAction.addTokenUsedAbility(token, shipAction));

         // Verify.
         assert.equal(token.usedAbilities().length, 3);
         assert.equal(token.usedAbilities()[0].source(), DamageCard);
         assert.equal(token.usedAbilities()[1].source(), Pilot);
         assert.equal(token.usedAbilities()[2].source(), ShipAction);

         // Run.
         store.dispatch(TokenAction.addTokenUsedAbility(token, upgrade));

         // Verify.
         assert.equal(token.usedAbilities().length, 4);
         assert.equal(token.usedAbilities()[0].source(), DamageCard);
         assert.equal(token.usedAbilities()[1].source(), Pilot);
         assert.equal(token.usedAbilities()[2].source(), ShipAction);
         assert.equal(token.usedAbilities()[3].source(), UpgradeCard);
      });

      QUnit.test("addTokenUsedPerRoundAbility()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         assert.equal(token.usedPerRoundAbilities().length, 0);

         // Run.
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, damage));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 1);
         assert.equal(token.usedPerRoundAbilities()[0].source(), DamageCard);

         // Run.
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, pilot));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 2);
         assert.equal(token.usedPerRoundAbilities()[0].source(), DamageCard);
         assert.equal(token.usedPerRoundAbilities()[1].source(), Pilot);

         // Run.
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, shipAction));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 3);
         assert.equal(token.usedPerRoundAbilities()[0].source(), DamageCard);
         assert.equal(token.usedPerRoundAbilities()[1].source(), Pilot);
         assert.equal(token.usedPerRoundAbilities()[2].source(), ShipAction);

         // Run.
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, upgrade));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 4);
         assert.equal(token.usedPerRoundAbilities()[0].source(), DamageCard);
         assert.equal(token.usedPerRoundAbilities()[1].source(), Pilot);
         assert.equal(token.usedPerRoundAbilities()[2].source(), ShipAction);
         assert.equal(token.usedPerRoundAbilities()[3].source(), UpgradeCard);
      });

      QUnit.test("addWeaponsDisabledCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.WEAPONS_DISABLED;
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 0);

         // Run.
         store.dispatch(TokenAction.addWeaponsDisabledCount(token));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.addWeaponsDisabledCount(token, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 3);
      });

      QUnit.test("clearTokenUsedAbilities()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(TokenAction.addTokenUsedAbility(token, damage));
         store.dispatch(TokenAction.addTokenUsedAbility(token, pilot));
         store.dispatch(TokenAction.addTokenUsedAbility(token, shipAction));
         store.dispatch(TokenAction.addTokenUsedAbility(token, upgrade));
         assert.equal(token.usedAbilities().length, 4);

         // Run.
         store.dispatch(TokenAction.clearTokenUsedAbilities(token));

         // Verify.
         assert.equal(token.usedAbilities().length, 0);
      });

      QUnit.test("clearTokenUsedPerRoundAbilities()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, damage));
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, pilot));
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, shipAction));
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, upgrade));
         assert.equal(token.usedPerRoundAbilities().length, 4);

         // Run.
         store.dispatch(TokenAction.clearTokenUsedPerRoundAbilities(token));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 0);
      });

      QUnit.test("incrementNextTokenId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().nextTokenId, 1);

         // Run.
         store.dispatch(TokenAction.incrementNextTokenId());

         // Verify.
         assert.equal(store.getState().nextTokenId, 2);

         // Run.
         store.dispatch(TokenAction.incrementNextTokenId());

         // Verify.
         assert.equal(store.getState().nextTokenId, 3);
      });

      QUnit.test("removeTokenCriticalDamage()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var damageKey0 = DamageCard.BLINDED_PILOT;
         var damageKey1 = DamageCard.CONSOLE_FIRE;
         store.dispatch(TokenAction.addTokenCriticalDamage(token, damageKey0));
         store.dispatch(TokenAction.addTokenCriticalDamage(token, damageKey1));
         assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][1], damageKey1);

         // Run.
         store.dispatch(TokenAction.removeTokenCriticalDamage(token, damageKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToCriticalDamages[token.id()]);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToCriticalDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(TokenAction.removeTokenCriticalDamage(token, damageKey0));

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
         store.dispatch(TokenAction.addTokenDamage(token, damageKey0));
         store.dispatch(TokenAction.addTokenDamage(token, damageKey1));
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);
         assert.equal(store.getState().tokenIdToDamages[token.id()][1], damageKey1);

         // Run.
         store.dispatch(TokenAction.removeTokenDamage(token, damageKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToDamages[token.id()]);
         assert.equal(store.getState().tokenIdToDamages[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToDamages[token.id()][0], damageKey0);

         // Run.
         store.dispatch(TokenAction.removeTokenDamage(token, damageKey0));

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
         store.dispatch(TokenAction.addTokenUpgrade(token, upgradeKey0));
         store.dispatch(TokenAction.addTokenUpgrade(token, upgradeKey1));
         assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 2);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()][1], upgradeKey1);

         // Run.
         store.dispatch(TokenAction.removeTokenUpgrade(token, upgradeKey1));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 1);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()][0], upgradeKey0);

         // Run.
         store.dispatch(TokenAction.removeTokenUpgrade(token, upgradeKey0));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgrades[token.id()]);
         assert.equal(store.getState().tokenIdToUpgrades[token.id()].length, 0);
      });

      QUnit.test("removeTokenUsedAbility()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(TokenAction.addTokenUsedAbility(token, damage));
         store.dispatch(TokenAction.addTokenUsedAbility(token, pilot));
         store.dispatch(TokenAction.addTokenUsedAbility(token, shipAction));
         store.dispatch(TokenAction.addTokenUsedAbility(token, upgrade));
         assert.equal(token.usedAbilities().length, 4);
         assert.equal(token.usedAbilities()[0].source(), DamageCard);
         assert.equal(token.usedAbilities()[1].source(), Pilot);
         assert.equal(token.usedAbilities()[2].source(), ShipAction);
         assert.equal(token.usedAbilities()[3].source(), UpgradeCard);

         // Run.
         store.dispatch(TokenAction.removeTokenUsedAbility(token, shipAction));

         // Verify.
         assert.equal(token.usedAbilities().length, 3);
         assert.equal(token.usedAbilities()[0].source(), DamageCard);
         assert.equal(token.usedAbilities()[1].source(), Pilot);
         assert.equal(token.usedAbilities()[2].source(), UpgradeCard);

         // Run.
         store.dispatch(TokenAction.removeTokenUsedAbility(token, damage));

         // Verify.
         assert.equal(token.usedAbilities().length, 2);
         assert.equal(token.usedAbilities()[0].source(), Pilot);
         assert.equal(token.usedAbilities()[1].source(), UpgradeCard);

         // Run.
         store.dispatch(TokenAction.removeTokenUsedAbility(token, upgrade));

         // Verify.
         assert.equal(token.usedAbilities().length, 1);
         assert.equal(token.usedAbilities()[0].source(), Pilot);
      });

      QUnit.test("removeTokenUsedPerRoundAbility()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, damage));
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, pilot));
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, shipAction));
         store.dispatch(TokenAction.addTokenUsedPerRoundAbility(token, upgrade));
         assert.equal(token.usedPerRoundAbilities().length, 4);
         assert.equal(token.usedPerRoundAbilities()[0].source(), DamageCard);
         assert.equal(token.usedPerRoundAbilities()[1].source(), Pilot);
         assert.equal(token.usedPerRoundAbilities()[2].source(), ShipAction);
         assert.equal(token.usedPerRoundAbilities()[3].source(), UpgradeCard);

         // Run.
         store.dispatch(TokenAction.removeTokenUsedPerRoundAbility(token, shipAction));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 3);
         assert.equal(token.usedPerRoundAbilities()[0].source(), DamageCard);
         assert.equal(token.usedPerRoundAbilities()[1].source(), Pilot);
         assert.equal(token.usedPerRoundAbilities()[2].source(), UpgradeCard);

         // Run.
         store.dispatch(TokenAction.removeTokenUsedPerRoundAbility(token, damage));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 2);
         assert.equal(token.usedPerRoundAbilities()[0].source(), Pilot);
         assert.equal(token.usedPerRoundAbilities()[1].source(), UpgradeCard);

         // Run.
         store.dispatch(TokenAction.removeTokenUsedPerRoundAbility(token, upgrade));

         // Verify.
         assert.equal(token.usedPerRoundAbilities().length, 1);
         assert.equal(token.usedPerRoundAbilities()[0].source(), Pilot);
      });

      QUnit.test("setCloakCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.CLOAK;
         store.dispatch(TokenAction.addCloakCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setCloakCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = "focus";
         store.dispatch(TokenAction.addCount(token, property));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setCount(token, property, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setEnergyCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.ENERGY;
         store.dispatch(TokenAction.addEnergyCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setEnergyCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setEvadeCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.EVADE;
         store.dispatch(TokenAction.addEvadeCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setEvadeCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setFocusCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.FOCUS;
         store.dispatch(TokenAction.addFocusCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setFocusCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setIonCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.ION;
         store.dispatch(TokenAction.addIonCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setIonCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setReinforceCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.REINFORCE;
         store.dispatch(TokenAction.addReinforceCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setReinforceCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setShieldCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.SHIELD;
         store.dispatch(TokenAction.addShieldCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setShieldCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });

      QUnit.test("setStressCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.STRESS;
         store.dispatch(TokenAction.addStressCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setStressCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
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
         store.dispatch(TokenAction.setTokenUpgradeEnergy(token, upgradeKey0, 1));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);
         assert.ok(!store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1], 0);

         // Run.
         store.dispatch(TokenAction.setTokenUpgradeEnergy(token, upgradeKey1, 2));

         // Verify.
         assert.ok(store.getState().tokenIdToUpgradeEnergy[token.id()]);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey0], 1);
         assert.equal(store.getState().tokenIdToUpgradeEnergy[token.id()][upgradeKey1], 2);
      });

      QUnit.test("setWeaponsDisabledCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         store.dispatch(Action.placeToken(new Position(10, 20, 30), token));
         var property = Count.WEAPONS_DISABLED;
         store.dispatch(TokenAction.addWeaponsDisabledCount(token));
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 1);

         // Run.
         store.dispatch(TokenAction.setWeaponsDisabledCount(token, 12));

         // Verify.
         assert.ok(store.getState().tokenIdToCounts.get(token.id()));
         assert.equal(store.getState().tokenIdToCounts.get(token.id()).get(property), 12);
      });
   });
