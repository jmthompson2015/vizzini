define(["Difficulty", "Maneuver", "Pilot", "Position", "Team", "UpgradeCard", "process/Action", "process/Adjudicator", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/EnvironmentFactory", "process/MediumAgent", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction", "process/Reducer", "process/SquadBuilder", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(Difficulty, Maneuver, Pilot, Position, Team, UpgradeCard, Action, Adjudicator, AttackDice, CombatAction, DefenseDice, EnvironmentFactory, MediumAgent, ModifyAttackDiceAction, ModifyDefenseDiceAction, Reducer, SquadBuilder, MockAttackDice, MockDefenseDice)
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
            assert.equal(result.modificationKey(), ModifyAttackDiceAction.Modification.SPEND_FOCUS);
            assert.equal(result.pilotKey(), undefined);
            assert.equal(result.upgradeKey(), undefined);
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
            assert.equal(result.modificationKey(), ModifyAttackDiceAction.Modification.USE_PILOT);
            assert.equal(result.pilotKey(), Pilot.POE_DAMERON);
            assert.equal(result.upgradeKey(), undefined);
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
            assert.equal(result.modificationKey(), ModifyDefenseDiceAction.Modification.SPEND_EVADE);
            assert.equal(result.pilotKey(), undefined);
            assert.equal(result.upgradeKey(), undefined);
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
            assert.equal(result.modificationKey(), ModifyDefenseDiceAction.Modification.USE_PILOT);
            assert.equal(result.pilotKey(), Pilot.LUKE_SKYWALKER);
            assert.equal(result.upgradeKey(), undefined);
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
