define([ "Environment", "Position", "ShipDestroyedAction", "TargetLock", "Token" ], function(Environment, Position,
        ShipDestroyedAction, TargetLock, Token)
{
    QUnit.module("ShipDestroyedAction");

    QUnit.test("doIt()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var fromPosition = new Position(305, 20, 90); // TIE Fighter.
        var token = environment.getTokenAt(fromPosition);
        var defender = environment.getTokens()[2]; // X-Wing.
        var targetLock = new TargetLock(token, defender);
        token.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);
        assert.equal(token.getAttackerTargetLocks().length, 1);
        assert.equal(token.getDefenderTargetLocks().length, 0);
        assert.equal(defender.getAttackerTargetLocks().length, 0);
        assert.equal(defender.getDefenderTargetLocks().length, 1);
        var shipDestroyedAction = new ShipDestroyedAction(environment, token, fromPosition);

        // Run.
        shipDestroyedAction.doIt();

        // Verify.
        assert.equal(token.getDamageCount(), 0);
        assert.equal(token.getCriticalDamageCount(), 0);
        assert.ok(!environment.getTokenAt(fromPosition));
        assert.equal(token.getAttackerTargetLocks().length, 0);
        assert.equal(token.getDefenderTargetLocks().length, 0);
        assert.equal(defender.getAttackerTargetLocks().length, 0);
        assert.equal(defender.getDefenderTargetLocks().length, 0);
    });
});
