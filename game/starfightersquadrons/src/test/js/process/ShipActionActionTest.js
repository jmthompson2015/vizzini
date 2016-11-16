define(["process/EnvironmentFactory", "Maneuver", "Position", "process/ShipActionAction", "process/Action"],
    function(EnvironmentFactory, Maneuver, Position, ShipActionAction, Action)
    {
        "use strict";
        QUnit.module("ShipActionAction");

        QUnit.test("BarrelRoll.doIt() left", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var tokenPosition = environment.getPositionFor(token);
            environment.removeToken(tokenPosition);
            environment.placeToken(new Position(458, 890, 270), token);
            var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD);

            // Run.
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 - 80);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
        });

        QUnit.test("BarrelRoll.toString() left", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Barrel Roll Left");
        });

        QUnit.test("BarrelRoll.doIt() right", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var tokenPosition = environment.getPositionFor(token);
            environment.removeToken(tokenPosition);
            environment.placeToken(new Position(458, 890, 270), token);
            var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD);

            // Run.
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 + 80);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
        });

        QUnit.test("BarrelRoll.toString() right", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Barrel Roll Right");
        });

        QUnit.test("Boost.doIt() left", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_LEFT_1_STANDARD);

            // Run.
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 - 38);
            assert.equal(position.y(), 895 - 93);
            assert.equal(position.heading(), 270 - 45);
        });

        QUnit.test("Boost.toString() left", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_LEFT_1_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Boost Left");
        });

        QUnit.test("Boost.doIt() straight", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Boost(environment, token, Maneuver.STRAIGHT_1_STANDARD);

            // Run.
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895 - 80);
            assert.equal(position.heading(), 270);
        });

        QUnit.test("Boost.toString() straight", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Boost(environment, token, Maneuver.STRAIGHT_1_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Boost Straight");
        });

        QUnit.test("Boost.doIt() right", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD);

            // Run.
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 + 38);
            assert.equal(position.y(), 895 - 93);
            assert.equal(position.heading(), 270 + 45);
        });

        QUnit.test("Boost.toString() right", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Boost Right");
        });

        QUnit.test("Cloak.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Cloak(store, token);

            // Run.
            assert.equal(token.cloakCount(), 0);
            action.doIt();

            // Verify.
            assert.equal(token.cloakCount(), 1);
        });

        QUnit.test("Cloak.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Cloak(store, token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Cloak");
        });

        QUnit.test("Coordinate.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createHugeShipEnvironment();
            var token = environment.tokens()[0]; // Gozanti-class
            var action = new ShipActionAction.Coordinate(token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Coordinate: 1 Gozanti-class Cruiser");
        });

        QUnit.test("Decloak.doIt() left", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var tokenPosition = environment.getPositionFor(token);
            environment.removeToken(tokenPosition);
            environment.placeToken(new Position(458, 890, 270), token);
            store.dispatch(Action.addCloakCount(token));
            var action = new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD);

            // Run.
            assert.equal(token.cloakCount(), 1);
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            assert.equal(token.cloakCount(), 0);
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 - 120);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
        });

        QUnit.test("Decloak.toString() left", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Decloak: Barrel Roll Left 2");
        });

        QUnit.test("Decloak.doIt() straight", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            store.dispatch(Action.addCloakCount(token));
            var action = new ShipActionAction.Decloak(environment, token, Maneuver.STRAIGHT_2_STANDARD);

            // Run.
            assert.equal(token.cloakCount(), 1);
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            assert.equal(token.cloakCount(), 0);
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895 - 120);
            assert.equal(position.heading(), 270);
        });

        QUnit.test("Decloak.toString() straight", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Decloak(environment, token, Maneuver.STRAIGHT_2_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Decloak: Straight 2");
        });

        QUnit.test("Evade.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Evade(store, token);

            // Run.
            assert.equal(token.evadeCount(), 0);
            action.doIt();

            // Verify.
            assert.equal(token.evadeCount(), 1);
        });

        QUnit.test("Evade.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Evade(store, token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Evade");
        });

        QUnit.test("Focus.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Focus(store, token);

            // Run.
            assert.equal(token.focusCount(), 0);
            action.doIt();

            // Verify.
            assert.equal(token.focusCount(), 1);
        });

        QUnit.test("Focus.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Focus(store, token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Focus");
        });

        QUnit.test("Jam.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var defender = environment.tokens()[0]; // TIE Fighter
            var action = new ShipActionAction.Jam(store, defender);

            // Run.
            assert.equal(defender.stressCount(), 0);
            action.doIt();

            // Verify.
            assert.equal(defender.stressCount(), 2);
        });

        QUnit.test("Jam.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Jam(store, token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Jam: 3 Luke Skywalker (X-Wing)");
        });

        QUnit.test("Recover.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createHugeShipEnvironment();
            var token = environment.tokens()[0]; // Gozanti-class
            var action = new ShipActionAction.Recover(token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Recover");
        });

        QUnit.test("Reinforce.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Reinforce(store, token);

            // Run.
            assert.equal(token.reinforceCount(), 0);
            action.doIt();

            // Verify.
            assert.equal(token.reinforceCount(), 1);
        });

        QUnit.test("Reinforce.toString() Gozanti-class", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createHugeShipEnvironment();
            var store = environment.store();
            var token = environment.tokens()[0]; // Gozanti-class
            var action = new ShipActionAction.Reinforce(store, token);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Reinforce");
        });

        QUnit.test("Reinforce.toString() CR90", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createHugeShipEnvironment();
            var store = environment.store();

            // Run / Verify.
            assert.equal(new ShipActionAction.Reinforce(store, environment.tokens()[3]).toString(), "Reinforce");
            assert.equal(new ShipActionAction.Reinforce(store, environment.tokens()[3].tokenFore()).toString(),
                "Reinforce: 7 CR90 Corvette (fore)");
            assert.equal(new ShipActionAction.Reinforce(store, environment.tokens()[3].tokenAft()).toString(),
                "Reinforce: 8 CR90 Corvette (aft)");
        });

        QUnit.test("Slam.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Slam(environment, token, Maneuver.STRAIGHT_2_STANDARD);

            // Run.
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);
            action.doIt();

            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895 - 120);
            assert.equal(position.heading(), 270);
        });

        QUnit.test("Slam.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var token = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.Slam(environment, token, Maneuver.STRAIGHT_2_STANDARD);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "SLAM: Straight 2");
        });

        QUnit.test("TargetLock.doIt()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var defender = environment.tokens()[0]; // TIE Fighter
            var attacker = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.SAATargetLock(store, attacker, defender);

            // Run.
            assert.equal(attacker.attackerTargetLocks().length, 0);
            assert.equal(defender.defenderTargetLocks().length, 0);
            action.doIt();

            // Verify.
            assert.equal(attacker.attackerTargetLocks().length, 1);
            assert.equal(defender.defenderTargetLocks().length, 1);
        });

        QUnit.test("TargetLock.toString()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var defender = environment.tokens()[0]; // TIE Fighter
            var attacker = environment.tokens()[2]; // X-Wing
            var action = new ShipActionAction.SAATargetLock(store, attacker, defender);

            // Run.
            var result = action.toString();

            // Verify.
            assert.ok(result);
            assert.equal(result, "Target Lock: 1 \"Mauler Mithel\" (TIE Fighter)");
        });
    });
