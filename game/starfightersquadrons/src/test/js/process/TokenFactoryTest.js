define(["process/DualToken", "Pilot", "process/SimpleAgent", "Team", "process/Token", "process/TokenFactory", "UpgradeCard", "process/Reducer"],
   function(DualToken, Pilot, SimpleAgent, Team, Token, TokenFactory, UpgradeCard, Reducer)
   {
      "use strict";
      QUnit.module("TokenFactory");

      QUnit.test("create() Academy Pilot", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pilotKey = Pilot.ACADEMY_PILOT;
         var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);

         // Run.
         var result = TokenFactory.create(store, pilotKey, agent, [UpgradeCard.MARKSMANSHIP]);

         // Verify.
         assert.ok(result);
         assert.ok(result instanceof Token);
         assert.equal(result.pilotKey(), pilotKey);
         assert.equal(result.agent(), agent);
         assert.ok(result.upgradeKeys());
         assert.equal(result.upgradeKeys().size, 1);
      });

      QUnit.test("create() CR90 Corvette", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pilotKey = Pilot.CR90_CORVETTE;
         var agent = new SimpleAgent("Rebel Agent", Team.REBEL);

         // Run.
         var result = TokenFactory.create(store, pilotKey, agent, [UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER], [UpgradeCard.FREQUENCY_JAMMER]);

         // Verify.
         assert.ok(result);
         assert.ok(result instanceof DualToken);
         assert.equal(result.pilotKey(), pilotKey);
         assert.equal(result.agent(), agent);
         assert.ok(result.tokenFore().upgradeKeys());
         assert.equal(result.tokenFore().upgradeKeys().size, 3);
         assert.ok(result.tokenAft().upgradeKeys());
         assert.equal(result.tokenAft().upgradeKeys().size, 1);
      });

      QUnit.test("get() Academy Pilot", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pilotKey = Pilot.ACADEMY_PILOT;
         var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var token = new Token(store, pilotKey, agent, [UpgradeCard.MARKSMANSHIP]);

         // Run.
         var result = TokenFactory.get(store, token.id());

         // Verify.
         assert.ok(result);
         assert.ok(result instanceof Token);
         assert.equal(result.pilotKey(), pilotKey);
         assert.equal(result.agent(), agent);
         assert.ok(result.upgradeKeys());
         assert.equal(result.upgradeKeys().size, 1);
      });

      QUnit.test("get() CR90 Corvette", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pilotKey = Pilot.CR90_CORVETTE;
         var agent = new SimpleAgent("Rebel Agent", Team.REBEL);
         var token = new DualToken(store, pilotKey, agent, [UpgradeCard.QUAD_LASER_CANNONS, UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER], [UpgradeCard.FREQUENCY_JAMMER]);

         // Run.
         var result = TokenFactory.get(store, token.id());

         // Verify.
         assert.ok(result);
         assert.ok(result instanceof DualToken);
         assert.equal(result.pilotKey(), pilotKey);
         assert.equal(result.agent(), agent);
         assert.ok(result.tokenFore().upgradeKeys());
         assert.equal(result.tokenFore().upgradeKeys().size, 3);
         assert.ok(result.tokenAft().upgradeKeys());
         assert.equal(result.tokenAft().upgradeKeys().size, 1);
      });
   });
