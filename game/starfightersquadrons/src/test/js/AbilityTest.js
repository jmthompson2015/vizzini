define(["Ability", "DamageCard", "Event", "Pilot", "UpgradeCard", "process/DamageAbility0", "process/PilotAbility0", "process/UpgradeAbility0"],
   function(Ability, DamageCard, Event, Pilot, UpgradeCard, DamageAbility0, PilotAbility0, UpgradeAbility0)
   {
      "use strict";
      QUnit.module("Ability");

      QUnit.test("Ability properties", function(assert)
      {
         // Setup.
         var source = UpgradeCard;
         var sourceKey = UpgradeCard.RECON_SPECIALIST;
         var type = UpgradeAbility0;
         var abilityKey = Event.SHIP_ACTION_PERFORMED;
         var ability = new Ability(source, sourceKey, type, abilityKey);

         // Run / Verify.
         assert.equal(ability.source(), source);
         assert.equal(ability.sourceKey(), sourceKey);
         assert.equal(ability.type(), type);
         assert.equal(ability.abilityKey(), abilityKey);

         assert.ok(ability.sourceObject());
         assert.ok(ability.ability());
         assert.ok(ability.condition());
         assert.ok(ability.consequent());
      });

      QUnit.test("isDamage()", function(assert)
      {
         // Setup.
         var ability = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility0, Event.SHIP_ACTION_PERFORMED);

         // Run / Verify.
         assert.ok(ability.isDamage());
         assert.ok(!ability.isPilot());
         assert.ok(!ability.isUpgrade());
      });

      QUnit.test("isPilot()", function(assert)
      {
         // Setup.
         var ability = new Ability(Pilot, Pilot.DASH_RENDAR, PilotAbility0, Event.SHIP_ACTION_PERFORMED);

         // Run / Verify.
         assert.ok(!ability.isDamage());
         assert.ok(ability.isPilot());
         assert.ok(!ability.isUpgrade());
      });

      QUnit.test("isUpgrade()", function(assert)
      {
         // Setup.
         var ability = new Ability(UpgradeCard, UpgradeCard.RECON_SPECIALIST, UpgradeAbility0, Event.SHIP_ACTION_PERFORMED);

         // Run / Verify.
         assert.ok(!ability.isDamage());
         assert.ok(!ability.isPilot());
         assert.ok(ability.isUpgrade());
      });

      QUnit.test("toString()", function(assert)
      {
         // Setup.
         var ability = new Ability(UpgradeCard, UpgradeCard.RECON_SPECIALIST, UpgradeAbility0, Event.SHIP_ACTION_PERFORMED);

         // Run.
         var result = ability.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Ability source=UpgradeCard,sourceKey=reconSpecialist,type=UpgradeAbility0,abilityKey=shipActionPerformed,context=undefined");
      });
   });
