define(
        [ "Adjudicator", "Engine", "Environment", "MediumAgent", "Phase", "SimpleAgent", "SquadBuilder", "Team",
                "Token" ], function(Adjudicator, Engine, Environment, MediumAgent, Phase, SimpleAgent, SquadBuilder,
                Team, Token)
        {
            QUnit.module("Engine");

            QUnit.skip("Engine.start()", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = new Environment(Team.IMPERIAL, Team.REBEL);
                var firstAgent = new SimpleAgent("firstAgent", Team.IMPERIAL);
                var squad1 = SquadBuilder.CoreSetImperialSquadBuilder.buildSquad(firstAgent);
                var secondAgent = new MediumAgent("secondAgent", Team.REBEL);
                var squad2 = SquadBuilder.CoreSetRebelSquadBuilder.buildSquad(secondAgent);
                environment.placeInitialTokens(firstAgent, squad1, secondAgent, squad2);
                var adjudicator = new Adjudicator();
                var engine = new Engine(environment, adjudicator);

                // Run.
                environment.phase(Phase.PLANNING_START);

                // Verify.
                assert.equal(0, 0);
            });
        });
