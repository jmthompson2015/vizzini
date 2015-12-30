define([ "Pilot", "Position", "RangeRuler", "ShipBase", "SimpleAgent", "SquadBuilder", "Team", "Token" ], function(
        Pilot, Position, RangeRuler, ShipBase, SimpleAgent, SquadBuilder, Team, Token)
{
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
        assert.ok(!RangeRuler.findRange(301));
    });

    QUnit.test("getRange() One", function(assert)
    {
        // Setup.
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var attackerPosition = new Position(300, 80, -90);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
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
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var attackerPosition = new Position(300, 180, -90);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
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
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var attackerPosition = new Position(300, 280, -90);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(300, 30, 45);

        // Run.
        var result = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
        assert.equal(result, RangeRuler.THREE);
    });
});
