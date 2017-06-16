/*
 * Test upgrades with headers Attack [Focus] and Attack [Target Lock].
 */
define(["DamageCard", "Maneuver", "Phase", "Pilot", "Position", "RangeRuler", "Team", "UpgradeCard", "Value", "process/Action", "process/Adjudicator", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/Environment", "process/EnvironmentFactory", "process/ModifyAttackDiceAction", "process/Reducer", "process/Selector", "process/SimpleAgent", "process/TargetLock", "process/Token", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(DamageCard, Maneuver, Phase, Pilot, Position, RangeRuler, Team, UpgradeCard, Value, Action, Adjudicator, AttackDice, CombatAction, DefenseDice, Environment, EnvironmentFactory, ModifyAttackDiceAction, Reducer, Selector, SimpleAgent, TargetLock, Token, MockAttackDice, MockDefenseDice)
   {
      "use strict";
      QUnit.module("CombatAction");

      var delay = 1000;

      QUnit.test("CombatAction.doIt() Advanced Homing Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ADVANCED_HOMING_MISSILES;
         var combatAction = createCombatActionRange2(upgradeKey);
         var environment = combatAction.environment();
         var store = environment.store();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);

            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            if (defender.criticalDamages()[0] === DamageCard.DIRECT_HIT_V2)
            {
               assert.equal(defender.totalDamage(), 2);
            }
            else
            {
               assert.equal(defender.totalDamage(), 1);
            }
            assert.ok(!defender.isDestroyed());
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Advanced Proton Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ADVANCED_PROTON_TORPEDOES;
         var combatAction = createCombatAction(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         var attackDice = new MockAttackDice(store, attacker.id());
         var modificationKey = ModifyAttackDiceAction.Modification.USE_UPGRADE;
         var pilotKey;
         var modifyAttackDiceAction = new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey);
         var rebelAgent = attacker.agent();
         var count = 0;
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(count++ === 0 ? modifyAttackDiceAction : null);
         };

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.equal(TargetLock.getFirst(store, attacker.id(), defender.id()), undefined);
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 0);
            assert.equal(attackDice.criticalHitCount(), 1);
            assert.equal(attackDice.focusCount(), 2);
            assert.equal(attackDice.hitCount(), 1);

            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.equal(defender.hullValue(), 3);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Assault Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ASSAULT_MISSILES;
         var combatAction = createCombatActionRange2(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.secondaryWeapons().length, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.equal(defender.hullValue(), 3);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Blaster Turret", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.BLASTER_TURRET;
         var combatAction = createCombatAction(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter
         assert.equal(attacker.focusCount(), 1);

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.focusCount(), 0);
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.equal(defender.hullValue(), 3);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Cluster Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.CLUSTER_MISSILES;
         var combatAction = createCombatAction(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         var attackDice = new MockAttackDice(store, attacker.id());
         var modificationKey = ModifyAttackDiceAction.Modification.USE_UPGRADE;
         var pilotKey;
         var modifyAttackDiceAction = new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey);
         var rebelAgent = attacker.agent();
         var count = 0;
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(count++ === 0 ? modifyAttackDiceAction : null);
         };

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.equal(combatAction.executionCount(), 2);
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 2);
            assert.equal(defender.hullValue(), 3);
            if (defender.criticalDamages()[0] === DamageCard.DIRECT_HIT_V2 && defender.criticalDamages()[1] === DamageCard.DIRECT_HIT_V2)
            {
               assert.ok(defender.isDestroyed());
            }
            else if (defender.criticalDamages()[0] === DamageCard.DIRECT_HIT_V2 || defender.criticalDamages()[1] === DamageCard.DIRECT_HIT_V2)
            {
               assert.ok(defender.isDestroyed());
            }
            else
            {
               assert.ok(!defender.isDestroyed());
            }
            done();
         }, 2200);
      });

      QUnit.test("CombatAction.doIt() Concussion Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.CONCUSSION_MISSILES;
         var combatAction = createCombatActionRange2(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         var attackDice = new MockAttackDice(store, attacker.id());
         var modificationKey = ModifyAttackDiceAction.Modification.USE_UPGRADE;
         var pilotKey;
         var modifyAttackDiceAction = new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey);
         var rebelAgent = attacker.agent();
         var count = 0;
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(count++ === 0 ? modifyAttackDiceAction : null);
         };

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 0);
            assert.equal(attackDice.criticalHitCount(), 1);
            assert.equal(attackDice.focusCount(), 1);
            assert.equal(attackDice.hitCount(), 2);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 2);
            assert.equal(defender.hullValue(), 3);
            if (defender.criticalDamages()[0] === DamageCard.DIRECT_HIT_V2)
            {
               assert.ok(defender.isDestroyed());
            }
            else
            {
               assert.ok(!defender.isDestroyed());
            }
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Flechette Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.FLECHETTE_TORPEDOES;
         var combatAction = createCombatAction(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.ok(defender.isStressed());
            assert.equal(defender.stressCount(), 1);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Ion Pulse Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ION_PULSE_MISSILES;
         var combatAction = createCombatActionRange2(upgradeKey);
         var environment = combatAction.environment();
         var store = environment.store();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);

            assert.equal(defender.damageCount(), 1);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.equal(defender.ionCount(), 2);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Ion Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ION_TORPEDOES;
         var combatAction = createCombatActionRange2(upgradeKey);
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter
         var store = environment.store();
         var defenderPosition = combatAction.defenderPosition();
         var token2 = new Token(store, Pilot.ACADEMY_PILOT, defender.agent());
         var token2Position = new Position(defenderPosition.x() + 80, defenderPosition.y(), defenderPosition.heading());
         environment.placeToken(token2Position, token2);
         assert.equal(environment.tokens().length, 3);

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.secondaryWeapons().length, 0);
            assert.equal(AttackDice.get(store, attacker.id()).size(), 4);
            assert.equal(attacker.ionCount(), 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.ok(Selector.isDefenderHit(store.getState(), attacker));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.ok(!defender.isDestroyed());
            assert.equal(defender.ionCount(), 1);
            assert.equal(token2.ionCount(), 1);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Plasma Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PLASMA_TORPEDOES;
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setEnvironment(environment));
         store.dispatch(Action.setAdjudicator(adjudicator));
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var weapon = attacker.secondaryWeapons()[0];
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var defender = new Token(store, Pilot.PATROL_LEADER, imperialAgent);
         var defenderPosition = new Position(450, 845, 90);
         environment.placeToken(attackerPosition, attacker);
         environment.placeToken(defenderPosition, defender);
         store.dispatch(Action.addFocusCount(attacker));
         var callback = function()
         {
            LOGGER.info("callback() start");
         };
         var delay = 1000;
         var targetLock = new TargetLock(store, attacker.id(), defender.id());
         environment.activeToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().length, 1);
         assert.equal(defender.shieldCount(), 4);

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.secondaryWeapons().length, 0);
            assert.equal(AttackDice.get(store, attacker.id()).size(), 4);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.ok(Selector.isDefenderHit(store.getState(), attacker));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 0);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.ok(!defender.isDestroyed());
            assert.equal(defender.shieldCount(), 2);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Proton Rockets", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PROTON_ROCKETS;
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setEnvironment(environment));
         store.dispatch(Action.setAdjudicator(adjudicator));
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var weapon = attacker.secondaryWeapons()[0];
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
         var defenderPosition = new Position(450, 845, 90);
         environment.placeToken(attackerPosition, attacker);
         environment.placeToken(defenderPosition, defender);
         store.dispatch(Action.addFocusCount(attacker));
         var callback = function()
         {
            LOGGER.info("callback() start");
         };
         var delay = 1000;
         environment.activeToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, undefined, MockDefenseDice);
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().length, 1);

         var attackDice = new MockAttackDice(store, attacker.id());
         var modificationKey = ModifyAttackDiceAction.Modification.USE_UPGRADE;
         var pilotKey;
         var modifyAttackDiceAction = new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey);
         // var rebelAgent = attacker.agent();
         var count = 0;
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(count++ === 0 ? modifyAttackDiceAction : null);
         };

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            assert.equal(AttackDice.get(store, attacker.id()).size(), 2 + 2);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() Proton Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PROTON_TORPEDOES;
         var combatAction = createCombatActionRange2(upgradeKey);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0];
         var defender = environment.tokens()[1];
         assert.ok(TargetLock.getFirst(store, attacker.id(), defender.id()));
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().length, 1);

         var attackDice = new MockAttackDice(store, attacker.id());
         var modificationKey = ModifyAttackDiceAction.Modification.USE_UPGRADE;
         var pilotKey;
         var modifyAttackDiceAction = new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey);
         var rebelAgent = attacker.agent();
         var count = 0;
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(count++ === 0 ? modifyAttackDiceAction : null);
         };

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(!TargetLock.getFirst(store, attacker.id(), defender.id()));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 1);
            assert.equal(attackDice.criticalHitCount(), 2);
            assert.equal(attackDice.focusCount(), 0);
            assert.equal(attackDice.hitCount(), 1);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 2);
            done();
         }, delay);
      });

      QUnit.test("CombatAction.doIt() XX-23 S-Thread Tracers", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.XX_23_S_THREAD_TRACERS;
         var combatAction = createCombatActionRange2(upgradeKey);
         var environment = combatAction.environment();
         var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter
         var store = environment.store();
         var attackerPosition = combatAction.attackerPosition();
         var token2 = new Token(store, Pilot.ROOKIE_PILOT, attacker.agent());
         var token2Position = new Position(attackerPosition.x() + 80, attackerPosition.y(), attackerPosition.heading());
         environment.placeToken(token2Position, token2);
         assert.equal(environment.tokens().length, 3);

         // Run.
         var done = assert.async();
         combatAction.doIt();

         // Verify.
         setTimeout(function()
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().length, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.ok(Selector.isDefenderHit(store.getState(), attacker));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 0);
            assert.equal(defender.criticalDamageCount(), 0);

            assert.ok(TargetLock.getFirst(store, token2.id(), defender.id()));
            done();
         }, delay);
      });

      function createCombatAction(upgradeKey, y)
      {
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var adjudicator = new Adjudicator();

         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var weapon = attacker.secondaryWeapons()[0];
         if (weapon === undefined)
         {
            weapon = attacker.primaryWeapon();
         }

         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
         var myY = (y !== undefined ? y : 845);
         var defenderPosition = new Position(450, myY, 90);

         environment.placeToken(attackerPosition, attacker);
         environment.placeToken(defenderPosition, defender);
         environment.activeToken(attacker);

         store.dispatch(Action.setEnvironment(environment));
         store.dispatch(Action.addFocusCount(attacker));

         var targetLock = new TargetLock(store, attacker.id(), defender.id());

         var callback = function()
         {
            LOGGER.info("callback() start");
         };

         var delay = 1000;

         return new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
      }

      function createCombatActionRange2(upgradeKey)
      {
         return createCombatAction(upgradeKey, 700);
      }

      function createCombatAction2(upgradeKey)
      {
         var store = Redux.createStore(Reducer.root);
         var environment = new Environment(store, Team.IMPERIAL, Team.REBEL);
         var adjudicator = new Adjudicator();

         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var attacker = new Token(store, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var weapon = attacker.primaryWeapon();

         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(null);
         };
         var defender = new Token(store, Pilot.ACADEMY_PILOT, imperialAgent);
         var defenderPosition = new Position(450, 845, 90);

         store.dispatch(Action.setEnvironment(environment));
         store.dispatch(Action.setAdjudicator(adjudicator));
         environment.placeToken(attackerPosition, attacker);
         environment.placeToken(defenderPosition, defender);
         environment.activeToken(attacker);

         var callback = function()
         {
            LOGGER.info("callback() start");
         };

         var delay = 1000;

         return new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
      }

      function verifyAttackDice(assert, attackDice)
      {
         assert.ok(attackDice);
         assert.equal(attackDice.blankCount(), 1);
         assert.equal(attackDice.criticalHitCount(), 1);
         assert.equal(attackDice.focusCount(), 1);
         assert.equal(attackDice.hitCount(), 1);
      }

      function verifyDefenseDice(assert, defenseDice)
      {
         assert.ok(defenseDice);
         assert.equal(defenseDice.blankCount(), 1);
         assert.equal(defenseDice.evadeCount(), 1);
         assert.equal(defenseDice.focusCount(), 1);
      }
   });
