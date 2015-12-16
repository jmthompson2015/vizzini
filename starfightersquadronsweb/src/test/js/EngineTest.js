define(
        [ "Adjudicator", "Engine", "Environment", "MediumAgent", "Phase", "SimpleAgent", "SquadBuilder", "Team",
                "Token" ], function(Adjudicator, Engine, Environment, MediumAgent, Phase, SimpleAgent, SquadBuilder,
                Team, Token)
        {
            QUnit.module("Engine");

            QUnit.skip("Engine.start()",
                    function(assert)
                    {
                        // Setup.
                        Token.resetNextId();
                        var teams = [ Team.IMPERIAL, Team.REBEL ];
                        var environment = new Environment(teams);
                        var firstAgent = new SimpleAgent("firstAgent", Team.IMPERIAL,
                                SquadBuilder.CoreSetImperialSquadBuilder);
                        var secondAgent = new MediumAgent("secondAgent", Team.REBEL,
                                SquadBuilder.CoreSetRebelSquadBuilder);
                        environment.placeInitialTokens([ firstAgent, secondAgent ]);
                        var adjudicator = new Adjudicator();
                        var engine = new Engine(environment, adjudicator);

                        // Run.
                        environment.setPhase(Phase.PLANNING_START);

                        // Verify.
                        assert.equal(0, 0);
                    });
        });
