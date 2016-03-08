define([ "Ship", "ShipTeam", "Team" ], function(Ship, ShipTeam, Team)
{
    "use strict";
    QUnit.module("ShipTeam");

    QUnit.test("ShipTeam properties Imperial Firespray-31", function(assert)
    {
        var shipTeam = ShipTeam.IMPERIAL_FIRESPRAY_31;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "Firespray-31 (Imperial)");
        assert.equal(properties.shipKey, Ship.FIRESPRAY_31);
        assert.equal(properties.teamKey, Team.IMPERIAL);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("ShipTeam properties Imperial TIE Fighter", function(assert)
    {
        var shipTeam = ShipTeam.IMPERIAL_TIE_FIGHTER;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "TIE Fighter");
        assert.equal(properties.shipKey, Ship.TIE_FIGHTER);
        assert.equal(properties.teamKey, Team.IMPERIAL);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("ShipTeam properties Rebel X-Wing", function(assert)
    {
        var shipTeam = ShipTeam.REBEL_X_WING;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "X-Wing");
        assert.equal(properties.shipKey, Ship.X_WING);
        assert.equal(properties.teamKey, Team.REBEL);
        assert.equal(properties.value, shipTeam);
    });

    QUnit.test("ShipTeam properties Scum Firespray-31", function(assert)
    {
        var shipTeam = ShipTeam.SCUM_FIRESPRAY_31;
        var properties = ShipTeam.properties[shipTeam];
        assert.equal(properties.name, "Firespray-31 (Scum)");
        assert.equal(properties.shipKey, Ship.FIRESPRAY_31);
        assert.equal(properties.teamKey, Team.SCUM);
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
        assert.equal(result.length, 37);
        assert.equal(result[0], "firstOrderTieFoFighter");
        assert.equal(result[35], "scumYv666");
        assert.equal(result[36], "scumZ95Headhunter");

        var properties = Object.getOwnPropertyNames(ShipTeam);
        var count = properties.length - 1 - // properties
        1 - // shipValuesByTeam
        1 - // values
        1 - // valuesByShipAndTeam
        1; // valuesByTeam
        assert.equal(result.length, count);
    });

    QUnit.test("shipValuesByTeam() First Order strict", function(assert)
    {
        // Setup.
        var isStrict = true;

        // Run.
        var result = ShipTeam.shipValuesByTeam(Team.FIRST_ORDER, isStrict);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        var i = 0;
        assert.equal(result[i++], Ship.TIE_FO_FIGHTER);
    });

    QUnit.test("shipValuesByTeam() Imperial", function(assert)
    {
        // Run.
        var result = ShipTeam.shipValuesByTeam(Team.IMPERIAL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 11);
        var i = 0;
        assert.equal(result[i++], Ship.FIRESPRAY_31);
        assert.equal(result[i++], Ship.LAMBDA_CLASS_SHUTTLE);
        assert.equal(result[i++], Ship.TIE_ADVANCED);
        assert.equal(result[i++], Ship.TIE_BOMBER);
        assert.equal(result[i++], Ship.TIE_DEFENDER);
        assert.equal(result[i++], Ship.TIE_FIGHTER);
        assert.equal(result[i++], Ship.TIE_INTERCEPTOR);
        assert.equal(result[i++], Ship.TIE_PHANTOM);
        assert.equal(result[i++], Ship.TIE_PUNISHER);
        assert.equal(result[i++], Ship.VT_49_DECIMATOR);
        assert.equal(result[i++], Ship.TIE_FO_FIGHTER);
    });

    QUnit.test("shipValuesByTeam() Rebel", function(assert)
    {
        // Run.
        var result = ShipTeam.shipValuesByTeam(Team.REBEL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 13);
        var i = 0;
        assert.equal(result[i++], Ship.A_WING);
        assert.equal(result[i++], Ship.B_WING);
        assert.equal(result[i++], Ship.CR90_CORVETTE);
        assert.equal(result[i++], Ship.E_WING);
        assert.equal(result[i++], Ship.GR_75_MEDIUM_TRANSPORT);
        assert.equal(result[i++], Ship.HWK_290);
        assert.equal(result[i++], Ship.K_WING);
        assert.equal(result[i++], Ship.X_WING);
        assert.equal(result[i++], Ship.Y_WING);
        assert.equal(result[i++], Ship.YT_1300);
        assert.equal(result[i++], Ship.YT_2400);
        assert.equal(result[i++], Ship.Z_95_HEADHUNTER);
        assert.equal(result[i++], Ship.T_70_X_WING);
    });

    QUnit.test("shipValuesByTeam() Resistance strict", function(assert)
    {
        // Setup.
        var isStrict = true;

        // Run.
        var result = ShipTeam.shipValuesByTeam(Team.RESISTANCE, isStrict);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        var i = 0;
        assert.equal(result[i++], Ship.T_70_X_WING);
    });

    QUnit.test("valuesByShipAndTeam() Imperial", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByShipAndTeam(Ship.TIE_INTERCEPTOR, Team.IMPERIAL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 3);
        var i = 0;
        assert.equal(result[i++], "imperialTieInterceptor");
        assert.equal(result[i++], "imperialTieInterceptorRoyalGuard");
        assert.equal(result[i++], "imperialTieInterceptorSaberSquadron");
    });

    QUnit.test("valuesByShipAndTeam() Rebel", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByShipAndTeam(Ship.A_WING, Team.REBEL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        var i = 0;
        assert.equal(result[i++], "rebelAWing");
        assert.equal(result[i++], "rebelAWingAce");
    });

    QUnit.test("valuesByTeam() First Order", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.FIRST_ORDER);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 13);
        var i = 0;
        assert.equal(result[i++], "firstOrderTieFoFighter");
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

    QUnit.test("valuesByTeam() First Order strict", function(assert)
    {
        // Setup.
        var isStrict = true;

        // Run.
        var result = ShipTeam.valuesByTeam(Team.FIRST_ORDER, isStrict);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        var i = 0;
        assert.equal(result[i++], "firstOrderTieFoFighter");
    });

    QUnit.test("valuesByTeam() Imperial", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.IMPERIAL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 13);
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
        assert.equal(result[i++], "firstOrderTieFoFighter");
    });

    QUnit.test("valuesByTeam() Imperial strict", function(assert)
    {
        // Setup.
        var isStrict = true;

        // Run.
        var result = ShipTeam.valuesByTeam(Team.IMPERIAL, isStrict);

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
        assert.equal(result.length, 15);
        var i = 0;
        assert.equal(result[i++], "rebelAWing");
        assert.equal(result[i++], "rebelAWingAce");
        assert.equal(result[i++], "rebelBWing");
        assert.equal(result[i++], "rebelBWingAce");
        assert.equal(result[i++], "rebelCr90Corvette");
        assert.equal(result[i++], "rebelEWing");
        assert.equal(result[i++], "rebelGr75MediumTransport");
        assert.equal(result[i++], "rebelHwk290");
        assert.equal(result[i++], "rebelKWing");
        assert.equal(result[i++], "rebelXWing");
        assert.equal(result[i++], "rebelYWing");
        assert.equal(result[i++], "rebelYt1300");
        assert.equal(result[i++], "rebelYt2400");
        assert.equal(result[i++], "rebelZ95Headhunter");
        assert.equal(result[i++], "resistanceT70XWing");
    });

    QUnit.test("valuesByTeam() Rebel strict", function(assert)
    {
        // Setup.
        var isStrict = true;

        // Run.
        var result = ShipTeam.valuesByTeam(Team.REBEL, isStrict);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 14);
        var i = 0;
        assert.equal(result[i++], "rebelAWing");
        assert.equal(result[i++], "rebelAWingAce");
        assert.equal(result[i++], "rebelBWing");
        assert.equal(result[i++], "rebelBWingAce");
        assert.equal(result[i++], "rebelCr90Corvette");
        assert.equal(result[i++], "rebelEWing");
        assert.equal(result[i++], "rebelGr75MediumTransport");
        assert.equal(result[i++], "rebelHwk290");
        assert.equal(result[i++], "rebelKWing");
        assert.equal(result[i++], "rebelXWing");
        assert.equal(result[i++], "rebelYWing");
        assert.equal(result[i++], "rebelYt1300");
        assert.equal(result[i++], "rebelYt2400");
        assert.equal(result[i++], "rebelZ95Headhunter");
    });

    QUnit.test("valuesByTeam() Resistance", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.RESISTANCE);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 15);
        var i = 0;
        assert.equal(result[i++], "resistanceT70XWing");
        assert.equal(result[i++], "rebelAWing");
        assert.equal(result[i++], "rebelAWingAce");
        assert.equal(result[i++], "rebelBWing");
        assert.equal(result[i++], "rebelBWingAce");
        assert.equal(result[i++], "rebelCr90Corvette");
        assert.equal(result[i++], "rebelEWing");
        assert.equal(result[i++], "rebelGr75MediumTransport");
        assert.equal(result[i++], "rebelHwk290");
        assert.equal(result[i++], "rebelKWing");
        assert.equal(result[i++], "rebelXWing");
        assert.equal(result[i++], "rebelYWing");
        assert.equal(result[i++], "rebelYt1300");
        assert.equal(result[i++], "rebelYt2400");
        assert.equal(result[i++], "rebelZ95Headhunter");
    });

    QUnit.test("valuesByTeam() Resistance strict", function(assert)
    {
        // Setup.
        var isStrict = true;

        // Run.
        var result = ShipTeam.valuesByTeam(Team.RESISTANCE, isStrict);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        var i = 0;
        assert.equal(result[i++], "resistanceT70XWing");
    });

    QUnit.test("valuesByTeam() Scum", function(assert)
    {
        // Run.
        var result = ShipTeam.valuesByTeam(Team.SCUM);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 9);
        var i = 0;
        assert.equal(result[i++], "scumAggressor");
        assert.equal(result[i++], "scumFirespray31");
        assert.equal(result[i++], "scumHwk290");
        assert.equal(result[i++], "scumKihraxzFighter");
        assert.equal(result[i++], "scumM3AInterceptor");
        assert.equal(result[i++], "scumStarViper");
        assert.equal(result[i++], "scumYWing");
        assert.equal(result[i++], "scumYv666");
        assert.equal(result[i++], "scumZ95Headhunter");
    });
});
