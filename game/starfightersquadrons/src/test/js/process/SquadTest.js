define(["Pilot", "Team", "UpgradeCard", "process/Reducer", "process/SimpleAgent", "process/Squad", "process/Token"],
   function(Pilot, Team, UpgradeCard, Reducer, SimpleAgent, Squad, Token)
   {
      "use strict";
      QUnit.module("Squad");

      QUnit.test("Squad()", function(assert)
      {
         // Setup.
         var factionKey = Team.IMPERIAL;
         var name = "US Nationals #1";
         var year = 2014;
         var description = "Lambda Shuttle/TIE Interceptor/Phantom";
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent("Agent1", Team.IMPERIAL);
         var token0 = new Token(store, Pilot.WHISPER, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.GUNNER, UpgradeCard.ADVANCED_CLOAKING_DEVICE]);
         var token1 = new Token(store, Pilot.SOONTIR_FEL, agent, [UpgradeCard.PUSH_THE_LIMIT]);
         var token2 = new Token(store, Pilot.CAPTAIN_YORR, agent);
         var tokens = [token0, token1, token2];

         // Run.
         var result = new Squad(factionKey, name, year, description, tokens);

         // Verify.
         assert.ok(result);
         assert.equal(result.factionKey(), factionKey);
         assert.equal(result.name(), name);
         assert.equal(result.year(), year);
         assert.equal(result.description(), description);
         assert.ok(result.tokens());
         assert.equal(result.tokens().length, 3);
         assert.equal(result.tokens()[0], token0);
         assert.equal(result.tokens()[1], token1);
         assert.equal(result.tokens()[2], token2);
      });

      QUnit.test("pilotSkillValue()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.pilotSkillValue();

         // Verify.
         assert.equal(result, 22);
      });

      QUnit.test("primaryWeaponValue()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.primaryWeaponValue();

         // Verify.
         assert.equal(result, 10);
      });

      QUnit.test("energyValue()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.energyValue();

         // Verify.
         assert.equal(result, 0);
      });

      QUnit.test("agilityValue()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.agilityValue();

         // Verify.
         assert.equal(result, 6);
      });

      QUnit.test("hullValue()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.hullValue();

         // Verify.
         assert.equal(result, 10);
      });

      QUnit.test("shieldValue()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.shieldValue();

         // Verify.
         assert.equal(result, 7);
      });

      QUnit.test("squadPointCost()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.squadPointCost();

         // Verify.
         assert.equal(result, 98);
      });

      QUnit.test("upgradeCount()", function(assert)
      {
         // Setup.
         var squad = createSquad0();

         // Run.
         var result = squad.upgradeCount();

         // Verify.
         assert.equal(result, 5);
      });

      function createSquad0()
      {
         var factionKey = Team.IMPERIAL;
         var name = "US Nationals #1";
         var year = 2014;
         var description = "Lambda Shuttle/TIE Interceptor/Phantom";
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent("Agent1", Team.IMPERIAL);
         var token0 = new Token(store, Pilot.WHISPER, agent, [UpgradeCard.VETERAN_INSTINCTS, UpgradeCard.FIRE_CONTROL_SYSTEM, UpgradeCard.GUNNER, UpgradeCard.ADVANCED_CLOAKING_DEVICE]);
         var token1 = new Token(store, Pilot.SOONTIR_FEL, agent, [UpgradeCard.PUSH_THE_LIMIT]);
         var token2 = new Token(store, Pilot.CAPTAIN_YORR, agent);
         var tokens = [token0, token1, token2];

         return new Squad(factionKey, name, year, description, tokens);
      }
   });
