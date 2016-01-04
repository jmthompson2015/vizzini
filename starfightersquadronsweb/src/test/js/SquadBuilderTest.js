define([ "Pilot", "Ship", "SimpleAgent", "SquadBuilder", "Team", "ui/HumanAgent" ], function(Pilot, Ship, SimpleAgent,
        SquadBuilder, Team, HumanAgent)
{
    QUnit.module("SquadBuilder");

    QUnit.test("CoreSetImperialSquadBuilder buildSquad()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var result = squadBuilder.buildSquad(agent);
        assert.equal(result.length, 2);

        assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
        assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);

        for (var i = 0; i < 2; i++)
        {
            assert.equal(result[i].shipKey(), Ship.TIE_FIGHTER);
        }
    });

    QUnit.test("CoreSetImperialSquadBuilder description()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var result = squadBuilder.description();
        assert.equal(result, "TIE Fighters x2");
    });

    QUnit.test("CoreSetImperialSquadBuilder getName()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[0];
        var result = squadBuilder.name();
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
        var agent = new HumanAgent("Rebel Agent", Team.REBEL);
        var result = squadBuilder.buildSquad(agent);
        assert.equal(result.length, 1);

        assert.equal(result[0].pilotKey(), Pilot.LUKE_SKYWALKER);
        assert.equal(result[0].shipKey(), Ship.X_WING);
    });

    QUnit.test("CoreSetRebelSquadBuilder description()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var result = squadBuilder.description();
        assert.equal(result, "X-Wing");
    });

    QUnit.test("CoreSetRebelSquadBuilder getName()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var result = squadBuilder.name();
        assert.equal(result, "Rebel Core Set: 36 Points");
    });

    QUnit.test("CoreSetRebelSquadBuilder toString()", function(assert)
    {
        var squadBuilder = SquadBuilder.SquadBuilders[1];
        var result = squadBuilder.toString();
        assert.equal(result, "2012 Rebel Core Set: 36 Points (X-Wing)");
    });

    QUnit.test("SquadBuilder.findByTeam() First Order", function(assert)
    {
        var result = SquadBuilder.findByTeam(Team.FIRST_ORDER);
        assert.ok(result);
        assert.equal(result.length, 0);
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
        assert.equal(result.length, 11);
    });

    QUnit.test("SquadBuilder.findByTeam() Resistance", function(assert)
    {
        var result = SquadBuilder.findByTeam(Team.RESISTANCE);
        assert.ok(result);
        assert.equal(result.length, 2);
    });

    QUnit.test("SquadBuilder.findByTeam() Scum", function(assert)
    {
        var result = SquadBuilder.findByTeam(Team.SCUM);
        assert.ok(result);
        assert.equal(result.length, 3);
    });
});
