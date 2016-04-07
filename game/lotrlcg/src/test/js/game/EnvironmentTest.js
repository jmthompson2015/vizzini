define([ "Phase", "game/Environment", "game/PlayerDeckBuilder", "game/ScenarioDeckBuilder", "game/SimpleAgent" ],
        function(Phase, Environment, PlayerDeckBuilder, ScenarioDeckBuilder, SimpleAgent)
        {
            "use strict";
            QUnit.module("Environment");

            QUnit.test("Environment properties", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                environment.phase(Phase.RESOURCE_START);
                environment.round().increase();

                // Run / Verify.
                assert.equal(environment.phase(), Phase.RESOURCE_START);
                assert.ok(environment.round());
                assert.equal(environment.round().count(), 1);
            });

            QUnit.test("addToThreatLevel()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                environment.addToThreatLevel(agents[0], 1);

                // Verify.
                assert.equal(environment.threatLevel(agents[0]), 29);
            });

            QUnit.test("agents()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                assert.ok(!environment.activeAgent());

                // Run.
                var result = environment.agents();

                // Verify.
                assert.equal(result.length, 2);
                assert.equal(result[0].name(), "1");
                assert.equal(result[1].name(), "2");
            });

            QUnit.test("agents() 1", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                environment.activeAgent(environment.agents()[0]);

                // Run.
                var result = environment.agents();

                // Verify.
                assert.equal(result.length, 2);
                assert.equal(result[0].name(), "1");
                assert.equal(result[1].name(), "2");
            });

            QUnit.test("agents() 2", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                environment.activeAgent(environment.agents()[1]);

                // Run.
                var result = environment.agents();

                // Verify.
                assert.equal(result.length, 2);
                assert.equal(result[0].name(), "2");
                assert.equal(result[1].name(), "1");
            });

            QUnit.test("allies()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.allies(agents[0]);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 0);
            });

            QUnit.test("characters()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.characters(agents[0]);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 3);
            });

            QUnit.test("enemies()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.enemies();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 0);
            });

            QUnit.test("hand()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.agentData(agents[0]).hand();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 6);
            });

            QUnit.test("heroes()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.heroes(agents[0]);

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 3);
            });

            QUnit.test("playArea()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.agentData(agents[0]).playArea();

                // Verify.
                assert.ok(result);
                assert.equal(result.length, 3);
            });

            QUnit.test("playerDeck()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.agentData(agents[0]).playerDeck();

                // Verify.
                assert.ok(result);
            });

            QUnit.test("threatLevel()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();
                var agents = environment.agents();

                // Run.
                var result = environment.threatLevel(agents[0]);

                // Verify.
                assert.ok(result);
                assert.equal(result, 28);
            });

            QUnit.test("setup()", function(assert)
            {
                // Setup.
                var environment = createEnvironment();

                // Run / Verify.
                var agents = environment.agents();
                var agentToData = environment.agentToData();
                agents.forEach(function(agent)
                {
                    assert.equal(environment.agentData(agent).hand().length, 6);
                    assert.equal(environment.agentData(agent).playArea().length, 3);
                });

                assert.equal(agentToData[agents[0]].threatLevel(), 28);
                assert.equal(agentToData[agents[1]].threatLevel(), 29);
            });

            function createEnvironment()
            {
                var agent1 = new SimpleAgent("1");
                var agent2 = new SimpleAgent("2");
                var agents = [ agent1, agent2 ];
                var playerDeck1 = PlayerDeckBuilder.BeornsPath1DeckBuilder.buildDeck();
                var playerDeck2 = PlayerDeckBuilder.BeornsPath2DeckBuilder.buildDeck();
                var playerDecks = [ playerDeck1, playerDeck2 ];
                var scenarioDeck = ScenarioDeckBuilder.CoreSetPassageThroughMirkwoodDeckBuilder.buildDeck();
                var environment = new Environment(agents, playerDecks, scenarioDeck);
                environment.setup();

                return environment;
            }
        });
