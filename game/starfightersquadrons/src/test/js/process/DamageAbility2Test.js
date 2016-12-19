define(["Maneuver", "Phase", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/CombatAction", "process/DamageAbility2", "process/EnvironmentFactory", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
    function(Maneuver, Phase, Action, ActivationAction, Adjudicator, CombatAction, DamageAbility, EnvironmentFactory, MockAttackDice, MockDefenseDice)
    {
        "use strict";
        QUnit.module("DamageAbility2");

        QUnit.test("condition()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = DamageAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(damageKey)
                    {
                        var ability = abilities[damageKey];

                        if (ability.condition)
                        {
                            var result = ability.condition(store, token);
                            assert.ok(result !== undefined, "phaseKey = " + phaseKey + " damageKey = " + damageKey);
                        }
                    });
                }
            });

            // assert.ok(true);
        });

        QUnit.test("consequent()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.
            var callback = function()
            {
                LOGGER.info("in callback()");
            };

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = DamageAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(damageKey)
                    {
                        var ability = abilities[damageKey];

                        if (ability.condition && ability.condition(store, token))
                        {
                            ability.consequent(store, token, callback);
                            assert.ok(true, "phaseKey = " + phaseKey + " damageKey = " + damageKey);
                        }
                    });
                }
            });

            // assert.ok(true);
        });

        QUnit.test("function()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = DamageAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(damageKey)
                    {
                        var ability = abilities[damageKey];

                        if (typeof ability === "function")
                        {
                            ability(store, token);
                            assert.ok(true, "phaseKey = " + phaseKey + " damageKey = " + damageKey);
                        }
                    });
                }
            });

            assert.ok(true);
        });

        function createEnvironment()
        {
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            store.dispatch(Action.setEnvironment(environment));
            store.dispatch(Action.setActiveToken(token));

            return environment;
        }
    });
