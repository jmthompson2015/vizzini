define(["Pilot", "Position", "RangeRuler", "process/SimpleAgent", "Team", "process/Token", "process/Reducer"],
    function(Pilot, Position, RangeRuler, SimpleAgent, Team, Token, Reducer)
    {
        "use strict";
        QUnit.module("RangeRuler");

        QUnit.test("findRange()", function(assert)
        {
            assert.ok(!RangeRuler.findRange(-1));
            assert.equal(RangeRuler.findRange(0), RangeRuler.ONE);
            assert.equal(RangeRuler.findRange(100), RangeRuler.ONE);
            assert.equal(RangeRuler.findRange(101), RangeRuler.TWO);
            assert.equal(RangeRuler.findRange(200), RangeRuler.TWO);
            assert.equal(RangeRuler.findRange(201), RangeRuler.THREE);
            assert.equal(RangeRuler.findRange(300), RangeRuler.THREE);
            assert.equal(RangeRuler.findRange(301), RangeRuler.FOUR);
            assert.equal(RangeRuler.findRange(401), RangeRuler.FIVE);
            assert.ok(!RangeRuler.findRange(501));
        });

        QUnit.test("getRange() One", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
            var attacker = new Token(store, Pilot.ROOKIE_PILOT, rebelAgent);
            var attackerPosition = new Position(300, 80, -90);
            var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
            var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
            var defenderPosition = new Position(300, 30, 45);

            // Run.
            var result = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

            // Verify.
            assert.ok(result);
            assert.equal(result, RangeRuler.ONE);
        });

        QUnit.test("getRange() Two", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
            var attacker = new Token(store, Pilot.ROOKIE_PILOT, rebelAgent);
            var attackerPosition = new Position(300, 180, -90);
            var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
            var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
            var defenderPosition = new Position(300, 30, 45);

            // Run.
            var result = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

            // Verify.
            assert.ok(result);
            assert.equal(result, RangeRuler.TWO);
        });

        QUnit.test("getRange() Three", function(assert)
        {
            // Setup.
            var store = Redux.createStore(Reducer.root);
            var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
            var attacker = new Token(store, Pilot.ROOKIE_PILOT, rebelAgent);
            var attackerPosition = new Position(300, 280, -90);
            var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
            var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
            var defenderPosition = new Position(300, 30, 45);

            // Run.
            var result = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

            // Verify.
            assert.ok(result);
            assert.equal(result, RangeRuler.THREE);
        });
    });
