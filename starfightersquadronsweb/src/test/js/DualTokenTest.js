define([ "DualToken", "Pilot", "Ship", "Team", "Token", "UpgradeCard", "ui/HumanAgent" ], function(DualToken, Pilot,
        Ship, Team, Token, UpgradeCard, HumanAgent)
{
    "use strict";
    QUnit.module("DualToken");

    QUnit.test("DualToken properties CR90 Corvette", function(assert)
    {
        Token.resetNextId();
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token = new DualToken(Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);
        assert.equal(token.id(), 1);
        assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE);
        assert.equal(token.pilot().shipTeam.shipKey, Ship.CR90_CORVETTE);
        assert.equal(token.name(), "1 CR90 Corvette");

        var tokenFore = token.tokenFore();
        assert.ok(tokenFore);
        assert.equal(tokenFore.name(), "2 CR90 Corvette (fore)");
        assert.equal(tokenFore.upgradeKeys().length, 3);
        assert.equal(tokenFore.secondaryWeapons().length, 1);
        var weapon = tokenFore.secondaryWeapons()[0];
        assert.ok(weapon);
        assert.equal(weapon.upgradeKey(), UpgradeCard.QUAD_LASER_CANNONS);

        var tokenAft = token.tokenAft();
        assert.ok(tokenAft);
        assert.equal(tokenAft.name(), "3 CR90 Corvette (aft)");
        assert.equal(tokenAft.upgradeKeys().length, 1);
        assert.equal(tokenAft.secondaryWeapons().length, 0);
    });

    QUnit.test("tokenFore().ship()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token = new DualToken(Pilot.CR90_CORVETTE, rebelAgent, [ UpgradeCard.QUAD_LASER_CANNONS,
                UpgradeCard.SENSOR_TEAM, UpgradeCard.EM_EMITTER ], [ UpgradeCard.FREQUENCY_JAMMER ]);

        // Run.
        var result = token.tokenFore().ship();

        // Verify.
        assert.ok(result);
        assert.equal(result.value, "cr90Corvette.fore");
    });
});
