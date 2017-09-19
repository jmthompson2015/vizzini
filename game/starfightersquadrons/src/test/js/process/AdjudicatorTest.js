define(["Maneuver", "Position", "process/Action", "process/Adjudicator", "process/EnvironmentFactory", "process/SquadBuilder", "process/TokenAction"],
   function(Maneuver, Position, Action, Adjudicator, EnvironmentFactory, SquadBuilder, TokenAction)
   {
      "use strict";
      QUnit.module("Adjudicator");

      QUnit.test("canAttack() yes", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];

         // Run / Verify.
         assert.ok(adjudicator.canAttack(attacker));
      });

      QUnit.test("canAttack() no - cloaked", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];
         store.dispatch(TokenAction.addCloakCount(attacker));

         // Run / Verify.
         assert.ok(!adjudicator.canAttack(attacker));
      });

      QUnit.test("canAttack() no - weapons disabled", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];
         store.dispatch(TokenAction.addWeaponsDisabledCount(attacker));

         // Run / Verify.
         assert.ok(!adjudicator.canAttack(attacker));
      });

      QUnit.test("canSelectShipAction() yes", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];

         // Run / Verify.
         assert.ok(adjudicator.canSelectShipAction(attacker));
      });

      QUnit.test("canSlam() yes", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];
         var store = environment.store();
         var previousManeuver = Maneuver.properties[Maneuver.STRAIGHT_3_EASY];
         store.dispatch(Action.setTokenManeuver(attacker, previousManeuver));
         var maneuverKey = Maneuver.BANK_LEFT_3_STANDARD;

         // Run / Verify.
         assert.equal(adjudicator.canSlam(environment, attacker, maneuverKey), true);
      });

      QUnit.test("canSlam() no (maneuver)", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];
         var store = environment.store();
         var previousManeuver = Maneuver.properties[Maneuver.TURN_LEFT_1_STANDARD];
         store.dispatch(Action.setTokenManeuver(attacker, previousManeuver));
         var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;

         // Run / Verify.
         assert.equal(adjudicator.canSlam(environment, attacker, maneuverKey), false);
      });

      QUnit.test("canSlam() no (ship fled)", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];
         var store = environment.store();
         var fromPosition = environment.getPositionFor(attacker);
         var toPosition = new Position(894, fromPosition.y(), fromPosition.heading());
         store.dispatch(Action.moveToken(fromPosition, toPosition));
         var previousManeuver = Maneuver.properties[Maneuver.STRAIGHT_3_EASY];
         store.dispatch(Action.setTokenManeuver(attacker, previousManeuver));
         var maneuverKey = Maneuver.BANK_LEFT_3_STANDARD;

         // Run / Verify.
         assert.equal(adjudicator.canSlam(environment, attacker, maneuverKey), false);
      });

      QUnit.test("canSlam() no (speed)", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var attacker = environment.tokens()[0];
         var store = environment.store();
         var previousManeuver = Maneuver.properties[Maneuver.STRAIGHT_3_EASY];
         store.dispatch(Action.setTokenManeuver(attacker, previousManeuver));
         var maneuverKey = Maneuver.BANK_LEFT_2_EASY;

         // Run / Verify.
         assert.equal(adjudicator.canSlam(environment, attacker, maneuverKey), false);
      });

      QUnit.test("compareInitiative() by squad points", function(assert)
      {
         // Setup.
         var adjudicator = new Adjudicator();
         var imperial = SquadBuilder.CoreSetImperialSquadBuilder; // 36 points
         var firstOrder = SquadBuilder.CoreSetFirstOrderSquadBuilder; // 38 points
         var rebel = SquadBuilder.findByNameAndYear("Worlds #5", 2013); // 100 squad points
         var resistance = SquadBuilder.CoreSetResistanceSquadBuilder; // 39 points
         var scum = SquadBuilder.findByNameAndYear("Worlds #1", 2017); // 98 squad points

         // Run / Verify.
         assert.equal(adjudicator.compareInitiative(imperial, imperial), 0);
         assert.equal(adjudicator.compareInitiative(imperial, firstOrder), 2);
         assert.equal(adjudicator.compareInitiative(imperial, rebel), 64);
         assert.equal(adjudicator.compareInitiative(imperial, resistance), 3);
         assert.equal(adjudicator.compareInitiative(imperial, scum), 62);

         assert.equal(adjudicator.compareInitiative(firstOrder, imperial), -2);
         assert.equal(adjudicator.compareInitiative(firstOrder, firstOrder), 0);
         assert.equal(adjudicator.compareInitiative(firstOrder, rebel), 62);
         assert.equal(adjudicator.compareInitiative(firstOrder, resistance), 1);
         assert.equal(adjudicator.compareInitiative(firstOrder, scum), 60);

         assert.equal(adjudicator.compareInitiative(rebel, imperial), -64);
         assert.equal(adjudicator.compareInitiative(rebel, firstOrder), -62);
         assert.equal(adjudicator.compareInitiative(rebel, rebel), 0);
         assert.equal(adjudicator.compareInitiative(rebel, resistance), -61);
         assert.equal(adjudicator.compareInitiative(rebel, scum), -2);

         assert.equal(adjudicator.compareInitiative(resistance, imperial), -3);
         assert.equal(adjudicator.compareInitiative(resistance, firstOrder), -1);
         assert.equal(adjudicator.compareInitiative(resistance, rebel), 61);
         assert.equal(adjudicator.compareInitiative(resistance, resistance), 0);
         assert.equal(adjudicator.compareInitiative(resistance, scum), 59);

         assert.equal(adjudicator.compareInitiative(scum, imperial), -62);
         assert.equal(adjudicator.compareInitiative(scum, firstOrder), -60);
         assert.equal(adjudicator.compareInitiative(scum, rebel), 2);
         assert.equal(adjudicator.compareInitiative(scum, resistance), -59);
         assert.equal(adjudicator.compareInitiative(scum, scum), 0);
      });

      QUnit.test("compareInitiative() by faction", function(assert)
      {
         // Setup.
         var adjudicator = new Adjudicator();
         var imperial = SquadBuilder.findByNameAndYear("Worlds #5", 2016); // 100 squad points
         var firstOrder = SquadBuilder.findByNameAndYear("Worlds #3", 2016); // 99 squad points
         var rebel = SquadBuilder.findByNameAndYear("Worlds #5", 2013); // 100 squad points
         var resistance = SquadBuilder.findByNameAndYear("Worlds #2", 2017); // 100 squad points
         var scum = SquadBuilder.findByNameAndYear("Worlds #5", 2017); // 100 squad points

         // Run / Verify.
         assert.equal(adjudicator.compareInitiative(imperial, imperial), 0);
         assert.equal(adjudicator.compareInitiative(imperial, firstOrder), -1);
         assert.equal(adjudicator.compareInitiative(imperial, rebel), 2);
         assert.equal(adjudicator.compareInitiative(imperial, resistance), 3);
         assert.equal(adjudicator.compareInitiative(imperial, scum), 4);

         assert.equal(adjudicator.compareInitiative(firstOrder, imperial), 1);
         assert.equal(adjudicator.compareInitiative(firstOrder, firstOrder), 0);
         assert.equal(adjudicator.compareInitiative(firstOrder, rebel), 1);
         assert.equal(adjudicator.compareInitiative(firstOrder, resistance), 1);
         assert.equal(adjudicator.compareInitiative(firstOrder, scum), 1);

         assert.equal(adjudicator.compareInitiative(rebel, imperial), -2);
         assert.equal(adjudicator.compareInitiative(rebel, firstOrder), -1);
         assert.equal(adjudicator.compareInitiative(rebel, rebel), 0);
         assert.equal(adjudicator.compareInitiative(rebel, resistance), 1);
         assert.equal(adjudicator.compareInitiative(rebel, scum), 2);

         assert.equal(adjudicator.compareInitiative(resistance, imperial), -3);
         assert.equal(adjudicator.compareInitiative(resistance, firstOrder), -1);
         assert.equal(adjudicator.compareInitiative(resistance, rebel), -1);
         assert.equal(adjudicator.compareInitiative(resistance, resistance), 0);
         assert.equal(adjudicator.compareInitiative(resistance, scum), 1);

         assert.equal(adjudicator.compareInitiative(scum, imperial), -4);
         assert.equal(adjudicator.compareInitiative(scum, firstOrder), -1);
         assert.equal(adjudicator.compareInitiative(scum, rebel), -2);
         assert.equal(adjudicator.compareInitiative(scum, resistance), -1);
         assert.equal(adjudicator.compareInitiative(scum, scum), 0);
      });

      QUnit.test("determineWinner()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();

         // Run / Verify.
         assert.ok(!adjudicator.determineWinner(environment));
      });

      QUnit.test("isGameOver()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var adjudicator = new Adjudicator();

         // Run / Verify.
         assert.ok(!adjudicator.isGameOver(environment));
      });
   });
