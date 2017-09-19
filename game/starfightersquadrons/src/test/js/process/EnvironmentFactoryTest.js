define(["process/EnvironmentFactory"],
   function(EnvironmentFactory)
   {
      "use strict";
      QUnit.module("EnvironmentFactory");

      QUnit.test("createCoreSetEnvironment()", function(assert)
      {
         // Run.
         var result = EnvironmentFactory.createCoreSetEnvironment();

         // Verify.
         assert.ok(result);
         assert.equal(result.tokens().length, 3);
         var token0 = result.tokens()[0]; // TIE Fighter.
         assert.equal(token0.pilotKey(), "maulerMithel");
         var token1 = result.tokens()[1]; // TIE Fighter.
         assert.equal(token1.pilotKey(), "darkCurse");
         var token2 = result.tokens()[2]; // X-Wing.
         assert.equal(token2.pilotKey(), "lukeSkywalker");
      });

      QUnit.test("createTFACoreSetEnvironment()", function(assert)
      {
         // Run.
         var result = EnvironmentFactory.createTFACoreSetEnvironment();

         // Verify.
         assert.ok(result);
         assert.equal(result.tokens().length, 3);
         var token0 = result.tokens()[0]; // TIE Fighter.
         assert.equal(token0.pilotKey(), "epsilonLeader");
         var token1 = result.tokens()[1]; // TIE Fighter.
         assert.equal(token1.pilotKey(), "zetaAce");
         var token2 = result.tokens()[2]; // X-Wing.
         assert.equal(token2.pilotKey(), "poeDameron");
      });

      QUnit.test("createHugeShipEnvironment()", function(assert)
      {
         // Run.
         var result = EnvironmentFactory.createHugeShipEnvironment();

         // Verify.
         assert.ok(result);
         var tokens = result.tokens();
         assert.equal(tokens.length, 6);
         var i = 0;
         assert.equal(tokens[i++].pilotKey(), "gozantiClassCruiser");
         assert.equal(tokens[i++].pilotKey(), "junoEclipse");
         assert.equal(tokens[i++].pilotKey(), "raiderClassCorvette");
         assert.equal(tokens[i++].pilotKey(), "cr90Corvette");
         assert.equal(tokens[i++].pilotKey(), "wesJanson");
         assert.equal(tokens[i++].pilotKey(), "gr75MediumTransport");
      });
   });
