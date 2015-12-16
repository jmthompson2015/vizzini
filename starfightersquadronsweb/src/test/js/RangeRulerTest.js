define([ "Pilot", "Position", "Range", "RangeRuler", "SimpleAgent", "SquadBuilder", "Team", "Token" ], function(Pilot,
        Position, Range, RangeRuler, SimpleAgent, SquadBuilder, Team, Token)
{
    QUnit.module("RangeRuler");

    QUnit.test("getRange() One", function(assert)
    {
        // Setup.
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var attacker = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var attackerPosition = new Position(300, 80, -90);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(300, 30, 45);
        var rangeRuler = new RangeRuler();

        // Run.
        var result = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
        assert.equal(result, Range.ONE);
    });

    QUnit.test("getRange() Two", function(assert)
    {
        // Setup.
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var attacker = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var attackerPosition = new Position(300, 180, -90);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(300, 30, 45);
        var rangeRuler = new RangeRuler();

        // Run.
        var result = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
        assert.equal(result, Range.TWO);
    });

    QUnit.test("getRange() Three", function(assert)
    {
        // Setup.
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var attacker = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var attackerPosition = new Position(300, 280, -90);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(300, 30, 45);
        var rangeRuler = new RangeRuler();

        // Run.
        var result = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assert.ok(result);
        assert.equal(result, Range.THREE);
    });
});
