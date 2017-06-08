define(["Maneuver", "Pilot", "Position", "process/Action", "process/Adjudicator", "process/Engine", "process/Environment", "process/EnvironmentFactory", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder"],
   function(Maneuver, Pilot, Position, Action, Adjudicator, Engine, Environment, EnvironmentFactory, Reducer, SimpleAgent, SquadBuilder)
   {
      "use strict";
      QUnit.module("Engine");

      QUnit.test("performActivationPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var firstAgent = environment.firstAgent();
         var secondAgent = environment.secondAgent();
         var firstTokenToManeuver = {};
         firstTokenToManeuver[environment.tokens()[0].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         firstTokenToManeuver[environment.tokens()[1].toString()] = Maneuver.STRAIGHT_2_STANDARD;
         var secondTokenToManeuver = {};
         secondTokenToManeuver[environment.tokens()[2].toString()] = Maneuver.STRAIGHT_3_STANDARD;
         engine.performCombatPhase = function()
         {
            LOGGER.info("performCombatPhase() dummy");
         };

         // Run.
         var done = assert.async();
         engine.setTokenToManeuver(firstAgent, firstTokenToManeuver);
         engine.setTokenToManeuver(secondAgent, secondTokenToManeuver);

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            done();
         });
      });

      QUnit.test("performActivationPhase() Huge", function(assert)
      {
         // Setup.
         var engine = createEngine(true);
         var environment = engine.environment();
         var firstAgent = environment.firstAgent();
         var secondAgent = environment.secondAgent();
         var firstTokenToManeuver = {};
         firstTokenToManeuver[environment.tokens()[0].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         firstTokenToManeuver[environment.tokens()[1].toString()] = Maneuver.STRAIGHT_2_STANDARD;
         firstTokenToManeuver[environment.tokens()[2].toString()] = Maneuver.STRAIGHT_3_STANDARD;
         var secondTokenToManeuver = {};
         secondTokenToManeuver[environment.tokens()[3].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         secondTokenToManeuver[environment.tokens()[4].toString()] = Maneuver.STRAIGHT_2_STANDARD;
         secondTokenToManeuver[environment.tokens()[5].toString()] = Maneuver.STRAIGHT_3_STANDARD;
         engine.performCombatPhase = function()
         {
            LOGGER.info("performCombatPhase() dummy");
         };

         // Run.
         var done = assert.async();
         engine.setTokenToManeuver(firstAgent, firstTokenToManeuver);
         engine.setTokenToManeuver(secondAgent, secondTokenToManeuver);

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            done();
         });
      });

      QUnit.test("performActivationPhase() decloak", function(assert)
      {
         // Setup.
         var squadBuilder1 = SquadBuilder.findByNameAndYear("Worlds #2", 2014);
         var squadBuilder2 = SquadBuilder.findByNameAndYear("Worlds #1", 2015);
         var agent1 = new SimpleAgent("1", squadBuilder1.factionKey());
         var agent2 = new SimpleAgent("2", squadBuilder2.factionKey());
         var squad1 = squadBuilder1.buildSquad(agent1);
         var squad2 = squadBuilder2.buildSquad(agent2);
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, agent1.teamKey(), agent2.teamKey());
         environment.placeInitialTokens(agent1, squad1, agent2, squad2);
         store.dispatch(Action.setEnvironment(environment));
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var engine = new Engine(environment, adjudicator);
         var firstAgent = environment.firstAgent();
         var secondAgent = environment.secondAgent();
         var token0 = environment.tokens()[0]; // TIE Phantom
         store.dispatch(Action.addCloakCount(token0));
         var firstTokenToManeuver = {};
         firstTokenToManeuver[environment.tokens()[0].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         firstTokenToManeuver[environment.tokens()[1].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         firstTokenToManeuver[environment.tokens()[2].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         firstTokenToManeuver[environment.tokens()[3].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         firstTokenToManeuver[environment.tokens()[4].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         var secondTokenToManeuver = {};
         secondTokenToManeuver[environment.tokens()[5].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         secondTokenToManeuver[environment.tokens()[6].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         secondTokenToManeuver[environment.tokens()[7].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         secondTokenToManeuver[environment.tokens()[8].toString()] = Maneuver.STRAIGHT_1_STANDARD;
         engine.performCombatPhase = function()
         {
            LOGGER.info("performCombatPhase() dummy");
         };
         assert.ok(token0.isCloaked());
         assert.equal(token0.cloakCount(), 1);

         // Run.
         var done = assert.async();
         engine.setTokenToManeuver(firstAgent, firstTokenToManeuver);
         engine.setTokenToManeuver(secondAgent, secondTokenToManeuver);

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");

            var token = environment.tokens()[0]; // TIE Phantom
            assert.equal(token.pilotKey(), Pilot.WHISPER);
            assert.ok(!token.isCloaked());
            assert.equal(token.cloakCount(), 0);

            done();
         }, 1000);
      });

      QUnit.skip("performCombatPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var token0 = environment.tokens()[0]; // TIE Fighter.
         var position0 = environment.getPositionFor(token0);
         var token2 = environment.tokens()[2]; // X-Wing.
         var position2 = environment.getPositionFor(token2);
         var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
         environment.removeToken(position2);
         environment.placeToken(newPosition2, token2);
         engine.performEndPhase = function()
         {
            LOGGER.info("performEndPhase() dummy");
         };

         // Run.
         var done = assert.async();
         engine.performCombatPhase();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            done();
         });
      });

      QUnit.test("performEndPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(Action.addEvadeCount(token0));
         store.dispatch(Action.addFocusCount(token0));
         store.dispatch(Action.addWeaponsDisabledCount(token0));
         var token1 = environment.tokens()[1];
         store.dispatch(Action.addEvadeCount(token1));
         store.dispatch(Action.addFocusCount(token1));
         store.dispatch(Action.addWeaponsDisabledCount(token1));
         var token2 = environment.tokens()[2];
         store.dispatch(Action.addEvadeCount(token2));
         store.dispatch(Action.addFocusCount(token2));
         store.dispatch(Action.addWeaponsDisabledCount(token2));
         engine.performPlanningPhase = function()
         {
            LOGGER.info("performPlanningPhase() dummy");
         };

         // Run.
         var done = assert.async();
         engine.performEndPhase();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.equal(token0.evadeCount(), 0, token0.name());
            assert.equal(token0.focusCount(), 0);
            assert.equal(token0.weaponsDisabledCount(), 0);
            assert.equal(token1.evadeCount(), 0, token1.name());
            assert.equal(token1.focusCount(), 0);
            assert.equal(token1.weaponsDisabledCount(), 0);
            assert.equal(token2.evadeCount(), 0, token2.name());
            assert.equal(token2.focusCount(), 0);
            assert.equal(token2.weaponsDisabledCount(), 0);
            done();
         });
      });

      QUnit.test("performPlanningPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         engine.performActivationPhase = function()
         {
            LOGGER.info("performActivationPhase() dummy");
         };

         // Run.
         var done = assert.async();
         engine.performPlanningPhase();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(engine.firstTokenToManeuver());
            assert.ok(engine.secondTokenToManeuver());
            done();
         });
      });

      function createEngine(isHuge)
      {
         var environment;

         if (isHuge)
         {
            environment = EnvironmentFactory.createHugeShipEnvironment();
         }
         else
         {
            environment = EnvironmentFactory.createCoreSetEnvironment();
         }

         var adjudicator = new Adjudicator();
         var store = environment.store();
         store.dispatch(Action.setEnvironment(environment));
         store.dispatch(Action.setAdjudicator(adjudicator));

         return new Engine(environment, adjudicator);
      }
   });
