define([ "DefenseDice", "Environment", "ModifyDefenseDiceAction" ], function(DefenseDice, Environment,
        ModifyDefenseDiceAction)
{
    QUnit.module("ModifyDefenseDiceAction");

    QUnit.test("doIt() spend evade", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var defender = environment.tokens()[0];
        defender.evade().increase();
        var defenseDice = new DefenseDice(3);
        var modification = ModifyDefenseDiceAction.Modification.SPEND_EVADE;
        var action = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
        assert.equal(defender.evade().count(), 1);
        assert.equal(defender.focus().count(), 0);
        var evadeCount0 = defenseDice.getEvadeCount();
        var focusCount0 = defenseDice.getFocusCount();

        // Run.
        action.doIt();

        // Verify.
        assert.equal(defender.evade().count(), 0);
        assert.equal(defender.focus().count(), 0);
        assert.equal(defenseDice.getEvadeCount(), evadeCount0 + 1);
        assert.equal(defenseDice.getFocusCount(), focusCount0);
    });

    QUnit.test("doIt() spend focus", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var defender = environment.tokens()[0];
        defender.focus().increase();
        var defenseDice = new DefenseDice(3);
        var modification = ModifyDefenseDiceAction.Modification.SPEND_FOCUS;
        var action = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
        assert.equal(defender.evade().count(), 0);
        assert.equal(defender.focus().count(), 1);
        var evadeCount0 = defenseDice.getEvadeCount();
        var focusCount0 = defenseDice.getFocusCount();

        // Run.
        action.doIt();

        // Verify.
        assert.equal(defender.evade().count(), 0);
        assert.equal(defender.focus().count(), 0);
        assert.equal(defenseDice.getEvadeCount(), evadeCount0 + focusCount0);
        assert.equal(defenseDice.getFocusCount(), 0);
    });
});
