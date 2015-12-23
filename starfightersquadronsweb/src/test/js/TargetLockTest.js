define([ "Environment", "TargetLock" ], function(Environment, TargetLock)
{
    QUnit.module("TargetLock");

    QUnit.test("TargetLock properties", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();

        var token0 = environment.tokens()[0]; // TIE Fighter
        var token1 = environment.tokens()[1]; // TIE Fighter
        var token2 = environment.tokens()[2]; // X-Wing

        TargetLock.resetNextId();
        var targetLock02 = new TargetLock(token0, token2);
        var targetLock12 = new TargetLock(token1, token2);
        var targetLock20 = new TargetLock(token2, token0);

        // Run / Verify.
        assert.ok(targetLock02);
        assert.equal(targetLock02.id(), "A");
        assert.equal(targetLock02.attacker(), token0);
        assert.equal(targetLock02.defender(), token2);

        assert.ok(targetLock12);
        assert.equal(targetLock12.id(), "B");
        assert.equal(targetLock12.attacker(), token1);
        assert.equal(targetLock12.defender(), token2);

        assert.ok(targetLock20);
        assert.equal(targetLock20.id(), "C");
        assert.equal(targetLock20.attacker(), token2);
        assert.equal(targetLock20.defender(), token0);
    });
});
