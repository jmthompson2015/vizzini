define(["process/AttackDice", "DamageCard", "process/DefenseDice", "Maneuver", "Pilot", "Position", "ShipAction", "Team", "UpgradeCard", "process/Action", "process/Adjudicator", "process/Environment", "process/EnvironmentFactory", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder", "process/Token"],
   function(AttackDice, DamageCard, DefenseDice, Maneuver, Pilot, Position, ShipAction, Team, UpgradeCard, Action, Adjudicator, Environment, EnvironmentFactory, ModifyAttackDiceAction, ModifyDefenseDiceAction, Reducer, SimpleAgent, SquadBuilder, Token)
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
         result.forEach(function(maneuver, i)
         {
            LOGGER.debug(i + " maneuver = " + maneuver);
         });
         assert.equal(result[0].shipActionKey(), ShipAction.FOCUS);
         assert.ok(result[1]);
         assert.ok(result[1].ability());
         assert.equal(result[1].ability().source(), UpgradeCard);
         assert.equal(result[1].ability().sourceKey(), UpgradeCard.LANDO_CALRISSIAN);

         assert.ok(result[2]);
         assert.ok(result[2].ability());
         assert.equal(result[2].ability().source(), DamageCard);
         assert.equal(result[2].ability().sourceKey(), DamageCard.CONSOLE_FIRE);
      });

      QUnit.test("determineValidShipActions() Miranda Doni", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var token2 = environment.tokens()[2]; // X-Wing.
         var agent = token2.agent();
         var store = environment.store();
         var token = new Token(store, Pilot.MIRANDA_DONI, agent);
         store.dispatch(Action.placeToken(new Position(400, 400, 0), token));
         var previousManeuver = Maneuver.properties[Maneuver.STRAIGHT_2_EASY];
         store.dispatch(Action.setTokenManeuver(token, previousManeuver));

         // Run.
         var result = agent.determineValidShipActions(environment, adjudicator, token);

         // Validate.
         assert.ok(result);
         assert.equal(result.length, 6);
         result.forEach(function(maneuver, i)
         {
            LOGGER.info(i + " maneuver = " + maneuver);
         });
         assert.equal(result[0].shipActionKey(), ShipAction.FOCUS);
         assert.ok(result[1]);
         assert.equal(result[1].maneuverKey(), Maneuver.TURN_LEFT_2_STANDARD);

         assert.ok(result[2]);
         assert.equal(result[2].maneuverKey(), Maneuver.BANK_LEFT_2_STANDARD);

         assert.ok(result[3]);
         assert.equal(result[3].maneuverKey(), Maneuver.STRAIGHT_2_EASY);

         assert.ok(result[4]);
         assert.equal(result[4].maneuverKey(), Maneuver.BANK_RIGHT_2_STANDARD);

         assert.ok(result[5]);
         assert.equal(result[5].maneuverKey(), Maneuver.TURN_RIGHT_2_STANDARD);
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
               assert.ok(result.maneuverKey());
            }
            else
            {
               assert.ok(!result);
            }
         }

         // Run.
         result = agent.getDecloakAction(environment, adjudicator, token, callback);
      });

      QUnit.test("getModifyAttackDiceAction() evade", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var agent = attacker.agent();
         var attackDice = new AttackDice(store, attacker.id(), 3);
         var defender = environment.tokens()[2]; // X-Wing
         var defenseDice = new DefenseDice(store, attacker.id(), 3);
         store.dispatch(Action.addFocusCount(attacker));

         var result;

         function callback(modifyAction)
         {
            LOGGER.debug("callback() modifyAction = " + modifyAction);
            result = modifyAction;

            // Verify.
            if (result)
            {
               assert.ok(result);
               assert.equal(result.modificationKey(), ModifyAttackDiceAction.Modification.SPEND_FOCUS);
            }
            else
            {
               assert.ok(!result);
            }
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
         var attackDice = new AttackDice(store, attacker.id(), 3);
         var defender = environment.tokens()[0]; // TIE Fighter
         var agent = defender.agent();
         var defenseDice = new DefenseDice(store, attacker.id(), 3);
         store.dispatch(Action.addEvadeCount(defender));

         var result;

         function callback(modifyAction)
         {
            LOGGER.debug("callback() modifyAction = " + modifyAction);
            result = modifyAction;

            // Verify.
            if (result)
            {
               assert.ok(result);
               assert.equal(result.modificationKey(), ModifyDefenseDiceAction.Modification.SPEND_EVADE);
            }
            else
            {
               assert.ok(!result);
            }
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
