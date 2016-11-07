define(["Value", "process/Adjudicator", "process/CombatAction", "process/Environment", "process/EnvironmentFactory", "Maneuver", "Phase", "Pilot", "Position", "RangeRuler", "process/SimpleAgent", "process/TargetLock", "Team", "process/Token", "UpgradeCard", "process/Action", "process/Reducer", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
    function(Value, Adjudicator, CombatAction, Environment, EnvironmentFactory, Maneuver, Phase, Pilot, Position, RangeRuler, SimpleAgent, TargetLock, Team, Token, UpgradeCard, Action, Reducer, MockAttackDice, MockDefenseDice)
    {
        "use strict";
        QUnit.module("CombatAction");

        var delay = 1000;

        QUnit.test("CombatAction.doIt() range one through Modify Attack Dice", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var maneuver = Maneuver.STRAIGHT_1_EASY;
            var attacker = environment.tokens()[2]; // Luke Skywalker X-Wing
            assert.ok(attacker);
            attacker.agent().getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice, defender, callback)
            {
                callback(null);
            };
            var weapon = attacker.primaryWeapon();
            assert.ok(weapon);
            var attackerPosition = environment.getPositionFor(attacker);
            var defenderPosition = new Position(305, 20, 90); // Mauler Mithel TIE Fighter
            var defender = environment.tokens()[0];
            defender.agent().getModifyDefenseDiceAction = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, callback)
            {
                callback(null);
            };

            environment.removeToken(attackerPosition);
            attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
            environment.placeToken(attackerPosition, attacker);
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            environment.activeToken(attacker);
            var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender, defenderPosition, callback, MockAttackDice, MockDefenseDice);
            combatAction.rollDefenseDice = function()
            {
                var callback = this.callback();
                callback();
            };

            // Run.
            combatAction.doIt();

            // Verify.
            assert.equal(attacker.combatState().rangeKey(), RangeRuler.ONE);
            assert.equal(environment.phase(), Phase.COMBAT_MODIFY_ATTACK_DICE);
            verifyAttackDice(assert, attacker.combatState().attackDice());
            assert.ok(!defender.isDestroyed());
            var defenseDice = attacker.combatState().defenseDice();
            assert.ok(!defenseDice);
        });

        QUnit.test("CombatAction.doIt() range one through Modify Defense Dice", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var maneuver = Maneuver.STRAIGHT_1_EASY;
            var attacker = environment.tokens()[2]; // Luke Skywalker X-Wing
            assert.ok(attacker);
            attacker.agent().getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice, defender, callback)
            {
                callback(null);
            };
            var weapon = attacker.primaryWeapon();
            assert.ok(weapon);
            var attackerPosition = environment.getPositionFor(attacker);
            var defenderPosition = new Position(305, 20, 90); // Mauler Mithel TIE Fighter
            var defender = environment.tokens()[0];
            defender.agent().compareResults = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, callback)
            {
                callback(null);
            };

            environment.removeToken(attackerPosition);
            attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
            environment.placeToken(attackerPosition, attacker);
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            environment.activeToken(attacker);
            var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender, defenderPosition, callback, MockAttackDice, MockDefenseDice);
            combatAction.finishModifyDefenseDice = function()
            {
                var callback = this.callback();
                callback();
            };

            // Run.
            combatAction.doIt();

            // Verify.
            assert.equal(attacker.combatState().rangeKey(), RangeRuler.ONE);
            assert.equal(environment.phase(), Phase.COMBAT_MODIFY_DEFENSE_DICE);
            verifyAttackDice(assert, attacker.combatState().attackDice());
            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, attacker.combatState().defenseDice());
            assert.equal(defender.hullValue(), 3);
            assert.equal(defender.damageCount(), 0);
            assert.equal(defender.criticalDamageCount(), 0);
        });

        QUnit.test("CombatAction.doIt() range one", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var maneuver = Maneuver.STRAIGHT_1_EASY;
            var attacker = environment.tokens()[2]; // Luke Skywalker X-Wing
            assert.ok(attacker);
            attacker.agent().getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice, defender, callback)
            {
                callback(null);
            };
            var weapon = attacker.primaryWeapon();
            assert.ok(weapon);
            var attackerPosition = environment.getPositionFor(attacker);
            var defenderPosition = new Position(305, 20, 90); // Mauler Mithel TIE Fighter
            var defender = environment.tokens()[0];
            defender.agent().getModifyDefenseDiceAction = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, callback)
            {
                callback(null);
            };

            environment.removeToken(attackerPosition);
            attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
            environment.placeToken(attackerPosition, attacker);
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            environment.activeToken(attacker);
            var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender, defenderPosition, callback, MockAttackDice, MockDefenseDice);

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.equal(combatAction.executionCount(), 1);
                assert.equal(attacker.combatState().rangeKey(), RangeRuler.ONE);
                assert.equal(environment.phase(), Phase.COMBAT_AFTER_DEAL_DAMAGE);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                assert.ok(!defender.isDestroyed());
                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 1);
                if (defender.criticalDamages()[0] === "directHit")
                {
                    assert.equal(defender.hullValue(), 2);
                }
                else
                {
                    assert.equal(defender.hullValue(), 3);
                }
                done();
            }, delay);
        });

        QUnit.skip("CombatAction.doIt() Bossk upgrade", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.BOSSK;
            var combatAction = createCombatAction2(upgradeKey);
            var environment = combatAction.environment();
            // var store = environment.store();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.stressCount(), 0);
            assert.equal(attacker.focusCount(), 0);
            assert.equal(attacker.attackerTargetLocks().length, 0);
            assert.equal(defender.defenderTargetLocks().length, 0);

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                if (attacker.combatState().isDefenderHit())
                {
                    assert.equal(attacker.stressCount(), 0);
                    assert.equal(attacker.focusCount(), 0);
                    assert.equal(attacker.attackerTargetLocks().length, 0);
                    assert.equal(defender.defenderTargetLocks().length, 0);
                }
                else
                {
                    assert.equal(attacker.stressCount(), 1);
                    assert.equal(attacker.focusCount(), 1);
                    assert.equal(attacker.attackerTargetLocks().length, 1);
                    assert.equal(defender.defenderTargetLocks().length, 1);
                }
                done();
            }, 1100);
        });

        QUnit.test("CombatAction.doIt() Flechette Cannon", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.FLECHETTE_CANNON;
            var combatAction = createCombatAction(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.findTargetLockByDefender(defender));
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 1);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 1);
                assert.equal(defender.criticalDamageCount(), 0);
                assert.ok(defender.isStressed());
                assert.equal(defender.stressCount(), 1);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Heavy Laser Cannon", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.HEAVY_LASER_CANNON;
            var combatAction = createCombatActionRange2(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 1);
                assert.equal(attacker.combatState().attackDice().size(), 4);
                var attackDice = attacker.combatState().attackDice();
                assert.equal(attackDice.blankCount(), 1);
                assert.equal(attackDice.criticalHitCount(), 0);
                assert.equal(attackDice.focusCount(), 1);
                assert.equal(attackDice.hitCount(), 2);

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 1);
                assert.equal(defender.criticalDamageCount(), 0);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Hot Shot Blaster", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.HOT_SHOT_BLASTER;
            var combatAction = createCombatAction(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(!attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 0);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 1);
                assert.ok(!defender.isDestroyed());
                if (defender.criticalDamages()[0] === "directHit")
                {
                    assert.equal(defender.hullValue(), 2);
                }
                else
                {
                    assert.equal(defender.hullValue(), 3);
                }
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Ion Cannon", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.ION_CANNON;
            var combatAction = createCombatAction(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 1);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 1);
                assert.equal(defender.criticalDamageCount(), 0);
                assert.equal(defender.ionCount(), 1);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Ion Cannon Turret", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.ION_CANNON_TURRET;
            var combatAction = createCombatAction(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 1);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 1);
                assert.equal(defender.criticalDamageCount(), 0);
                assert.equal(defender.ionCount(), 1);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Mangler Cannon", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.MANGLER_CANNON;
            var combatAction = createCombatAction(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 1);
                var attackDice = attacker.combatState().attackDice();
                assert.equal(attackDice.blankCount(), 1);
                assert.equal(attackDice.criticalHitCount(), 2);
                assert.equal(attackDice.focusCount(), 1);
                assert.equal(attackDice.hitCount(), 0);

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 1);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Tactician", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.TACTICIAN;
            var combatAction = createCombatActionRange2(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(combatAction.executionCount(), 1);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 1);
                assert.equal(defender.stressCount(), 1);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Tractor Beam", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.TRACTOR_BEAM;
            var combatAction = createCombatAction(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
            var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter
            assert.equal(defender.tractorBeamCount(), 0);

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(attacker.secondaryWeapons().length, 1);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 0);
                assert.equal(defender.tractorBeamCount(), 1);
                done();
            }, delay);
        });

        QUnit.test("CombatAction.doIt() Twin Laser Turret", function(assert)
        {
            // Setup.
            var upgradeKey = UpgradeCard.TWIN_LASER_TURRET;
            var combatAction = createCombatActionRange2(upgradeKey);
            var environment = combatAction.environment();
            var attacker = environment.tokens()[0];
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 1);
            var defender = environment.tokens()[1];
            assert.equal(defender.damageCount(), 0);

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(attacker.isUpgradedWith(upgradeKey));
                assert.equal(combatAction.executionCount(), 2);
                assert.equal(attacker.secondaryWeapons().length, 1);
                verifyAttackDice(assert, attacker.combatState().attackDice());

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                assert.ok(0 <= defender.damageCount() && defender.damageCount() <= 2, "defender.damageCount() = " +
                    defender.damageCount());
                assert.equal(defender.damageCount(), 2);
                assert.equal(defender.criticalDamageCount(), 0);
                done();
            }, 2200);
        });

        QUnit.test("CombatAction.doIt() Whisper", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
            var adjudicator = new Adjudicator();
            var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
            var attacker = new Token(store, Pilot.WHISPER, imperialAgent);
            var attackerPosition = new Position(458, 895, -90);
            var weapon = attacker.primaryWeapon();
            var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
            var defender = new Token(store, Pilot.DASH_RENDAR, rebelAgent);
            var defenderPosition = new Position(450, 845, 90);
            environment.placeToken(attackerPosition, attacker);
            environment.placeToken(defenderPosition, defender);
            assert.equal(attacker.focusCount(), 0);
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            environment.activeToken(attacker);
            var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon,
                defender, defenderPosition, callback, MockAttackDice, MockDefenseDice);

            // Run.
            var done = assert.async();
            combatAction.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                verifyAttackDice(assert, attacker.combatState().attackDice());
                assert.equal(attacker.focusCount(), 1);

                verifyDefenseDice(assert, attacker.combatState().defenseDice());
                done();
            }, delay);
        });

        function createCombatAction(upgradeKey, y)
        {
            var store = Redux.createStore(Reducer.root);
            var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
            var adjudicator = new Adjudicator();

            var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
            rebelAgent.getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice, defender, callback)
            {
                callback(null);
            };
            var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
            var attackerPosition = new Position(458, 895, -90);
            var weapon = attacker.secondaryWeapons()[0];
            if (weapon === undefined)
            {
                weapon = attacker.primaryWeapon();
            }

            var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
            imperialAgent.getModifyDefenseDiceAction = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, callback)
            {
                callback(null);
            };
            var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
            var myY = (y !== undefined ? y : 845);
            var defenderPosition = new Position(450, myY, 90);

            environment.placeToken(attackerPosition, attacker);
            environment.placeToken(defenderPosition, defender);
            environment.activeToken(attacker);

            store.dispatch(Action.setEnvironment(environment));
            store.dispatch(Action.addFocusCount(attacker));

            var targetLock = new TargetLock(store, attacker, defender);
            attacker.addAttackerTargetLock(targetLock);

            var callback = function()
            {
                LOGGER.info("callback() start");
            };

            return new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition, callback, MockAttackDice, MockDefenseDice);
        }

        function createCombatActionRange2(upgradeKey)
        {
            return createCombatAction(upgradeKey, 700);
        }

        function createCombatAction2(upgradeKey)
        {
            var store = Redux.createStore(Reducer.root);
            var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
            var adjudicator = new Adjudicator();

            var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
            rebelAgent.getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice, defender, callback)
            {
                callback(null);
            };
            var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
            var attackerPosition = new Position(458, 895, -90);
            var weapon = attacker.primaryWeapon();

            var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
            imperialAgent.getModifyDefenseDiceAction = function(environment, adjudicator, attacker, attackDice, defender, defenseDice, callback)
            {
                callback(null);
            };
            var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
            var defenderPosition = new Position(450, 845, 90);

            store.dispatch(Action.setEnvironment(environment));
            environment.placeToken(attackerPosition, attacker);
            environment.placeToken(defenderPosition, defender);
            environment.activeToken(attacker);

            var callback = function()
            {
                LOGGER.info("callback() start");
            };

            return new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition, callback, MockAttackDice, MockDefenseDice);
        }

        function verifyAttackDice(assert, attackDice)
        {
            assert.ok(attackDice);
            assert.equal(attackDice.blankCount(), 1);
            assert.equal(attackDice.criticalHitCount(), 1);
            assert.equal(attackDice.focusCount(), 1);
            assert.equal(attackDice.hitCount(), 1);
        }

        function verifyDefenseDice(assert, defenseDice)
        {
            assert.ok(defenseDice);
            assert.equal(defenseDice.blankCount(), 1);
            assert.equal(defenseDice.evadeCount(), 1);
            assert.equal(defenseDice.focusCount(), 1);
        }
    });
