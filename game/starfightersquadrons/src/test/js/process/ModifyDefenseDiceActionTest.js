define(["DefenseDice", "process/EnvironmentFactory", "process/ModifyDefenseDiceAction", "process/Action"],
    function(DefenseDice, EnvironmentFactory, ModifyDefenseDiceAction, Action)
    {
        "use strict";
        QUnit.module("ModifyDefenseDiceAction");

        QUnit.test("doIt() spend evade", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var defender = environment.tokens()[0];
            store.dispatch(Action.addEvadeCount(defender));
            var defenseDice = new DefenseDice(3);
            var modification = ModifyDefenseDiceAction.Modification.SPEND_EVADE;
            var action = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            assert.equal(defender.evadeCount(), 1);
            assert.equal(defender.focusCount(), 0);
            var evadeCount0 = defenseDice.evadeCount();
            var focusCount0 = defenseDice.focusCount();

            // Run.
            action.doIt();

            // Verify.
            assert.equal(defender.evadeCount(), 0);
            assert.equal(defender.focusCount(), 0);
            assert.equal(defenseDice.evadeCount(), evadeCount0 + 1);
            assert.equal(defenseDice.focusCount(), focusCount0);
        });

        QUnit.test("doIt() spend focus", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var defender = environment.tokens()[0];
            store.dispatch(Action.addFocusCount(defender));
            var defenseDice = new DefenseDice(3);
            var modification = ModifyDefenseDiceAction.Modification.SPEND_FOCUS;
            var action = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            assert.equal(defender.evadeCount(), 0);
            assert.equal(defender.focusCount(), 1);
            var evadeCount0 = defenseDice.evadeCount();
            var focusCount0 = defenseDice.focusCount();

            // Run.
            action.doIt();

            // Verify.
            assert.equal(defender.evadeCount(), 0);
            assert.equal(defender.focusCount(), 0);
            assert.equal(defenseDice.evadeCount(), evadeCount0 + focusCount0);
            assert.equal(defenseDice.focusCount(), 0);
        });
    });
