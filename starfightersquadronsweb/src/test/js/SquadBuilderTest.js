define([ "Pilot", "Ship", "SimpleAgent", "SquadBuilder", "Team", "ui/HumanAgent" ], function(
        Pilot, Ship, SimpleAgent, SquadBuilder, Team, HumanAgent)
{
    QUnit.module("SquadBuilder");

    QUnit.test("CoreSetImperialSquadBuilder buildSquad()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, squadBuilder);
        var result = squadBuilder.buildSquad(agent);
        assert.equal(result.length, 2);

        assert.equal(result[0].getPilot(), Pilot.MAULER_MITHEL);
        assert.equal(result[1].getPilot(), Pilot.DARK_CURSE);

        for (var i = 0; i < 2; i++)
        {
            assert.equal(result[i].getShip(), Ship.TIE_FIGHTER);
        }
    });

    QUnit.test("CoreSetImperialSquadBuilder getDescription()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var result = squadBuilder.getDescription();
        assert.equal(result, "TIE Fighters x2");
    });

    QUnit.test("CoreSetImperialSquadBuilder getName()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var result = squadBuilder.getName();
        assert.equal(result, "Imperial Core Set: 36 Points");
    });

    QUnit.test("CoreSetImperialSquadBuilder toString()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var result = squadBuilder.toString();
        assert.equal(result, "2012 Imperial Core Set: 36 Points (TIE Fighters x2)");
    });

    QUnit.test("CoreSetRebelSquadBuilder buildSquad()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var agent = new HumanAgent("Rebel Agent", Team.REBEL, squadBuilder);
        var result = squadBuilder.buildSquad(agent);
        assert.equal(result.length, 1);

        assert.equal(result[0].getPilot(), Pilot.LUKE_SKYWALKER);
        assert.equal(result[0].getShip(), Ship.X_WING);
    });

    QUnit.test("CoreSetRebelSquadBuilder getDescription()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var result = squadBuilder.getDescription();
        assert.equal(result, "X-Wing");
    });

    QUnit.test("CoreSetRebelSquadBuilder getName()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var result = squadBuilder.getName();
        assert.equal(result, "Rebel Core Set: 36 Points");
    });

    QUnit.test("CoreSetRebelSquadBuilder toString()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var result = squadBuilder.toString();
        assert.equal(result, "2012 Rebel Core Set: 36 Points (X-Wing)");
    });

    QUnit.test("SquadBuilder.findByTeam() Imperial", function(assert)
    {
        var result = SquadBuilder.findByTeam(Team.IMPERIAL);
        assert.ok(result);
        assert.equal(result.length, 7);
    });

    QUnit.test("SquadBuilder.findByTeam() Rebel", function(assert)
    {
        var result = SquadBuilder.findByTeam(Team.REBEL);
        assert.ok(result);
        assert.equal(result.length, 10);
    });

    QUnit.test("SquadBuilder.findByTeam() Scum", function(assert)
    {
        var result = SquadBuilder.findByTeam(Team.SCUM);
        assert.ok(result);
        assert.equal(result.length, 3);
    });
});
