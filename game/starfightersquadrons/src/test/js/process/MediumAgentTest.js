"use strict";

define(["DiceModification", "Difficulty", "Maneuver", "Pilot", "Position", "Team",
  "process/Action", "process/Adjudicator", "process/CombatAction", "process/Environment", "process/EnvironmentAction", "process/EnvironmentFactory", "process/MediumAgent", "process/Reducer", "process/Squad", "process/SquadBuilder", "process/TargetLock", "process/Token", "process/TokenAction", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(DiceModification, Difficulty, Maneuver, Pilot, Position, Team,
      Action, Adjudicator, CombatAction, Environment, EnvironmentAction, EnvironmentFactory, MediumAgent, Reducer, Squad, SquadBuilder, TargetLock, Token, TokenAction, MockAttackDice, MockDefenseDice)
   {
      QUnit.module("MediumAgent");

      QUnit.test("properties", function(assert)
      {
         // Setup.
         var result = new MediumAgent("myAgent", "myTeam");

         // Run / Verify.
         assert.equal(result.name(), "myAgent");
         assert.equal(result.teamKey(), "myTeam");
      });

      QUnit.test("chooseWeaponAndDefender() Imperial", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var name = "myAgent";
         var team = Team.IMPERIAL;
         var agent = new MediumAgent(name, team);

         var oldPosition0 = new Position(305, 20, 90);
         var token0 = environment.getTokenAt(oldPosition0);
         var position0 = new Position(458, 795, 90);
         environment.moveToken(oldPosition0, position0);

         var position1 = new Position(610, 20, 90);
         var token1 = environment.getTokenAt(position1);

         var position2 = new Position(458, 895, -90);
         var token2 = environment.getTokenAt(position2);

         LOGGER.debug("token0 = " + token0);
         LOGGER.debug("token1 = " + token1);
         LOGGER.debug("token2 = " + token2);

         function callback(weapon, defender)
         {
            LOGGER.debug("callback() weapon = " + weapon + " defender = " + defender);

            // Verify.
            assert.ok(weapon);
            assert.equal(weapon, token0.primaryWeapon());
            assert.ok(defender);
            assert.ok(defender.equals(token2));
         }

         // Run.
         agent.chooseWeaponAndDefender(environment, adjudicator, token0, callback);
      });

      QUnit.test("chooseWeaponAndDefender() Rebel", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var oldPosition0 = new Position(305, 20, 90);
         var position0 = new Position(458, 695, 90);
         store.dispatch(EnvironmentAction.moveToken(oldPosition0, position0));
         var token0 = environment.tokens()[0];
         var token2 = environment.tokens()[2];
         TargetLock.newInstance(store, token2, token0);
         var agent = token2.agent();

         var callback = function(weapon, defender)
         {
            // Verify.
            assert.ok(weapon);
            assert.equal(weapon, token2.secondaryWeapons().get(0));
            assert.ok(defender);
            assert.ok(defender.equals(token0));
         };

         // Run.
         agent.chooseWeaponAndDefender(environment, adjudicator, token2, callback);
      });

      QUnit.test("cloneStore()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createTFACoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.getTokenById(3); // T-70 X-Wing
         var attackerPosition = environment.getPositionFor(attacker);
         var defender = environment.getTokenById(1); // TIE Fighter
         var defenderPosition = environment.getPositionFor(defender);
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = defender.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.setActiveToken(attacker);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(TokenAction.addFocusCount(attacker));

         assert.equal(attacker.pilotKey(), Pilot.POE_DAMERON);
         assert.equal(defender.pilotKey(), Pilot.EPSILON_LEADER);
         assert.equal(environment.tokens().length, 3, "environment.tokens().length === 3");

         // Run.
         var result = agent.cloneStore(store, attacker, attackerPosition, defender, defenderPosition);

         // Verify.
         assert.ok(result);
         var newEnvironment = result.getState().environment;
         assert.ok(newEnvironment);
         var newTokens = newEnvironment.tokens();
         assert.ok(newTokens);
         assert.equal(newTokens.length, 2, "newTokens.length === 2");
         assert.equal(newTokens[0].pilotKey(), attacker.pilotKey());
         assert.equal(newTokens[1].pilotKey(), defender.pilotKey());
      });

      QUnit.test("getModifyAttackDiceAction() focus", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var defender = environment.tokens()[2]; // X-Wing
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = attacker.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.setActiveToken(attacker);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(TokenAction.addFocusCount(attacker));

         function callback(modifyAbility)
         {
            LOGGER.debug("callback() modifyAbility = " + modifyAbility);

            // Verify.
            assert.ok(modifyAbility);
            assert.equal(modifyAbility.sourceKey(), DiceModification.ATTACK_SPEND_FOCUS);
         }

         // Run.
         agent.getModifyAttackDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getModifyAttackDiceAction() pilot", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createTFACoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.getTokenById(3); // X-Wing
         var defender = environment.getTokenById(1); // TIE Fighter
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = defender.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.setActiveToken(attacker);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(TokenAction.addFocusCount(attacker));

         function callback(modifyAbility)
         {
            LOGGER.debug("callback() modifyAbility = " + modifyAbility);

            // Verify.
            assert.ok(modifyAbility);
            assert.equal(modifyAbility.sourceKey(), Pilot.POE_DAMERON);
         }

         // Run.
         agent.getModifyAttackDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getModifyDefenseDiceAction() evade", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[2]; // X-Wing
         var defender = environment.tokens()[0]; // TIE Fighter
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = defender.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.setActiveToken(attacker);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(TokenAction.addEvadeCount(defender));

         function callback(modifyAbility)
         {
            LOGGER.debug("callback() modifyAbility = " + modifyAbility);

            // Verify.
            assert.ok(modifyAbility);
            assert.equal(modifyAbility.sourceKey(), DiceModification.DEFENSE_SPEND_EVADE);
         }

         // Run.
         agent.getModifyDefenseDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getModifyDefenseDiceAction() pilot", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var defender = environment.tokens()[2]; // X-Wing
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = defender.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.setActiveToken(attacker);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

         function callback(modifyAbility)
         {
            LOGGER.debug("callback() modifyAbility = " + modifyAbility);

            // Verify.
            assert.ok(modifyAbility);
            assert.equal(modifyAbility.sourceKey(), Pilot.LUKE_SKYWALKER);
         }

         // Run.
         agent.getModifyDefenseDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getPlanningAction() Imperial", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var tokens = environment.tokens();
         var token0 = tokens[0];
         var agent = token0.agent();
         var token1 = tokens[1];
         var token2 = tokens[2];
         var callback = function(planningAction)
         {
            // Verify.
            assert.ok(planningAction);
            assert.ok(planningAction[token0]);
            assert.equal(planningAction[token0], "straight5Standard");
            assert.ok(planningAction[token1]);
            assert.equal(planningAction[token1], "straight5Standard");
            assert.ok(!planningAction[token2]);
         };

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("getPlanningAction() Imperial stressed", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var tokens = environment.tokens();
         var token0 = tokens[0];
         var agent = token0.agent();
         store.dispatch(TokenAction.addStressCount(token0));
         var token1 = tokens[1];
         store.dispatch(TokenAction.addStressCount(token1));
         var token2 = tokens[2];
         var callback = function(planningAction)
         {
            // Verify.
            assert.ok(planningAction);
            assert.ok(planningAction[token0]);
            assert.equal(Maneuver.properties[planningAction[token0]].difficultyKey, Difficulty.EASY);
            assert.ok(planningAction[token1]);
            assert.equal(Maneuver.properties[planningAction[token1]].difficultyKey, Difficulty.EASY);
            assert.ok(!planningAction[token2]);
         };

         assert.ok(token0.isStressed());
         assert.ok(token1.isStressed());
         assert.ok(!token2.isStressed());

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("getPlanningAction() Rebel", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var tokens = environment.tokens();
         var token0 = tokens[0];
         var token1 = tokens[1];
         var token2 = tokens[2];
         var agent = token2.agent();

         var callback = function(planningAction)
         {
            // Verify.
            assert.ok(planningAction);
            assert.ok(!planningAction[token0]);
            assert.ok(!planningAction[token1]);
            assert.ok(planningAction[token2]);
            assert.equal(planningAction[token2], "straight4Standard");
         };

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("getPlanningAction() Rebel 2", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment(undefined, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var oldPosition = new Position(458, 895, -90);
         var newPosition = new Position(20, 110, -90);
         var token = environment.getTokenAt(oldPosition);
         environment.moveToken(oldPosition, newPosition);
         var agent = token.agent();
         var callback = function(planningAction)
         {
            // Verify.
            assert.ok(planningAction);
            assert.ok(planningAction[token]);
            assert.equal(planningAction[token], Maneuver.TURN_RIGHT_2_STANDARD);
         };

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("getPlanningAction() IG-88A", function(assert)
      {
         // Setup.
         var store00 = Redux.createStore(Reducer.root);
         var iconBase = "../../../main/resources/icons/";
         var imageBase = "../../../main/resources/images/";
         var firstAgent = EnvironmentFactory.createAgent("MediumAgent", "First Agent", Team.IMPERIAL, iconBase, imageBase);
         var firstTokens = [new Token(store00, Pilot.MAULER_MITHEL, firstAgent)];
         var firstSquad = new Squad(Team.IMPERIAL, "First Squad", 2017, "description", firstTokens);
         var secondAgent = EnvironmentFactory.createAgent("MediumAgent", "Second Agent", Team.SCUM, iconBase, imageBase);
         var secondTokens = [new Token(store00, Pilot.IG_88A, secondAgent)];
         var secondSquad = new Squad(Team.SCUM, "Second Squad", 2017, "description", secondTokens);

         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, firstAgent, firstSquad, secondAgent, secondSquad);
         var token = environment.tokens()[1];
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var callback = function(tokenToManeuver)
         {
            // Verify.
            assert.ok(tokenToManeuver);
            assert.ok(tokenToManeuver[token]);
            assert.equal(tokenToManeuver[token], Maneuver.STRAIGHT_3_EASY);
         };

         // Run.
         secondAgent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("toString()", function(assert)
      {
         // Setup.
         var agent = new MediumAgent("myAgent", Team.IMPERIAL);

         // Run.
         var result = agent.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "myAgent, MediumAgent, imperial");
      });
   });
