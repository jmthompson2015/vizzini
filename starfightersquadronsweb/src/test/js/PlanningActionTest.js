define([ "EnvironmentFactory", "Maneuver", "PlanningAction", "Position", "SimpleAgent", "SquadBuilder", "Team" ],
        function(EnvironmentFactory, Maneuver, PlanningAction, Position, SimpleAgent, SquadBuilder, Team)
        {
            QUnit.module("PlanningAction");

            QUnit.test("PlanningAction properties", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var agent = new SimpleAgent("myAgent", Team.IMPERIAL);

                var position0 = new Position(305, 20, 90);
                var token0 = environment.getTokenAt(position0);
                var maneuver0 = Maneuver.STRAIGHT_1_STANDARD;

                var position1 = new Position(610, 20, 90);
                var token1 = environment.getTokenAt(position1);
                var maneuver1 = Maneuver.BANK_RIGHT_1_STANDARD;

                var position2 = new Position(458, 895, -90);
                var token2 = environment.getTokenAt(position2);
                var maneuver2 = Maneuver.TURN_RIGHT_1_STANDARD;

                var tokenToManeuver = {};
                tokenToManeuver[token0] = maneuver0;
                tokenToManeuver[token1] = maneuver1;
                tokenToManeuver[token2] = maneuver2;

                // Run.
                var result = new PlanningAction(environment, agent, tokenToManeuver);

                // Verify.
                assert.ok(result);
                assert.equal(result.getTeam(), Team.IMPERIAL);
                assert.equal(result.getManeuver(token0), maneuver0);
                assert.equal(result.getManeuver(token1), maneuver1);
                assert.equal(result.getManeuver(token2), maneuver2);
            });
        });
