define(["Maneuver", "Phase", "process/Action", "process/Adjudicator", "process/CombatAction", "process/EnvironmentFactory", "process/ManeuverAction", "process/UpgradeAbility2", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
    function(Maneuver, Phase, Action, Adjudicator, CombatAction, EnvironmentFactory, ManeuverAction, UpgradeAbility, MockAttackDice, MockDefenseDice)
    {
        "use strict";
        QUnit.module("UpgradeAbility2");

        QUnit.test("condition()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = UpgradeAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(upgradeKey)
                    {
                        var ability = abilities[upgradeKey];

                        if (ability.condition)
                        {
                            var result = ability.condition(store, token);
                            assert.ok(result !== undefined, "phaseKey = " + phaseKey + " upgradeKey = " + upgradeKey);
                        }
                    });
                }
            });
        });

        QUnit.test("consequent()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = UpgradeAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(upgradeKey)
                    {
                        var ability = abilities[upgradeKey];

                        if (ability.condition && ability.condition(store, token))
                        {
                            ability.consequent(store, token);
                            assert.ok(true, "phaseKey = " + phaseKey + " upgradeKey = " + upgradeKey);
                        }
                    });
                }
            });
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
                var abilities = UpgradeAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(upgradeKey)
                    {
                        var ability = abilities[upgradeKey];

                        if (typeof ability === "function")
                        {
                            ability(store, token);
                            assert.ok(true, "phaseKey = " + phaseKey + " upgradeKey = " + upgradeKey);
                        }
                    });
                }
            });

            assert.ok(true);
        });

        function createEnvironment()
        {
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();

            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.
            var maneuverKey = Maneuver.STRAIGHT_3_STANDARD;
            var isBoost = false;
            var callback = function()
            {
                LOGGER.info("in callback()");
            };

            store.dispatch(Action.setEnvironment(environment));
            store.dispatch(Action.setActiveToken(token.id()));

            var activationState = token.activationState();
            var maneuverAction = new ManeuverAction(environment, token, maneuverKey, isBoost);
            activationState.maneuverAction(maneuverAction);

            return environment;
        }
    });
