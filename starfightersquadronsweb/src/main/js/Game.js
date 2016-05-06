define([ "Adjudicator", "Engine", "Environment", "Phase" ], function(Adjudicator, Engine, Environment, Phase)
{
    "use strict";
    function Game(agent1, squad1, agent2, squad2)
    {
        InputValidator.validateNotNull("agent1", agent1);
        InputValidator.validateNotNull("squad1", squad1);
        InputValidator.validateNotNull("agent2", agent2);
        InputValidator.validateNotNull("squad2", squad2);

        var environment = new Environment(agent1.teamKey(), agent2.teamKey());
        environment.placeInitialTokens(agent1, squad1, agent2, squad2);

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
        environment.trigger(Environment.UPDATE_TRIGGER_EVENT);
        var engine = this.engine();

        setTimeout(function()
        {
            engine.performPlanningPhase();
        }, 0);
    };

    return Game;
});
