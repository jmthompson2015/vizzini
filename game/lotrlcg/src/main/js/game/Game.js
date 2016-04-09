define([ "Phase", "game/Adjudicator", "game/Engine", "game/Environment", "game/PlayerDeckBuilder",
        "game/ScenarioDeckBuilder", "game/SimpleAgent" ], function(Phase, Adjudicator, Engine, Environment,
        PlayerDeckBuilder, ScenarioDeckBuilder, SimpleAgent)
{
    "use strict";
    function Game()
    {
        // FIXME
        var agent1 = new SimpleAgent("1");
        var agent2 = new SimpleAgent("2");
        var agents = [ agent1, agent2 ];
        var playerDeck1 = PlayerDeckBuilder.BeornsPath1DeckBuilder.buildDeck();
        var playerDeck2 = PlayerDeckBuilder.BeornsPath2DeckBuilder.buildDeck();
        var playerDecks = [ playerDeck1, playerDeck2 ];
        var scenarioDeck = ScenarioDeckBuilder.CoreSetPassageThroughMirkwoodDeckBuilder.buildDeck();
        var environment = new Environment(agents, playerDecks, scenarioDeck);
        environment.setup();

        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);

        this.adjudicator = function()
        {
            return adjudicator;
        };

        this.engine = function()
        {
            return engine;
        };

        this.environment = function()
        {
            return environment;
        };
    }

    Game.prototype.start = function()
    {
        var environment = this.environment();

        setTimeout(function()
        {
            environment.phase(Phase.RESOURCE_START);
        }, 0);
    };

    return Game;
});
