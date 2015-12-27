/*
 * Provides an enumeration of upgrade restrictions.
 */
define([ "Pilot", "Ship", "ShipBase", "ShipTeam", "Team" ], function(Pilot, Ship, ShipBase, ShipTeam, Team)
{
    var UpgradeRestriction =
    {
        A_WING_ONLY: "aWingOnly",
        AGGRESSOR_ONLY: "aggressorOnly",
        B_WING_ONLY: "bWingOnly",
        FIRESPRAY_31_ONLY: "firespray31Only",
        HUGE_SHIP_ONLY: "hugeShipOnly",
        HWK_290_ONLY: "hwk290Only",
        IMPERIAL_ONLY: "imperialOnly",
        LARGE_SHIP_ONLY: "largeShipOnly",
        LAMBDA_CLASS_SHUTTLE_ONLY: "lambdaClassShuttleOnly",
        LIMITED: "limited",
        M3_A_INTERCEPTOR_ONLY: "m3AInterceptorOnly",
        REBEL_ONLY: "rebelOnly",
        SCUM_ONLY: "scumOnly",
        SMALL_SHIP_ONLY: "smallShipOnly",
        STAR_VIPER_ONLY: "starViperOnly",
        TIE_ADVANCED_ONLY: "tieAdvancedOnly",
        TIE_INTERCEPTOR_ONLY: "tieInterceptorOnly",
        TIE_ONLY: "tieOnly",
        TIE_PHANTOM_ONLY: "tiePhantomOnly",
        VT_49_DECIMATOR_ONLY: "vt49DecimatorOnly",
        YT_1300_ONLY: "yt1300Only",
        YT_2400_ONLY: "yt2400Only",
        Y_WING_ONLY: "yWingOnly",
        YV_666_ONLY: "yv666Only",

        properties:
        {
            "aWingOnly":
            {
                displayName: "A-Wing only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.A_WING;
                }
            },
            "aggressorOnly":
            {
                displayName: "Aggressor only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.AGGRESSOR;
                }
            },
            "bWingOnly":
            {
                displayName: "B-Wing only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.B_WING;
                }
            },
            "firespray31Only":
            {
                displayName: "Firespray-31 only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.FIRESPRAY_31;
                }
            },
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
            "hwk290Only":
            {
                displayName: "HWK-290 only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.HWK_290;
                }
            },
            "imperialOnly":
            {
                displayName: "Imperial only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var team = ShipTeam.properties[shipTeam].team;
                    return team === Team.IMPERIAL;
                }
            },
            "lambdaClassShuttleOnly":
            {
                displayName: "Lambda-class Shuttle only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.LAMBDA_CLASS_SHUTTLE;
                }
            },
            "largeShipOnly":
            {
                displayName: "Large ship only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    var shipBase = Ship.properties[ship].shipBase;
                    return shipBase === ShipBase.LARGE;
                }
            },
            "limited":
            {
                displayName: "Limited.",
                passes: function(pilot)
                {
                    // FIXME: implement Limited.passes()
                    return true;
                }
            },
            "m3AInterceptorOnly":
            {
                displayName: "M3-A Interceptor only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.M3_A_INTERCEPTOR;
                }
            },
            "rebelOnly":
            {
                displayName: "Rebel only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var team = ShipTeam.properties[shipTeam].team;
                    return team === Team.REBEL;
                }
            },
            "scumOnly":
            {
                displayName: "Scum only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var team = ShipTeam.properties[shipTeam].team;
                    return team === Team.SCUM;
                }
            },
            "smallShipOnly":
            {
                displayName: "Small ship only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    var shipBase = Ship.properties[ship].shipBase;
                    return shipBase === ShipBase.STANDARD;
                }
            },
            "starViperOnly":
            {
                displayName: "StarViper only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.STAR_VIPER;
                }
            },
            "tieAdvancedOnly":
            {
                displayName: "TIE Advanced only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.TIE_ADVANCED;
                }
            },
            "tieInterceptorOnly":
            {
                displayName: "TIE Interceptor only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.TIE_INTERCEPTOR;
                }
            },
            "tieOnly":
            {
                displayName: "TIE only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return Ship.properties[ship].isTie;
                }
            },
            "tiePhantomOnly":
            {
                displayName: "TIE Phantom only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.TIE_PHANTOM;
                }
            },
            "vt49DecimatorOnly":
            {
                displayName: "VT-49 Decimator only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.VT_49_DECIMATOR;
                }
            },
            "yt1300Only":
            {
                displayName: "YT-1300 only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.YT_1300;
                }
            },
            "yt2400Only":
            {
                displayName: "YT-2400 only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.YT_2400;
                }
            },
            "yWingOnly":
            {
                displayName: "Y-Wing only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.Y_WING;
                }
            },
            "yv666Only":
            {
                displayName: "YV-666 only.",
                passes: function(pilot)
                {
                    var shipTeam = Pilot.properties[pilot].shipTeam;
                    var ship = ShipTeam.properties[shipTeam].ship;
                    return ship === Ship.YV_666;
                }
            },
        },

        passes: function(restrictions, pilot)
        {
            InputValidator.validateNotNull("pilot", pilot);

            var answer = true;

            if (restrictions !== undefined)
            {
                answer = restrictions.reduce(function(previousValue, restriction)
                {
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
