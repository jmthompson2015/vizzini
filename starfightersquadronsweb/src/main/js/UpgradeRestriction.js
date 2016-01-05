define([ "Pilot", "Ship", "ShipBase", "Team", "ShipTeam" ], function(Pilot, Ship, ShipBase, Team, ShipTeam)
{
    function PilotSkillRestriction(pilotSkill)
    {
        InputValidator.validateNotNull("pilotSkill", pilotSkill);

        return (
        {
            displayName: "Pilot Skill above \"" + pilotSkill + "\".",
            passes: function(pilot)
            {
                var myPilotSkill = Pilot.properties[pilot].shipState.pilotSkillValue();
                return myPilotSkill > pilotSkill;
            }
        });
    }

    function ShipSizeRestriction(shipBase)
    {
        InputValidator.validateNotNull("shipBase", shipBase);

        var props = ShipBase.properties[shipBase];

        return (
        {
            displayName: props.name + " only.",
            passes: function(pilot)
            {
                var shipTeam = Pilot.properties[pilot].shipTeam;
                var ship = ShipTeam.properties[shipTeam].ship;
                var myShipBase = Ship.properties[ship].shipBase;
                return myShipBase === shipBase;
            }
        });
    }

    function ShipRestriction(ship)
    {
        InputValidator.validateNotNull("ship", ship);

        var props = Ship.properties[ship];

        return (
        {
            displayName: props.name + " only.",
            passes: function(pilot)
            {
                var shipTeam = Pilot.properties[pilot].shipTeam;
                var myShip = ShipTeam.properties[shipTeam].ship;
                return myShip === ship;
            }
        });
    }

    function TeamRestriction(team)
    {
        InputValidator.validateNotNull("team", team);

        var props = Team.properties[team];

        return (
        {
            displayName: props.name + " only.",
            passes: function(pilot)
            {
                var shipTeam = Pilot.properties[pilot].shipTeam;
                var myTeam = ShipTeam.properties[shipTeam].team;
                return myTeam === team;
            }
        });
    }

    var UpgradeRestriction =
    {
        // Pilot skill lower bound.
        PILOT_SKILL_ABOVE_1: "pilotSkillAbove1",
        PILOT_SKILL_ABOVE_2: "pilotSkillAbove2",
        PILOT_SKILL_ABOVE_3: "pilotSkillAbove3",
        PILOT_SKILL_ABOVE_4: "pilotSkillAbove4",

        // Ship specific.
        A_WING_ONLY: "aWingOnly",
        AGGRESSOR_ONLY: "aggressorOnly",
        B_WING_ONLY: "bWingOnly",
        FIRESPRAY_31_ONLY: "firespray31Only",
        HWK_290_ONLY: "hwk290Only",
        LAMBDA_CLASS_SHUTTLE_ONLY: "lambdaClassShuttleOnly",
        M3_A_INTERCEPTOR_ONLY: "m3AInterceptorOnly",
        STAR_VIPER_ONLY: "starViperOnly",
        TIE_ADVANCED_ONLY: "tieAdvancedOnly",
        TIE_INTERCEPTOR_ONLY: "tieInterceptorOnly",
        TIE_PHANTOM_ONLY: "tiePhantomOnly",
        VT_49_DECIMATOR_ONLY: "vt49DecimatorOnly",
        X_WING_ONLY: "xWingOnly",
        YT_1300_ONLY: "yt1300Only",
        YT_2400_ONLY: "yt2400Only",
        Y_WING_ONLY: "yWingOnly",
        YV_666_ONLY: "yv666Only",

        // Ship size.
        HUGE_SHIP_ONLY: "hugeShipOnly",
        LARGE_SHIP_ONLY: "largeShipOnly",
        SMALL_SHIP_ONLY: "smallShipOnly",

        // Team specific.
        IMPERIAL_ONLY: "imperialOnly",
        REBEL_ONLY: "rebelOnly",
        SCUM_ONLY: "scumOnly",

        // Miscellaneous.
        LIMITED: "limited",
        TIE_ONLY: "tieOnly",

        properties:
        {
            "aWingOnly": ShipRestriction(Ship.A_WING),
            "aggressorOnly": ShipRestriction(Ship.AGGRESSOR),
            "bWingOnly": ShipRestriction(Ship.B_WING),
            "firespray31Only": ShipRestriction(Ship.FIRESPRAY_31),
            "hugeShipOnly":
            {
                displayName: "Huge ship only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    var shipBase = Ship.properties[ship].shipBase;
                    return shipBase === ShipBase.HUGE1 || shipBase === ShipBase.HUGE2;
                }
            },
            "hwk290Only": ShipRestriction(Ship.HWK_290),
            "imperialOnly": TeamRestriction(Team.IMPERIAL),
            "lambdaClassShuttleOnly": ShipRestriction(Ship.LAMBDA_CLASS_SHUTTLE),
            "largeShipOnly": ShipSizeRestriction(ShipBase.LARGE),
            "limited":
            {
                displayName: "Limited.",
                passes: function(pilot)
                {
                    // FIXME: implement Limited.passes()
                    return true;
                }
            },
            "m3AInterceptorOnly": ShipRestriction(Ship.M3_A_INTERCEPTOR),
            "pilotSkillAbove1": PilotSkillRestriction(1),
            "pilotSkillAbove2": PilotSkillRestriction(2),
            "pilotSkillAbove3": PilotSkillRestriction(3),
            "pilotSkillAbove4": PilotSkillRestriction(4),
            "rebelOnly": TeamRestriction(Team.REBEL),
            "scumOnly": TeamRestriction(Team.SCUM),
            "smallShipOnly": ShipSizeRestriction(ShipBase.SMALL),
            "starViperOnly": ShipRestriction(Ship.STAR_VIPER),
            "tieAdvancedOnly": ShipRestriction(Ship.TIE_ADVANCED),
            "tieInterceptorOnly": ShipRestriction(Ship.TIE_INTERCEPTOR),
            "tieOnly":
            {
                displayName: "TIE only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return Ship.properties[ship].name.startsWith("TIE");
                }
            },
            "tiePhantomOnly": ShipRestriction(Ship.TIE_PHANTOM),
            "vt49DecimatorOnly": ShipRestriction(Ship.VT_49_DECIMATOR),
            "xWingOnly": ShipRestriction(Ship.X_WING),
            "yt1300Only": ShipRestriction(Ship.YT_1300),
            "yt2400Only": ShipRestriction(Ship.YT_2400),
            "yWingOnly": ShipRestriction(Ship.Y_WING),
            "yv666Only": ShipRestriction(Ship.YV_666),
        },

        passes: function(restrictions, pilot)
        {
            InputValidator.validateNotNull("pilot", pilot);

            var answer = true;

            if (restrictions !== undefined)
            {
                answer = restrictions.reduce(function(previousValue, restriction)
                {
                    if (!UpgradeRestriction.properties[restriction]) { throw "Can't find properties for restriction: "
                            + restriction; }
                    return previousValue && UpgradeRestriction.properties[restriction].passes(pilot);
                }, true);
            }

            return answer;
        },

        values: function()
        {
            return Object.getOwnPropertyNames(UpgradeRestriction.properties);
        },
    }

    if (Object.freeze)
    {
        Object.freeze(UpgradeRestriction);
    };

    return UpgradeRestriction;
});
