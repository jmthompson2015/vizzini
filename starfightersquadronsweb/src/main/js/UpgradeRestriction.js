define([ "Pilot", "Ship", "ShipBase", "Team" ], function(Pilot, Ship, ShipBase, Team)
{
    "use strict";
    function PilotSkillRestriction(pilotSkill)
    {
        InputValidator.validateNotNull("pilotSkill", pilotSkill);

        return (
        {
            displayName: "Pilot Skill above \"" + pilotSkill + "\".",
            passes: function(pilotKey)
            {
                var pilot = Pilot.properties[pilotKey];
                var myPilotSkill = pilot.shipState.pilotSkillValue();
                return myPilotSkill > pilotSkill;
            }
        });
    }

    function ShipSizeRestriction(shipBaseKey)
    {
        InputValidator.validateNotNull("shipBaseKey", shipBaseKey);

        var props = ShipBase.properties[shipBaseKey];

        return (
        {
            displayName: props.name + " only.",
            passes: function(pilotKey)
            {
                var pilot = Pilot.properties[pilotKey];
                var myShipBaseKey = pilot.shipTeam.ship.shipBaseKey;
                return myShipBaseKey === shipBaseKey;
            }
        });
    }

    function ShipRestriction(shipKey)
    {
        InputValidator.validateNotNull("shipKey", shipKey);
        var myShipKey = shipKey;
        var props = Ship.properties[myShipKey];

        if (shipKey.endsWith("fore"))
        {
            myShipKey = shipKey.split(".")[0];
            props = Ship.properties[myShipKey].fore;
        }
        else if (shipKey.endsWith("aft"))
        {
            myShipKey = shipKey.split(".")[0];
            props = Ship.properties[myShipKey].aft;
        }

        var name = props.name;

        if (shipKey === Ship.CR90_CORVETTE || shipKey === Ship.GR_75_MEDIUM_TRANSPORT)
        {
            name = props.name.split(" ")[0];
        }
        else if (shipKey.startsWith(Ship.RAIDER_CLASS_CORVETTE))
        {
            name = name.replace("(", "");
            name = name.replace(")", "");
            name += " section";
        }

        return (
        {
            displayName: name + " only.",
            passes: function(pilotKey)
            {
                var pilot = Pilot.properties[pilotKey];
                var myShipKey = pilot.shipTeam.shipKey;
                return myShipKey === shipKey;
            }
        });
    }

    function TeamRestriction(teamKey)
    {
        InputValidator.validateNotNull("teamKey", teamKey);

        var props = Team.properties[teamKey];

        return (
        {
            displayName: props.name + " only.",
            passes: function(pilotKey)
            {
                var pilot = Pilot.properties[pilotKey];
                var myTeamKey = pilot.shipTeam.teamKey;
                return myTeamKey === teamKey;
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
        CR90_ONLY: "cr90Only",
        FIRESPRAY_31_ONLY: "firespray31Only",
        GOZANTI_CLASS_CRUISER_ONLY: "gozantiClassCruiserOnly",
        GR_75_ONLY: "gr75Only",
        HWK_290_ONLY: "hwk290Only",
        LAMBDA_CLASS_SHUTTLE_ONLY: "lambdaClassShuttleOnly",
        M3_A_INTERCEPTOR_ONLY: "m3AInterceptorOnly",
        RAIDER_CLASS_CORVETTE_AFT_SECTION_ONLY: "raiderClassCorvetteAftSectionOnly",
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
            "aWingOnly": new ShipRestriction(Ship.A_WING),
            "aggressorOnly": new ShipRestriction(Ship.AGGRESSOR),
            "bWingOnly": new ShipRestriction(Ship.B_WING),
            "cr90Only": new ShipRestriction(Ship.CR90_CORVETTE),
            "firespray31Only": new ShipRestriction(Ship.FIRESPRAY_31),
            "gozantiClassCruiserOnly": new ShipRestriction(Ship.GOZANTI_CLASS_CRUISER),
            "gr75Only": new ShipRestriction(Ship.GR_75_MEDIUM_TRANSPORT),
            "hugeShipOnly":
            {
                displayName: "Huge ship only.",
                passes: function(pilotKey)
                {
                    var pilot = Pilot.properties[pilotKey];
                    var shipBaseKey = pilot.shipTeam.ship.shipBaseKey;
                    return ShipBase.isHuge(shipBaseKey);
                }
            },
            "hwk290Only": new ShipRestriction(Ship.HWK_290),
            "imperialOnly": new TeamRestriction(Team.IMPERIAL),
            "lambdaClassShuttleOnly": new ShipRestriction(Ship.LAMBDA_CLASS_SHUTTLE),
            "largeShipOnly": new ShipSizeRestriction(ShipBase.LARGE),
            "limited":
            {
                displayName: "Limited.",
                passes: function(pilotKey)
                {
                    // FIXME: implement Limited.passes()
                    return true;
                }
            },
            "m3AInterceptorOnly": new ShipRestriction(Ship.M3_A_INTERCEPTOR),
            "pilotSkillAbove1": new PilotSkillRestriction(1),
            "pilotSkillAbove2": new PilotSkillRestriction(2),
            "pilotSkillAbove3": new PilotSkillRestriction(3),
            "pilotSkillAbove4": new PilotSkillRestriction(4),
            "raiderClassCorvetteAftSectionOnly": new ShipRestriction("raiderClassCorvette.aft"),
            "rebelOnly": new TeamRestriction(Team.REBEL),
            "scumOnly": new TeamRestriction(Team.SCUM),
            "smallShipOnly": new ShipSizeRestriction(ShipBase.SMALL),
            "starViperOnly": new ShipRestriction(Ship.STAR_VIPER),
            "tieAdvancedOnly": new ShipRestriction(Ship.TIE_ADVANCED),
            "tieInterceptorOnly": new ShipRestriction(Ship.TIE_INTERCEPTOR),
            "tieOnly":
            {
                displayName: "TIE only.",
                passes: function(pilotKey)
                {
                    var pilot = Pilot.properties[pilotKey];
                    var shipKey = pilot.shipTeam.shipKey;
                    return Ship.properties[shipKey].name.startsWith("TIE");
                }
            },
            "tiePhantomOnly": new ShipRestriction(Ship.TIE_PHANTOM),
            "vt49DecimatorOnly": new ShipRestriction(Ship.VT_49_DECIMATOR),
            "xWingOnly":
            {
                displayName: "X-Wing only.",
                passes: function(pilotKey)
                {
                    var pilot = Pilot.properties[pilotKey];
                    var shipKey = pilot.shipTeam.shipKey;
                    return shipKey === Ship.X_WING || shipKey === Ship.T_70_X_WING;
                }
            },
            "yt1300Only": new ShipRestriction(Ship.YT_1300),
            "yt2400Only": new ShipRestriction(Ship.YT_2400),
            "yWingOnly": new ShipRestriction(Ship.Y_WING),
            "yv666Only": new ShipRestriction(Ship.YV_666),
        },

        passes: function(restrictions, pilotKey)
        {
            InputValidator.validateNotNull("pilotKey", pilotKey);

            var answer = true;

            if (restrictions !== undefined)
            {
                answer = restrictions.reduce(function(previousValue, restriction)
                {
                    if (!UpgradeRestriction.properties[restriction]) { throw "Can't find properties for restriction: " +
                            restriction; }
                    return previousValue && UpgradeRestriction.properties[restriction].passes(pilotKey);
                }, true);
            }

            return answer;
        },

        values: function()
        {
            return Object.getOwnPropertyNames(UpgradeRestriction.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(UpgradeRestriction);
    }

    return UpgradeRestriction;
});
