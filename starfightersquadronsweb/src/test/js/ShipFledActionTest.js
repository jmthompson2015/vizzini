define([ "Environment", "Position", "ShipFledAction", "Token" ], function(Environment, Position, ShipFledAction, Token)
{
    QUnit.module("ShipFledAction");

    QUnit.test("doIt()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var fromPosition = new Position(305, 20, 90);
        LOGGER.trace("fromPosition = " + fromPosition.toString());
        var token = environment.getTokenAt(fromPosition);
        var shipFledAction = new ShipFledAction(environment, token, fromPosition);

        // Run.
        shipFledAction.doIt();

        // Verify.
        assert.equal(token.getDamageCount(), 0);
        assert.equal(token.getCriticalDamageCount(), 0);
        assert.ok(!environment.getTokenAt(fromPosition));
    });
});
