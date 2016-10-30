define(["Maneuver", "process/Action", "process/ActivationAction", "process/Adjudicator", "process/Environment", "process/EnvironmentFactory", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder"],
    function(Maneuver, Action, ActivationAction, Adjudicator, Environment, EnvironmentFactory, Reducer, SimpleAgent, SquadBuilder)
    {
        "use strict";
        QUnit.module("ActivationAction");

        QUnit.test("doIt() X-Wing", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var token = environment.tokens()[2]; // X-Wing
            var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            var action = new ActivationAction(environment, adjudicator, token, maneuverKey, callback);
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);

            // Run.
            var done = assert.async();
            action.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");

                // Execute maneuver.
                var position = environment.getPositionFor(token);
                assert.equal(position.x(), 458);
                assert.equal(position.y(), 895 - (2 * 20 + 1 * 40));
                assert.equal(position.heading(), 270);

                // Check pilot stress.
                assert.ok(!token.isStressed());
                assert.equal(token.stressCount(), 0);

                // Perform action.
                assert.equal(token.focusCount(), 1);

                done();
            }, 1000);
        });

        QUnit.test("doIt() X-Wing K-turn", function(assert)
        {
            // Setup.
            var environment = EnvironmentFactory.createCoreSetEnvironment();
            var adjudicator = new Adjudicator();
            var token = environment.tokens()[2]; // X-Wing
            var maneuverKey = Maneuver.KOIOGRAN_TURN_4_HARD;
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            var action = new ActivationAction(environment, adjudicator, token, maneuverKey, callback);
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895);
            assert.equal(position.heading(), 270);

            // Run.
            var done = assert.async();
            action.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");

                // Execute maneuver.
                var position = environment.getPositionFor(token);
                assert.equal(position.x(), 458);
                assert.equal(position.y(), 895 - (2 * 20 + 4 * 40));
                assert.equal(position.heading(), 90);

                // Check pilot stress.
                assert.ok(token.isStressed());
                assert.equal(token.stressCount(), 1);

                // Perform action.
                assert.equal(token.focusCount(), 0);

                done();
            }, 600);
        });

        QUnit.test("doIt() Huge", function(assert)
        {
            // Setup.
            var squadBuilder1 = SquadBuilder.HugeShipImperialSquadBuilder;
            var squadBuilder2 = SquadBuilder.HugeShipRebelSquadBuilder;
            var agent1 = new SimpleAgent("1", squadBuilder1.faction());
            var agent2 = new SimpleAgent("2", squadBuilder2.faction());
            var squad1 = squadBuilder1.buildSquad(agent1);
            var squad2 = squadBuilder2.buildSquad(agent2);
            var store = Redux.createStore(Reducer.root);
            var environment = new Environment(store, agent1.teamKey(), agent2.teamKey());
            environment.placeInitialTokens(agent1, squad1, agent2, squad2);
            var adjudicator = new Adjudicator();
            var token = environment.tokens()[0]; // Gozanti-class Cruiser
            var maneuverKey = Maneuver.STRAIGHT_1_3;
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            var action = new ActivationAction(environment, adjudicator, token, maneuverKey, callback);
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 96);
            assert.equal(position.heading(), 90);
            assert.equal(token.energyCount(), 4);
            store.dispatch(Action.addEnergyCount(token, -2));
            assert.equal(token.energyCount(), 2);

            // Run.
            var done = assert.async();
            action.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");

                // Execute maneuver.
                var position = environment.getPositionFor(token);
                assert.equal(position.x(), 458);
                assert.equal(position.y(), 96 + (1 * 40));
                assert.equal(position.heading(), 90);

                // Check pilot stress.
                assert.ok(!token.isStressed());
                assert.equal(token.stressCount(), 0);

                // Gain energy.
                assert.equal(token.energyCount(), 4);

                // Perform action.
                assert.equal(token.focusCount(), 0);

                done();
            }, 1000);
        });

        QUnit.test("doIt() Lambda-class Shuttle stationary", function(assert)
        {
            // Setup.
            var squadBuilder1 = SquadBuilder.findByNameAndYear("World #4", 2015);
            var squadBuilder2 = SquadBuilder.findByNameAndYear("World #1", 2015);
            var agent1 = new SimpleAgent("1", squadBuilder1.faction());
            var agent2 = new SimpleAgent("2", squadBuilder2.faction());
            var squad1 = squadBuilder1.buildSquad(agent1);
            var squad2 = squadBuilder2.buildSquad(agent2);
            var store = Redux.createStore(Reducer.root);
            var environment = new Environment(store, agent1.teamKey(), agent2.teamKey());
            environment.placeInitialTokens(agent1, squad1, agent2, squad2);
            var adjudicator = new Adjudicator();
            var token = environment.tokens()[2]; // Lambda-class Shuttle
            var maneuverKey = Maneuver.STATIONARY_0_HARD;
            var callback = function()
            {
                LOGGER.info("callback() start");
            };
            var action = new ActivationAction(environment, adjudicator, token, maneuverKey, callback);
            var position = environment.getPositionFor(token);
            assert.equal(position.x(), 686);
            assert.equal(position.y(), 40);
            assert.equal(position.heading(), 90);

            // Run.
            var done = assert.async();
            action.doIt();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");

                // Execute maneuver.
                var position = environment.getPositionFor(token);
                assert.equal(position.x(), 686);
                assert.equal(position.y(), 40);
                assert.equal(position.heading(), 90);

                // Check pilot stress.
                assert.ok(token.isStressed());
                assert.equal(token.stressCount(), 1);

                // Perform action.
                assert.equal(token.focusCount(), 0);

                done();
            }, 600);
        });
    });
