define([ "Adjudicator", "EnvironmentFactory", "Maneuver", "MediumAgent", "Position", "SquadBuilder", "Team" ],
        function(Adjudicator, EnvironmentFactory, Maneuver, MediumAgent, Position, SquadBuilder, Team)
        {
            "use strict";
            QUnit.module("MediumAgent");

            QUnit.test("properties", function(assert)
            {
                // Setup.
                var result = new MediumAgent("myAgent", "myTeam");

                // Run / Verify.
                assert.equal(result.name(), "myAgent");
                assert.equal(result.teamKey(), "myTeam");
            });

            QUnit.test("chooseWeaponAndDefender() Imperial", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var adjudicator = new Adjudicator();
                var name = "myAgent";
                var team = Team.IMPERIAL;
                var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;
                var agent = new MediumAgent(name, team);

                var oldPosition0 = new Position(305, 20, 90);
                var token0 = environment.getTokenAt(oldPosition0);
                var position0 = new Position(458, 795, 90);
                environment.removeToken(oldPosition0);
                environment.placeToken(position0, token0);

                var position1 = new Position(610, 20, 90);
                var token1 = environment.getTokenAt(position1);

                var position2 = new Position(458, 895, -90);
                var token2 = environment.getTokenAt(position2);

                LOGGER.debug("token0 = " + token0);
                LOGGER.debug("token1 = " + token1);
                LOGGER.debug("token2 = " + token2);

                var result;
                var caller = {};
                function callback(weapon, defender)
                {
                    LOGGER.debug("callback() weapon = " + weapon + " defender = " + defender);

                    // Verify.
                    assert.ok(weapon);
                    assert.equal(weapon, token0.primaryWeapon());
                    assert.ok(defender);
                    assert.equal(defender, token2);
                }

                // Run.
                agent.chooseWeaponAndDefender(environment, adjudicator, token0, callback);
            });

            QUnit.test("getPlanningAction() Imperial", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment("MediumAgent");
                var adjudicator = new Adjudicator();
                var agent = new MediumAgent("myAgent", Team.IMPERIAL);

                var position0 = new Position(305, 20, 90);
                var token0 = environment.getTokenAt(position0);

                var position1 = new Position(610, 20, 90);
                var token1 = environment.getTokenAt(position1);

                var position2 = new Position(458, 895, -90);
                var token2 = environment.getTokenAt(position2);

                var result;
                var caller = {};
                function callback(planningAction)
                {
                    LOGGER.debug("callback()");
                    result = planningAction;

                    // Verify.
                    assert.ok(result);
                    assert.ok(result[token0]);
                    assert.ok(result[token1]);
                    assert.ok(!result[token2]);
                }

                // Run.
                agent.getPlanningAction(environment, adjudicator, callback);
            });

            QUnit.test("getPlanningAction() Rebel", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var adjudicator = new Adjudicator();
                var name = "myAgent";
                var team = Team.REBEL;
                var squadBuilder = SquadBuilder.CoreSetRebelSquadBuilder;
                var agent = new MediumAgent(name, team);

                var position0 = new Position(305, 20, 90);
                var token0 = environment.getTokenAt(position0);
                var maneuver0 = Maneuver.STRAIGHT_1_STANDARD;

                var position1 = new Position(610, 20, 90);
                var token1 = environment.getTokenAt(position1);
                var maneuver1 = Maneuver.STRAIGHT_1_STANDARD;

                var position2 = new Position(458, 895, -90);
                var token2 = environment.getTokenAt(position2);
                var maneuver2 = Maneuver.STRAIGHT_1_STANDARD;

                var result;
                var caller = {};
                function callback(planningAction)
                {
                    LOGGER.debug("callback()");
                    result = planningAction;

                    // Verify.
                    assert.ok(result);
                    assert.ok(!result[token0]);
                    assert.ok(!result[token1]);
                    assert.ok(result[token2]);
                }

                // Run.
                agent.getPlanningAction(environment, adjudicator, callback);
            });

            QUnit.test("getPlanningAction() Rebel 2", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var adjudicator = new Adjudicator();
                var agent = new MediumAgent("myAgent", Team.REBEL);

                var oldPosition = new Position(458, 895, -90);
                var newPosition = new Position(20, 110, -90);
                var token = environment.getTokenAt(oldPosition);
                environment.removeToken(oldPosition);
                environment.placeToken(newPosition, token);

                function callback(planningAction)
                {
                    // Verify.
                    assert.ok(planningAction);
                    assert.ok(planningAction[token]);
                    assert.equal(planningAction[token], Maneuver.TURN_RIGHT_2_STANDARD);
                }

                // Run.
                agent.getPlanningAction(environment, adjudicator, callback);
            });

            QUnit.test("toString()", function(assert)
            {
                // Setup.
                var agent = new MediumAgent("myAgent", Team.IMPERIAL);

                // Run.
                var result = agent.toString();

                // Verify.
                assert.ok(result);
                assert.equal(result, "myAgent, MediumAgent, imperial");
            });
        });
