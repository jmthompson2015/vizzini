"use strict";

define(["FiringArc", "Pilot", "Position", "RangeRuler", "Team", "UpgradeCard", "Weapon",
  "process/Environment", "process/EnvironmentAction", "process/EnvironmentFactory", "process/Reducer", "process/SimpleAgent", "process/Squad", "process/TargetLock", "process/Token", "process/TokenAction"],
   function(FiringArc, Pilot, Position, RangeRuler, Team, UpgradeCard, Weapon,
      Environment, EnvironmentAction, EnvironmentFactory, Reducer, SimpleAgent, Squad, TargetLock, Token, TokenAction)
   {
      QUnit.module("Weapon");

      QUnit.test("Weapon properties", function(assert)
      {
         // Setup.
         var weapon = new Weapon("Primary Weapon", 12, [RangeRuler.TWO, RangeRuler.THREE], FiringArc.FORWARD);

         // Run / Verify.
         assert.equal(weapon.name(), "Primary Weapon");
         assert.equal(weapon.isPrimary(), true);
         assert.equal(weapon.weaponValue(), 12);
         var rangeKeys = weapon.rangeKeys();
         assert.equal(rangeKeys.length, 2);
         assert.equal(rangeKeys[0], RangeRuler.TWO);
         assert.equal(rangeKeys[1], RangeRuler.THREE);
      });

      QUnit.test("isDefenderInRange() range one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition0);
         assert.ok(attacker);
         var defenderPosition = new Position(305, 20, 90);
         var defender = environment.getTokenAt(defenderPosition);
         var attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = new Weapon("myWeapon", 12, [RangeRuler.ONE, RangeRuler.TWO], FiringArc.FORWARD);

         // Run.
         var result = weapon.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition);

         // Verify.
         assert.ok(result);
      });

      QUnit.test("isDefenderInFiringArc() range one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition0);
         assert.ok(attacker);
         var defenderPosition = new Position(305, 20, 90);
         var defender = environment.getTokenAt(defenderPosition);
         var attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = new Weapon("myWeapon", 12, [RangeRuler.ONE, RangeRuler.TWO], FiringArc.FORWARD);

         // Run.
         var result = weapon.isDefenderInFiringArc(attackerPosition, attacker.primaryWeapon().primaryFiringArc(), defender, defenderPosition);

         // Verify.
         assert.ok(result);
      });

      QUnit.test("isDefenderInFiringArc() rotated", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition0);
         assert.ok(attacker);
         var defenderPosition = new Position(305, 20, 90);
         var defender = environment.getTokenAt(defenderPosition);
         var attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, 0);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = new Weapon("myWeapon", 12, [RangeRuler.ONE, RangeRuler.TWO], FiringArc.FORWARD);

         // Run.
         var result = weapon.isDefenderInFiringArc(attackerPosition, attacker.primaryWeapon().primaryFiringArc(), defender, defenderPosition);

         // Verify.
         assert.ok(!result);
      });

      QUnit.test("isDefenderTargetable() range one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition0);
         assert.ok(attacker);
         var defenderPosition = new Position(305, 20, 90);
         var defender = environment.getTokenAt(defenderPosition);
         var attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = new Weapon("myWeapon", 12, [RangeRuler.ONE, RangeRuler.TWO], FiringArc.FORWARD);

         // Run.
         var result = weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition);

         // Verify.
         assert.ok(result);
      });

      QUnit.test("isUsable()", function(assert)
      {
         // Setup.
         var store00 = Redux.createStore(Reducer.root);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2017, "squad1", [new Token(store00, Pilot.ACADEMY_PILOT, imperialAgent)]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [new Token(store00, Pilot.DASH_RENDAR, rebelAgent, [UpgradeCard.MANGLER_CANNON, UpgradeCard.BLASTER_TURRET, UpgradeCard.PROTON_TORPEDOES])]);
         var positions1 = [new Position(450, 845, 90)];
         var positions2 = [new Position(458, 895, -90)];

         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         var tokens = environment.tokens();
         var attacker = tokens[1];
         var defender = tokens[0];
         var weapon0 = attacker.secondaryWeapons().get(0); // Mangler cannon.
         var weapon1 = attacker.secondaryWeapons().get(1); // Blaster turret.
         var weapon2 = attacker.secondaryWeapons().get(2); // Cluster missiles.

         // Run / Verify.
         assert.ok(weapon0.isUsable(attacker, defender));
         assert.ok(!weapon1.isUsable(attacker, defender));
         assert.ok(!weapon2.isUsable(attacker, defender));

         store.dispatch(TokenAction.addFocusCount(attacker));

         // Run / Verify.
         assert.ok(weapon0.isUsable(attacker, defender));
         assert.ok(weapon1.isUsable(attacker, defender));
         assert.ok(!weapon2.isUsable(attacker, defender));

         TargetLock.newInstance(store, attacker, defender);

         // Run / Verify.
         assert.ok(weapon0.isUsable(attacker, defender));
         assert.ok(weapon1.isUsable(attacker, defender));
         assert.ok(weapon2.isUsable(attacker, defender));
      });

      QUnit.test("toString()", function(assert)
      {
         // Setup.
         var weapon = new Weapon("myWeapon", 12, [RangeRuler.TWO, RangeRuler.THREE], FiringArc.FORWARD);

         // Run / Verify.
         assert.equal(weapon.toString(), "myWeapon");
      });
   });
