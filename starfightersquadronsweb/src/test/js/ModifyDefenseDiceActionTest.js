define([ "DefenseDice", "Environment", "ModifyDefenseDiceAction" ], function(DefenseDice, Environment,
        ModifyDefenseDiceAction)
{
    QUnit.module("ModifyDefenseDiceAction");

    QUnit.test("doIt() spend evade", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var defender = environment.getTokens()[0];
        defender.increaseEvadeCount();
        var defenseDice = new DefenseDice(3);
        var modification = ModifyDefenseDiceAction.Modification.SPEND_EVADE;
        var action = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
        assert.equal(defender.getEvadeCount(), 1);
        assert.equal(defender.getFocusCount(), 0);
        var evadeCount0 = defenseDice.getEvadeCount();
        var focusCount0 = defenseDice.getFocusCount();

        // Run.
        action.doIt();

        // Verify.
        assert.equal(defender.getEvadeCount(), 0);
        assert.equal(defender.getFocusCount(), 0);
        assert.equal(defenseDice.getEvadeCount(), evadeCount0 + 1);
        assert.equal(defenseDice.getFocusCount(), focusCount0);
    });

    QUnit.test("doIt() spend focus", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var defender = environment.getTokens()[0];
        defender.increaseFocusCount();
        var defenseDice = new DefenseDice(3);
        var modification = ModifyDefenseDiceAction.Modification.SPEND_FOCUS;
        var action = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
        assert.equal(defender.getEvadeCount(), 0);
        assert.equal(defender.getFocusCount(), 1);
        var evadeCount0 = defenseDice.getEvadeCount();
        var focusCount0 = defenseDice.getFocusCount();

        // Run.
        action.doIt();

        // Verify.
        assert.equal(defender.getEvadeCount(), 0);
        assert.equal(defender.getFocusCount(), 0);
        assert.equal(defenseDice.getEvadeCount(), evadeCount0 + focusCount0);
        assert.equal(defenseDice.getFocusCount(), 0);
    });
});
