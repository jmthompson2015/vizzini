define([ "Environment", "TargetLock" ], function(Environment, TargetLock)
{
    QUnit.module("TargetLock");

    QUnit.test("TargetLock properties", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();

        var token0 = environment.getTokens()[0]; // TIE Fighter
        var token1 = environment.getTokens()[1]; // TIE Fighter
        var token2 = environment.getTokens()[2]; // X-Wing

        TargetLock.resetNextId();
        var targetLock02 = new TargetLock(token0, token2);
        var targetLock12 = new TargetLock(token1, token2);
        var targetLock20 = new TargetLock(token2, token0);

        // Run / Verify.
        assert.ok(targetLock02);
        assert.equal(targetLock02.getId(), "A");
        assert.equal(targetLock02.getAttacker(), token0);
        assert.equal(targetLock02.getDefender(), token2);

        assert.ok(targetLock12);
        assert.equal(targetLock12.getId(), "B");
        assert.equal(targetLock12.getAttacker(), token1);
        assert.equal(targetLock12.getDefender(), token2);

        assert.ok(targetLock20);
        assert.equal(targetLock20.getId(), "C");
        assert.equal(targetLock20.getAttacker(), token2);
        assert.equal(targetLock20.getDefender(), token0);
    });
});
