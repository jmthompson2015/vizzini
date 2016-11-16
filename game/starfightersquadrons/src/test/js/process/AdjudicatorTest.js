define(["process/Adjudicator", "process/EnvironmentFactory", "process/Action"],
    function(Adjudicator, EnvironmentFactory, Action)
    {
        "use strict";
        QUnit.module("Adjudicator");

        QUnit.test("canAttack() yes", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var attacker = environment.tokens()[0];

            // Run / Verify.
            assert.ok(adjudicator.canAttack(attacker));
        });

        QUnit.test("canAttack() no - cloaked", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var adjudicator = new Adjudicator();
            var attacker = environment.tokens()[0];
            store.dispatch(Action.addCloakCount(attacker));

            // Run / Verify.
            assert.ok(!adjudicator.canAttack(attacker));
        });

        QUnit.test("canAttack() no - weapons disabled", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var store = environment.store();
            var adjudicator = new Adjudicator();
            var attacker = environment.tokens()[0];
            store.dispatch(Action.addWeaponsDisabledCount(attacker));

            // Run / Verify.
            assert.ok(!adjudicator.canAttack(attacker));
        });

        QUnit.test("canSelectShipAction() yes", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var attacker = environment.tokens()[0];

            // Run / Verify.
            assert.ok(adjudicator.canSelectShipAction(attacker));
        });

        QUnit.test("determineWinner()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();

            // Run / Verify.
            assert.ok(!adjudicator.determineWinner(environment));
        });

        QUnit.test("isGameOver()", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();

            // Run / Verify.
            assert.ok(!adjudicator.isGameOver(environment));
        });
    });
