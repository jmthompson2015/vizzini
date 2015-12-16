define([ "Pilot", "ShipTeam", "Team" ], function(Pilot, ShipTeam, Team)
{
    QUnit.module("Pilot");

    QUnit.test("Pilot properties Academy Pilot", function(assert)
    {
        var pilot = Pilot.ACADEMY_PILOT;
        var properties = Pilot.properties[pilot];
        assert.equal(properties.name, "Academy Pilot");
        assert.ok(properties.primaryWeapon);
        assert.equal(properties.shipTeam, ShipTeam.IMPERIAL_TIE_FIGHTER);
        assert.equal(properties.shipState.getPilotSkillValue(), 1);
        assert.equal(properties.shipState.getPrimaryWeaponValue(), 2);
        assert.equal(properties.shipState.getAgilityValue(), 3);
        assert.equal(properties.shipState.getHullValue(), 3);
        assert.equal(properties.shipState.getShieldValue(), 0);
        assert.equal(properties.squadPointCost, 12);
        assert.equal(properties.value, "academyPilot");
    });

    QUnit.test("Pilot properties Bounty Hunter", function(assert)
    {
        var pilot = Pilot.BOUNTY_HUNTER;
        var properties = Pilot.properties[pilot];
        assert.equal(properties.name, "Bounty Hunter");
        assert.ok(properties.primaryWeapon);
        assert.equal(properties.shipTeam, ShipTeam.IMPERIAL_FIRESPRAY_31);
        assert.equal(properties.shipState.getPilotSkillValue(), 3);
        assert.equal(properties.shipState.getPrimaryWeaponValue(), 3);
        assert.equal(properties.shipState.getAgilityValue(), 2);
        assert.equal(properties.shipState.getHullValue(), 6);
        assert.equal(properties.shipState.getShieldValue(), 4);
        assert.equal(properties.squadPointCost, 33);
        assert.equal(properties.value, "bountyHunter");
    });

    QUnit.test("Pilot properties Dutch Vander", function(assert)
    {
        var pilot = Pilot.DUTCH_VANDER;
        var properties = Pilot.properties[pilot];
        assert.equal(properties.name, "\"Dutch\" Vander");
        assert.ok(properties.primaryWeapon);
        assert.equal(properties.shipTeam, ShipTeam.REBEL_Y_WING);
        assert.equal(properties.shipState.getPilotSkillValue(), 6);
        assert.equal(properties.shipState.getPrimaryWeaponValue(), 2);
        assert.equal(properties.shipState.getAgilityValue(), 1);
        assert.equal(properties.shipState.getHullValue(), 5);
        assert.equal(properties.shipState.getShieldValue(), 3);
        assert.equal(properties.squadPointCost, 23);
        assert.equal(properties.value, "dutchVander");
    });

    QUnit.test("Pilot properties Rookie Pilot", function(assert)
    {
        var pilot = Pilot.ROOKIE_PILOT;
        var properties = Pilot.properties[pilot];
        assert.equal(properties.name, "Rookie Pilot");
        assert.ok(properties.primaryWeapon);
        assert.equal(properties.shipTeam, ShipTeam.REBEL_X_WING);
        assert.equal(properties.shipState.getPilotSkillValue(), 2);
        assert.equal(properties.shipState.getPrimaryWeaponValue(), 3);
        assert.equal(properties.shipState.getAgilityValue(), 2);
        assert.equal(properties.shipState.getHullValue(), 3);
        assert.equal(properties.shipState.getShieldValue(), 2);
        assert.equal(properties.squadPointCost, 21);
        assert.equal(properties.value, "rookiePilot");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Pilot.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Pilot);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            if (key !== "properties" && typeof key !== "function")
            {
                assert.ok(Pilot[key], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Pilot[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Pilot.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 126);
        assert.equal(result[0], "academyPilot");
        assert.equal(result[125], "wingedGundark");

        var properties = Object.getOwnPropertyNames(Pilot);
        var count = properties.length - 1 // properties
                - 1 // values
                - 1 // valuesByShipTeam
                - 1; // valuesByTeam
        assert.equal(result.length, count);

        for (var i = 0; i < result.length; i++)
        {
            assert.ok(!result[i].ship, result[i].ship);
        }
    });

    QUnit.test("valuesByShipTeam() TIE Fighter", function(assert)
    {
        // Run.
        var result = Pilot.valuesByShipTeam(ShipTeam.IMPERIAL_TIE_FIGHTER);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 9);
        assert.equal(result[0], "academyPilot");
        assert.equal(result[8], "wingedGundark");
    });

    QUnit.test("valuesByShipTeam() X-Wing", function(assert)
    {
        // Run.
        var result = Pilot.valuesByShipTeam(ShipTeam.REBEL_X_WING);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 10);
        assert.equal(result[0], "biggsDarklighter");
        assert.equal(result[9], "wesJanson");
    });

    QUnit.test("valuesByTeam() Imperial", function(assert)
    {
        // Run.
        var result = Pilot.valuesByTeam(Team.IMPERIAL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 48);
        assert.equal(result[0], "academyPilot");
        assert.equal(result[47], "wingedGundark");
    });

    QUnit.test("valuesByTeam() Rebel", function(assert)
    {
        // Run.
        var result = Pilot.valuesByTeam(Team.REBEL);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 46);
        assert.equal(result[0], "airenCracken");
        assert.equal(result[45], "wildSpaceFringer");
    });

    QUnit.test("valuesByTeam() Scum", function(assert)
    {
        // Run.
        var result = Pilot.valuesByTeam(Team.SCUM);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 32);
        assert.equal(result[0], "binayrePirate");
        assert.equal(result[31], "torkilMux");
    });
});
