define(["Ship", "Team"], function(Ship, Team)
{
   "use strict";
   var ShipTeam = {
      // First Order.
      FIRST_ORDER_TIE_FO_FIGHTER: "firstOrderTieFoFighter",
      FIRST_ORDER_TIE_SF_FIGHTER: "firstOrderTieSfFighter",

      // Imperial.
      IMPERIAL_FIRESPRAY_31: "imperialFirespray31",
      IMPERIAL_GOZANTI_CLASS_CRUISER: "imperialGozantiClassCruiser",
      IMPERIAL_LAMBDA_CLASS_SHUTTLE: "imperialLambdaClassShuttle",
      IMPERIAL_RAIDER_CLASS_CORVETTE: "imperialRaiderClassCorvette",
      IMPERIAL_TIE_ADVANCED: "imperialTieAdvanced",
      IMPERIAL_TIE_ADVANCED_PROTOTYPE: "imperialTieAdvancedPrototype",
      IMPERIAL_TIE_BOMBER: "imperialTieBomber",
      IMPERIAL_TIE_BOMBER_VETERAN: "imperialTieBomberVeteran",
      IMPERIAL_TIE_DEFENDER: "imperialTieDefender",
      IMPERIAL_TIE_DEFENDER_VETERAN: "imperialTieDefenderVeteran",
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
      REBEL_ARC_170: "rebelArc170",
      REBEL_ATTACK_SHUTTLE: "rebelAttackShuttle",
      REBEL_B_WING: "rebelBWing",
      REBEL_B_WING_ACE: "rebelBWingAce",
      REBEL_CR90_CORVETTE: "rebelCr90Corvette",
      REBEL_E_WING: "rebelEWing",
      REBEL_GR_75_MEDIUM_TRANSPORT: "rebelGr75MediumTransport",
      REBEL_HWK_290: "rebelHwk290",
      REBEL_K_WING: "rebelKWing",
      REBEL_SABINES_TIE_FIGHTER: "rebelSabinesTieFighter",
      REBEL_VCX_100: "rebelVcx100",
      REBEL_X_WING: "rebelXWing",
      REBEL_Y_WING: "rebelYWing",
      REBEL_YT_1300: "rebelYt1300",
      REBEL_YT_2400: "rebelYt2400",
      REBEL_Z_95_HEADHUNTER: "rebelZ95Headhunter",

      // Resistance.
      RESISTANCE_T_70_X_WING: "resistanceT70XWing",
      RESISTANCE_T_70_X_WING_V2: "resistanceT70XWingV2",
      RESISTANCE_YT_1300: "resistanceYt1300",

      // Scum & Villainy.
      SCUM_AGGRESSOR: "scumAggressor",
      SCUM_C_ROC_CRUISER: "scumCRocCruiser",
      SCUM_FIRESPRAY_31: "scumFirespray31",
      SCUM_G_1A_STARFIGHTER: "scumG1AStarfighter",
      SCUM_HWK_290: "scumHwk290",
      SCUM_JUMPMASTER_5000: "scumJumpMaster5000",
      SCUM_KIHRAXZ_FIGHTER: "scumKihraxzFighter",
      SCUM_LANCER_CLASS_PURSUIT_CRAFT: "scumLancerClassPursuitCraft",
      SCUM_M3_A_INTERCEPTOR: "scumM3AInterceptor",
      SCUM_M3_A_INTERCEPTOR_V2: "scumM3AInterceptorV2",
      SCUM_PROTECTORATE_STARFIGHTER: "scumProtectorateStarfighter",
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
            wave: "8",
            value: "firstOrderTieFoFighter",
         },
         "firstOrderTieSfFighter":
         {
            name: "TIE/sf Fighter",
            shipKey: Ship.TIE_SF_FIGHTER,
            teamKey: Team.FIRST_ORDER,
            image: "FirstOrder_TIE_sf_Fighter.png",
            wave: "9",
            value: "firstOrderTieSfFighter",
         },

         // Imperial.
         "imperialFirespray31":
         {
            name: "Firespray-31 (Imperial)",
            shipKey: Ship.FIRESPRAY_31,
            teamKey: Team.IMPERIAL,
            image: "Firespray-31.png",
            wave: "2",
            value: "imperialFirespray31",
         },
         "imperialGozantiClassCruiser":
         {
            name: "Gozanti-class Cruiser",
            shipKey: Ship.GOZANTI_CLASS_CRUISER,
            teamKey: Team.IMPERIAL,
            image: "Imperial_Gozanti-class_Cruiser.png",
            wave: "Huge",
            value: "imperialGozantiClassCruiser",
         },
         "imperialLambdaClassShuttle":
         {
            name: "Lambda-class Shuttle",
            shipKey: Ship.LAMBDA_CLASS_SHUTTLE,
            teamKey: Team.IMPERIAL,
            image: "Lambda-class_Shuttle.png",
            wave: "3",
            value: "imperialLambdaClassShuttle",
         },
         "imperialRaiderClassCorvette":
         {
            name: "Raider-class Corvette",
            shipKey: Ship.RAIDER_CLASS_CORVETTE,
            teamKey: Team.IMPERIAL,
            image: "Imperial_Raider-class_Corvette.png",
            wave: "Huge",
            value: "imperialRaiderClassCorvette",
         },
         "imperialTieAdvanced":
         {
            name: "TIE Advanced",
            shipKey: Ship.TIE_ADVANCED,
            teamKey: Team.IMPERIAL,
            image: "TIE_Advanced.png",
            wave: "1",
            value: "imperialTieAdvanced",
         },
         "imperialTieAdvancedPrototype":
         {
            name: "TIE Advanced Prototype",
            shipKey: Ship.TIE_ADVANCED_PROTOTYPE,
            teamKey: Team.IMPERIAL,
            image: "Imperial_TIE_Advanced_Prototype.png",
            wave: "8",
            value: "imperialTieAdvancedPrototype",
         },
         "imperialTieBomber":
         {
            name: "TIE Bomber",
            shipKey: Ship.TIE_BOMBER,
            teamKey: Team.IMPERIAL,
            image: "TIE_Bomber.png",
            wave: "3",
            value: "imperialTieBomber",
         },
         "imperialTieBomberVeteran":
         {
            name: "TIE Bomber (Gamma Squadron)",
            shipKey: Ship.TIE_BOMBER,
            teamKey: Team.IMPERIAL,
            image: "Imperial_Veterans_TIE_Bomber.png",
            wave: "Aces",
            value: "imperialTieBomberVeteran",
         },
         "imperialTieDefender":
         {
            name: "TIE Defender",
            shipKey: Ship.TIE_DEFENDER,
            teamKey: Team.IMPERIAL,
            image: "TIE_Defender.png",
            wave: "4",
            value: "imperialTieDefender",
         },
         "imperialTieDefenderVeteran":
         {
            name: "TIE Defender (Glaive Squadron)",
            shipKey: Ship.TIE_DEFENDER,
            teamKey: Team.IMPERIAL,
            image: "Imperial_Veterans_TIE_Defender.png",
            wave: "Aces",
            value: "imperialTieDefenderVeteran",
         },
         "imperialTieFighter":
         {
            name: "TIE Fighter",
            shipKey: Ship.TIE_FIGHTER,
            teamKey: Team.IMPERIAL,
            image: "TIE_Fighter.png",
            wave: "1",
            value: "imperialTieFighter",
         },
         "imperialTieInterceptor":
         {
            name: "TIE Interceptor",
            shipKey: Ship.TIE_INTERCEPTOR,
            teamKey: Team.IMPERIAL,
            image: "TIE_Interceptor.png",
            wave: "2",
            value: "imperialTieInterceptor",
         },
         "imperialTieInterceptorRoyalGuard":
         {
            name: "TIE Interceptor (Royal Guard)",
            shipKey: Ship.TIE_INTERCEPTOR,
            teamKey: Team.IMPERIAL,
            image: "Royal_Guard_TIE.png",
            wave: "Aces",
            value: "imperialTieInterceptorRoyalGuard",
         },
         "imperialTieInterceptorSaberSquadron":
         {
            name: "TIE Interceptor (Saber Squadron)",
            shipKey: Ship.TIE_INTERCEPTOR,
            teamKey: Team.IMPERIAL,
            image: "Saber_Squadron_TIE.png",
            wave: "Aces",
            value: "imperialTieInterceptorSaberSquadron",
         },
         "imperialTiePhantom":
         {
            name: "TIE Phantom",
            shipKey: Ship.TIE_PHANTOM,
            teamKey: Team.IMPERIAL,
            image: "TIE_Phantom.png",
            wave: "4",
            value: "imperialTiePhantom",
         },
         "imperialTiePunisher":
         {
            name: "TIE Punisher",
            shipKey: Ship.TIE_PUNISHER,
            teamKey: Team.IMPERIAL,
            image: "Imperial_TIE_Punisher.png",
            wave: "7",
            value: "imperialTiePunisher",
         },
         "imperialVt49Decimator":
         {
            name: "VT-49 Decimator",
            shipKey: Ship.VT_49_DECIMATOR,
            teamKey: Team.IMPERIAL,
            image: "VT-49_Decimator.png",
            wave: "5",
            value: "imperialVt49Decimator",
         },

         // Rebel.
         "rebelAWing":
         {
            name: "A-Wing",
            shipKey: Ship.A_WING,
            teamKey: Team.REBEL,
            image: "A-Wing.png",
            wave: "2",
            value: "rebelAWing",
         },
         "rebelAWingAce":
         {
            name: "A-Wing (Prototype)",
            shipKey: Ship.A_WING,
            teamKey: Team.REBEL,
            image: "Rebel_Aces_A-Wing.png",
            wave: "Aces",
            value: "rebelAWingAce",
         },
         "rebelArc170":
         {
            name: "ARC-170",
            shipKey: Ship.ARC_170,
            teamKey: Team.REBEL,
            image: "Rebel_ARC-170.png",
            wave: "9",
            value: "rebelArc170",
         },
         "rebelAttackShuttle":
         {
            name: "Attack Shuttle",
            shipKey: Ship.ATTACK_SHUTTLE,
            teamKey: Team.REBEL,
            image: "Rebel_Attack_Shuttle.png",
            wave: "8",
            value: "rebelAttackShuttle",
         },
         "rebelBWing":
         {
            name: "B-Wing",
            shipKey: Ship.B_WING,
            teamKey: Team.REBEL,
            image: "B-Wing.png",
            wave: "3",
            value: "rebelBWing",
         },
         "rebelBWingAce":
         {
            name: "B-Wing (Dagger Squadron)",
            shipKey: Ship.B_WING,
            teamKey: Team.REBEL,
            image: "Rebel_Aces_B-Wing.png",
            wave: "Aces",
            value: "rebelBWingAce",
         },
         "rebelCr90Corvette":
         {
            name: "CR90 Corvette",
            shipKey: Ship.CR90_CORVETTE,
            teamKey: Team.REBEL,
            image: "Rebel_CR90_Corvette.png",
            wave: "Huge",
            value: "rebelCr90Corvette",
         },
         "rebelEWing":
         {
            name: "E-Wing",
            shipKey: Ship.E_WING,
            teamKey: Team.REBEL,
            image: "E-Wing.png",
            wave: "4",
            value: "rebelEWing",
         },
         "rebelGr75MediumTransport":
         {
            name: "GR-75 Medium Transport",
            shipKey: Ship.GR_75_MEDIUM_TRANSPORT,
            teamKey: Team.REBEL,
            image: "Rebel_GR-75_Medium_Transport.png",
            wave: "Huge",
            value: "rebelGr75MediumTransport",
         },
         "rebelHwk290":
         {
            name: "HWK-290 (Rebel)",
            shipKey: Ship.HWK_290,
            teamKey: Team.REBEL,
            image: "HWK-290.png",
            wave: "3",
            value: "rebelHwk290",
         },
         "rebelKWing":
         {
            name: "K-Wing",
            shipKey: Ship.K_WING,
            teamKey: Team.REBEL,
            image: "Rebel_K-Wing.png",
            wave: "7",
            value: "rebelKWing",
         },
         "rebelSabinesTieFighter":
         {
            name: "Sabine's TIE Fighter",
            shipKey: Ship.TIE_FIGHTER,
            teamKey: Team.REBEL,
            image: "Rebel_Sabines_TIE_Fighter.png",
            wave: "10",
            value: "rebelSabinesTieFighter",
         },
         "rebelVcx100":
         {
            name: "rebelVcx100",
            shipKey: Ship.VCX_100,
            teamKey: Team.REBEL,
            image: "Rebel_VCX-100.png",
            wave: "8",
            value: "rebelVcx100",
         },
         "rebelXWing":
         {
            name: "X-Wing",
            shipKey: Ship.X_WING,
            teamKey: Team.REBEL,
            image: "X-Wing.png",
            wave: "1",
            value: "rebelXWing",
         },
         "rebelYWing":
         {
            name: "Y-Wing (Rebel)",
            shipKey: Ship.Y_WING,
            teamKey: Team.REBEL,
            image: "Y-Wing.png",
            wave: "1",
            value: "rebelYWing",
         },
         "rebelYt1300":
         {
            name: "YT-1300",
            shipKey: Ship.YT_1300,
            teamKey: Team.REBEL,
            image: "YT-1300.png",
            wave: "2",
            value: "rebelYt1300",
         },
         "rebelYt2400":
         {
            name: "YT-2400",
            shipKey: Ship.YT_2400,
            teamKey: Team.REBEL,
            image: "YT-2400.png",
            wave: "5",
            value: "rebelYt2400",
         },
         "rebelZ95Headhunter":
         {
            name: "Z-95 Headhunter (Rebel)",
            shipKey: Ship.Z_95_HEADHUNTER,
            teamKey: Team.REBEL,
            image: "Z-95_Headhunter.png",
            wave: "4",
            value: "rebelZ95Headhunter",
         },

         // Resistance.
         "resistanceT70XWing":
         {
            name: "T-70 X-Wing",
            shipKey: Ship.T_70_X_WING,
            teamKey: Team.RESISTANCE,
            image: "Resistance_T-70_X-Wing.png",
            wave: "8",
            value: "resistanceT70XWing",
         },
         "resistanceT70XWingV2":
         {
            name: "T-70 X-Wing v2",
            shipKey: Ship.T_70_X_WING,
            teamKey: Team.RESISTANCE,
            image: "Resistance_T-70_X-Wing_v2.png",
            wave: "Aces",
            value: "resistanceT70XWingV2",
         },
         "resistanceYt1300":
         {
            name: "YT-1300",
            shipKey: Ship.YT_1300,
            teamKey: Team.RESISTANCE,
            image: "Resistance_YT-1300.png",
            wave: "Aces",
            value: "resistanceYt1300",
         },

         // Scum & Villainy.
         "scumAggressor":
         {
            name: "Aggressor",
            shipKey: Ship.AGGRESSOR,
            teamKey: Team.SCUM,
            image: "Scum_Aggressor.png",
            wave: "6",
            value: "scumAggressor",
         },
         "scumCRocCruiser":
         {
            name: "C-ROC Cruiser",
            shipKey: Ship.C_ROC_CRUISER,
            teamKey: Team.SCUM,
            image: "Scum_C-ROC_Cruiser.png",
            wave: "Huge",
            value: "scumCRocCruiser",
         },
         "scumFirespray31":
         {
            name: "Firespray-31 (Scum)",
            shipKey: Ship.FIRESPRAY_31,
            teamKey: Team.SCUM,
            image: "Firespray-31.png",
            wave: "6",
            value: "scumFirespray31",
         },
         "scumG1AStarfighter":
         {
            name: "G-1A Starfighter",
            shipKey: Ship.G_1A_STARFIGHTER,
            teamKey: Team.SCUM,
            image: "Scum_G-1A_Starfighter.png",
            wave: "8",
            value: "scumG1AStarfighter",
         },
         "scumHwk290":
         {
            name: "HWK-290 (Scum)",
            shipKey: Ship.HWK_290,
            teamKey: Team.SCUM,
            image: "HWK-290.png",
            wave: "6",
            value: "scumHwk290",
         },
         "scumJumpMaster5000":
         {
            name: "JumpMaster 5000",
            shipKey: Ship.JUMPMASTER_5000,
            teamKey: Team.SCUM,
            image: "Scum_JumpMaster_5000.png",
            wave: "8",
            value: "scumJumpMaster5000",
         },
         "scumKihraxzFighter":
         {
            name: "Kihraxz Fighter",
            shipKey: Ship.KIHRAXZ_FIGHTER,
            teamKey: Team.SCUM,
            image: "Scum_KihraxzFighter.png",
            wave: "7",
            value: "scumKihraxzFighter",
         },
         "scumLancerClassPursuitCraft":
         {
            name: "Lancer-class Pursuit Craft",
            shipKey: Ship.LANCER_CLASS_PURSUIT_CRAFT,
            teamKey: Team.SCUM,
            image: "Scum_Lancer-class_Pursuit_Craft.png",
            wave: "9",
            value: "scumLancerClassPursuitCraft",
         },
         "scumM3AInterceptor":
         {
            name: "M3-A Interceptor",
            shipKey: Ship.M3_A_INTERCEPTOR,
            teamKey: Team.SCUM,
            image: "Scum_M3-A_Interceptor.png",
            wave: "6",
            value: "scumM3AInterceptor",
         },
         "scumM3AInterceptorV2":
         {
            name: "M3-A Interceptor v2",
            shipKey: Ship.M3_A_INTERCEPTOR,
            teamKey: Team.SCUM,
            image: "Scum_M3-A_Interceptor_v2.png",
            wave: "Huge",
            value: "scumM3AInterceptorV2",
         },
         "scumProtectorateStarfighter":
         {
            name: "Protectorate Starfighter",
            shipKey: Ship.PROTECTORATE_STARFIGHTER,
            teamKey: Team.SCUM,
            image: "Scum_Protectorate_Starfighter.png",
            wave: "9",
            value: "scumProtectorateStarfighter",
         },
         "scumStarViper":
         {
            name: "StarViper",
            shipKey: Ship.STAR_VIPER,
            teamKey: Team.SCUM,
            image: "Scum_StarViper.png",
            wave: "6",
            value: "scumStarViper",
         },
         "scumYWing":
         {
            name: "Y-Wing (Scum)",
            shipKey: Ship.Y_WING,
            teamKey: Team.SCUM,
            image: "Scum_Y-Wing.png",
            wave: "6",
            value: "scumYWing",
         },
         "scumYv666":
         {
            name: "YV-666",
            shipKey: Ship.YV_666,
            teamKey: Team.SCUM,
            image: "Scum_YV-666.png",
            wave: "7",
            value: "scumYv666",
         },
         "scumZ95Headhunter":
         {
            name: "Z-95 Headhunter (Scum)",
            shipKey: Ship.Z_95_HEADHUNTER,
            teamKey: Team.SCUM,
            image: "Scum_Z-95_Headhunter.png",
            wave: "6",
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

            if (!answer.includes(shipKey))
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
