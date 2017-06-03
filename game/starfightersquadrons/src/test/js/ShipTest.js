define(["FiringArc", "Ship", "ShipBase"], function(FiringArc, Ship, ShipBase)
{
   "use strict";
   QUnit.module("Ship");

   QUnit.test("Ship properties Firespray-31", function(assert)
   {
      var ship = Ship.FIRESPRAY_31;
      var properties = Ship.properties[ship];
      assert.equal(properties.name, "Firespray-31");
      assert.equal(properties.description, "A Firespray-31.");
      assert.equal(properties.primaryWeaponValue, 3);
      assert.equal(properties.agilityValue, 2);
      assert.equal(properties.hullValue, 6);
      assert.equal(properties.shieldValue, 4);
      assert.equal(properties.value, ship);
      assert.equal(properties.primaryFiringArcKey, FiringArc.FORWARD);
      assert.equal(properties.auxiliaryFiringArcKey, FiringArc.AFT);
      assert.equal(properties.shipBaseKey, ShipBase.LARGE);
      assert.ok(properties.maneuverKeys);
      assert.equal(properties.maneuverKeys.length, 16);
      assert.ok(properties.shipActionKeys);
      assert.equal(properties.shipActionKeys.length, 3);
   });

   QUnit.test("Ship properties TIE Fighter", function(assert)
   {
      var ship = Ship.TIE_FIGHTER;
      var properties = Ship.properties[ship];
      assert.equal(properties.name, "TIE Fighter");
      assert.equal(properties.description, "A TIE fighter.");
      assert.equal(properties.primaryWeaponValue, 2);
      assert.equal(properties.agilityValue, 3);
      assert.equal(properties.hullValue, 3);
      assert.equal(properties.shieldValue, 0);
      assert.equal(properties.value, ship);
      assert.equal(properties.primaryFiringArcKey, FiringArc.FORWARD);
      assert.equal(properties.shipBaseKey, ShipBase.SMALL);
      assert.ok(properties.maneuverKeys);
      assert.equal(properties.maneuverKeys.length, 16);
      assert.ok(properties.shipActionKeys);
      assert.equal(properties.shipActionKeys.length, 3);
   });

   QUnit.test("Ship properties X-Wing", function(assert)
   {
      var ship = Ship.X_WING;
      var properties = Ship.properties[ship];
      assert.equal(properties.name, "X-Wing");
      assert.equal(properties.description, "An X-Wing.");
      assert.equal(properties.primaryWeaponValue, 3);
      assert.equal(properties.agilityValue, 2);
      assert.equal(properties.hullValue, 3);
      assert.equal(properties.shieldValue, 2);
      assert.equal(properties.value, ship);
      assert.equal(properties.primaryFiringArcKey, FiringArc.FORWARD);
      assert.equal(properties.shipBaseKey, ShipBase.SMALL);
      assert.ok(properties.maneuverKeys);
      assert.equal(properties.maneuverKeys.length, 15);
      assert.ok(properties.shipActionKeys);
      assert.equal(properties.shipActionKeys.length, 2);
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = Ship.values();
      var ownPropertyNames = Object.getOwnPropertyNames(Ship);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = Ship[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(Ship.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return Ship[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("values()", function(assert)
   {
      // Run.
      var result = Ship.values();

      // Verify.
      assert.ok(result);
      var length = 40;
      assert.equal(result.length, length);
      assert.equal(result[0], "aWing");
      assert.equal(result[length - 1], "z95Headhunter");

      var properties = Object.getOwnPropertyNames(Ship);
      var count = properties.length - 1 - // properties
         1; // values
      assert.equal(result.length, count);
   });
});
