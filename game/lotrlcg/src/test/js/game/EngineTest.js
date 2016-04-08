define([ "AllyCard", "EnemyCard", "LocationCard", "Phase", "game/Adjudicator", "game/AllyToken", "game/EnemyToken",
        "game/Engine", "game/Environment", "game/LocationToken", "game/PlayerDeckBuilder", "game/ScenarioDeckBuilder",
        "game/SimpleAgent" ], function(AllyCard, EnemyCard, LocationCard, Phase, Adjudicator, AllyToken, EnemyToken,
        Engine, Environment, LocationToken, PlayerDeckBuilder, ScenarioDeckBuilder, SimpleAgent)
{
    "use strict";
    QUnit.module("Engine");

    QUnit.test("Engine properties", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);

        // Run / Verify.
        assert.equal(engine.environment(), environment);
        assert.equal(engine.adjudicator(), adjudicator);
    });

    QUnit.test("performResourcePhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.RESOURCE_START);
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performPlanningPhase = function()
        {
            LOGGER.info("performPlanningPhase() dummy");
        };

        // Run.
        engine.performResourcePhase();

        // Verify.
        assert.equal(engine.environment().phase(), Phase.RESOURCE_END);
        var agents = environment.agents();
        agents.forEach(function(agent)
        {
            var heroes = environment.heroes(agent);
            heroes.forEach(function(token)
            {
                assert.equal(token.resourceState().count(), 1);
            });

            var hand = environment.agentData(agent).hand();
            assert.ok(hand);
            assert.equal(hand.length, 7);
        });
    });

    QUnit.test("performPlanningPhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.PLANNING_START);
        var agent1 = environment.agents()[0];
        var agent2 = environment.agents()[1];
        environment.heroes(agent1).forEach(function(hero, i)
        {
            hero.resourceState().increase(i + 1);
        });
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performQuestPhase = function()
        {
            LOGGER.info("performQuestPhase() dummy");
        };

        // Run.
        engine.performPlanningPhase();

        // Verify.
        assert.equal(engine.environment().phase(), Phase.PLANNING_END);
        // assert.equal(engine.environment().stagingArea().length, 2);
    });

    QUnit.test("performQuestPhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.QUEST_START);
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performTravelPhase = function()
        {
            LOGGER.info("performTravelPhase() dummy");
        };

        // Run.
        engine.performQuestPhase();

        // Verify.
        assert.equal(engine.environment().phase(), Phase.QUEST_END);
        assert.equal(engine.environment().stagingArea().length, 2);
    });

    QUnit.test("performTravelPhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.TRAVEL_START);
        environment.stagingArea().push(new LocationToken(LocationCard.OLD_FOREST_ROAD));
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performEncounterPhase = function()
        {
            LOGGER.info("performEncounterPhase() dummy");
        };
        assert.ok(!engine.environment().activeLocation());

        // Run.
        engine.performTravelPhase();

        // Verify.
        assert.equal(environment.phase(), Phase.TRAVEL_END);
        assert.ok(environment.activeLocation());
        assert.equal(environment.activeLocation().cardKey(), LocationCard.OLD_FOREST_ROAD);
    });

    QUnit.test("performEncounterPhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.ENCOUNTER_START);
        environment.stagingArea().push(new EnemyToken(EnemyCard.FOREST_SPIDER));
        environment.stagingArea().push(new EnemyToken(EnemyCard.DOL_GULDUR_BEASTMASTER));
        var agent1 = environment.agents()[0];
        var agent2 = environment.agents()[1];
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performCombatPhase = function()
        {
            LOGGER.info("performCombatPhase() dummy");
        };
        var engagementArea = environment.agentData(agent1).engagementArea();
        assert.equal(engagementArea.length, 0);

        // Run.
        engine.performEncounterPhase();

        // Verify.
        assert.equal(engine.environment().phase(), Phase.ENCOUNTER_END);
        var engagementArea = environment.agentData(agent1).engagementArea();
        assert.equal(engagementArea.length, 1);
        assert.equal(engagementArea[0].cardKey(), EnemyCard.FOREST_SPIDER);
    });

    QUnit.test("performCombatPhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.COMBAT_START);
        var agent1 = environment.agents()[0];
        var agent2 = environment.agents()[1];
        environment.agentData(agent1).playArea().push(new AllyToken(AllyCard.FARAMIR));
        environment.agentData(agent1).playArea().push(new AllyToken(AllyCard.SON_OF_ARNOR));
        environment.agentData(agent1).engagementArea().push(new EnemyToken(EnemyCard.FOREST_SPIDER));
        environment.agentData(agent1).engagementArea().push(new EnemyToken(EnemyCard.DOL_GULDUR_BEASTMASTER));
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performRefreshPhase = function()
        {
            LOGGER.info("performRefreshPhase() dummy");
        };

        // Run.
        engine.performCombatPhase();

        // Verify.
        assert.equal(engine.environment().phase(), Phase.COMBAT_END);
    });

    QUnit.test("performRefreshPhase()", function(assert)
    {
        // Setup.
        var environment = createEnvironment();
        environment.phase(Phase.REFRESH_START);
        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);
        engine.performResourcePhase = function()
        {
            LOGGER.info("performResourcePhase() dummy");
        };
        var agents = environment.agents();
        agents.forEach(function(agent)
        {
            var heroes = environment.heroes(agent);
            heroes.forEach(function(token)
            {
                token.exhaustState().isMarked(true);
            });
        });

        // Run.
        engine.performRefreshPhase();

        // Verify.
        assert.equal(engine.environment().phase(), Phase.REFRESH_END);
        agents.forEach(function(agent)
        {
            var playArea = environment.agentData(agent).playArea();
            playArea.forEach(function(token)
            {
                assert.ok(!token.exhaustState().isMarked());
            });
        });

        assert.equal(environment.threatLevel(agents[0]), 29);
        assert.equal(environment.threatLevel(agents[1]), 30);
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
