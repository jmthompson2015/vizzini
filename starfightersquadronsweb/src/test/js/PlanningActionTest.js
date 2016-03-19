define([ "Adjudicator", "EnvironmentFactory", "Maneuver", "PlanningAction", "Position", "Token" ], function(
        Adjudicator, EnvironmentFactory, Maneuver, PlanningAction, Position, Token)
{
    "use strict";
    QUnit.module("PlanningAction");

    QUnit.test("doIt()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var firstAgent = environment.firstAgent();
        function callback(agent, tokenToManeuver)
        {
            // Verify.
            assert.ok(agent);
            assert.equal(agent, firstAgent);
            assert.ok(tokenToManeuver);
        }
        var action = new PlanningAction(environment, adjudicator, firstAgent, callback);

        // Run.
        action.doIt();
    });
});
