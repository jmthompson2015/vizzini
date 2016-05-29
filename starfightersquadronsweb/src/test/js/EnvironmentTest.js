define(
        [ "Environment", "EnvironmentFactory", "Phase", "Pilot", "Position", "RangeRuler", "Ship",
                "ShipDestroyedAction", "ShipFledAction", "SimpleAgent", "TargetLock", "Team", "Token", "UpgradeCard",
                "process/Reducer" ],
        function(Environment, EnvironmentFactory, Phase, Pilot, Position, RangeRuler, Ship, ShipDestroyedAction,
                ShipFledAction, SimpleAgent, TargetLock, Team, Token, UpgradeCard, Reducer)
        {
            "use strict";
            QUnit.module("Environment");

            QUnit.test("activeToken()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var token0 = environment.tokens()[0]; // TIE Fighter.
                assert.ok(!environment.activeToken());
                environment.bind(Environment.ACTIVE_TOKEN_EVENT, function(activeToken)
                {
                    assert.equal(activeToken, token0);
                });

                // Run.
                environment.activeToken(token0);

                // Verify.
                assert.equal(environment.activeToken(), token0);
            });

            QUnit.test("createWeaponToRangeToDefenders() one", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attackerPosition = new Position(458, 895, -90); // X-Wing.
                var attacker = environment.getTokenAt(attackerPosition);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(300, 70, -90);
                environment.placeToken(attackerPosition, attacker);
                var weapon = attacker.primaryWeapon();

                // Run.
                var result = environment.createWeaponToRangeToDefenders(attacker);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                {
                    var weaponToRangeToDefenders = result[0];
                    weapon = weaponToRangeToDefenders.weapon;
                    assert.equal(weapon, attacker.primaryWeapon());

                    var rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
                    assert.ok(rangeToDefendersArray);
                    assert.equal(rangeToDefendersArray.length, 1);

                    var rangeToDefenders = rangeToDefendersArray[0];
                    assert.equal(rangeToDefenders.range, RangeRuler.ONE);

                    var defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 1);
                }
            });

            QUnit.test("createWeaponToRangeToDefenders() one", function(assert)
            {
                // Setup.
                var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
                var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
                var attacker = new Token(Pilot.DASH_RENDAR, rebelAgent, [ UpgradeCard.OUTRIDER,
                        UpgradeCard.CALCULATION, UpgradeCard.MANGLER_CANNON, UpgradeCard.BLASTER_TURRET,
                        UpgradeCard.PROTON_TORPEDOES ]);
                var defender0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
                var defender1 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
                var defender2 = new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, imperialAgent);
                var defender3 = new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, imperialAgent);
                var defender4 = new Token(Pilot.BLACK_SQUADRON_PILOT, imperialAgent);
                var defender5 = new Token(Pilot.BLACK_SQUADRON_PILOT, imperialAgent);

                attacker.focus().increase();
                var targetLock = new TargetLock(attacker, defender3);
                attacker.addAttackerTargetLock(targetLock);
                defender3.addDefenderTargetLock(targetLock);

                var store = Redux.createStore(Reducer.root);
                var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
                environment.placeToken(new Position(458, 895, -90), attacker);
                environment.placeToken(new Position(450, 845, 90), defender0);
                environment.placeToken(new Position(450, 795, 90), defender1);
                environment.placeToken(new Position(450, 745, 90), defender2);
                environment.placeToken(new Position(450, 695, 90), defender3);
                environment.placeToken(new Position(450, 645, 90), defender4);
                environment.placeToken(new Position(450, 595, 90), defender5);

                // Run.
                var result = environment.createWeaponToRangeToDefenders(attacker);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 4);
                var weaponToRangeToDefenders, weapon, rangeToDefendersArray, rangeToDefenders, defenders;
                {
                    weaponToRangeToDefenders = result[0];
                    weapon = weaponToRangeToDefenders.weapon;
                    assert.equal(weapon, attacker.primaryWeapon());

                    rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
                    assert.ok(rangeToDefendersArray);
                    assert.equal(rangeToDefendersArray.length, 3);

                    rangeToDefenders = rangeToDefendersArray[0];
                    assert.equal(rangeToDefenders.range, RangeRuler.ONE);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 2);

                    rangeToDefenders = rangeToDefendersArray[1];
                    assert.equal(rangeToDefenders.range, RangeRuler.TWO);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 2);

                    rangeToDefenders = rangeToDefendersArray[2];
                    assert.equal(rangeToDefenders.range, RangeRuler.THREE);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 1);
                }
                {
                    weaponToRangeToDefenders = result[1];
                    weapon = weaponToRangeToDefenders.weapon;
                    assert.equal(weapon.upgradeKey(), UpgradeCard.MANGLER_CANNON);

                    rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
                    assert.ok(rangeToDefendersArray);
                    assert.equal(rangeToDefendersArray.length, 3);

                    rangeToDefenders = rangeToDefendersArray[0];
                    assert.equal(rangeToDefenders.range, RangeRuler.ONE);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 2);

                    rangeToDefenders = rangeToDefendersArray[1];
                    assert.equal(rangeToDefenders.range, RangeRuler.TWO);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 2);

                    rangeToDefenders = rangeToDefendersArray[2];
                    assert.equal(rangeToDefenders.range, RangeRuler.THREE);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 1);
                }
                {
                    weaponToRangeToDefenders = result[2];
                    weapon = weaponToRangeToDefenders.weapon;
                    assert.equal(weapon.upgradeKey(), UpgradeCard.BLASTER_TURRET);

                    rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
                    assert.ok(rangeToDefendersArray);
                    assert.equal(rangeToDefendersArray.length, 2);

                    rangeToDefenders = rangeToDefendersArray[0];
                    assert.equal(rangeToDefenders.range, RangeRuler.ONE);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 2);

                    rangeToDefenders = rangeToDefendersArray[1];
                    assert.equal(rangeToDefenders.range, RangeRuler.TWO);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 2);
                }
                {
                    weaponToRangeToDefenders = result[3];
                    weapon = weaponToRangeToDefenders.weapon;
                    assert.equal(weapon.upgradeKey(), UpgradeCard.PROTON_TORPEDOES);

                    rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
                    assert.ok(rangeToDefendersArray);
                    assert.equal(rangeToDefendersArray.length, 1);

                    rangeToDefenders = rangeToDefendersArray[0];
                    assert.equal(rangeToDefenders.range, RangeRuler.TWO);
                    defenders = rangeToDefenders.defenders;
                    assert.ok(defenders);
                    assert.equal(defenders.length, 1);
                }
            });

            QUnit.test("getDefenders()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attackerPosition = new Position(458, 895, -90);
                var attacker = environment.getTokenAt(attackerPosition); // X-Wing
                var weapon = attacker.primaryWeapon();

                // Run.
                var result = environment.getDefenders(attacker.pilot().shipTeam.teamKey);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
            });

            QUnit.test("getDefendersInRange()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attacker = environment.tokens()[2]; // X-Wing
                var attackerPosition = environment.getPositionFor(attacker);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(458, 50, -90);
                environment.placeToken(attackerPosition, attacker);

                // Run.
                var result = environment.getDefendersInRange(attacker);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                assert.equal(result[0].pilot().shipTeam.teamKey, Team.IMPERIAL);
            });

            QUnit.test("getFriendlyTokensAtRange() zero", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attacker = environment.tokens()[2]; // X-Wing
                var attackerPosition = environment.getPositionFor(attacker);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(458, 50, -90);
                environment.placeToken(attackerPosition, attacker);

                // Run.
                var result = environment.getFriendlyTokensAtRange(attacker, RangeRuler.TWO);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 0);
            });

            QUnit.test("getFriendlyTokensAtRange() one", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attacker = environment.tokens()[0]; // TIE Fighter
                var attackerPosition = environment.getPositionFor(attacker);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(458, 50, -90);
                environment.placeToken(attackerPosition, attacker);

                // Run.
                var result = environment.getFriendlyTokensAtRange(attacker, RangeRuler.TWO);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                assert.equal(result[0].pilotKey(), Pilot.DARK_CURSE);
            });

            QUnit.test("getPositionFor()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var position = new Position(1, 2, 3);
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var agent = environment.firstAgent();
                var token = new Token(Pilot.ACADEMY_PILOT, agent);
                environment.placeToken(position, token);

                // Run.
                var result = environment.getPositionFor(token);

                // Verify.
                assert.ok(result);
                assert.strictEqual(result, position);
            });

            QUnit.test("getPositionFor() Huge2", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createHugeShipEnvironment();
                var token = environment.tokens()[3]; // CR90
                // LOGGER.info("token = " + token);

                // Run.
                var result = environment.getPositionFor(token);

                // Verify.
                assert.ok(result);
                assert.equal(result.x(), 458);
                assert.equal(result.y(), 803);
                assert.equal(result.heading(), 270);

                // Run.
                result = environment.getPositionFor(token.tokenFore());

                // Verify.
                assert.ok(result);
                assert.equal(result.x(), 458);
                assert.equal(result.y(), 803 - 72);
                assert.equal(result.heading(), 270);

                // Run.
                result = environment.getPositionFor(token.tokenAft());

                // Verify.
                assert.ok(result);
                assert.equal(result.x(), 458);
                assert.equal(result.y(), 803 + 72);
                assert.equal(result.heading(), 270);
            });

            QUnit.test("getPositionFor() Huge2 330 deg", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createHugeShipEnvironment();
                var token = environment.tokens()[3]; // CR90
                environment.removeToken(new Position(458, 803, 270));
                environment.placeToken(new Position(458, 750, 330), token);

                // Run.
                var result = environment.getPositionFor(token);

                // Verify.
                assert.ok(result);
                assert.equal(result.x(), 458);
                assert.equal(result.y(), 750);
                assert.equal(result.heading(), 330);

                // Run.
                result = environment.getPositionFor(token.tokenFore());

                // Verify.
                assert.ok(result);
                assert.equal(result.x(), 458 + 62);
                assert.equal(result.y(), 750 - 36);
                assert.equal(result.heading(), 330);

                // Run.
                result = environment.getPositionFor(token.tokenAft());

                // Verify.
                assert.ok(result);
                assert.equal(result.x(), 458 - 62);
                assert.equal(result.y(), 750 + 36);
                assert.equal(result.heading(), 330);
            });

            QUnit.test("getTargetableDefenders() none", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attackerPosition = new Position(458, 895, -90);
                var attacker = environment.getTokenAt(attackerPosition);
                var weapon = attacker.primaryWeapon();

                // Run.
                var result = environment.getTargetableDefenders(attacker, attackerPosition, weapon);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 0);
            });

            QUnit.test("getTargetableDefenders() one", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attackerPosition = new Position(458, 895, -90);
                var attacker = environment.getTokenAt(attackerPosition);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(305, 70, -90);
                environment.placeToken(attackerPosition, attacker);
                var weapon = attacker.primaryWeapon();

                // Run.
                var result = environment.getTargetableDefenders(attacker, attackerPosition, weapon);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
            });

            QUnit.test("getTargetableDefendersAtRange() none", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attackerPosition = new Position(458, 895, -90);
                var attacker = environment.getTokenAt(attackerPosition);
                var weapon = attacker.primaryWeapon();

                // Run.
                var result = environment.getTargetableDefendersAtRange(attacker, attackerPosition, weapon,
                        RangeRuler.ONE);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 0);
            });

            QUnit.test("getTargetableDefendersAtRange() one", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attackerPosition = new Position(458, 895, -90);
                var attacker = environment.getTokenAt(attackerPosition);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(305, 70, -90);
                environment.placeToken(attackerPosition, attacker);
                var weapon = attacker.primaryWeapon();

                // Run.
                var result = environment.getTargetableDefendersAtRange(attacker, attackerPosition, weapon,
                        RangeRuler.ONE);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
            });

            QUnit.test("getTokenAt()", function(assert)
            {
                Token.resetNextId();
                var position = new Position(1, 2, 3);
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var agent = environment.firstAgent();
                var token = new Token(Pilot.ACADEMY_PILOT, agent);
                environment.placeToken(position, token);

                assert.strictEqual(environment.getTokenAt(position), token);
            });

            QUnit.test("getTokenAt() 1", function(assert)
            {
                Token.resetNextId();
                var position = new Position(305, 20, 90);
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                var token = environment.getTokenAt(position);
                assert.strictEqual(token.pilotKey(), Pilot.MAULER_MITHEL);
            });

            QUnit.test("getTokenAt() 2", function(assert)
            {
                Token.resetNextId();
                var position = new Position(610, 20, 90);
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                var token = environment.getTokenAt(position);
                assert.strictEqual(token.pilotKey(), Pilot.DARK_CURSE);
            });

            QUnit.test("getTokenAt() 3", function(assert)
            {
                Token.resetNextId();
                var position = new Position(458, 895, -90);
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                var token = environment.getTokenAt(position);
                assert.strictEqual(token.pilotKey(), Pilot.LUKE_SKYWALKER);
            });

            QUnit.test("getTokensAtRange()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attacker = environment.tokens()[2]; // X-Wing
                var attackerPosition = environment.getPositionFor(attacker);
                environment.removeToken(attackerPosition);
                attackerPosition = new Position(458, 50, -90);
                environment.placeToken(attackerPosition, attacker);

                // Run.
                var result = environment.getTokensAtRange(attacker, RangeRuler.TWO);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
            });

            QUnit.test("getTokensForActivation()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                // Run.
                var result = environment.getTokensForActivation();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 3);
                var token;
                var i = 0;
                {
                    token = result[i++];
                    assert.equal(token.id(), 2);
                    assert.equal(token.pilotKey(), Pilot.DARK_CURSE);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 1);
                    assert.equal(token.pilotKey(), Pilot.MAULER_MITHEL);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 3);
                    assert.equal(token.pilotKey(), Pilot.LUKE_SKYWALKER);
                }
            });

            QUnit.test("getTokensForActivation() Huge", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createHugeShipEnvironment();

                // Run.
                var result = environment.getTokensForActivation();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 6);
                var token;
                var i = 0;
                {
                    token = result[i++];
                    assert.equal(token.id(), 2);
                    assert.equal(token.pilotSkillValue(), 8);
                    assert.equal(token.pilotKey(), Pilot.JUNO_ECLIPSE);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 9);
                    assert.equal(token.pilotSkillValue(), 8);
                    assert.equal(token.pilotKey(), Pilot.WES_JANSON);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 1);
                    assert.equal(token.pilotSkillValue(), 2);
                    assert.equal(token.pilotKey(), Pilot.GOZANTI_CLASS_CRUISER);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 10);
                    assert.equal(token.pilotSkillValue(), 3);
                    assert.equal(token.pilotKey(), Pilot.GR_75_MEDIUM_TRANSPORT);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 3);
                    assert.equal(token.tokenFore().pilotSkillValue(), 4);
                    assert.equal(token.tokenAft().pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 6);
                    assert.equal(token.tokenFore().pilotSkillValue(), 4);
                    assert.equal(token.tokenAft().pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE);
                }
            });

            QUnit.test("getTokensForActivation() Huge pure", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createHugeShipEnvironment();

                // Run.
                var result = environment.getTokensForActivation(true);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 8);
                var token;
                var i = 0;
                {
                    token = result[i++];
                    assert.equal(token.id(), 2);
                    assert.equal(token.pilotSkillValue(), 8);
                    assert.equal(token.pilotKey(), Pilot.JUNO_ECLIPSE);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 9);
                    assert.equal(token.pilotSkillValue(), 8);
                    assert.equal(token.pilotKey(), Pilot.WES_JANSON);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 1);
                    assert.equal(token.pilotSkillValue(), 2);
                    assert.equal(token.pilotKey(), Pilot.GOZANTI_CLASS_CRUISER);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 10);
                    assert.equal(token.pilotSkillValue(), 3);
                    assert.equal(token.pilotKey(), Pilot.GR_75_MEDIUM_TRANSPORT);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 4);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".fore");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 5);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".aft");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 7);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".fore");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 8);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".aft");
                }
            });

            QUnit.test("getTokensForCombat()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                // Run.
                var result = environment.getTokensForCombat();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 3);
                var token;
                var i = 0;
                {
                    token = result[i++];
                    assert.equal(token.id(), 3);
                    assert.equal(token.pilotKey(), Pilot.LUKE_SKYWALKER);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 1);
                    assert.equal(token.pilotKey(), Pilot.MAULER_MITHEL);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 2);
                    assert.equal(token.pilotKey(), Pilot.DARK_CURSE);
                }
            });

            QUnit.test("getTokensForCombat() Huge", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createHugeShipEnvironment();

                // Run.
                var result = environment.getTokensForCombat();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 8);
                var token;
                var i = 0;
                {
                    token = result[i++];
                    assert.equal(token.id(), 2);
                    assert.equal(token.pilotSkillValue(), 8);
                    assert.equal(token.pilotKey(), Pilot.JUNO_ECLIPSE);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 9);
                    assert.equal(token.pilotSkillValue(), 8);
                    assert.equal(token.pilotKey(), Pilot.WES_JANSON);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 4);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".fore");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 5);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".aft");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 7);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".fore");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 8);
                    assert.equal(token.pilotSkillValue(), 4);
                    assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".aft");
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 10);
                    assert.equal(token.pilotSkillValue(), 3);
                    assert.equal(token.pilotKey(), Pilot.GR_75_MEDIUM_TRANSPORT);
                }
                {
                    token = result[i++];
                    assert.equal(token.id(), 1);
                    assert.equal(token.pilotSkillValue(), 2);
                    assert.equal(token.pilotKey(), Pilot.GOZANTI_CLASS_CRUISER);
                }
            });

            QUnit.test("getTokensForTeam() First Order", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createTFACoreSetEnvironment();

                // Run.
                var result = environment.getTokensForTeam(Team.FIRST_ORDER);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                assert.equal(result[0].pilotKey(), Pilot.EPSILON_LEADER);
                assert.equal(result[1].pilotKey(), Pilot.ZETA_ACE);
            });

            QUnit.test("getTokensForTeam() Imperial", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                // Run.
                var result = environment.getTokensForTeam(Team.IMPERIAL);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
            });

            QUnit.test("getTokensForTeam() Imperial mixed teams", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var foAgent = new SimpleAgent("First Order Agent", Team.FIRST_ORDER);
                var token3 = new Token(Pilot.EPSILON_ACE, foAgent);
                environment.placeToken(new Position(200, 200, 0), token3);

                // Run.
                var result = environment.getTokensForTeam(Team.IMPERIAL);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 3);
                assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
                assert.equal(result[2].pilotKey(), Pilot.EPSILON_ACE);
            });

            QUnit.test("getTokensForTeam() Imperial pure", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var isPure = true;

                // Run.
                var result = environment.getTokensForTeam(Team.IMPERIAL, isPure);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
            });

            QUnit.test("getTokensForTeam() Rebel", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                // Run.
                var result = environment.getTokensForTeam(Team.REBEL);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                assert.equal(result[0].pilotKey(), Pilot.LUKE_SKYWALKER);
            });

            QUnit.test("getTokensForTeam() Resistance", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createTFACoreSetEnvironment();

                // Run.
                var result = environment.getTokensForTeam(Team.RESISTANCE);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                assert.equal(result[0].pilotKey(), Pilot.POE_DAMERON);
            });

            QUnit.test("getTokensTouching()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var fromPosition0 = new Position(305, 20, 90);
                var token0 = environment.getTokenAt(fromPosition0); // TIE Fighter 1
                var position1 = new Position(610, 20, 90);
                var token1 = environment.getTokenAt(position1); // TIE Fighter 2
                var fromPosition2 = new Position(458, 895, -90);
                var token2 = environment.getTokenAt(fromPosition2); // X-Wing
                environment.removeToken(fromPosition2);
                fromPosition2 = new Position(fromPosition0.x(), fromPosition0.y() + 39, -90);
                environment.placeToken(fromPosition2, token2);
                environment.tokens().forEach(function(token)
                {
                    LOGGER.debug(token.toString() + " at " + environment.getPositionFor(token));
                });

                // Run.
                var result = environment.getTokensTouching(token0);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 1);
                assert.equal(result[0].pilot().shipTeam.shipKey, Ship.X_WING);
            });

            QUnit.test("getUnfriendlyTokensAtRange() one", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var attacker = environment.tokens()[2]; // X-Wing
                var attackerPosition = environment.getPositionFor(attacker);
                environment.removeToken(attackerPosition);
                 attackerPosition = new Position(458, 50, -90);
                environment.placeToken(attackerPosition, attacker);

                // Run.
                var result = environment.getUnfriendlyTokensAtRange(attacker, RangeRuler.TWO);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 2);
                assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
            });

            QUnit.test("incrementRound()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                assert.equal(environment.round(), 0);
                environment.bind(Environment.ROUND_EVENT, function(round)
                {
                    assert.equal(round, 1);
                });

                // Run.
                environment.incrementRound();

                // Verify.
                assert.equal(environment.round(), 1);
            });

            QUnit.test("placeToken()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var position = new Position(1, 2, 3);
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var agent = environment.firstAgent();
                var token = new Token(Pilot.ACADEMY_PILOT, agent);

                // Run.
                environment.placeToken(position, token);

                // Verify.
                assert.strictEqual(environment.getPositionFor(token), position);
                assert.strictEqual(environment.getTokenAt(position), token);
            });

            QUnit.test("removeToken()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var position = new Position(1, 2, 3);
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var agent = environment.firstAgent();
                var token = new Token(Pilot.ACADEMY_PILOT, agent);
                environment.placeToken(position, token);
                assert.strictEqual(environment.getPositionFor(token), position);
                assert.strictEqual(environment.getTokenAt(position), token);

                // Run.
                environment.removeToken(position);

                // Verify.
                assert.strictEqual(environment.getPositionFor(token), undefined);
                assert.strictEqual(environment.getTokenAt(position), undefined);
            });

            QUnit.test("phase()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                // Run.
                environment.phase(Phase.ACTIVATION_REVEAL_DIAL);

                // Verify.
                assert.equal(environment.phase(), Phase.ACTIVATION_REVEAL_DIAL);
            });

            QUnit.test("ship destroyed event", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var token0 = environment.tokens()[0]; // TIE Fighter.
                var fromPosition = environment.getPositionFor(token0);
                var action = new ShipDestroyedAction(environment, token0, fromPosition);

                environment.bind(Environment.SHIP_DESTROYED_EVENT, function(myAction)
                {
                    // Verify.
                    assert.ok(myAction);
                    assert.equal(myAction.environment(), environment);
                    assert.equal(myAction.token(), token0);
                    assert.equal(myAction.fromPosition(), fromPosition);
                });

                // Run.
                environment.trigger(Environment.SHIP_DESTROYED_EVENT, action);
            });

            QUnit.test("ship fled event", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var token0 = environment.tokens()[0]; // TIE Fighter.
                var fromPosition = environment.getPositionFor(token0);
                var action = new ShipFledAction(environment, token0, fromPosition);

                environment.bind(Environment.SHIP_FLED_EVENT, function(myAction)
                {
                    // Verify.
                    assert.ok(myAction);
                    assert.equal(myAction.environment(), environment);
                    assert.equal(myAction.token(), token0);
                    assert.equal(myAction.fromPosition(), fromPosition);
                });

                // Run.
                environment.trigger(Environment.SHIP_FLED_EVENT, action);
            });

            QUnit.test("tokens()", function(assert)
            {
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                var tokens = environment.tokens();
                assert.equal(tokens.length, 3);
                assert.equal(tokens[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(tokens[1].pilotKey(), Pilot.DARK_CURSE);
                assert.equal(tokens[2].pilotKey(), Pilot.LUKE_SKYWALKER);
            });

            QUnit.test("tokens() Pure", function(assert)
            {
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                var isPure = true;
                var tokens = environment.tokens(isPure);
                assert.equal(tokens.length, 3);
                assert.equal(tokens[0].pilotKey(), Pilot.MAULER_MITHEL);
                assert.equal(tokens[1].pilotKey(), Pilot.DARK_CURSE);
                assert.equal(tokens[2].pilotKey(), Pilot.LUKE_SKYWALKER);
            });

            QUnit
                    .test(
                            "toString()",
                            function(assert)
                            {
                                // Setup.
                                Token.resetNextId();
                                var environment = EnvironmentFactory.createCoreSetEnvironment();

                                // Run / Verify.
                                assert
                                        .equal(
                                                environment.toString(),
                                                "(305, 20, 90) 1 \"Mauler Mithel\" (TIE Fighter)\n(610, 20, 90) 2 \"Dark Curse\" (TIE Fighter)\n(458, 895, 270) 3 Luke Skywalker (X-Wing)\n");
                            });

            QUnit.test("update trigger event", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                environment.bind(Environment.UPDATE_TRIGGER_EVENT, function()
                {
                    // Verify.
                    assert.ok(true);
                });

                // Run.
                environment.trigger(Environment.UPDATE_TRIGGER_EVENT);
            });
        });
