define([ "Environment", "Position", "ShipDestroyedAction", "Token" ], function(Environment, Position,
        ShipDestroyedAction, Token)
{
    QUnit.module("ShipDestroyedAction");
    
    QUnit.test("doIt()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var fromPosition = new Position(305, 20, 90);
        var token = environment.getTokenAt(fromPosition);
        var shipDestroyedAction = new ShipDestroyedAction(environment, token, fromPosition);

        // Run.
        shipDestroyedAction.doIt();

        // Verify.
        assert.equal(token.getDamageCount(), 0);
        assert.equal(token.getCriticalDamageCount(), 0);
        assert.ok(!environment.getTokenAt(fromPosition));
    });
});
