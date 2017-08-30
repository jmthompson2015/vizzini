define(["Ability", "DamageCard", "Phase", "Pilot", "Position", "ShipAction", "Team", "UpgradeCard", "Value",
  "process/Action", "process/DamageAbility3", "process/EnvironmentFactory", "process/PilotAbility3", "process/Reducer", "process/Selector", "process/ShipActionAbility", "process/SimpleAgent", "process/Token", "process/UpgradeAbility3"],
   function(Ability, DamageCard, Phase, Pilot, Position, ShipAction, Team, UpgradeCard, Value,
      Action, DamageAbility3, EnvironmentFactory, PilotAbility3, Reducer, Selector, ShipActionAbility, SimpleAgent, Token, UpgradeAbility3)
   {
      "use strict";
      QUnit.module("Selector");

      QUnit.test("activeToken()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[0];

         // Run.
         var result = Selector.activeToken(store.getState());

         // Verify.
         assert.ok(!result);

         // Run.
         store.dispatch(Action.setActiveToken(token));
         result = Selector.activeToken(store.getState());

         // Verify.
         assert.ok(result);
         assert.equal(result, token);
      });

      QUnit.test("cloakCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setCloakCount(token0));

         // Run / Verify.
         assert.equal(token0.cloakCount(), 0);

         // Setup.
         store.dispatch(Action.addCloakCount(token0));

         // Run / Verify.
         assert.equal(token0.cloakCount(), 1);
      });

      QUnit.test("count()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         var property0 = "focus";

         // Run / Verify.
         assert.equal(Selector.count(store.getState(), token0.id(), property0), 0);

         // Setup.
         store.dispatch(Action.addCount(token0, property0));

         // Run / Verify.
         assert.equal(Selector.count(store.getState(), token0.id(), property0), 1);

         // Setup.
         store.dispatch(Action.addCount(token0, property0, 2));

         // Run / Verify.
         assert.equal(Selector.count(store.getState(), token0.id(), property0), 3);
      });

      QUnit.test("criticalDamages()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];

         // Run.
         var result = Selector.criticalDamages(store.getState(), token0.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 0);

         // Setup.
         store.dispatch(Action.addTokenCriticalDamage(token0, DamageCard.BLINDED_PILOT));

         // Run.
         result = Selector.criticalDamages(store.getState(), token0.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
      });

      QUnit.test("damages()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];

         // Run.
         var result = Selector.damages(store.getState(), token0.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 0);

         // Setup.
         store.dispatch(Action.addTokenDamage(token0, DamageCard.BLINDED_PILOT));

         // Run.
         result = Selector.damages(store.getState(), token0.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
      });

      QUnit.test("energyCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setEnergyCount(token0));

         // Run / Verify.
         assert.equal(token0.energyCount(), 0);

         // Setup.
         store.dispatch(Action.addEnergyCount(token0));

         // Run / Verify.
         assert.equal(token0.energyCount(), 1);
      });

      QUnit.test("evadeCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setEvadeCount(token0));

         // Run / Verify.
         assert.equal(token0.evadeCount(), 0);

         // Setup.
         store.dispatch(Action.addEvadeCount(token0));

         // Run / Verify.
         assert.equal(token0.evadeCount(), 1);
      });

      QUnit.test("focusCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setFocusCount(token0));

         // Run / Verify.
         assert.equal(token0.focusCount(), 0);

         // Setup.
         store.dispatch(Action.addFocusCount(token0));

         // Run / Verify.
         assert.equal(token0.focusCount(), 1);
      });

      QUnit.test("ionCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setIonCount(token0));

         // Run / Verify.
         assert.equal(token0.ionCount(), 0);

         // Setup.
         store.dispatch(Action.addIonCount(token0));

         // Run / Verify.
         assert.equal(token0.ionCount(), 1);
      });

      QUnit.test("position()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         var token1 = environment.tokens()[1];
         var token2 = environment.tokens()[2];

         // Run.
         var result = Selector.position(store.getState(), token0.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 305);
         assert.equal(result.y(), 20);
         assert.equal(result.heading(), 90);

         // Run.
         result = Selector.position(store.getState(), token1.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 610);
         assert.equal(result.y(), 20);
         assert.equal(result.heading(), 90);

         // Run.
         result = Selector.position(store.getState(), token2.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458);
         assert.equal(result.y(), 895);
         assert.equal(result.heading(), 270);
      });

      QUnit.test("reinforceCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setReinforceCount(token0));

         // Run / Verify.
         assert.equal(token0.reinforceCount(), 0);

         // Setup.
         store.dispatch(Action.addReinforceCount(token0));

         // Run / Verify.
         assert.equal(token0.reinforceCount(), 1);
      });

      QUnit.test("shieldCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setShieldCount(token0));

         // Run / Verify.
         assert.equal(token0.shieldCount(), 0);

         // Setup.
         store.dispatch(Action.addShieldCount(token0));

         // Run / Verify.
         assert.equal(token0.shieldCount(), 1);
      });

      QUnit.test("stressCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setStressCount(token0));

         // Run / Verify.
         assert.equal(token0.stressCount(), 0);

         // Setup.
         store.dispatch(Action.addStressCount(token0));

         // Run / Verify.
         assert.equal(token0.stressCount(store.getState(), token0), 1);
      });

      QUnit.test("token()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run.
         var result = Selector.token(environment.store().getState(), 1);

         // Verify.
         assert.ok(result);
         assert.equal(result.pilotKey(), Pilot.MAULER_MITHEL);

         // Run.
         result = Selector.token(environment.store().getState(), 2);

         // Verify.
         assert.ok(result);
         assert.equal(result.pilotKey(), Pilot.DARK_CURSE);

         // Run.
         result = Selector.token(environment.store().getState(), 3);

         // Verify.
         assert.ok(result);
         assert.equal(result.pilotKey(), Pilot.LUKE_SKYWALKER);
      });

      QUnit.test("tokenAt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var position0 = new Position(305, 20, 90);
         var position1 = new Position(610, 20, 90);
         var position2 = new Position(458, 895, 270);

         // Run.
         var result = Selector.tokenAt(environment.store().getState(), position0);

         // Verify.
         assert.ok(result);
         assert.equal(result.pilotKey(), Pilot.MAULER_MITHEL);

         // Run.
         result = Selector.tokenAt(environment.store().getState(), position1);

         // Verify.
         assert.ok(result);
         assert.equal(result.pilotKey(), Pilot.DARK_CURSE);

         // Run.
         result = Selector.tokenAt(environment.store().getState(), position2);

         // Verify.
         assert.ok(result);
         assert.equal(result.pilotKey(), Pilot.LUKE_SKYWALKER);
      });

      QUnit.test("upgrades()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2];

         // Run.
         var result = Selector.upgrades(store.getState(), token.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);

         // Setup.
         store.dispatch(Action.addTokenUpgrade(token, UpgradeCard.DEADEYE));

         // Run.
         result = Selector.upgrades(store.getState(), token.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 3);
      });

      QUnit.test("usedAbilities()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(Action.addTokenUsedAbility(token, damage));
         store.dispatch(Action.addTokenUsedAbility(token, pilot));
         store.dispatch(Action.addTokenUsedAbility(token, shipAction));
         store.dispatch(Action.addTokenUsedAbility(token, upgrade));

         // Run.
         var result = Selector.usedAbilities(store.getState(), token);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0].source(), DamageCard);
         assert.equal(result[1].source(), Pilot);
         assert.equal(result[2].source(), ShipAction);
         assert.equal(result[3].source(), UpgradeCard);
      });

      QUnit.test("usedAbilities() DamageCard", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage0 = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var damage1 = new Ability(DamageCard, DamageCard.CONSOLE_FIRE, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(Action.addTokenUsedAbility(token, damage0));
         store.dispatch(Action.addTokenUsedAbility(token, damage1));
         store.dispatch(Action.addTokenUsedAbility(token, pilot));
         store.dispatch(Action.addTokenUsedAbility(token, shipAction));
         store.dispatch(Action.addTokenUsedAbility(token, upgrade));

         // Run / Verify.
         assert.equal(Selector.usedAbilities(store.getState(), token, DamageCard).length, 2);
         assert.equal(Selector.usedAbilities(store.getState(), token, DamageCard)[0].source(), DamageCard);
         assert.equal(Selector.usedAbilities(store.getState(), token, DamageCard)[0].sourceKey(), DamageCard.BLINDED_PILOT);
         assert.equal(Selector.usedAbilities(store.getState(), token, DamageCard)[1].source(), DamageCard);
         assert.equal(Selector.usedAbilities(store.getState(), token, DamageCard)[1].sourceKey(), DamageCard.CONSOLE_FIRE);
      });

      QUnit.test("usedAbilities() UpgradeCard A-Wing Test Pilot", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade0 = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var upgrade1 = new Ability(UpgradeCard, UpgradeCard.ADRENALINE_RUSH, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(Action.addTokenUsedAbility(token, damage));
         store.dispatch(Action.addTokenUsedAbility(token, pilot));
         store.dispatch(Action.addTokenUsedAbility(token, shipAction));
         store.dispatch(Action.addTokenUsedAbility(token, upgrade0));
         store.dispatch(Action.addTokenUsedAbility(token, upgrade1));

         // Run / Verify.
         assert.equal(Selector.usedAbilities(store.getState(), token, UpgradeCard).length, 2);
         assert.equal(Selector.usedAbilities(store.getState(), token, UpgradeCard, UpgradeCard.A_WING_TEST_PILOT).length, 1);
         assert.equal(Selector.usedAbilities(store.getState(), token, UpgradeCard)[0].source(), UpgradeCard);
         assert.equal(Selector.usedAbilities(store.getState(), token, UpgradeCard)[0].sourceKey(), UpgradeCard.A_WING_TEST_PILOT);
      });

      QUnit.test("usedAbilityKeys()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var token = new Token(store, Pilot.ACADEMY_PILOT, new SimpleAgent("Imperial", Team.IMPERIAL));
         var damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
         var pilot = new Ability(Pilot, Pilot.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         var shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
         var upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
         store.dispatch(Action.addTokenUsedAbility(token, damage));
         store.dispatch(Action.addTokenUsedAbility(token, pilot));
         store.dispatch(Action.addTokenUsedAbility(token, shipAction));
         store.dispatch(Action.addTokenUsedAbility(token, upgrade));

         // Run.
         var result = Selector.usedAbilityKeys(store.getState(), token);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0], DamageCard.BLINDED_PILOT);
         assert.equal(result[1], Pilot.ACADEMY_PILOT);
         assert.equal(result[2], ShipAction.EVADE);
         assert.equal(result[3], UpgradeCard.A_WING_TEST_PILOT);
      });

      QUnit.test("value()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         var property = Value.AGILITY;

         // Run / Verify.
         assert.equal(Selector.value(store.getState(), token0.id(), property), 3);

         // Setup.
         store.dispatch(Action.setValue(token0, property, 4));

         // Run / Verify.
         assert.equal(Selector.value(store.getState(), token0.id(), property), 4);

         // Setup.
         store.dispatch(Action.setValue(token0, property, 6));

         // Run / Verify.
         assert.equal(Selector.value(store.getState(), token0.id(), property), 6);
      });

      QUnit.test("weaponsDisabledCount()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.setWeaponsDisabledCount(token0));

         // Run / Verify.
         assert.equal(token0.weaponsDisabledCount(), 0);

         // Setup.
         store.dispatch(Action.addWeaponsDisabledCount(token0));

         // Run / Verify.
         assert.equal(token0.weaponsDisabledCount(), 1);
      });
   });
