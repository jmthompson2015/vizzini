define([ "AttackDice", "Environment", "ModifyAttackDiceAction", "TargetLock" ], function(AttackDice, Environment,
        ModifyAttackDiceAction, TargetLock)
{
    QUnit.module("ModifyAttackDiceAction");

    QUnit.test("doIt() spend focus", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var attacker = environment.getTokens()[0];
        attacker.increaseFocusCount();
        var attackDice = new AttackDice(3);
        var defender = environment.getTokens()[2];
        var modification = ModifyAttackDiceAction.Modification.SPEND_FOCUS;
        var action = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
        assert.equal(attacker.getFocusCount(), 1);
        var focusCount0 = attackDice.getFocusCount();
        var hitCount0 = attackDice.getHitCount();

        // Run.
        action.doIt();

        // Verify.
        assert.equal(attacker.getFocusCount(), 0);
        assert.equal(attackDice.getFocusCount(), 0);
        assert.equal(attackDice.getHitCount(), hitCount0 + focusCount0);
    });

    QUnit.test("doIt() spend target lock", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var attacker = environment.getTokens()[0]; // TIE Fighter.
        var attackDice = new AttackDice(3);
        var defender = environment.getTokens()[2]; // X-Wing.
        var modification = ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK;
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);
        var action = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
        var blankCount0 = attackDice.getBlankCount();
        var focusCount0 = attackDice.getFocusCount();
        var hitCount0 = attackDice.getHitCount();

        // Run.
        action.doIt();

        // Verify.
        assert.ok(attackDice.getHitCount() >= hitCount0);
        assert.ok(attackDice.getHitCount() <= blankCount0 + focusCount0 + hitCount0);
    });
});
