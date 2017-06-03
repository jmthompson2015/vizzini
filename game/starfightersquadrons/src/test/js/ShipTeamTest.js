define(["Ship", "ShipTeam", "Team"], function(Ship, ShipTeam, Team)
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
         var key2 = ShipTeam[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(ShipTeam.properties[key2], "Missing value for key = " + key);
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
      var length = 51;
      assert.equal(result.length, length);
      assert.equal(result[0], "firstOrderTieFoFighter");
      assert.equal(result[length - 1], "scumZ95Headhunter");

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
      assert.equal(result.length, 2);
      var i = 0;
      assert.equal(result[i++], Ship.TIE_FO_FIGHTER);
      assert.equal(result[i++], Ship.TIE_SF_FIGHTER);
   });

   QUnit.test("shipValuesByTeam() Imperial", function(assert)
   {
      // Run.
      var result = ShipTeam.shipValuesByTeam(Team.IMPERIAL);

      // Verify.
      assert.ok(result);
      var length = 15;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], Ship.FIRESPRAY_31);
      assert.equal(result[i++], Ship.GOZANTI_CLASS_CRUISER);
      assert.equal(result[i++], Ship.LAMBDA_CLASS_SHUTTLE);
      assert.equal(result[i++], Ship.RAIDER_CLASS_CORVETTE);
      assert.equal(result[i++], Ship.TIE_ADVANCED);
      assert.equal(result[i++], Ship.TIE_ADVANCED_PROTOTYPE);
      assert.equal(result[i++], Ship.TIE_BOMBER);
      assert.equal(result[i++], Ship.TIE_DEFENDER);
      assert.equal(result[i++], Ship.TIE_FIGHTER);
      assert.equal(result[i++], Ship.TIE_INTERCEPTOR);
      assert.equal(result[i++], Ship.TIE_PHANTOM);
      assert.equal(result[i++], Ship.TIE_PUNISHER);
      assert.equal(result[i++], Ship.VT_49_DECIMATOR);
      assert.equal(result[i++], Ship.TIE_FO_FIGHTER);
      assert.equal(result[i++], Ship.TIE_SF_FIGHTER);
   });

   QUnit.test("shipValuesByTeam() Rebel", function(assert)
   {
      // Run.
      var result = ShipTeam.shipValuesByTeam(Team.REBEL);

      // Verify.
      assert.ok(result);
      var length = 17;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], Ship.A_WING);
      assert.equal(result[i++], Ship.ARC_170);
      assert.equal(result[i++], Ship.ATTACK_SHUTTLE);
      assert.equal(result[i++], Ship.B_WING);
      assert.equal(result[i++], Ship.CR90_CORVETTE);
      assert.equal(result[i++], Ship.E_WING);
      assert.equal(result[i++], Ship.GR_75_MEDIUM_TRANSPORT);
      assert.equal(result[i++], Ship.HWK_290);
      assert.equal(result[i++], Ship.K_WING);
      assert.equal(result[i++], Ship.TIE_FIGHTER);
      assert.equal(result[i++], Ship.VCX_100);
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
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_ROYAL_GUARD);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_SABER_SQUADRON);
   });

   QUnit.test("valuesByShipAndTeam() Rebel", function(assert)
   {
      // Run.
      var result = ShipTeam.valuesByShipAndTeam(Ship.A_WING, Team.REBEL);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 2);
      var i = 0;
      assert.equal(result[i++], ShipTeam.REBEL_A_WING);
      assert.equal(result[i++], ShipTeam.REBEL_A_WING_ACE);
   });

   QUnit.test("valuesByTeam() First Order", function(assert)
   {
      // Run.
      var result = ShipTeam.valuesByTeam(Team.FIRST_ORDER);

      // Verify.
      assert.ok(result);
      var length = 19;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.FIRST_ORDER_TIE_FO_FIGHTER);
      assert.equal(result[i++], ShipTeam.FIRST_ORDER_TIE_SF_FIGHTER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_FIRESPRAY_31);
      assert.equal(result[i++], ShipTeam.IMPERIAL_GOZANTI_CLASS_CRUISER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_LAMBDA_CLASS_SHUTTLE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_RAIDER_CLASS_CORVETTE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_ADVANCED);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_ADVANCED_PROTOTYPE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_BOMBER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_BOMBER_VETERAN);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_DEFENDER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_DEFENDER_VETERAN);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_FIGHTER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_ROYAL_GUARD);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_SABER_SQUADRON);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_PHANTOM);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_PUNISHER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_VT_49_DECIMATOR);
   });

   QUnit.test("valuesByTeam() First Order strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = ShipTeam.valuesByTeam(Team.FIRST_ORDER, isStrict);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 2);
      var i = 0;
      assert.equal(result[i++], ShipTeam.FIRST_ORDER_TIE_FO_FIGHTER);
      assert.equal(result[i++], ShipTeam.FIRST_ORDER_TIE_SF_FIGHTER);
   });

   QUnit.test("valuesByTeam() Imperial", function(assert)
   {
      // Run.
      var result = ShipTeam.valuesByTeam(Team.IMPERIAL);

      // Verify.
      assert.ok(result);
      var length = 19;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.IMPERIAL_FIRESPRAY_31);
      assert.equal(result[i++], ShipTeam.IMPERIAL_GOZANTI_CLASS_CRUISER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_LAMBDA_CLASS_SHUTTLE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_RAIDER_CLASS_CORVETTE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_ADVANCED);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_ADVANCED_PROTOTYPE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_BOMBER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_BOMBER_VETERAN);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_DEFENDER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_DEFENDER_VETERAN);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_FIGHTER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_ROYAL_GUARD);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_SABER_SQUADRON);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_PHANTOM);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_PUNISHER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_VT_49_DECIMATOR);
      assert.equal(result[i++], ShipTeam.FIRST_ORDER_TIE_FO_FIGHTER);
      assert.equal(result[i++], ShipTeam.FIRST_ORDER_TIE_SF_FIGHTER);
   });

   QUnit.test("valuesByTeam() Imperial strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = ShipTeam.valuesByTeam(Team.IMPERIAL, isStrict);

      // Verify.
      assert.ok(result);
      var length = 17;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.IMPERIAL_FIRESPRAY_31);
      assert.equal(result[i++], ShipTeam.IMPERIAL_GOZANTI_CLASS_CRUISER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_LAMBDA_CLASS_SHUTTLE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_RAIDER_CLASS_CORVETTE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_ADVANCED);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_ADVANCED_PROTOTYPE);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_BOMBER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_BOMBER_VETERAN);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_DEFENDER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_DEFENDER_VETERAN);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_FIGHTER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_ROYAL_GUARD);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_INTERCEPTOR_SABER_SQUADRON);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_PHANTOM);
      assert.equal(result[i++], ShipTeam.IMPERIAL_TIE_PUNISHER);
      assert.equal(result[i++], ShipTeam.IMPERIAL_VT_49_DECIMATOR);
   });

   QUnit.test("valuesByTeam() Rebel", function(assert)
   {
      // Run.
      var result = ShipTeam.valuesByTeam(Team.REBEL);

      // Verify.
      assert.ok(result);
      var length = 19;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.REBEL_A_WING);
      assert.equal(result[i++], ShipTeam.REBEL_A_WING_ACE);
      assert.equal(result[i++], ShipTeam.REBEL_ARC_170);
      assert.equal(result[i++], ShipTeam.REBEL_ATTACK_SHUTTLE);
      assert.equal(result[i++], ShipTeam.REBEL_B_WING);
      assert.equal(result[i++], ShipTeam.REBEL_B_WING_ACE);
      assert.equal(result[i++], ShipTeam.REBEL_CR90_CORVETTE);
      assert.equal(result[i++], ShipTeam.REBEL_E_WING);
      assert.equal(result[i++], ShipTeam.REBEL_GR_75_MEDIUM_TRANSPORT);
      assert.equal(result[i++], ShipTeam.REBEL_HWK_290);
      assert.equal(result[i++], ShipTeam.REBEL_K_WING);
      assert.equal(result[i++], ShipTeam.REBEL_SABINES_TIE_FIGHTER);
      assert.equal(result[i++], ShipTeam.REBEL_VCX_100);
      assert.equal(result[i++], ShipTeam.REBEL_X_WING);
      assert.equal(result[i++], ShipTeam.REBEL_Y_WING);
      assert.equal(result[i++], ShipTeam.REBEL_YT_1300);
      assert.equal(result[i++], ShipTeam.REBEL_YT_2400);
      assert.equal(result[i++], ShipTeam.REBEL_Z_95_HEADHUNTER);
      assert.equal(result[i++], ShipTeam.RESISTANCE_T_70_X_WING);
   });

   QUnit.test("valuesByTeam() Rebel strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = ShipTeam.valuesByTeam(Team.REBEL, isStrict);

      // Verify.
      assert.ok(result);
      var length = 18;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.REBEL_A_WING);
      assert.equal(result[i++], ShipTeam.REBEL_A_WING_ACE);
      assert.equal(result[i++], ShipTeam.REBEL_ARC_170);
      assert.equal(result[i++], ShipTeam.REBEL_ATTACK_SHUTTLE);
      assert.equal(result[i++], ShipTeam.REBEL_B_WING);
      assert.equal(result[i++], ShipTeam.REBEL_B_WING_ACE);
      assert.equal(result[i++], ShipTeam.REBEL_CR90_CORVETTE);
      assert.equal(result[i++], ShipTeam.REBEL_E_WING);
      assert.equal(result[i++], ShipTeam.REBEL_GR_75_MEDIUM_TRANSPORT);
      assert.equal(result[i++], ShipTeam.REBEL_HWK_290);
      assert.equal(result[i++], ShipTeam.REBEL_K_WING);
      assert.equal(result[i++], ShipTeam.REBEL_SABINES_TIE_FIGHTER);
      assert.equal(result[i++], ShipTeam.REBEL_VCX_100);
      assert.equal(result[i++], ShipTeam.REBEL_X_WING);
      assert.equal(result[i++], ShipTeam.REBEL_Y_WING);
      assert.equal(result[i++], ShipTeam.REBEL_YT_1300);
      assert.equal(result[i++], ShipTeam.REBEL_YT_2400);
      assert.equal(result[i++], ShipTeam.REBEL_Z_95_HEADHUNTER);
   });

   QUnit.test("valuesByTeam() Resistance", function(assert)
   {
      // Run.
      var result = ShipTeam.valuesByTeam(Team.RESISTANCE);

      // Verify.
      assert.ok(result);
      var length = 19;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.RESISTANCE_T_70_X_WING);
      assert.equal(result[i++], ShipTeam.REBEL_A_WING);
      assert.equal(result[i++], ShipTeam.REBEL_A_WING_ACE);
      assert.equal(result[i++], ShipTeam.REBEL_ARC_170);
      assert.equal(result[i++], ShipTeam.REBEL_ATTACK_SHUTTLE);
      assert.equal(result[i++], ShipTeam.REBEL_B_WING);
      assert.equal(result[i++], ShipTeam.REBEL_B_WING_ACE);
      assert.equal(result[i++], ShipTeam.REBEL_CR90_CORVETTE);
      assert.equal(result[i++], ShipTeam.REBEL_E_WING);
      assert.equal(result[i++], ShipTeam.REBEL_GR_75_MEDIUM_TRANSPORT);
      assert.equal(result[i++], ShipTeam.REBEL_HWK_290);
      assert.equal(result[i++], ShipTeam.REBEL_K_WING);
      assert.equal(result[i++], ShipTeam.REBEL_SABINES_TIE_FIGHTER);
      assert.equal(result[i++], ShipTeam.REBEL_VCX_100);
      assert.equal(result[i++], ShipTeam.REBEL_X_WING);
      assert.equal(result[i++], ShipTeam.REBEL_Y_WING);
      assert.equal(result[i++], ShipTeam.REBEL_YT_1300);
      assert.equal(result[i++], ShipTeam.REBEL_YT_2400);
      assert.equal(result[i++], ShipTeam.REBEL_Z_95_HEADHUNTER);
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
      assert.equal(result[i++], ShipTeam.RESISTANCE_T_70_X_WING);
   });

   QUnit.test("valuesByTeam() Scum", function(assert)
   {
      // Run.
      var result = ShipTeam.valuesByTeam(Team.SCUM);

      // Verify.
      assert.ok(result);
      var length = 13;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], ShipTeam.SCUM_AGGRESSOR);
      assert.equal(result[i++], ShipTeam.SCUM_FIRESPRAY_31);
      assert.equal(result[i++], ShipTeam.SCUM_G_1A_STARFIGHTER);
      assert.equal(result[i++], ShipTeam.SCUM_HWK_290);
      assert.equal(result[i++], ShipTeam.SCUM_JUMPMASTER_5000);
      assert.equal(result[i++], ShipTeam.SCUM_KIHRAXZ_FIGHTER);
      assert.equal(result[i++], ShipTeam.SCUM_LANCER_CLASS_PURSUIT_CRAFT);
      assert.equal(result[i++], ShipTeam.SCUM_M3_A_INTERCEPTOR);
      assert.equal(result[i++], ShipTeam.SCUM_PROTECTORATE_STARFIGHTER);
      assert.equal(result[i++], ShipTeam.SCUM_STAR_VIPER);
      assert.equal(result[i++], ShipTeam.SCUM_Y_WING);
      assert.equal(result[i++], ShipTeam.SCUM_YV_666);
      assert.equal(result[i++], ShipTeam.SCUM_Z_95_HEADHUNTER);
   });
});
