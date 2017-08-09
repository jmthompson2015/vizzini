define(["Pilot", "Ship", "ShipTeam", "Team"], function(Pilot, Ship, ShipTeam, Team)
{
   "use strict";
   QUnit.module("Pilot");

   QUnit.test("Pilot properties Academy Pilot", function(assert)
   {
      var pilot = Pilot.ACADEMY_PILOT;
      var properties = Pilot.properties[pilot];
      assert.equal(properties.name, "Academy Pilot");
      assert.equal(properties.shipTeamKey, ShipTeam.IMPERIAL_TIE_FIGHTER);
      assert.equal(properties.pilotSkillValue, 1);
      assert.equal(properties.squadPointCost, 12);
      assert.equal(properties.value, Pilot.ACADEMY_PILOT);
   });

   QUnit.test("Pilot properties Bounty Hunter", function(assert)
   {
      var pilot = Pilot.BOUNTY_HUNTER;
      var properties = Pilot.properties[pilot];
      assert.equal(properties.name, "Bounty Hunter");
      assert.equal(properties.shipTeamKey, ShipTeam.IMPERIAL_FIRESPRAY_31);
      assert.equal(properties.pilotSkillValue, 3);
      assert.equal(properties.squadPointCost, 33);
      assert.equal(properties.value, "bountyHunter");
   });

   QUnit.test("Pilot properties Dutch Vander", function(assert)
   {
      var pilot = Pilot.DUTCH_VANDER;
      var properties = Pilot.properties[pilot];
      assert.equal(properties.name, "\"Dutch\" Vander");
      assert.equal(properties.shipTeamKey, ShipTeam.REBEL_Y_WING);
      assert.equal(properties.pilotSkillValue, 6);
      assert.equal(properties.squadPointCost, 23);
      assert.equal(properties.value, "dutchVander");
   });

   QUnit.test("Pilot properties Rookie Pilot", function(assert)
   {
      var pilot = Pilot.ROOKIE_PILOT;
      var properties = Pilot.properties[pilot];
      assert.equal(properties.name, "Rookie Pilot");
      assert.equal(properties.shipTeamKey, ShipTeam.REBEL_X_WING);
      assert.equal(properties.pilotSkillValue, 2);
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
         var key2 = Pilot[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(Pilot.properties[key2], "Missing value for key = " + key);
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
      var length = 228;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.ACADEMY_PILOT);
      assert.equal(result[length - 1], Pilot.ZUCKUSS);

      var properties = Object.getOwnPropertyNames(Pilot);
      var count = properties.length - 1 - // properties
         1 - // toString
         1 - // values
         1 - // valuesByShipAndTeam
         1 - // valuesByShipTeam
         1; // valuesByTeam
      assert.equal(result.length, count);

      for (var i = 0; i < result.length; i++)
      {
         assert.ok(!result[i].ship, result[i].ship);
      }
   });

   QUnit.test("valuesByShipAndTeam() TIE Fighter", function(assert)
   {
      // Run.
      var result = Pilot.valuesByShipAndTeam(Ship.TIE_FIGHTER, Team.IMPERIAL);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 13);
      assert.equal(result[0], Pilot.ACADEMY_PILOT);
      assert.equal(result[11], Pilot.WINGED_GUNDARK);
   });

   QUnit.test("valuesByShipAndTeam() X-Wing", function(assert)
   {
      // Run.
      var result = Pilot.valuesByShipAndTeam(Ship.X_WING, Team.REBEL);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 10);
      assert.equal(result[0], Pilot.BIGGS_DARKLIGHTER);
      assert.equal(result[9], Pilot.WES_JANSON);
   });

   QUnit.test("valuesByShipAndTeam() Y-Wing Rebel", function(assert)
   {
      // Run.
      var result = Pilot.valuesByShipAndTeam(Ship.Y_WING, Team.REBEL);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 4);
      assert.equal(result[0], Pilot.DUTCH_VANDER);
      assert.equal(result[3], Pilot.HORTON_SALM);
   });

   QUnit.test("valuesByShipAndTeam() Y-Wing Scum", function(assert)
   {
      // Run.
      var result = Pilot.valuesByShipAndTeam(Ship.Y_WING, Team.SCUM);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 4);
      assert.equal(result[0], Pilot.DREA_RENTHAL);
      assert.equal(result[3], Pilot.SYNDICATE_THUG);
   });

   QUnit.test("valuesByShipTeam() TIE Fighter", function(assert)
   {
      // Run.
      var result = Pilot.valuesByShipTeam(ShipTeam.IMPERIAL_TIE_FIGHTER);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 13);
      assert.equal(result[0], Pilot.ACADEMY_PILOT);
      assert.equal(result[12], Pilot.YOUNGSTER);
   });

   QUnit.test("valuesByShipTeam() X-Wing", function(assert)
   {
      // Run.
      var result = Pilot.valuesByShipTeam(ShipTeam.REBEL_X_WING);

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 10);
      assert.equal(result[0], Pilot.BIGGS_DARKLIGHTER);
      assert.equal(result[9], Pilot.WES_JANSON);
   });

   QUnit.test("valuesByTeam() First Order", function(assert)
   {
      // Run.
      var result = Pilot.valuesByTeam(Team.FIRST_ORDER);

      // Verify.
      assert.ok(result);
      var length = 85;
      assert.equal(result.length, length);
      assert.equal(result[length - 1], Pilot.ZERTIK_STROM);
   });

   QUnit.test("valuesByTeam() First Order strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = Pilot.valuesByTeam(Team.FIRST_ORDER, isStrict);

      // Verify.
      assert.ok(result);
      var length = 13;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.BACKDRAFT);
      assert.equal(result[length - 1], Pilot.ZETA_SQUADRON_PILOT);
   });

   QUnit.test("valuesByTeam() Imperial", function(assert)
   {
      // Run.
      var result = Pilot.valuesByTeam(Team.IMPERIAL);

      // Verify.
      assert.ok(result);
      var length = 85;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.ACADEMY_PILOT);
      assert.equal(result[length - 1], Pilot.ZETA_SQUADRON_PILOT);
   });

   QUnit.test("valuesByTeam() Imperial strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = Pilot.valuesByTeam(Team.IMPERIAL, isStrict);

      // Verify.
      assert.ok(result);
      var length = 72;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.ACADEMY_PILOT);
      assert.equal(result[length - 1], Pilot.ZERTIK_STROM);
   });

   QUnit.test("valuesByTeam() Rebel", function(assert)
   {
      // Run.
      var result = Pilot.valuesByTeam(Team.REBEL);

      // Verify.
      assert.ok(result);
      var length = 83;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.AIREN_CRACKEN);
      assert.equal(result[length - 1], Pilot.SNAP_WEXLEY);
   });

   QUnit.test("valuesByTeam() Rebel strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = Pilot.valuesByTeam(Team.REBEL, isStrict);

      // Verify.
      assert.ok(result);
      var length = 69;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.AIREN_CRACKEN);
      assert.equal(result[length - 1], Pilot.ZEB_ORRELIOS);
   });

   QUnit.test("valuesByTeam() Resistance", function(assert)
   {
      // Run.
      var result = Pilot.valuesByTeam(Team.RESISTANCE);

      // Verify.
      assert.ok(result);
      var length = 83;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.BLUE_ACE);
      assert.equal(result[length - 1], Pilot.ZEB_ORRELIOS);
   });

   QUnit.test("valuesByTeam() Resistance strict", function(assert)
   {
      // Setup.
      var isStrict = true;

      // Run.
      var result = Pilot.valuesByTeam(Team.RESISTANCE, isStrict);

      // Verify.
      assert.ok(result);
      var length = 14;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.BLUE_ACE);
      assert.equal(result[length - 1], Pilot.SNAP_WEXLEY);
   });

   QUnit.test("valuesByTeam() Scum", function(assert)
   {
      // Run.
      var result = Pilot.valuesByTeam(Team.SCUM);

      // Verify.
      assert.ok(result);
      var length = 60;
      assert.equal(result.length, length);
      assert.equal(result[0], Pilot.ASAJJ_VENTRESS);
      assert.equal(result[length - 1], Pilot.ZUCKUSS);
   });
});
