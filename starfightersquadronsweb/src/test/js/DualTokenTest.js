define(
        [ "DamageCard", "DualToken", "Pilot", "Ship", "Team", "Token", "UpgradeCard", "process/Reducer",
                "ui/HumanAgent" ], function(DamageCard, DualToken, Pilot, Ship, Team, Token, UpgradeCard, Reducer,
                HumanAgent)
        {
            "use strict";
            QUnit.module("DualToken");

            QUnit.test("DualToken properties CR90 Corvette", function(assert)
            {
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);
                assert.equal(token.id(), 1);
                assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE);
                assert.equal(token.pilot().shipTeam.shipKey, Ship.CR90_CORVETTE);
                assert.equal(token.name(), "1 CR90 Corvette");

                var tokenFore = token.tokenFore();
                assert.ok(tokenFore);
                assert.equal(tokenFore.name(), "2 CR90 Corvette (fore)");
                assert.equal(tokenFore.upgradeKeys().length, 3);
                assert.equal(tokenFore.secondaryWeapons().length, 1);
                var weapon = tokenFore.secondaryWeapons()[0];
                assert.ok(weapon);
                assert.equal(weapon.upgradeKey(), UpgradeCard.QUAD_LASER_CANNONS);

                var tokenAft = token.tokenAft();
                assert.ok(tokenAft);
                assert.equal(tokenAft.name(), "3 CR90 Corvette (aft)");
                assert.equal(tokenAft.upgradeKeys().length, 1);
                assert.equal(tokenAft.secondaryWeapons().length, 0);
            });

            QUnit.test("isDestroyed()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);
                var tokenFore = token.tokenFore();
                var i;
                for (i = 0; i < tokenFore.hullValue() - 1; i++)
                {
                    tokenFore.addDamage(DamageCard.DIRECT_HIT);
                }
                var tokenAft = token.tokenAft();
                for (i = 0; i < tokenAft.hullValue() - 1; i++)
                {
                    tokenAft.addDamage(DamageCard.DIRECT_HIT);
                }
                assert.ok(!token.isDestroyed());

                // Run / Verify.
                tokenFore.addDamage(DamageCard.DIRECT_HIT);
                assert.ok(!token.isDestroyed());
                tokenAft.addDamage(DamageCard.DIRECT_HIT);
                assert.ok(token.isDestroyed());
            });

            QUnit.test("tokenAft()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);

                // Run.
                var result = token.tokenAft();

                // Verify.
                assert.ok(result);
                assert.equal(result.pilot().value, "cr90Corvette.aft");
            });

            QUnit.test("tokenAft() crippled", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);
                var tokenAft = token.tokenAft();
                for (var i = 0; i < tokenAft.hullValue(); i++)
                {
                    token.tokenAft().addDamage(DamageCard.BLINDED_PILOT);
                }
                assert.ok(tokenAft.isDestroyed());

                // Run.
                var result = token.tokenAft();

                // Verify.
                assert.ok(result);
                LOGGER.info("result = " + result);
                LOGGER.info("typeof result = " + (typeof result));
                assert.equal(result.pilot().value, "cr90Corvette.crippledAft");
            });

            QUnit.test("tokenFore()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);

                // Run.
                var result = token.tokenFore();

                // Verify.
                assert.ok(result);
                assert.equal(result.pilot().value, "cr90Corvette.fore");
            });

            QUnit.test("tokenFore() crippled", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);
                var tokenFore = token.tokenFore();
                for (var i = 0; i < tokenFore.hullValue(); i++)
                {
                    token.tokenFore().addDamage(DamageCard.BLINDED_PILOT);
                }
                assert.ok(tokenFore.isDestroyed());

                // Run.
                var result = token.tokenFore();

                // Verify.
                assert.ok(result);
                LOGGER.info("result = " + result);
                LOGGER.info("typeof result = " + (typeof result));
                assert.equal(result.pilot().value, "cr90Corvette.crippledFore");
            });

            QUnit.test("tokenFore().ship()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var store = Redux.createStore(Reducer.root);
                var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
                var token = new DualToken(store, Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                        UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);

                // Run.
                var result = token.tokenFore().ship();

                // Verify.
                assert.ok(result);
                assert.equal(result.value, "cr90Corvette.fore");
            });
        });
