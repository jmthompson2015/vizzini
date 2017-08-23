define(["DiceModification", "Difficulty", "Maneuver", "Pilot", "Position", "Team", "UpgradeCard", "process/Action", "process/Adjudicator", "process/CombatAction", "process/Environment", "process/EnvironmentFactory", "process/MediumAgent", "process/ModifyDiceAbility", "process/Reducer", "process/Squad", "process/SquadBuilder", "process/TargetLock", "process/Token", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(DiceModification, Difficulty, Maneuver, Pilot, Position, Team, UpgradeCard, Action, Adjudicator, CombatAction, Environment, EnvironmentFactory, MediumAgent, ModifyDiceAbility, Reducer, Squad, SquadBuilder, TargetLock, Token, MockAttackDice, MockDefenseDice)
   {
      "use strict";
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
         var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;
         var agent = new MediumAgent(name, team);

         var oldPosition0 = new Position(305, 20, 90);
         var token0 = environment.getTokenAt(oldPosition0);
         var position0 = new Position(458, 795, 90);
         environment.removeToken(oldPosition0);
         environment.placeToken(position0, token0);

         var position1 = new Position(610, 20, 90);
         var token1 = environment.getTokenAt(position1);

         var position2 = new Position(458, 895, -90);
         var token2 = environment.getTokenAt(position2);

         LOGGER.debug("token0 = " + token0);
         LOGGER.debug("token1 = " + token1);
         LOGGER.debug("token2 = " + token2);

         var result;
         var caller = {};

         function callback(weapon, defender)
         {
            LOGGER.debug("callback() weapon = " + weapon + " defender = " + defender);

            // Verify.
            assert.ok(weapon);
            assert.equal(weapon, token0.primaryWeapon());
            assert.ok(defender);
            assert.equal(defender, token2);
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
         store.dispatch(Action.moveToken(oldPosition0, position0));
         var token0 = environment.tokens()[0];
         var token2 = environment.tokens()[2];
         var targetLock = TargetLock.newInstance(store, token2, token0);
         var agent = token2.agent();

         var callback = function(weapon, defender)
         {
            // Verify.
            assert.ok(weapon);
            assert.equal(weapon, token2.secondaryWeapons()[0]);
            assert.ok(defender);
            assert.equal(defender, token0);
         };

         // Run.
         agent.chooseWeaponAndDefender(environment, adjudicator, token2, callback);
      });

      QUnit.test("getModifyAttackDiceAction() focus", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var environment = EnvironmentFactory.createCoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var agent = attacker.agent();
         var attackDice = new MockAttackDice(store, attacker.id());
         var defender = environment.tokens()[2]; // X-Wing
         var defenseDice = new MockDefenseDice(store, attacker.id());
         store.dispatch(Action.setActiveToken(attacker));
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(Action.addFocusCount(attacker));

         var result;

         function callback(modifyAction)
         {
            LOGGER.info("callback() modifyAction = " + modifyAction);
            result = modifyAction;

            // Verify.
            assert.ok(result);
            assert.equal(result.sourceKey(), DiceModification.ATTACK_SPEND_FOCUS);
         }

         // Run.
         agent.getModifyAttackDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getModifyAttackDiceAction() pilot", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var environment = EnvironmentFactory.createTFACoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[2]; // X-Wing
         var agent = attacker.agent();
         var attackDice = new MockAttackDice(store, attacker.id());
         var defender = environment.tokens()[0]; // TIE Fighter
         var defenseDice = new MockDefenseDice(store, attacker.id());
         store.dispatch(Action.setActiveToken(attacker));
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(Action.addFocusCount(attacker));

         var result;

         function callback(modifyAction)
         {
            LOGGER.info("callback() modifyAction = " + modifyAction);
            result = modifyAction;

            // Verify.
            assert.ok(result);
            assert.equal(result.sourceKey(), Pilot.POE_DAMERON);
         }

         // Run.
         agent.getModifyAttackDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getModifyDefenseDiceAction() evade", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var environment = EnvironmentFactory.createCoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[2]; // X-Wing
         var attackDice = new MockAttackDice(store, attacker.id());
         var defender = environment.tokens()[0]; // TIE Fighter
         var agent = defender.agent();
         var defenseDice = new MockDefenseDice(store, attacker.id());
         store.dispatch(Action.setActiveToken(attacker));
         store.dispatch(Action.addEvadeCount(defender));
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

         var result;

         function callback(modifyAction)
         {
            LOGGER.info("callback() modifyAction = " + modifyAction);
            result = modifyAction;

            // Verify.
            assert.ok(result);
            assert.equal(result.sourceKey(), DiceModification.DEFENSE_SPEND_EVADE);
         }

         // Run.
         agent.getModifyDefenseDiceAction(store, adjudicator, attacker, defender, callback);
      });

      QUnit.test("getModifyDefenseDiceAction() pilot", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var environment = EnvironmentFactory.createCoreSetEnvironment(store, "MediumAgent", "MediumAgent");
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var attackDice = new MockAttackDice(store, attacker.id());
         var defender = environment.tokens()[2]; // X-Wing
         var agent = defender.agent();
         var defenseDice = new MockDefenseDice(store, attacker.id());
         store.dispatch(Action.setActiveToken(attacker));
         store.dispatch(Action.addEvadeCount(defender));
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

         var result;

         function callback(modifyAction)
         {
            LOGGER.info("callback() modifyAction = " + modifyAction);
            result = modifyAction;

            // Verify.
            assert.ok(result);
            assert.equal(result.sourceKey(), Pilot.LUKE_SKYWALKER);
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
         store.dispatch(Action.addStressCount(token0));
         var token1 = tokens[1];
         store.dispatch(Action.addStressCount(token1));
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
         environment.removeToken(oldPosition);
         environment.placeToken(newPosition, token);
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
         var store = Redux.createStore(Reducer.root);
         var imageBase = "../../../main/resources/images/";
         var firstAgent = EnvironmentFactory.createAgent("MediumAgent", "First Agent", Team.IMPERIAL, imageBase);
         var firstTokens = [new Token(store, Pilot.MAULER_MITHEL, firstAgent)];
         var firstSquad = new Squad(Team.IMPERIAL, "First Squad", 2017, "description", firstTokens);
         var secondAgent = EnvironmentFactory.createAgent("MediumAgent", "Second Agent", Team.SCUM, imageBase);
         var secondTokens = [new Token(store, Pilot.IG_88A, secondAgent)];
         var secondSquad = new Squad(Team.SCUM, "Second Squad", 2017, "description", secondTokens);
         var environment = new Environment(store, firstAgent.teamKey(), secondAgent.teamKey());
         environment.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);
         var token = environment.tokens()[1];
         var adjudicator = new Adjudicator();
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
