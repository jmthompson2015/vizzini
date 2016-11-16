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
            assert.equal(result.tokens().length, 6);
            var token0 = result.tokens()[0]; // TIE Fighter.
            assert.equal(token0.pilotKey(), "gozantiClassCruiser");
            var token1 = result.tokens()[1]; // TIE Fighter.
            assert.equal(token1.pilotKey(), "junoEclipse");
            var token2 = result.tokens()[2]; // X-Wing.
            assert.equal(token2.pilotKey(), "raiderClassCorvette");
            var token3 = result.tokens()[3]; // X-Wing.
            assert.equal(token3.pilotKey(), "cr90Corvette");
            var token4 = result.tokens()[4]; // X-Wing.
            assert.equal(token4.pilotKey(), "wesJanson");
            var token5 = result.tokens()[5]; // X-Wing.
            assert.equal(token5.pilotKey(), "gr75MediumTransport");
        });
    });
