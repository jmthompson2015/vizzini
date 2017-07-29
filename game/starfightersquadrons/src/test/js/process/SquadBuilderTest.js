define(["Pilot", "Ship", "Team", "process/SimpleAgent", "process/SquadBuilder", "process/Reducer", "process/ui/HumanAgent"],
   function(Pilot, Ship, Team, SimpleAgent, SquadBuilder, Reducer, HumanAgent)
   {
      "use strict";
      QUnit.module("SquadBuilder");

      QUnit.test("CoreSetFirstOrderSquadBuilder buildSquad()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var squadBuilder = SquadBuilder.CoreSetFirstOrderSquadBuilder;
         var agent = new SimpleAgent("FirstOrder Agent", Team.IMPERIAL);

         // Run.
         var result = squadBuilder.buildSquad(store, agent);

         // Verify.
         assert.ok(result);
         var tokens = result.tokens();
         assert.ok(tokens);
         assert.equal(tokens.length, 2);
         assert.equal(tokens[0].pilotKey(), Pilot.EPSILON_LEADER);
         assert.equal(tokens[1].pilotKey(), Pilot.ZETA_ACE);

         for (var i = 0; i < 2; i++)
         {
            assert.equal(tokens[i].pilot().shipTeam.shipKey, Ship.TIE_FO_FIGHTER);
         }
      });

      QUnit.test("CoreSetFirstOrderSquadBuilder description()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetFirstOrderSquadBuilder;
         var result = squadBuilder.description();
         assert.equal(result, "TIE/fo Fighters x2");
      });

      QUnit.test("CoreSetFirstOrderSquadBuilder getName()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetFirstOrderSquadBuilder;
         var result = squadBuilder.name();
         assert.equal(result, "First Order TFA Core Set: 39 Points");
      });

      QUnit.test("CoreSetFirstOrderSquadBuilder toString()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetFirstOrderSquadBuilder;
         var result = squadBuilder.toString();
         assert.equal(result, "2015 First Order TFA Core Set: 39 Points (TIE/fo Fighters x2)");
      });

      QUnit.test("CoreSetImperialSquadBuilder buildSquad()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;
         var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);

         // Run.
         var result = squadBuilder.buildSquad(store, agent);

         // Verify.
         assert.ok(result);
         var tokens = result.tokens();
         assert.ok(tokens);
         assert.equal(tokens.length, 2);
         assert.equal(tokens[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(tokens[1].pilotKey(), Pilot.DARK_CURSE);

         for (var i = 0; i < 2; i++)
         {
            assert.equal(tokens[i].pilot().shipTeam.shipKey, Ship.TIE_FIGHTER);
         }
      });

      QUnit.test("CoreSetImperialSquadBuilder description()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;
         var result = squadBuilder.description();
         assert.equal(result, "TIE Fighters x2");
      });

      QUnit.test("CoreSetImperialSquadBuilder getName()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;
         var result = squadBuilder.name();
         assert.equal(result, "Imperial Core Set: 36 Points");
      });

      QUnit.test("CoreSetImperialSquadBuilder toString()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;
         var result = squadBuilder.toString();
         assert.equal(result, "2012 Imperial Core Set: 36 Points (TIE Fighters x2)");
      });

      QUnit.test("CoreSetRebelSquadBuilder buildSquad()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var squadBuilder = SquadBuilder.CoreSetRebelSquadBuilder;
         var inputAreaId = "firstPilotInputArea";
         var imageBase = "../resources/images/";
         var agent = new HumanAgent("Rebel Agent", Team.REBEL, inputAreaId, imageBase);

         // Run.
         var result = squadBuilder.buildSquad(store, agent);

         // Verify.
         assert.ok(result);
         var tokens = result.tokens();
         assert.ok(tokens);
         assert.equal(tokens.length, 1);
         assert.equal(tokens[0].pilotKey(), Pilot.LUKE_SKYWALKER);
         assert.equal(tokens[0].pilot().shipTeam.shipKey, Ship.X_WING);
      });

      QUnit.test("CoreSetRebelSquadBuilder description()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetRebelSquadBuilder;
         var result = squadBuilder.description();
         assert.equal(result, "X-Wing");
      });

      QUnit.test("CoreSetRebelSquadBuilder getName()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetRebelSquadBuilder;
         var result = squadBuilder.name();
         assert.equal(result, "Rebel Core Set: 36 Points");
      });

      QUnit.test("CoreSetRebelSquadBuilder toString()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetRebelSquadBuilder;
         var result = squadBuilder.toString();
         assert.equal(result, "2012 Rebel Core Set: 36 Points (X-Wing)");
      });

      QUnit.test("CoreSetResistanceSquadBuilder buildSquad()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var squadBuilder = SquadBuilder.CoreSetResistanceSquadBuilder;
         var inputAreaId = "firstPilotInputArea";
         var imageBase = "../resources/images/";
         var agent = new HumanAgent("Resistance Agent", Team.REBEL, inputAreaId, imageBase);

         // Run.
         var result = squadBuilder.buildSquad(store, agent);

         // Verify.
         assert.ok(result);
         var tokens = result.tokens();
         assert.ok(tokens);
         assert.equal(tokens.length, 1);
         assert.equal(tokens[0].pilotKey(), Pilot.POE_DAMERON);
         assert.equal(tokens[0].pilot().shipTeam.shipKey, Ship.T_70_X_WING);
      });

      QUnit.test("CoreSetResistanceSquadBuilder description()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetResistanceSquadBuilder;
         var result = squadBuilder.description();
         assert.equal(result, "T-70");
      });

      QUnit.test("CoreSetResistanceSquadBuilder getName()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetResistanceSquadBuilder;
         var result = squadBuilder.name();
         assert.equal(result, "Resistance TFA Core Set: 39 Points");
      });

      QUnit.test("CoreSetResistanceSquadBuilder toString()", function(assert)
      {
         var squadBuilder = SquadBuilder.CoreSetResistanceSquadBuilder;
         var result = squadBuilder.toString();
         assert.equal(result, "2015 Resistance TFA Core Set: 39 Points (T-70)");
      });

      QUnit.test("SquadBuilder.findByTeam() First Order", function(assert)
      {
         var result = SquadBuilder.findByTeam(Team.FIRST_ORDER);
         assert.ok(result);
         assert.equal(result.length, 16);
      });

      QUnit.test("SquadBuilder.findByTeam() Imperial", function(assert)
      {
         var result = SquadBuilder.findByTeam(Team.IMPERIAL);
         assert.ok(result);
         assert.equal(result.length, 16);
      });

      QUnit.test("SquadBuilder.findByTeam() Rebel", function(assert)
      {
         var result = SquadBuilder.findByTeam(Team.REBEL);
         assert.ok(result);
         assert.equal(result.length, 22);
      });

      QUnit.test("SquadBuilder.findByTeam() Resistance", function(assert)
      {
         var result = SquadBuilder.findByTeam(Team.RESISTANCE);
         assert.ok(result);
         assert.equal(result.length, 22);
      });

      QUnit.test("SquadBuilder.findByTeam() Scum", function(assert)
      {
         var result = SquadBuilder.findByTeam(Team.SCUM);
         assert.ok(result);
         assert.equal(result.length, 13);
      });
   });
