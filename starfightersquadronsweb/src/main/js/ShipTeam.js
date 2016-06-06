define([ "Ship", "Team" ], function(Ship, Team)
{
    "use strict";
    var ShipTeam =
    {
        // First Order.
        FIRST_ORDER_TIE_FO_FIGHTER: "firstOrderTieFoFighter",

        // Imperial.
        IMPERIAL_FIRESPRAY_31: "imperialFirespray31",
        IMPERIAL_GOZANTI_CLASS_CRUISER: "imperialGozantiClassCruiser",
        IMPERIAL_LAMBDA_CLASS_SHUTTLE: "imperialLambdaClassShuttle",
        IMPERIAL_RAIDER_CLASS_CORVETTE: "imperialRaiderClassCorvette",
        IMPERIAL_TIE_ADVANCED: "imperialTieAdvanced",
        IMPERIAL_TIE_ADVANCED_PROTOTYPE: "imperialTieAdvancedPrototype",
        IMPERIAL_TIE_BOMBER: "imperialTieBomber",
        IMPERIAL_TIE_DEFENDER: "imperialTieDefender",
        IMPERIAL_TIE_FIGHTER: "imperialTieFighter",
        IMPERIAL_TIE_INTERCEPTOR: "imperialTieInterceptor",
        IMPERIAL_TIE_INTERCEPTOR_ROYAL_GUARD: "imperialTieInterceptorRoyalGuard",
        IMPERIAL_TIE_INTERCEPTOR_SABER_SQUADRON: "imperialTieInterceptorSaberSquadron",
        IMPERIAL_TIE_PHANTOM: "imperialTiePhantom",
        IMPERIAL_TIE_PUNISHER: "imperialTiePunisher",
        IMPERIAL_VT_49_DECIMATOR: "imperialVt49Decimator",

        // Rebel.
        REBEL_A_WING: "rebelAWing",
        REBEL_A_WING_ACE: "rebelAWingAce",
        REBEL_ATTACK_SHUTTLE: "rebelAttackShuttle",
        REBEL_B_WING: "rebelBWing",
        REBEL_B_WING_ACE: "rebelBWingAce",
        REBEL_CR90_CORVETTE: "rebelCr90Corvette",
        REBEL_E_WING: "rebelEWing",
        REBEL_GR_75_MEDIUM_TRANSPORT: "rebelGr75MediumTransport",
        REBEL_HWK_290: "rebelHwk290",
        REBEL_K_WING: "rebelKWing",
        REBEL_VCX_100: "rebelVcx100",
        REBEL_X_WING: "rebelXWing",
        REBEL_Y_WING: "rebelYWing",
        REBEL_YT_1300: "rebelYt1300",
        REBEL_YT_2400: "rebelYt2400",
        REBEL_Z_95_HEADHUNTER: "rebelZ95Headhunter",

        // Resistance.
        RESISTANCE_T_70_X_WING: "resistanceT70XWing",

        // Scum & Villainy.
        SCUM_AGGRESSOR: "scumAggressor",
        SCUM_FIRESPRAY_31: "scumFirespray31",
        SCUM_G_1A_STARFIGHTER: "scumG1AStarfighter",
        SCUM_HWK_290: "scumHwk290",
        SCUM_JUMPMASTER_5000: "scumJumpMaster5000",
        SCUM_KIHRAXZ_FIGHTER: "scumKihraxzFighter",
        SCUM_M3_A_INTERCEPTOR: "scumM3AInterceptor",
        SCUM_STAR_VIPER: "scumStarViper",
        SCUM_Y_WING: "scumYWing",
        SCUM_YV_666: "scumYv666",
        SCUM_Z_95_HEADHUNTER: "scumZ95Headhunter",

        properties:
        {
            // First Order.
            "firstOrderTieFoFighter":
            {
                name: "TIE/fo Fighter",
                shipKey: Ship.TIE_FO_FIGHTER,
                teamKey: Team.FIRST_ORDER,
                image: "FirstOrder_TIE_fo_Fighter.png",
                value: "firstOrderTieFoFighter",
            },

            // Imperial.
            "imperialFirespray31":
            {
                name: "Firespray-31 (Imperial)",
                shipKey: Ship.FIRESPRAY_31,
                teamKey: Team.IMPERIAL,
                image: "Firespray-31.png",
                value: "imperialFirespray31",
            },
            "imperialGozantiClassCruiser":
            {
                name: "Gozanti-class Cruiser",
                shipKey: Ship.GOZANTI_CLASS_CRUISER,
                teamKey: Team.IMPERIAL,
                image: "Imperial_Gozanti-class_Cruiser.png",
                value: "imperialGozantiClassCruiser",
            },
            "imperialLambdaClassShuttle":
            {
                name: "Lambda-class Shuttle",
                shipKey: Ship.LAMBDA_CLASS_SHUTTLE,
                teamKey: Team.IMPERIAL,
                image: "Lambda-class_Shuttle.png",
                value: "imperialLambdaClassShuttle",
            },
            "imperialRaiderClassCorvette":
            {
                name: "Raider-class Corvette",
                shipKey: Ship.RAIDER_CLASS_CORVETTE,
                teamKey: Team.IMPERIAL,
                image: "Imperial_Raider-class_Corvette.png",
                value: "imperialRaiderClassCorvette",
            },
            "imperialTieAdvanced":
            {
                name: "TIE Advanced",
                shipKey: Ship.TIE_ADVANCED,
                teamKey: Team.IMPERIAL,
                image: "TIE_Advanced.png",
                value: "imperialTieAdvanced",
            },
            "imperialTieAdvancedPrototype":
            {
                name: "TIE Advanced Prototype",
                shipKey: Ship.TIE_ADVANCED_PROTOTYPE,
                teamKey: Team.IMPERIAL,
                image: "Imperial_TIE_Advanced_Prototype.png",
                value: "imperialTieAdvancedPrototype",
            },
            "imperialTieBomber":
            {
                name: "TIE Bomber",
                shipKey: Ship.TIE_BOMBER,
                teamKey: Team.IMPERIAL,
                image: "TIE_Bomber.png",
                value: "imperialTieBomber",
            },
            "imperialTieDefender":
            {
                name: "TIE Defender",
                shipKey: Ship.TIE_DEFENDER,
                teamKey: Team.IMPERIAL,
                image: "TIE_Defender.png",
                value: "imperialTieDefender",
            },
            "imperialTieFighter":
            {
                name: "TIE Fighter",
                shipKey: Ship.TIE_FIGHTER,
                teamKey: Team.IMPERIAL,
                image: "TIE_Fighter.png",
                value: "imperialTieFighter",
            },
            "imperialTieInterceptor":
            {
                name: "TIE Interceptor",
                shipKey: Ship.TIE_INTERCEPTOR,
                teamKey: Team.IMPERIAL,
                image: "TIE_Interceptor.png",
                value: "imperialTieInterceptor",
            },
            "imperialTieInterceptorRoyalGuard":
            {
                name: "TIE Interceptor (Royal Guard)",
                shipKey: Ship.TIE_INTERCEPTOR,
                teamKey: Team.IMPERIAL,
                image: "Royal_Guard_TIE.png",
                value: "imperialTieInterceptorRoyalGuard",
            },
            "imperialTieInterceptorSaberSquadron":
            {
                name: "TIE Interceptor (Saber Squadron)",
                shipKey: Ship.TIE_INTERCEPTOR,
                teamKey: Team.IMPERIAL,
                image: "Saber_Squadron_TIE.png",
                value: "imperialTieInterceptorSaberSquadron",
            },
            "imperialTiePhantom":
            {
                name: "TIE Phantom",
                shipKey: Ship.TIE_PHANTOM,
                teamKey: Team.IMPERIAL,
                image: "TIE_Phantom.png",
                value: "imperialTiePhantom",
            },
            "imperialTiePunisher":
            {
                name: "TIE Punisher",
                shipKey: Ship.TIE_PUNISHER,
                teamKey: Team.IMPERIAL,
                image: "Imperial_TIE_Punisher.png",
                value: "imperialTiePunisher",
            },
            "imperialVt49Decimator":
            {
                name: "VT-49 Decimator",
                shipKey: Ship.VT_49_DECIMATOR,
                teamKey: Team.IMPERIAL,
                image: "VT-49_Decimator.png",
                value: "imperialVt49Decimator",
            },

            // Rebel.
            "rebelAWing":
            {
                name: "A-Wing",
                shipKey: Ship.A_WING,
                teamKey: Team.REBEL,
                image: "A-Wing.png",
                value: "rebelAWing",
            },
            "rebelAWingAce":
            {
                name: "A-Wing (Ace)",
                shipKey: Ship.A_WING,
                teamKey: Team.REBEL,
                image: "Rebel_Aces_A-Wing.png",
                value: "rebelAWingAce",
            },
            "rebelAttackShuttle":
            {
                name: "Attack Shuttle",
                shipKey: Ship.ATTACK_SHUTTLE,
                teamKey: Team.REBEL,
                image: "Rebel_Attack_Shuttle.png",
                value: "rebelAttackShuttle",
            },
            "rebelBWing":
            {
                name: "B-Wing",
                shipKey: Ship.B_WING,
                teamKey: Team.REBEL,
                image: "B-Wing.png",
                value: "rebelBWing",
            },
            "rebelBWingAce":
            {
                name: "B-Wing (Ace)",
                shipKey: Ship.B_WING,
                teamKey: Team.REBEL,
                image: "Rebel_Aces_B-Wing.png",
                value: "rebelBWingAce",
            },
            "rebelCr90Corvette":
            {
                name: "CR90 Corvette",
                shipKey: Ship.CR90_CORVETTE,
                teamKey: Team.REBEL,
                image: "Rebel_CR90_Corvette.png",
                value: "rebelCr90Corvette",
            },
            "rebelEWing":
            {
                name: "E-Wing",
                shipKey: Ship.E_WING,
                teamKey: Team.REBEL,
                image: "E-Wing.png",
                value: "rebelEWing",
            },
            "rebelGr75MediumTransport":
            {
                name: "GR-75 Medium Transport",
                shipKey: Ship.GR_75_MEDIUM_TRANSPORT,
                teamKey: Team.REBEL,
                image: "Rebel_GR-75_Medium_Transport.png",
                value: "rebelGr75MediumTransport",
            },
            "rebelHwk290":
            {
                name: "HWK-290 (Rebel)",
                shipKey: Ship.HWK_290,
                teamKey: Team.REBEL,
                image: "HWK-290.png",
                value: "rebelHwk290",
            },
            "rebelKWing":
            {
                name: "K-Wing",
                shipKey: Ship.K_WING,
                teamKey: Team.REBEL,
                image: "Rebel_K-Wing.png",
                value: "rebelKWing",
            },
            "rebelVcx100":
            {
                name: "rebelVcx100",
                shipKey: Ship.VCX_100,
                teamKey: Team.REBEL,
                image: "Rebel_VCX-100.png",
                value: "rebelVcx100",
            },
            "rebelXWing":
            {
                name: "X-Wing",
                shipKey: Ship.X_WING,
                teamKey: Team.REBEL,
                image: "X-Wing.png",
                value: "rebelXWing",
            },
            "rebelYWing":
            {
                name: "Y-Wing (Rebel)",
                shipKey: Ship.Y_WING,
                teamKey: Team.REBEL,
                image: "Y-Wing.png",
                value: "rebelYWing",
            },
            "rebelYt1300":
            {
                name: "YT-1300",
                shipKey: Ship.YT_1300,
                teamKey: Team.REBEL,
                image: "YT-1300.png",
                value: "rebelYt1300",
            },
            "rebelYt2400":
            {
                name: "YT-2400",
                shipKey: Ship.YT_2400,
                teamKey: Team.REBEL,
                image: "YT-2400.png",
                value: "rebelYt2400",
            },
            "rebelZ95Headhunter":
            {
                name: "Z-95 Headhunter (Rebel)",
                shipKey: Ship.Z_95_HEADHUNTER,
                teamKey: Team.REBEL,
                image: "Z-95_Headhunter.png",
                value: "rebelZ95Headhunter",
            },

            // Resistance.
            "resistanceT70XWing":
            {
                name: "T-70 X-Wing",
                shipKey: Ship.T_70_X_WING,
                teamKey: Team.RESISTANCE,
                image: "Resistance_T-70_X-Wing.png",
                value: "resistanceT70XWing",
            },

            // Scum & Villainy.
            "scumAggressor":
            {
                name: "Aggressor",
                shipKey: Ship.AGGRESSOR,
                teamKey: Team.SCUM,
                image: "Scum_Aggressor.png",
                value: "scumAggressor",
            },
            "scumFirespray31":
            {
                name: "Firespray-31 (Scum)",
                shipKey: Ship.FIRESPRAY_31,
                teamKey: Team.SCUM,
                image: "Scum_Firespray-31.png",
                value: "scumFirespray31",
            },
            "scumG1AStarfighter":
            {
                name: "G-1A Starfighter",
                shipKey: Ship.G_1A_STARFIGHTER,
                teamKey: Team.SCUM,
                image: "Scum_G-1A_Starfighter.png",
                value: "scumG1AStarfighter",
            },
            "scumHwk290":
            {
                name: "HWK-290 (Scum)",
                shipKey: Ship.HWK_290,
                teamKey: Team.SCUM,
                image: "Scum_HWK-290.png",
                value: "scumHwk290",
            },
            "scumJumpMaster5000":
            {
                name: "JumpMaster 5000",
                shipKey: Ship.JUMPMASTER_5000,
                teamKey: Team.SCUM,
                image: "Scum_JumpMaster_5000.png",
                value: "scumJumpMaster5000",
            },
            "scumKihraxzFighter":
            {
                name: "Kihraxz Fighter",
                shipKey: Ship.KIHRAXZ_FIGHTER,
                teamKey: Team.SCUM,
                image: "Scum_KihraxzFighter.png",
                value: "scumKihraxzFighter",
            },
            "scumM3AInterceptor":
            {
                name: "M3-A Interceptor",
                shipKey: Ship.M3_A_INTERCEPTOR,
                teamKey: Team.SCUM,
                image: "Scum_M3-A_Interceptor.png",
                value: "scumM3AInterceptor",
            },
            "scumStarViper":
            {
                name: "StarViper",
                shipKey: Ship.STAR_VIPER,
                teamKey: Team.SCUM,
                image: "Scum_StarViper.png",
                value: "scumStarViper",
            },
            "scumYWing":
            {
                name: "Y-Wing (Scum)",
                shipKey: Ship.Y_WING,
                teamKey: Team.SCUM,
                image: "Scum_Y-Wing.png",
                value: "scumYWing",
            },
            "scumYv666":
            {
                name: "YV-666",
                shipKey: Ship.YV_666,
                teamKey: Team.SCUM,
                image: "Scum_YV-666.png",
                value: "scumYv666",
            },
            "scumZ95Headhunter":
            {
                name: "Z-95 Headhunter (Scum)",
                shipKey: Ship.Z_95_HEADHUNTER,
                teamKey: Team.SCUM,
                image: "Scum_Z-95_Headhunter.png",
                value: "scumZ95Headhunter",
            },
        },

        shipValuesByTeam: function(teamKey, isStrict)
        {
            InputValidator.validateNotNull("teamKey", teamKey);

            var shipTeamValues = ShipTeam.valuesByTeam(teamKey, isStrict);
            var answer = [];

            shipTeamValues.forEach(function(shipTeamKey)
            {
                var shipKey = ShipTeam.properties[shipTeamKey].shipKey;

                if (!answer.vizziniContains(shipKey))
                {
                    answer.push(shipKey);
                }
            });

            return answer;
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ShipTeam.properties);
        },

        valuesByShipAndTeam: function(shipKey, teamKey, isStrict)
        {
            InputValidator.validateNotNull("shipKey", shipKey);
            InputValidator.validateNotNull("teamKey", teamKey);

            var answer = this.valuesByTeam(teamKey, isStrict).filter(function(shipTeamKey)
            {
                return ShipTeam.properties[shipTeamKey].shipKey === shipKey;
            });

            return answer;
        },

        valuesByTeam: function(teamKey, isStrict)
        {
            InputValidator.validateNotNull("teamKey", teamKey);

            var answer = this.values().filter(function(shipTeamKey)
            {
                return ShipTeam.properties[shipTeamKey].teamKey === teamKey;
            });

            if (!isStrict)
            {
                var friend = Team.friend(teamKey);

                if (friend)
                {
                    answer.vizziniAddAll(this.valuesByTeam(friend, true));
                }
            }

            return answer;
        },
    };

    ShipTeam.values().forEach(function(shipTeamKey)
    {
        var shipTeam = ShipTeam.properties[shipTeamKey];
        shipTeam.ship = Ship.properties[shipTeam.shipKey];
        shipTeam.team = Team.properties[shipTeam.teamKey];
    });

    if (Object.freeze)
    {
        Object.freeze(ShipTeam);
    }

    return ShipTeam;
});
