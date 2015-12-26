define([ "Adjudicator", "Engine", "Environment", "Phase" ], function(Adjudicator, Engine, Environment, Phase)
{
    function Game(agents)
    {
        InputValidator.validateNotNull("agents", agents);

        var teams = [ agents[0].team(), agents[1].team() ];

        var environment = new Environment(teams);
        environment.placeInitialTokens(agents);

        var adjudicator = new Adjudicator();
        var engine = new Engine(environment, adjudicator);

        this.adjudicator = function()
        {
            return adjudicator;
        }

        this.engine = function()
        {
            return engine;
        }

        this.environment = function()
        {
            return environment;
        }
    }

    Game.prototype.start = function()
    {
        var environment = this.environment();
        environment.trigger(Environment.UPDATE_TRIGGER_EVENT);

        setTimeout(function()
        {
            environment.phase(Phase.PLANNING_START);
        }, 0);
    }

    return Game;
});
