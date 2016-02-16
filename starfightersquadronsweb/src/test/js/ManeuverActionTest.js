define([ "EnvironmentFactory", "Maneuver", "ManeuverAction", "Position", "ShipBase", "Token", "UpgradeCard" ],
        function(EnvironmentFactory, Maneuver, ManeuverAction, Position, ShipBase, Token, UpgradeCard)
        {
            "use strict";
            QUnit.module("ManeuverAction");

            QUnit.test("ManeuverAction properties", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var maneuverKey = Maneuver.STRAIGHT_1_EASY;
                var fromPosition = new Position(458, 895, -90); // X-Wing
                var token = environment.getTokenAt(fromPosition);
                var shipBaseKey = token.pilot().shipTeam.ship.shipBaseKey;
                var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

                // Run / Verify.
                assert.equal(maneuverAction.environment(), environment);
                assert.equal(maneuverAction.token(), token);
                assert.equal(maneuverAction.maneuverKey(), maneuverKey);
                // assert.equal(maneuverAction.fromPosition(), fromPosition);
                // assert.equal(maneuverAction.shipBaseKey(), shipBaseKey);
                assert.equal(maneuverAction.maneuver(), Maneuver.properties[maneuverKey]);
                // assert.equal(maneuverAction.shipBase(), ShipBase.properties[shipBaseKey]);

            });

            QUnit.test("doIt() Straight1Easy", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var maneuverKey = Maneuver.STRAIGHT_1_EASY;
                var fromPosition = new Position(458, 895, -90); // X-Wing
                var token = environment.getTokenAt(fromPosition);
                assert.ok(token);
                environment.removeToken(fromPosition);
                fromPosition = new Position(fromPosition.x(), fromPosition.y(), -30);
                environment.placeToken(fromPosition, token);

                var shipBase = token.pilot().shipTeam.ship.shipBaseKey;
                var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

                // Run.
                maneuverAction.doIt();

                // Verify.
                var toPosition = environment.getPositionFor(token);
                assert.ok(toPosition);
                assert.equal(toPosition.x(), fromPosition.x() + 69);
                assert.equal(toPosition.y(), fromPosition.y() - 40);
                assert.equal(toPosition.heading(), 330);
            });

            QUnit.test("doIt() Straight3Standard", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var maneuverKey = Maneuver.STRAIGHT_3_STANDARD;
                var fromPosition = new Position(458, 895, -90); // X-Wing
                var token = environment.getTokenAt(fromPosition);
                assert.ok(token);
                environment.removeToken(fromPosition);
                fromPosition = new Position(fromPosition.x(), fromPosition.y(), -30);
                environment.placeToken(fromPosition, token);

                var shipBase = token.pilot().shipTeam.ship.shipBaseKey;
                var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

                // Run.
                maneuverAction.doIt();

                // Verify.
                var toPosition = environment.getPositionFor(token);
                assert.ok(toPosition);
                assert.equal(toPosition.x(), fromPosition.x() + 139);
                assert.equal(toPosition.y(), fromPosition.y() - 80);
                assert.equal(toPosition.heading(), 330);
            });

            QUnit.test("doIt() Straight3Standard collision", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();

                var fromPosition0 = new Position(305, 20, 90);
                var token0 = environment.getTokenAt(fromPosition0); // TIE Fighter
                assert.ok(token0);

                var maneuverKey = Maneuver.STRAIGHT_3_STANDARD;
                var fromPosition2 = new Position(458, 895, -90);
                var token2 = environment.getTokenAt(fromPosition2); // X-Wing
                assert.ok(token2);
                environment.removeToken(fromPosition2);
                fromPosition2 = new Position(fromPosition2.x(), fromPosition2.y(), -30);
                environment.placeToken(fromPosition2, token2);

                // Move token0 to token1's planned toPosition.
                fromPosition0 = new Position(fromPosition2.x() + 139, fromPosition2.y() - 80, 90);
                environment.placeToken(fromPosition0, token0);

                var shipBase = token2.pilot().shipTeam.ship.shipBaseKey;
                var maneuverAction = new ManeuverAction(environment, token2, maneuverKey);

                // Run.
                maneuverAction.doIt();

                // Verify.
                var toPosition = environment.getPositionFor(token2);
                assert.equal(toPosition.x(), fromPosition2.x() + 95);
                assert.equal(toPosition.y(), fromPosition2.y() - 55);
                assert.equal(toPosition.heading(), 330);
            });

            QUnit.test("doIt() R2-D2", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var token = environment.tokens()[2]; // X-Wing
                token.upgradeKeys().push(UpgradeCard.R2_D2);
                var maxShield = token.shieldValue();
                token.shield().decrease();
                assert.equal(token.shield().count(), maxShield - 1);
                var maneuverKey = Maneuver.STRAIGHT_1_EASY;
                var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

                // Run.
                maneuverAction.doIt();

                // Verify.
                assert.equal(token.shield().count(), maxShield);
            });

            QUnit.test("doIt() R2-D2 at max", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var token = environment.tokens()[2]; // X-Wing
                token.upgradeKeys().push(UpgradeCard.R2_D2);
                var maxShield = token.shieldValue();
                assert.equal(token.shield().count(), maxShield);
                var maneuverKey = Maneuver.STRAIGHT_1_EASY;
                var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

                // Run.
                maneuverAction.doIt();

                // Verify.
                assert.equal(token.shield().count(), maxShield);
            });
        });
