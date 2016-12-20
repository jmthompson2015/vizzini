define(["Maneuver", "Phase", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/CombatAction", "process/EnvironmentFactory", "process/PilotAbility2", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
    function(Maneuver, Phase, Action, ActivationAction, Adjudicator, CombatAction, EnvironmentFactory, PilotAbility, MockAttackDice, MockDefenseDice)
    {
        "use strict";
        QUnit.module("PilotAbility2");

        QUnit.test("condition()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = PilotAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(pilotKey)
                    {
                        var ability = abilities[pilotKey];

                        if (ability.condition)
                        {
                            var result = ability.condition(store, token);
                            assert.ok(result !== undefined, "phaseKey = " + phaseKey + " pilotKey = " + pilotKey);
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
            var callback = function()
            {
                LOGGER.info("in callback()");
            };

            // Run / Verify.
            Phase.values().forEach(function(phaseKey)
            {
                var abilities = PilotAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(pilotKey)
                    {
                        var ability = abilities[pilotKey];

                        if (ability.condition && ability.condition(store, token))
                        {
                            ability.consequent(store, token, callback);
                            assert.ok(true, "phaseKey = " + phaseKey + " pilotKey = " + pilotKey);
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
                var abilities = PilotAbility[phaseKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(pilotKey)
                    {
                        var ability = abilities[pilotKey];

                        if (typeof ability === "function")
                        {
                            ability(store, token);
                            assert.ok(true, "phaseKey = " + phaseKey + " pilotKey = " + pilotKey);
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
            var maneuverKey = Maneuver.STRAIGHT_3_EASY;
            var isBoost = false;
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
