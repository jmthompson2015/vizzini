define(["DamageCard", "DiceModification", "Maneuver", "Pilot", "Position", "ShipAction", "Team", "UpgradeCard",
  "process/Action", "process/Adjudicator", "process/CombatAction", "process/Environment", "process/EnvironmentFactory", "process/Reducer", "process/SimpleAgent", "process/Squad", "process/SquadBuilder", "process/Token", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(DamageCard, DiceModification, Maneuver, Pilot, Position, ShipAction, Team, UpgradeCard,
      Action, Adjudicator, CombatAction, Environment, EnvironmentFactory, Reducer, SimpleAgent, Squad, SquadBuilder, Token, MockAttackDice, MockDefenseDice)
   {
      "use strict";
      QUnit.module("SimpleAgent");

      QUnit.test("properties", function(assert)
      {
         // Setup.
         var result = new SimpleAgent("myAgent", "myTeam");

         // Run / Verify.
         assert.equal(result.name(), "myAgent");
         assert.equal(result.teamKey(), "myTeam");
      });

      QUnit.test("chooseWeaponAndDefender() Imperial", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var name = "myAgent";
         var team = Team.IMPERIAL;
         var agent = new SimpleAgent(name, team);

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

      QUnit.test("determineValidManeuvers()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[0]; // TIE Fighter.
         var agent = token.agent();

         // Run.
         var result = agent.determineValidManeuvers(environment, token);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 16);
      });

      QUnit.test("determineValidManeuvers() corner", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[0]; // TIE Fighter.
         var agent = token.agent();
         var position = environment.getPositionFor(token);
         LOGGER.debug("before position = " + position);
         environment.removeToken(position);
         position = new Position(21, position.y(), position.heading());
         environment.placeToken(position, token);

         // Run.
         var result = agent.determineValidManeuvers(environment, token);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 11);
         result.forEach(function(maneuver, i)
         {
            LOGGER.debug(i + " maneuver = " + maneuver);
         });
      });

      QUnit.test("determineValidModifyDefenseDiceActions() Captain Oicunn", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var adjudicator = new Adjudicator();
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         var squad1 = new Squad(Team.REBEL, "squad1", 2016, "squad1", [new Token(store, Pilot.CAPTAIN_OICUNN, imperialAgent, [UpgradeCard.YSANNE_ISARD])]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [new Token(store, Pilot.LUKE_SKYWALKER, rebelAgent, [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2])]);
         var positions1 = [new Position(305, 20, 90)];
         var positions2 = [new Position(458, 895, 270)];
         environment.placeInitialTokens(imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         var attacker = environment.tokens()[1]; // X-Wing.
         var defender = environment.tokens()[0]; // VT-49 Decimator.
         store.dispatch(Action.addEvadeCount(defender));
         store.dispatch(Action.setActiveToken(attacker));
         var weapon = attacker.primaryWeapon();
         var callback = function() {};
         var delayIn = 10;
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delayIn, MockAttackDice, MockDefenseDice);
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

         // Run.
         var result = rebelAgent.determineValidModifyDefenseDiceActions(store, attacker, defender);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 1);
         result.forEach(function(modificationKey, i)
         {
            LOGGER.info(i + " modificationKey = " + modificationKey);
         });
         assert.equal(result[0].sourceKey(), DiceModification.DEFENSE_SPEND_EVADE);
      });

      QUnit.test("determineValidShipActions() Mauler Mithel", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var token = environment.tokens()[0]; // TIE Fighter.
         var agent = token.agent();

         // Run.
         var result = agent.determineValidShipActions(environment, adjudicator, token);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 4);
         result.forEach(function(maneuver, i)
         {
            LOGGER.debug(i + " maneuver = " + maneuver);
         });
      });

      QUnit.test("determineValidShipActions() Luke Skywalker", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var token = environment.tokens()[2]; // X-Wing.
         var agent = token.agent();
         var store = environment.store();
         store.dispatch(Action.addTokenUpgrade(token, UpgradeCard.LANDO_CALRISSIAN));
         store.dispatch(Action.addTokenCriticalDamage(token, DamageCard.CONSOLE_FIRE));
         store.dispatch(Action.setActiveToken(token));

         // Run.
         var result = agent.determineValidShipActions(environment, adjudicator, token);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 3);
         result.forEach(function(ability, i)
         {
            LOGGER.debug(i + " ability = " + ability);
         });
         assert.equal(result[0].sourceKey(), ShipAction.FOCUS);

         assert.ok(result[1]);
         assert.equal(result[1].source(), UpgradeCard);
         assert.equal(result[1].sourceKey(), UpgradeCard.LANDO_CALRISSIAN);

         assert.ok(result[2]);
         assert.equal(result[2].source(), DamageCard);
         assert.equal(result[2].sourceKey(), DamageCard.CONSOLE_FIRE);
      });

      QUnit.test("determineValidShipActions() Miranda Doni", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var adjudicator = new Adjudicator();
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         var squad1 = new Squad(Team.REBEL, "squad1", 2016, "squad1", [new Token(store, Pilot.MAULER_MITHEL, imperialAgent, [UpgradeCard.MARKSMANSHIP]), new Token(store, Pilot.DARK_CURSE, imperialAgent)]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [new Token(store, Pilot.LUKE_SKYWALKER, rebelAgent, [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2]), new Token(store, Pilot.MIRANDA_DONI, rebelAgent)]);
         var positions1 = [new Position(305, 20, 90), new Position(610, 20, 90)];
         var positions2 = [new Position(458, 895, 270), new Position(400, 400, 0)];
         environment.placeInitialTokens(imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         var token = environment.tokens()[3]; // K-Wing.
         var previousManeuver = Maneuver.properties[Maneuver.STRAIGHT_2_EASY];
         store.dispatch(Action.setTokenManeuver(token, previousManeuver));

         // Run.
         var result = rebelAgent.determineValidShipActions(environment, adjudicator, token);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 6);
         result.forEach(function(maneuver, i)
         {
            LOGGER.info(i + " maneuver = " + maneuver);
         });
         assert.equal(result[0].sourceKey(), ShipAction.FOCUS);
         assert.ok(result[1]);
         assert.equal(result[1].sourceKey(), ShipAction.SLAM);
         assert.equal(result[1].context().maneuverKey, Maneuver.TURN_LEFT_2_STANDARD);

         assert.ok(result[2]);
         assert.equal(result[2].sourceKey(), ShipAction.SLAM);
         assert.equal(result[2].context().maneuverKey, Maneuver.BANK_LEFT_2_STANDARD);

         assert.ok(result[3]);
         assert.equal(result[3].sourceKey(), ShipAction.SLAM);
         assert.equal(result[3].context().maneuverKey, Maneuver.STRAIGHT_2_EASY);

         assert.ok(result[4]);
         assert.equal(result[4].sourceKey(), ShipAction.SLAM);
         assert.equal(result[4].context().maneuverKey, Maneuver.BANK_RIGHT_2_STANDARD);

         assert.ok(result[5]);
         assert.equal(result[5].sourceKey(), ShipAction.SLAM);
         assert.equal(result[5].context().maneuverKey, Maneuver.TURN_RIGHT_2_STANDARD);
      });

      QUnit.test("getDecloakAction()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var adjudicator = new Adjudicator();
         var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var token = new Token(store, Pilot.SIGMA_SQUADRON_PILOT, agent);
         environment.placeToken(new Position(200, 200, 0), token);
         store.dispatch(Action.addCloakCount(token));

         var result;

         function callback(token, maneuverAction)
         {
            LOGGER.debug("callback()");
            result = maneuverAction;

            // Verify.
            if (result)
            {
               assert.ok(result);
               assert.ok(result.context().maneuverKey);
            }
            else
            {
               assert.ok(!result);
            }
         }

         // Run.
         result = agent.getDecloakAction(environment, adjudicator, token, callback);
      });

      QUnit.test("getModifyAttackDiceAction() focus", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var defender = environment.tokens()[2]; // X-Wing
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = attacker.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         store.dispatch(Action.setActiveToken(attacker));
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(Action.addFocusCount(attacker));

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

      QUnit.test("getModifyDefenseDiceAction() evade", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[2]; // X-Wing
         var defender = environment.tokens()[0]; // TIE Fighter
         var weapon = attacker.primaryWeapon();
         var caCallback = function() {};
         var combatAction = new CombatAction(store, attacker, weapon, defender, caCallback, undefined, MockAttackDice, MockDefenseDice);
         var agent = defender.agent();
         store.dispatch(Action.setAdjudicator(adjudicator));
         store.dispatch(Action.setActiveToken(attacker));
         store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
         store.dispatch(Action.addEvadeCount(defender));

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

      QUnit.test("getPlanningAction() Imperial", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var agent = new SimpleAgent("myAgent", Team.IMPERIAL);

         var position0 = new Position(305, 20, 90);
         var token0 = environment.getTokenAt(position0);

         var position1 = new Position(610, 20, 90);
         var token1 = environment.getTokenAt(position1);

         var position2 = new Position(458, 895, -90);
         var token2 = environment.getTokenAt(position2);

         var result;
         var caller = {};

         function callback(planningAction)
         {
            LOGGER.debug("callback()");
            result = planningAction;

            // Verify.
            assert.ok(result);
            assert.ok(result[token0]);
            assert.ok(result[token1]);
            assert.ok(!result[token2]);
         }

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("getPlanningAction() Rebel", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var name = "myAgent";
         var team = Team.REBEL;
         var squadBuilder = SquadBuilder.CoreSetRebelSquadBuilder;
         var agent = new SimpleAgent(name, team, squadBuilder);

         var position0 = new Position(305, 20, 90);
         var token0 = environment.getTokenAt(position0);
         var maneuver0 = Maneuver.STRAIGHT_1_STANDARD;

         var position1 = new Position(610, 20, 90);
         var token1 = environment.getTokenAt(position1);
         var maneuver1 = Maneuver.STRAIGHT_1_STANDARD;

         var position2 = new Position(458, 895, -90);
         var token2 = environment.getTokenAt(position2);
         var maneuver2 = Maneuver.STRAIGHT_1_STANDARD;

         var result;
         var caller = {};

         function callback(planningAction)
         {
            LOGGER.debug("callback()");
            result = planningAction;

            // Verify.
            assert.ok(result);
            assert.ok(!result[token0]);
            assert.ok(!result[token1]);
            assert.ok(result[token2], maneuver2);
         }

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("getPlanningAction() Rebel 2", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var agent = new SimpleAgent("myAgent", Team.REBEL);

         var oldPosition = new Position(458, 895, -90);
         var newPosition = new Position(20, 110, -90);
         var token = environment.getTokenAt(oldPosition);
         environment.removeToken(oldPosition);
         environment.placeToken(newPosition, token);

         function callback(planningAction)
         {
            // Verify.
            assert.ok(planningAction);
            assert.ok(planningAction[token]);
            var maneuver = planningAction[token];
            assert.ok(maneuver === Maneuver.STRAIGHT_1_EASY || maneuver === Maneuver.TURN_RIGHT_2_STANDARD);
         }

         // Run.
         agent.getPlanningAction(environment, adjudicator, callback);
      });

      QUnit.test("toString()", function(assert)
      {
         // Setup.
         var agent = new SimpleAgent("myAgent", Team.IMPERIAL);

         // Run.
         var result = agent.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "myAgent, SimpleAgent, imperial");
      });
   });
