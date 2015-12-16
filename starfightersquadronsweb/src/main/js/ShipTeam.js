/*
 * Provides a mapping between Ship and Team.
 */
define([ "Ship", "Team" ], function(Ship, Team)
{
    var ShipTeam =
    {
        // Imperial.
        IMPERIAL_FIRESPRAY_31: "imperialFirespray31",
        IMPERIAL_LAMBDA_CLASS_SHUTTLE: "imperialLambdaClassShuttle",
        IMPERIAL_TIE_ADVANCED: "imperialTieAdvanced",
        IMPERIAL_TIE_BOMBER: "imperialTieBomber",
        IMPERIAL_TIE_DEFENDER: "imperialTieDefender",
        IMPERIAL_TIE_FIGHTER: "imperialTieFighter",
        IMPERIAL_TIE_INTERCEPTOR: "imperialTieInterceptor",
        IMPERIAL_TIE_INTERCEPTOR_ROYAL_GUARD: "imperialTieInterceptorRoyalGuard",
        IMPERIAL_TIE_INTERCEPTOR_SABER_SQUADRON: "imperialTieInterceptorSaberSquadron",
        IMPERIAL_TIE_PHANTOM: "imperialTiePhantom",
        IMPERIAL_VT_49_DECIMATOR: "imperialVt49Decimator",

        // Rebel.
        REBEL_A_WING: "rebelAWing",
        REBEL_A_WING_ACE: "rebelAWingAce",
        REBEL_B_WING: "rebelBWing",
        REBEL_B_WING_ACE: "rebelBWingAce",
        REBEL_E_WING: "rebelEWing",
        REBEL_HWK_290: "rebelHwk290",
        REBEL_X_WING: "rebelXWing",
        REBEL_Y_WING: "rebelYWing",
        REBEL_YT_1300: "rebelYt1300",
        REBEL_YT_2400: "rebelYt2400",
        REBEL_Z_95_HEADHUNTER: "rebelZ95Headhunter",

        // Scum & Villainy.
        SCUM_AGGRESSOR: "scumAggressor",
        SCUM_FIRESPRAY_31: "scumFirespray31",
        SCUM_HWK_290: "scumHwk290",
        SCUM_KIHRAXZ_FIGHTER: "scumKihraxzFighter",
        SCUM_M3_A_INTERCEPTOR: "scumM3AInterceptor",
        SCUM_STAR_VIPER: "scumStarViper",
        SCUM_Y_WING: "scumYWing",
        SCUM_Z_95_HEADHUNTER: "scumZ95Headhunter",

        properties:
        {
            // Imperial.
            "imperialFirespray31":
            {
                name: "Firespray-31 (Imperial)",
                ship: Ship.FIRESPRAY_31,
                team: Team.IMPERIAL,
                image: "Firespray-31.png",
                value: "imperialFirespray31",
            },
            "imperialLambdaClassShuttle":
            {
                name: "Lambda-class Shuttle",
                ship: Ship.LAMBDA_CLASS_SHUTTLE,
                team: Team.IMPERIAL,
                image: "Lambda-class_Shuttle.png",
                value: "imperialLambdaClassShuttle",
            },
            "imperialTieAdvanced":
            {
                name: "TIE Advanced",
                ship: Ship.TIE_ADVANCED,
                team: Team.IMPERIAL,
                image: "TIE_Advanced.png",
                value: "imperialTieAdvanced",
            },
            "imperialTieBomber":
            {
                name: "TIE Bomber",
                ship: Ship.TIE_BOMBER,
                team: Team.IMPERIAL,
                image: "TIE_Bomber.png",
                value: "imperialTieBomber",
            },
            "imperialTieDefender":
            {
                name: "TIE Defender",
                ship: Ship.TIE_DEFENDER,
                team: Team.IMPERIAL,
                image: "TIE_Defender.png",
                value: "imperialTieDefender",
            },
            "imperialTieFighter":
            {
                name: "TIE Fighter",
                ship: Ship.TIE_FIGHTER,
                team: Team.IMPERIAL,
                image: "TIE_Fighter.png",
                value: "imperialTieFighter",
            },
            "imperialTieInterceptor":
            {
                name: "TIE Interceptor",
                ship: Ship.TIE_INTERCEPTOR,
                team: Team.IMPERIAL,
                image: "TIE_Interceptor.png",
                value: "imperialTieInterceptor",
            },
            "imperialTieInterceptorRoyalGuard":
            {
                name: "TIE Interceptor (Royal Guard)",
                ship: Ship.TIE_INTERCEPTOR,
                team: Team.IMPERIAL,
                image: "Royal_Guard_TIE.png",
                value: "imperialTieInterceptorRoyalGuard",
            },
            "imperialTieInterceptorSaberSquadron":
            {
                name: "TIE Interceptor (Saber Squadron)",
                ship: Ship.TIE_INTERCEPTOR,
                team: Team.IMPERIAL,
                image: "Saber_Squadron_TIE.png",
                value: "imperialTieInterceptorSaberSquadron",
            },
            "imperialTiePhantom":
            {
                name: "TIE Phantom",
                ship: Ship.TIE_PHANTOM,
                team: Team.IMPERIAL,
                image: "TIE_Phantom.png",
                value: "imperialTiePhantom",
            },
            "imperialVt49Decimator":
            {
                name: "VT-49 Decimator",
                ship: Ship.VT_49_DECIMATOR,
                team: Team.IMPERIAL,
                image: "VT-49_Decimator.png",
                value: "imperialVt49Decimator",
            },

            // Rebel.
            "rebelAWing":
            {
                name: "A-Wing",
                ship: Ship.A_WING,
                team: Team.REBEL,
                image: "A-Wing.png",
                value: "rebelAWing",
            },
            "rebelAWingAce":
            {
                name: "A-Wing (Ace)",
                ship: Ship.A_WING,
                team: Team.REBEL,
                image: "Rebel_Aces_A-Wing.png",
                value: "rebelAWingAce",
            },
            "rebelBWing":
            {
                name: "B-Wing",
                ship: Ship.B_WING,
                team: Team.REBEL,
                image: "B-Wing.png",
                value: "rebelBWing",
            },
            "rebelBWingAce":
            {
                name: "B-Wing (Ace)",
                ship: Ship.B_WING,
                team: Team.REBEL,
                image: "Rebel_Aces_B-Wing.png",
                value: "rebelBWingAce",
            },
            "rebelEWing":
            {
                name: "E-Wing",
                ship: Ship.E_WING,
                team: Team.REBEL,
                image: "E-Wing.png",
                value: "rebelEWing",
            },
            "rebelHwk290":
            {
                name: "HWK-290 (Rebel)",
                ship: Ship.HWK_290,
                team: Team.REBEL,
                image: "HWK-290.png",
                value: "rebelHwk290",
            },
            "rebelXWing":
            {
                name: "X-Wing",
                ship: Ship.X_WING,
                team: Team.REBEL,
                image: "X-Wing.png",
                value: "rebelXWing",
            },
            "rebelYWing":
            {
                name: "Y-Wing (Rebel)",
                ship: Ship.Y_WING,
                team: Team.REBEL,
                image: "Y-Wing.png",
                value: "rebelYWing",
            },
            "rebelYt1300":
            {
                name: "YT-1300",
                ship: Ship.YT_1300,
                team: Team.REBEL,
                image: "YT-1300.png",
                value: "rebelYt1300",
            },
            "rebelYt2400":
            {
                name: "YT-2400",
                ship: Ship.YT_2400,
                team: Team.REBEL,
                image: "YT-2400.png",
                value: "rebelYt2400",
            },
            "rebelZ95Headhunter":
            {
                name: "Z-95 Headhunter (Rebel)",
                ship: Ship.Z_95_HEADHUNTER,
                team: Team.REBEL,
                image: "Z-95_Headhunter.png",
                value: "rebelZ95Headhunter",
            },

            // Scum & Villainy.
            "scumAggressor":
            {
                name: "Aggressor",
                ship: Ship.AGGRESSOR,
                team: Team.SCUM,
                image: "Scum_Aggressor.png",
                value: "scumAggressor",
            },
            "scumFirespray31":
            {
                name: "Firespray-31 (Scum)",
                ship: Ship.FIRESPRAY_31,
                team: Team.SCUM,
                image: "Scum_Firespray-31.png",
                value: "scumFirespray31",
            },
            "scumHwk290":
            {
                name: "HWK-290 (Scum)",
                ship: Ship.HWK_290,
                team: Team.SCUM,
                image: "Scum_HWK-290.png",
                value: "scumHwk290",
            },
            "scumKihraxzFighter":
            {
                name: "Kihraxz Fighter",
                ship: Ship.KIHRAXZ_FIGHTER,
                team: Team.SCUM,
                image: "Scum_KihraxzFighter.png",
                value: "scumKihraxzFighter",
            },
            "scumM3AInterceptor":
            {
                name: "M3-A Interceptor",
                ship: Ship.M3_A_INTERCEPTOR,
                team: Team.SCUM,
                image: "Scum_M3-A_Interceptor.png",
                value: "scumM3AInterceptor",
            },
            "scumStarViper":
            {
                name: "StarViper",
                ship: Ship.STAR_VIPER,
                team: Team.SCUM,
                image: "Scum_StarViper.png",
                value: "scumStarViper",
            },
            "scumYWing":
            {
                name: "Y-Wing (Scum)",
                ship: Ship.Y_WING,
                team: Team.SCUM,
                image: "Scum_Y-Wing.png",
                value: "scumYWing",
            },
            "scumZ95Headhunter":
            {
                name: "Z-95 Headhunter (Scum)",
                ship: Ship.Z_95_HEADHUNTER,
                team: Team.SCUM,
                image: "Scum_Z-95_Headhunter.png",
                value: "scumZ95Headhunter",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ShipTeam.properties);
        },

        valuesByTeam: function(team)
        {
            InputValidator.validateNotNull("team", team);

            return this.values().filter(function(shipTeam)
            {
                return ShipTeam.properties[shipTeam].team === team;
            });
        },
    }

    if (Object.freeze)
    {
        Object.freeze(ShipTeam);
    };

    return ShipTeam;
});
