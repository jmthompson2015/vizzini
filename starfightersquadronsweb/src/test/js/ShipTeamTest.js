define([ "Ship", "ShipTeam", "Team" ], function(Ship, ShipTeam, Team)
{
    QUnit.module("ShipTeam");

    QUnit.test("ShipTeam properties Imperial Firespray-31", function(assert)
    {
        var shipTeam = ShipTeam.IMPERIAL_FIRESPRAY_31;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "Firespray-31 (Imperial)");
        assert.equal(properties.ship, Ship.FIRESPRAY_31);
        assert.equal(properties.team, Team.IMPERIAL);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("ShipTeam properties Imperial TIE Fighter", function(assert)
    {
        var shipTeam = ShipTeam.IMPERIAL_TIE_FIGHTER;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "TIE Fighter");
        assert.equal(properties.ship, Ship.TIE_FIGHTER);
        assert.equal(properties.team, Team.IMPERIAL);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("ShipTeam properties Rebel X-Wing", function(assert)
    {
        var shipTeam = ShipTeam.REBEL_X_WING;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "X-Wing");
        assert.equal(properties.ship, Ship.X_WING);
        assert.equal(properties.team, Team.REBEL);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("ShipTeam properties Scum Firespray-31", function(assert)
    {
        var shipTeam = ShipTeam.SCUM_FIRESPRAY_31;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "Firespray-31 (Scum)");
        assert.equal(properties.ship, Ship.FIRESPRAY_31);
        assert.equal(properties.team, Team.SCUM);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = ShipTeam.values();
        var ownPropertyNames = Object.getOwnPropertyNames(ShipTeam);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(ShipTeam[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return ShipTeam[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = ShipTeam.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 33);
        assert.equal(result[0], "firstOrderTieFoFighter");
        assert.equal(result[32], "scumZ95Headhunter");

        var properties = Object.getOwnPropertyNames(ShipTeam);
        var count = properties.length - 1 // properties
        - 1 // values
        - 1; // valuesByTeam
        assert.equal(result.length, count);
    });

    QUnit.test("valuesByTeam() Imperial", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.IMPERIAL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 12);
        var i = 0;
        assert.equal(result[i++], "imperialFirespray31");
        assert.equal(result[i++], "imperialLambdaClassShuttle");
        assert.equal(result[i++], "imperialTieAdvanced");
        assert.equal(result[i++], "imperialTieBomber");
        assert.equal(result[i++], "imperialTieDefender");
        assert.equal(result[i++], "imperialTieFighter");
        assert.equal(result[i++], "imperialTieInterceptor");
        assert.equal(result[i++], "imperialTieInterceptorRoyalGuard");
        assert.equal(result[i++], "imperialTieInterceptorSaberSquadron");
        assert.equal(result[i++], "imperialTiePhantom");
        assert.equal(result[i++], "imperialTiePunisher");
        assert.equal(result[i++], "imperialVt49Decimator");
    });

    QUnit.test("valuesByTeam() Rebel", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.REBEL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 12);
        var i = 0;
        assert.equal(result[i++], "rebelAWing");
        assert.equal(result[i++], "rebelAWingAce");
        assert.equal(result[i++], "rebelBWing");
        assert.equal(result[i++], "rebelBWingAce");
        assert.equal(result[i++], "rebelEWing");
        assert.equal(result[i++], "rebelHwk290");
        assert.equal(result[i++], "rebelKWing");
        assert.equal(result[i++], "rebelXWing");
        assert.equal(result[i++], "rebelYWing");
        assert.equal(result[i++], "rebelYt1300");
        assert.equal(result[i++], "rebelYt2400");
        assert.equal(result[i++], "rebelZ95Headhunter");
    });

    QUnit.test("valuesByTeam() Scum", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.SCUM);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 8);
        var i = 0;
        assert.equal(result[i++], "scumAggressor");
        assert.equal(result[i++], "scumFirespray31");
        assert.equal(result[i++], "scumHwk290");
        assert.equal(result[i++], "scumKihraxzFighter");
        assert.equal(result[i++], "scumM3AInterceptor");
        assert.equal(result[i++], "scumStarViper");
        assert.equal(result[i++], "scumYWing");
        assert.equal(result[i++], "scumZ95Headhunter");
    });
});
