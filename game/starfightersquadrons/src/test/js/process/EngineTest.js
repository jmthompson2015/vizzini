define(["DamageCard", "Pilot", "Position", "UpgradeCard",
  "process/Action", "process/Adjudicator", "process/Engine", "process/Environment", "process/EnvironmentFactory", "process/EventObserver", "process/PhaseObserver", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder", "process/TokenAction"],
   function(DamageCard, Pilot, Position, UpgradeCard,
      Action, Adjudicator, Engine, Environment, EnvironmentFactory, EventObserver, PhaseObserver, Reducer, SimpleAgent, SquadBuilder, TokenAction)
   {
      "use strict";
      QUnit.module("Engine");

      var delay = 10;

      QUnit.test("performActivationPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         engine.performCombatPhase = function()
         {
            LOGGER.info("performCombatPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            done();
         };

         // Run.
         var done = assert.async();
         engine.performPlanningPhase(undefined, callback);
      });

      QUnit.test("performActivationPhase() Huge", function(assert)
      {
         // Setup.
         var engine = createEngine(true);
         engine.performCombatPhase = function()
         {
            LOGGER.info("performCombatPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            done();
         };

         // Run.
         var done = assert.async();
         engine.performPlanningPhase(undefined, callback);
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
         new EventObserver(store);
         new PhaseObserver(store);
         environment.placeInitialTokens(agent1, squad1, agent2, squad2);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var engine = new Engine(environment, adjudicator, delay);
         var token0 = environment.tokens()[0]; // TIE Phantom
         store.dispatch(TokenAction.addCloakCount(token0));
         engine.performCombatPhase = function()
         {
            LOGGER.info("performCombatPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");

            var token = environment.tokens()[0]; // TIE Phantom
            if (token.pilotKey() === Pilot.WHISPER)
            {
               if (token.isCloaked())
               {
                  // Ship re-cloaked.
                  console.log("ship re-cloaked");
                  assert.equal(token.pilotKey(), Pilot.WHISPER);
                  assert.equal(token.isCloaked(), true);
                  assert.equal(token.cloakCount(), 1);
               }
               else
               {
                  assert.equal(token.pilotKey(), Pilot.WHISPER);
                  assert.equal(token.isCloaked(), false);
                  assert.equal(token.cloakCount(), 0);
               }
            }
            else
            {
               // Ship fled the battlefield.
            }

            done();
         };
         assert.equal(token0.isCloaked(), true);
         assert.equal(token0.cloakCount(), 1);

         // Run.
         var done = assert.async();
         engine.performPlanningPhase(undefined, callback);
      });

      QUnit.test("performCombatPhase()", function(assert)
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
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            done();
         };

         // Run.
         var done = assert.async();
         engine.performCombatPhase(callback);
      });

      QUnit.test("performCombatPhase() Epsilon Leader", function(assert)
      {
         // Setup.
         var engine = createEngineEpsilonLeader();
         var environment = engine.environment();
         var store = environment.store();
         var tokens = environment.tokens();
         var token0 = tokens[0]; // TIE/fo Fighter.
         var position0 = environment.getPositionFor(token0);
         var token1 = tokens[1]; // TIE/fo Fighter.
         var position1 = environment.getPositionFor(token1);
         var newPosition1 = new Position(position0.x() + 50, position0.y(), position1.heading());
         environment.removeToken(position1);
         environment.placeToken(newPosition1, token1);
         var token2 = tokens[2]; // T-70 X-Wing.
         var position2 = environment.getPositionFor(token2);
         var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
         environment.removeToken(position2);
         environment.placeToken(newPosition2, token2);
         engine.processCombatQueue = function()
         {
            LOGGER.info("processCombatQueue() dummy");
            var combatPhaseCallback = this.combatPhaseCallback();
            combatPhaseCallback();
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(token0.stressCount(), 0, "token0.stressCount() === 0");
            assert.equal(token1.stressCount(), 0, "token1.stressCount() === 0");
            assert.equal(token2.stressCount(), 1, "token2.stressCount() === 1");
            done();
         };
         store.dispatch(TokenAction.addStressCount(token0));
         store.dispatch(TokenAction.addStressCount(token1));
         store.dispatch(TokenAction.addStressCount(token2));
         assert.equal(token0.stressCount(), 1, "token0.stressCount() === 1");
         assert.equal(token1.stressCount(), 1, "token1.stressCount() === 1");
         assert.equal(token2.stressCount(), 1, "token2.stressCount() === 1");

         // Run.
         var done = assert.async();
         engine.performCombatPhase(callback);
      });

      QUnit.test("performCombatPhase() Mara Jade", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var token0 = environment.tokens()[0]; // TIE Fighter.
         var store = environment.store();
         store.dispatch(TokenAction.addTokenUpgrade(token0, UpgradeCard.MARA_JADE));
         var position0 = environment.getPositionFor(token0);
         var token1 = environment.tokens()[1]; // TIE Fighter.
         var token2 = environment.tokens()[2]; // X-Wing.
         var position2 = environment.getPositionFor(token2);
         var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
         environment.removeToken(position2);
         environment.placeToken(newPosition2, token2);
         engine.performEndPhase = function()
         {
            LOGGER.info("performEndPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            // LOGGER.info("token0.isDestroyed() ? " + token0.isDestroyed());
            // LOGGER.info("token1.isDestroyed() ? " + token1.isDestroyed());
            // LOGGER.info("token2.isDestroyed() ? " + token2.isDestroyed());
            assert.equal(token0.stressCount(), 0, "token0.stressCount() === 0");
            assert.equal(token1.stressCount(), 0, "token1.stressCount() === 0");
            var stressCount = (token0.isDestroyed() ? 0 : 1);
            assert.equal(token2.stressCount(), stressCount, "token2.stressCount() === " + stressCount);
            done();
         };

         // Run.
         var done = assert.async();
         engine.performCombatPhase(callback);
      });

      QUnit.test("performCombatPhase() R5-P9", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var token0 = environment.tokens()[0]; // TIE Fighter.
         var store = environment.store();
         var position0 = environment.getPositionFor(token0);
         var token1 = environment.tokens()[1]; // TIE Fighter.
         var token2 = environment.tokens()[2]; // X-Wing.
         store.dispatch(TokenAction.addTokenUpgrade(token2, UpgradeCard.R5_P9));
         engine.performEndPhase = function()
         {
            LOGGER.info("performEndPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(token2.focusCount(), 0, "token2.focusCount() === 0");
            assert.equal(token2.shieldCount(), 2, "token2.shieldCount() === 2");
            done();
         };
         store.dispatch(TokenAction.addFocusCount(token2));
         store.dispatch(TokenAction.addShieldCount(token2, -1));
         assert.equal(token2.focusCount(), 1, "token2.focusCount() === 1");
         assert.equal(token2.shieldCount(), 1, "token2.shieldCount() === 1");

         // Run.
         var done = assert.async();
         engine.performCombatPhase(callback);
      });

      QUnit.test("performCombatPhase() Ysanne Isard", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var token0 = environment.tokens()[0]; // TIE Fighter.
         var store = environment.store();
         store.dispatch(TokenAction.addTokenUpgrade(token0, UpgradeCard.YSANNE_ISARD));
         store.dispatch(TokenAction.setShieldCount(token0));
         store.dispatch(TokenAction.addTokenDamage(token0, DamageCard.BLINDED_PILOT));
         var position0 = environment.getPositionFor(token0);
         var token1 = environment.tokens()[1]; // TIE Fighter.
         var token2 = environment.tokens()[2]; // X-Wing.
         var position2 = environment.getPositionFor(token2);
         var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
         environment.removeToken(position2);
         environment.placeToken(newPosition2, token2);
         engine.processCombatQueue = function()
         {
            LOGGER.info("processCombatQueue() dummy");
            var combatPhaseCallback = this.combatPhaseCallback();
            combatPhaseCallback();
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(token0.shieldCount(), 0, "token0.shieldCount() === 0");
            assert.equal(token0.damageCount(), 1, "token0.damageCount() === 1");
            assert.equal(token0.evadeCount(), 1, "token0.evadeCount() === 1");
            done();
         };
         assert.equal(token0.shieldCount(), 0);
         assert.equal(token0.damageCount(), 1);
         assert.equal(token0.evadeCount(), 0, "token0.evadeCount() === 0");

         // Run.
         var done = assert.async();
         engine.performCombatPhase(callback);
      });

      QUnit.test("performEndPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         var environment = engine.environment();
         var store = environment.store();
         var token0 = environment.tokens()[0];
         store.dispatch(TokenAction.addEvadeCount(token0));
         store.dispatch(TokenAction.addFocusCount(token0));
         store.dispatch(TokenAction.addWeaponsDisabledCount(token0));
         var token1 = environment.tokens()[1];
         store.dispatch(TokenAction.addEvadeCount(token1));
         store.dispatch(TokenAction.addFocusCount(token1));
         store.dispatch(TokenAction.addWeaponsDisabledCount(token1));
         var token2 = environment.tokens()[2];
         store.dispatch(TokenAction.addEvadeCount(token2));
         store.dispatch(TokenAction.addFocusCount(token2));
         store.dispatch(TokenAction.addWeaponsDisabledCount(token2));
         engine.performPlanningPhase = function()
         {
            LOGGER.info("performPlanningPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
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
         };

         // Run.
         var done = assert.async();
         engine.performEndPhase(callback);
      });

      QUnit.test("performPlanningPhase()", function(assert)
      {
         // Setup.
         var engine = createEngine();
         engine.performActivationPhase = function()
         {
            LOGGER.info("performActivationPhase() dummy");
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(engine.firstTokenToManeuver());
            assert.ok(engine.secondTokenToManeuver());
            done();
         };

         // Run.
         var done = assert.async();
         engine.performPlanningPhase(callback);
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
         store.dispatch(Action.setAdjudicator(adjudicator));

         return new Engine(environment, adjudicator, delay);
      }

      function createEngineEpsilonLeader()
      {
         var environment = EnvironmentFactory.createTFACoreSetEnvironment();
         var adjudicator = new Adjudicator();
         var store = environment.store();
         store.dispatch(Action.setAdjudicator(adjudicator));

         return new Engine(environment, adjudicator, delay);
      }
   });
