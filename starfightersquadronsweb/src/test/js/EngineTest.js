define([ "Adjudicator", "Engine", "EnvironmentFactory", "PlanningAction", "Position" ], function(Adjudicator, Engine,
        EnvironmentFactory, PlanningAction, Position)
{
    "use strict";
    QUnit.module("Engine");

    QUnit.test("performActivationPhase()", function(assert)
    {
        // Setup.
        var engine = createEngine();
        var environment = engine.environment();
        var firstAgent = environment.firstAgent();
        var secondAgent = environment.secondAgent();
        var firstTokenToManeuver = {};
        var secondTokenToManeuver = {};
        var firstPlanningAction = new PlanningAction(environment, firstAgent, firstTokenToManeuver);
        var secondPlanningAction = new PlanningAction(environment, secondAgent, secondTokenToManeuver);
        engine.performCombatPhase = function()
        {
            LOGGER.info("performCombatPhase() dummy");
        };

        // Run.
        var done = assert.async();
        engine.setPlanningAction(firstPlanningAction);
        engine.setPlanningAction(secondPlanningAction);

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            done();
        });
    });

    QUnit.test("performCombatPhase()", function(assert)
    {
        // Setup.
        var engine = createEngine();
        var environment = engine.environment();
        var token0 = environment.tokens()[0]; // TIE Fighter.
        var position0 = environment.getPositionFor(token0);
        var token2 = environment.tokens()[2]; // X-Wing.
        var position2 = environment.getPositionFor(token2);
        var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
        environment.removeToken(position2);
        environment.placeToken(newPosition2, token2);
        engine.performEndPhase = function()
        {
            LOGGER.info("performEndPhase() dummy");
        };

        // Run.
        var done = assert.async();
        engine.performCombatPhase();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            done();
        });
    });

    QUnit.test("performEndPhase()", function(assert)
    {
        // Setup.
        var engine = createEngine();
        var environment = engine.environment();
        var token0 = environment.tokens()[0];
        token0.evade().increase();
        token0.focus().increase();
        token0.weaponsDisabled().increase();
        var token1 = environment.tokens()[1];
        token1.evade().increase();
        token1.focus().increase();
        token1.weaponsDisabled().increase();
        var token2 = environment.tokens()[2];
        token2.evade().increase();
        token2.focus().increase();
        token2.weaponsDisabled().increase();
        engine.performPlanningPhase = function()
        {
            LOGGER.info("performPlanningPhase() dummy");
        };

        // Run.
        var done = assert.async();
        engine.performEndPhase();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            assert.equal(token0.evade().count(), 0, token0.name());
            assert.equal(token0.focus().count(), 0);
            assert.equal(token0.weaponsDisabled().count(), 0);
            assert.equal(token1.evade().count(), 0, token1.name());
            assert.equal(token1.focus().count(), 0);
            assert.equal(token1.weaponsDisabled().count(), 0);
            assert.equal(token2.evade().count(), 0, token2.name());
            assert.equal(token2.focus().count(), 0);
            assert.equal(token2.weaponsDisabled().count(), 0);
            done();
        });
    });

    QUnit.test("performPlanningPhase()", function(assert)
    {
        // Setup.
        var engine = createEngine();
        engine.performActivationPhase = function()
        {
            LOGGER.info("performActivationPhase() dummy");
        };

        // Run.
        var done = assert.async();
        engine.performPlanningPhase();

        // Verify.
        setTimeout(function()
        {
            assert.ok(true, "test resumed from async operation");
            assert.ok(engine.firstPlanningAction());
            assert.ok(engine.secondPlanningAction());
            done();
        });
    });

    function createEngine()
    {
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();

        return new Engine(environment, adjudicator);
    }
});
