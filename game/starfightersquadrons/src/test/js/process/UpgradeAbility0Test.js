define(["Event", "Maneuver", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/CombatAction", "process/EnvironmentFactory", "process/UpgradeAbility0", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
    function(Event, Maneuver, Action, ActivationAction, Adjudicator, CombatAction, EnvironmentFactory, UpgradeAbility, MockAttackDice, MockDefenseDice)
    {
        "use strict";
        QUnit.module("UpgradeAbility0");

        QUnit.test("condition()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Event.values().forEach(function(eventKey)
            {
                var abilities = UpgradeAbility[eventKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(upgradeKey)
                    {
                        var ability = abilities[upgradeKey];

                        if (ability.condition)
                        {
                            var result = ability.condition(store, token);
                            assert.ok(result !== undefined, "eventKey = " + eventKey + " upgradeKey = " + upgradeKey);
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
            Event.values().forEach(function(eventKey)
            {
                var abilities = UpgradeAbility[eventKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(upgradeKey)
                    {
                        var ability = abilities[upgradeKey];

                        if (ability.condition && ability.condition(store, token))
                        {
                            ability.consequent(store, token);
                            assert.ok(true, "eventKey = " + eventKey + " upgradeKey = " + upgradeKey);
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
            var maneuverKey = Maneuver.STRAIGHT_2_EASY;
            var callback = function()
            {
                LOGGER.info("in callback()");
            };

            store.dispatch(Action.setEnvironment(environment));
            store.dispatch(Action.setActiveToken(token));

            var activationAction = new ActivationAction(store, token, callback);
            var maneuver = Maneuver.properties[maneuverKey];
            store.dispatch(Action.setTokenManeuver(token, maneuver));
            store.dispatch(Action.setTokenActivationAction(token, activationAction));

            return environment;
        }
    });
