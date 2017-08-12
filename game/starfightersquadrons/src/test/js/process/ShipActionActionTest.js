define(["Ability", "DamageCard", "Maneuver", "Phase", "Position", "UpgradeCard", "process/Action", "process/DamageAbility2", "process/EnvironmentFactory", "process/ShipActionAction", "process/TargetLock", "process/UpgradeAbility2"],
   function(Ability, DamageCard, Maneuver, Phase, Position, UpgradeCard, Action, DamageAbility2, EnvironmentFactory, ShipActionAction, TargetLock, UpgradeAbility2)
   {
      "use strict";
      QUnit.module("ShipActionAction");

      QUnit.test("BarrelRoll.doIt() left", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var tokenPosition = environment.getPositionFor(token);
         environment.removeToken(tokenPosition);
         environment.placeToken(new Position(458, 890, 270), token);
         var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD);
         var callback = function()
         {
            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 - 80);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
         };

         // Run.
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 890);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("BarrelRoll.toString() left", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Barrel Roll Left");
      });

      QUnit.test("BarrelRoll.doIt() right", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var tokenPosition = environment.getPositionFor(token);
         environment.removeToken(tokenPosition);
         environment.placeToken(new Position(458, 890, 270), token);
         var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD);
         var callback = function()
         {
            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 + 80);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
         };

         // Run.
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 890);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("BarrelRoll.toString() right", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Barrel Roll Right");
      });

      QUnit.test("Boost.doIt() left", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_LEFT_1_STANDARD);
         var callback = function()
         {
            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 - 38);
            assert.equal(position.y(), 895 - 93);
            assert.equal(position.heading(), 270 - 45);
         };

         // Run.
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 895);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("Boost.toString() left", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_LEFT_1_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Boost Left");
      });

      QUnit.test("Boost.doIt() straight", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Boost(environment, token, Maneuver.STRAIGHT_1_STANDARD);
         var callback = function()
         {
            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895 - 80);
            assert.equal(position.heading(), 270);
         };

         // Run.
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 895);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("Boost.toString() straight", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Boost(environment, token, Maneuver.STRAIGHT_1_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Boost Straight");
      });

      QUnit.test("Boost.doIt() right", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD);
         var callback = function()
         {
            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 + 38);
            assert.equal(position.y(), 895 - 93);
            assert.equal(position.heading(), 270 + 45);
         };

         // Run.
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 895);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("Boost.toString() right", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Boost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Boost Right");
      });

      QUnit.test("Cloak.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Cloak(store, token);
         var callback = function()
         {
            // Verify.
            assert.equal(token.cloakCount(), 1);
         };

         // Run.
         assert.equal(token.cloakCount(), 0);
         action.doIt(callback);
      });

      QUnit.test("Cloak.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Cloak(store, token);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Cloak");
      });

      QUnit.test("Coordinate.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();
         var store = environment.store();
         var token = environment.tokens()[0]; // Gozanti-class
         var action = new ShipActionAction.Coordinate(store, token);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Coordinate: 1 Gozanti-class Cruiser");
      });

      QUnit.test("Decloak.doIt() left", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var tokenPosition = environment.getPositionFor(token);
         environment.removeToken(tokenPosition);
         environment.placeToken(new Position(458, 890, 270), token);
         store.dispatch(Action.addCloakCount(token));
         var action = new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD);
         var callback = function()
         {
            // Verify.
            assert.equal(token.cloakCount(), 0);
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458 - 120);
            assert.equal(position.y(), 890);
            assert.equal(position.heading(), 270);
         };

         // Run.
         assert.equal(token.cloakCount(), 1);
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 890);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("Decloak.toString() left", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Decloak: Barrel Roll Left 2");
      });

      QUnit.test("Decloak.doIt() straight", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         store.dispatch(Action.addCloakCount(token));
         var action = new ShipActionAction.Decloak(environment, token, Maneuver.STRAIGHT_2_STANDARD);
         var callback = function()
         {
            // Verify.
            assert.equal(token.cloakCount(), 0);
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895 - 120);
            assert.equal(position.heading(), 270);
         };

         // Run.
         assert.equal(token.cloakCount(), 1);
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 895);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("Decloak.toString() straight", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Decloak(environment, token, Maneuver.STRAIGHT_2_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Decloak: Straight 2");
      });

      QUnit.test("Evade.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Evade(store, token);
         var callback = function()
         {
            // Verify.
            assert.equal(token.evadeCount(), 1);
         };

         // Run.
         assert.equal(token.evadeCount(), 0);
         action.doIt(callback);
      });

      QUnit.test("Evade.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Evade(store, token);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Evade");
      });

      QUnit.test("Focus.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Focus(store, token);
         var callback = function()
         {
            // Verify.
            assert.equal(token.focusCount(), 1);
         };

         // Run.
         assert.equal(token.focusCount(), 0);
         action.doIt(callback);
      });

      QUnit.test("Focus.doIt() Recon Specialist", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         store.dispatch(Action.addTokenUpgrade(token, UpgradeCard.RECON_SPECIALIST));
         var action = new ShipActionAction.Focus(store, token);
         var callback = function()
         {
            // Verify.
            assert.equal(token.focusCount(), 2);
         };

         // Run.
         assert.equal(token.focusCount(), 0);
         action.doIt(callback);
      });

      QUnit.test("Focus.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Focus(store, token);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Focus");
      });

      QUnit.test("Jam.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[2]; // X-Wing
         var defender = environment.tokens()[0]; // TIE Fighter
         var action = new ShipActionAction.Jam(store, attacker, defender);
         var callback = function()
         {
            // Verify.
            assert.equal(defender.stressCount(), 2);
         };

         // Run.
         assert.equal(defender.stressCount(), 0);
         action.doIt(callback);
      });

      QUnit.test("Jam.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var defender = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Jam(store, attacker, defender);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Jam: 3 Luke Skywalker (X-Wing)");
      });

      QUnit.test("Recover.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();
         var store = environment.store();
         var token = environment.tokens()[0]; // Gozanti-class
         var action = new ShipActionAction.Recover(store, token);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Recover");
      });

      QUnit.test("Reinforce.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Reinforce(store, token);
         var callback = function()
         {
            // Verify.
            assert.equal(token.reinforceCount(), 1);
         };

         // Run.
         assert.equal(token.reinforceCount(), 0);
         action.doIt(callback);
      });

      QUnit.test("Reinforce.toString() Gozanti-class", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();
         var store = environment.store();
         var token = environment.tokens()[0]; // Gozanti-class
         var action = new ShipActionAction.Reinforce(store, token);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Reinforce");
      });

      QUnit.test("Reinforce.toString() CR90", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();
         var store = environment.store();

         // Run / Verify.
         assert.equal(new ShipActionAction.Reinforce(store, environment.tokens()[3]).toString(), "Reinforce");
         assert.equal(new ShipActionAction.Reinforce(store, environment.tokens()[3].tokenFore()).toString(),
            "Reinforce: 7 CR90 Corvette (fore)");
         assert.equal(new ShipActionAction.Reinforce(store, environment.tokens()[3].tokenAft()).toString(),
            "Reinforce: 8 CR90 Corvette (aft)");
      });

      QUnit.test("SAADamageCard.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_PERFORM_ACTION, token));
         var damageKey = DamageCard.CONSOLE_FIRE;
         store.dispatch(Action.addTokenCriticalDamage(token, damageKey));
         var ability = new Ability(DamageCard, damageKey, DamageAbility2, Phase.ACTIVATION_PERFORM_ACTION);
         var action = new ShipActionAction.SAADamageCard(store, token, ability);
         var callback = function()
         {
            LOGGER.info("in callback()");
         };
         store.dispatch(Action.setActiveToken(token));

         // Run.
         assert.equal(token.damageCount(), 0);
         assert.equal(token.criticalDamageCount(), 1);
         action.doIt(callback);

         // Verify.
         assert.equal(token.damageCount(), 1);
         assert.equal(token.criticalDamageCount(), 0);
      });

      QUnit.test("SAADamageCard.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var damageKey = DamageCard.CONSOLE_FIRE;
         var ability = new Ability(DamageCard, damageKey, DamageAbility2, Phase.ACTIVATION_PERFORM_ACTION);
         var action = new ShipActionAction.SAADamageCard(environment, token, ability);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Damage Action: Console Fire");
      });

      QUnit.test("SAATargetLock.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var defender = environment.tokens()[0]; // TIE Fighter
         var attacker = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.SAATargetLock(store, attacker, defender);
         assert.equal(store.getState().targetLocks.size, 0);
         assert.ok(TargetLock.getFirst(store, attacker, defender) === undefined);
         var callback = function()
         {
            // Verify.
            assert.equal(store.getState().targetLocks.size, 1);
            assert.ok(TargetLock.getFirst(store, attacker, defender) !== undefined);
         };

         // Run.
         action.doIt(callback);
      });

      QUnit.test("SAATargetLock.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var defender = environment.tokens()[0]; // TIE Fighter
         var attacker = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.SAATargetLock(store, attacker, defender);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Target Lock: 1 \"Mauler Mithel\" (TIE Fighter)");
      });

      QUnit.test("SAAUpgradeCard.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_PERFORM_ACTION, token));
         var upgradeKey = UpgradeCard.LANDO_CALRISSIAN;
         var ability = new Ability(UpgradeCard, upgradeKey, UpgradeAbility2, Phase.ACTIVATION_PERFORM_ACTION);
         var action = new ShipActionAction.SAAUpgradeCard(store, token, ability);
         var callback = function()
         {
            LOGGER.info("in callback()");
         };

         // Run.
         assert.equal(token.evadeCount(), 0);
         assert.equal(token.focusCount(), 0);
         action.doIt(callback);

         // Verify.
         assert.ok(token.focusCount() + token.evadeCount() >= 0);
         assert.ok(token.focusCount() + token.evadeCount() <= 2);
      });

      QUnit.test("SAAUpgradeCard.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var upgradeKey = UpgradeCard.LANDO_CALRISSIAN;
         var ability = new Ability(UpgradeCard, upgradeKey, UpgradeAbility2, Phase.ACTIVATION_PERFORM_ACTION);
         var action = new ShipActionAction.SAAUpgradeCard(environment, token, ability);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "Upgrade Action: Lando Calrissian");
      });

      QUnit.test("Slam.doIt()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Slam(environment, token, Maneuver.STRAIGHT_2_STANDARD);
         var callback = function()
         {
            // Verify.
            position = environment.getPositionFor(token);
            assert.equal(position.x(), 458);
            assert.equal(position.y(), 895 - 120);
            assert.equal(position.heading(), 270);
         };

         // Run.
         var position = environment.getPositionFor(token);
         assert.equal(position.x(), 458);
         assert.equal(position.y(), 895);
         assert.equal(position.heading(), 270);
         action.doIt(callback);
      });

      QUnit.test("Slam.toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[2]; // X-Wing
         var action = new ShipActionAction.Slam(environment, token, Maneuver.STRAIGHT_2_STANDARD);

         // Run.
         var result = action.toString();

         // Verify.
         assert.ok(result);
         assert.equal(result, "SLAM: Straight 2");
      });
   });
