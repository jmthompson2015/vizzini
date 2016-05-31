define([ "ActivationAction", "Adjudicator", "EnvironmentFactory", "Maneuver", "Position", "Token" ], function(
        ActivationAction, Adjudicator, EnvironmentFactory, Maneuver, Position, Token)
{
    "use strict";
    QUnit.module("ActivationAction");

    QUnit.test("doIt()", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var token = environment.tokens()[2]; // X-Wing
        var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
        function callback()
        {
            LOGGER.info("callback() start");
        }
        var action = new ActivationAction(environment, adjudicator, token, maneuverKey, callback);

        // Run.
        var position = environment.getPositionFor(token);
        assert.equal(position.x(), 458);
        assert.equal(position.y(), 895);
        assert.equal(position.heading(), 270);
        action.doIt();

        // Verify.
        position = environment.getPositionFor(token);
        assert.equal(position.x(), 458);
        assert.equal(position.y(), 895 - 80);
        assert.equal(position.heading(), 270);
    });

    QUnit.test("doIt() cloaked", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var token = environment.tokens()[2]; // X-Wing
        var tokenPosition = environment.getPositionFor(token);
        environment.removeToken(tokenPosition);
        environment.placeToken(new Position(458, 890, 270), token);
        token.cloak().increase();
        var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
        function callback()
        {
            LOGGER.info("callback() start");
        }
        var action = new ActivationAction(environment, adjudicator, token, maneuverKey, callback);

        // Run.
        var position = environment.getPositionFor(token);
        assert.ok(position);
        assert.equal(position.x(), 458);
        assert.equal(position.y(), 890);
        assert.equal(position.heading(), 270);
        action.doIt();

        // Verify.
        position = environment.getPositionFor(token);
        assert.ok(position);
        assert.equal(position.heading(), 270);
    });
});
