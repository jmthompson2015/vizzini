/*
 * Provides a game for Starfighter Squadrons.
 */
function Game(agents)
{
    InputValidator.validateNotNull("agents", agents);

    var environment = new Environment();
    environment.placeInitialTokens(agents);

    var adjudicator = new Adjudicator();
    var engine = new Engine(environment, adjudicator);

    this.getEnvironment = function()
    {
        return environment;
    }

    this.getAdjudicator = function()
    {
        return adjudicator;
    }

    this.getEngine = function()
    {
        return engine;
    }
}

Game.prototype.start = function()
{
    var environment = this.getEnvironment();
    environment.fireUpdateTrigger();

    setTimeout(function()
    {
        environment.setPhase(Phase.PLANNING_START);
    }, 0);
}
