define(["process/Adjudicator", "process/EnvironmentFactory", "process/PlanningAction"],
    function(Adjudicator, EnvironmentFactory, PlanningAction)
    {
        "use strict";
        QUnit.module("PlanningAction");

        QUnit.test("doIt()", function(assert)
        {
            // Setup.
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
