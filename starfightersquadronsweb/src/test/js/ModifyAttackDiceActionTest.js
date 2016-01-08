define([ "AttackDice", "EnvironmentFactory", "ModifyAttackDiceAction", "TargetLock" ], function(AttackDice,
        EnvironmentFactory, ModifyAttackDiceAction, TargetLock)
{
    "use strict";
    QUnit.module("ModifyAttackDiceAction");

    QUnit.test("doIt() spend focus", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[0];
        attacker.focus().increase();
        var attackDice = new AttackDice(3);
        var defender = environment.tokens()[2];
        var modification = ModifyAttackDiceAction.Modification.SPEND_FOCUS;
        var action = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
        assert.equal(attacker.focus().count(), 1);
        var focusCount0 = attackDice.focusCount();
        var hitCount0 = attackDice.hitCount();

        // Run.
        action.doIt();

        // Verify.
        assert.equal(attacker.focus().count(), 0);
        assert.equal(attackDice.focusCount(), 0);
        assert.equal(attackDice.hitCount(), hitCount0 + focusCount0);
    });

    QUnit.test("doIt() spend target lock", function(assert)
    {
        // Setup.
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[0]; // TIE Fighter.
        var attackDice = new AttackDice(3);
        var defender = environment.tokens()[2]; // X-Wing.
        var modification = ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK;
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);
        var action = new ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification);
        var blankCount0 = attackDice.blankCount();
        var focusCount0 = attackDice.focusCount();
        var hitCount0 = attackDice.hitCount();

        // Run.
        action.doIt();

        // Verify.
        assert.ok(attackDice.hitCount() >= hitCount0);
        assert.ok(attackDice.hitCount() <= blankCount0 + focusCount0 + hitCount0);
    });
});
