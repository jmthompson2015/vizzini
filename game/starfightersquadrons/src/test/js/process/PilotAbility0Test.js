define(["Event", "Maneuver", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/CombatAction", "process/EnvironmentFactory", "process/PilotAbility0", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
    function(Event, Maneuver, Action, ActivationAction, Adjudicator, CombatAction, EnvironmentFactory, PilotAbility, MockAttackDice, MockDefenseDice)
    {
        "use strict";
        QUnit.module("PilotAbility0");

        QUnit.test("condition()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Event.values().forEach(function(eventKey)
            {
                var abilities = PilotAbility[eventKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(pilotKey)
                    {
                        var ability = abilities[pilotKey];

                        if (ability.condition)
                        {
                            var result = ability.condition(store, token);
                            assert.ok(result !== undefined, "eventKey = " + eventKey + " pilotKey = " + pilotKey);
                        }
                    });
                }
            });

            assert.ok(true);
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
                var abilities = PilotAbility[eventKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(pilotKey)
                    {
                        var ability = abilities[pilotKey];

                        if (ability.condition && ability.condition(store, token))
                        {
                            ability.consequent(store, token);
                            assert.ok(true, "eventKey = " + eventKey + " pilotKey = " + pilotKey);
                        }
                    });
                }
            });

            assert.ok(true);
        });

        QUnit.test("function()", function(assert)
        {
            // Setup.
            var environment = createEnvironment();
            var store = environment.store();
            var token = environment.tokens()[2]; // X-Wing.

            // Run / Verify.
            Event.values().forEach(function(eventKey)
            {
                var abilities = PilotAbility[eventKey];

                if (abilities)
                {
                    Object.keys(abilities).forEach(function(pilotKey)
                    {
                        var ability = abilities[pilotKey];

                        if (typeof ability === "function")
                        {
                            ability(store, token);
                            assert.ok(true, "eventKey = " + eventKey + " pilotKey = " + pilotKey);
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
            store.dispatch(Action.setActiveToken(token.id()));

            return environment;
        }
    });
