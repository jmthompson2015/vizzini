define([ "AttackDice", "Environment", "ModifyAttackDiceAction" ], function(AttackDice, Environment,
        ModifyAttackDiceAction)
{
    QUnit.module("ModifyAttackDiceAction");
    
    QUnit.test("doIt() spend focus", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var attacker = environment.getTokens()[0];
        attacker.increaseFocusCount();
        var attackDice = new AttackDice(3);
        var modification = ModifyAttackDiceAction.Modification.SPEND_FOCUS;
        var action = new ModifyAttackDiceAction(environment, attacker, attackDice, modification);
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
});
