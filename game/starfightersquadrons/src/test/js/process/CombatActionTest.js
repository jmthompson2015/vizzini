/*
 * Test upgrades with headers Attack [Focus] and Attack [Target Lock].
 */
"use strict";

define(["Ability", "DamageCard", "Phase", "Pilot", "Position", "Team", "UpgradeCard",
   "process/Action", "process/Adjudicator", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/Environment", "process/EnvironmentAction", "process/EventObserver", "process/PhaseObserver", "process/Reducer", "process/Selector", "process/SimpleAgent", "process/Squad", "process/TargetLock", "process/Token", "process/TokenAction", "process/UpgradeAbility3", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(Ability, DamageCard, Phase, Pilot, Position, Team, UpgradeCard,
      Action, Adjudicator, AttackDice, CombatAction, DefenseDice, Environment, EnvironmentAction, EventObserver, PhaseObserver, Reducer, Selector, SimpleAgent, Squad, TargetLock, Token, TokenAction, UpgradeAbility3, MockAttackDice, MockDefenseDice)
   {
      QUnit.module("CombatAction-1");

      var delay = 10;

      QUnit.test("CombatAction.doIt() Advanced Homing Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ADVANCED_HOMING_MISSILES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);

            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            if (defender.criticalDamageKeys().get(0) === DamageCard.DIRECT_HIT_V2)
            {
               assert.equal(defender.totalDamage(), 2);
            }
            else
            {
               assert.equal(defender.totalDamage(), 1);
            }
            assert.ok(!defender.isDestroyed());
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var environment = combatAction.environment();
         var store = environment.store();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Advanced Proton Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ADVANCED_PROTON_TORPEDOES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(TargetLock.getFirst(store, attacker, defender), undefined);
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
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
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Assault Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ASSAULT_MISSILES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.secondaryWeapons().size, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.equal(defender.hullValue(), 3);
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         //  var attacker = environment.tokens()[0]; // Dash Rendar YT-2400
         //  var defender = environment.tokens()[1]; // Academy Pilot TIE Fighter
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Blaster Turret", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.BLASTER_TURRET;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.focusCount(), 0);
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.equal(defender.hullValue(), 3);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter
         assert.equal(attacker.focusCount(), 1);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Cluster Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.CLUSTER_MISSILES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(combatAction.executionCount(), 2);
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 2);
            assert.equal(defender.hullValue(), 3);
            if (defender.criticalDamageKeys().get(0) === DamageCard.DIRECT_HIT_V2 && defender.criticalDamageKeys().get(1) === DamageCard.DIRECT_HIT_V2)
            {
               assert.ok(defender.isDestroyed());
            }
            else if (defender.criticalDamageKeys().get(0) === DamageCard.DIRECT_HIT_V2 || defender.criticalDamageKeys().get(1) === DamageCard.DIRECT_HIT_V2)
            {
               assert.ok(defender.isDestroyed());
            }
            else
            {
               assert.ok(!defender.isDestroyed());
            }
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Concussion Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.CONCUSSION_MISSILES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 0);
            assert.equal(attackDice.criticalHitCount(), 1);
            assert.equal(attackDice.focusCount(), 1);
            assert.equal(attackDice.hitCount(), 2);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 2);
            assert.equal(defender.hullValue(), 3);
            if (defender.criticalDamageKeys().get(0) === DamageCard.DIRECT_HIT_V2)
            {
               assert.ok(defender.isDestroyed());
            }
            else
            {
               assert.ok(!defender.isDestroyed());
            }
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Flechette Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.FLECHETTE_TORPEDOES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1, "defender.damageCount() + defender.criticalDamageCount() === 1");
            assert.ok(defender.isStressed());
            assert.equal(defender.stressCount(), 1, "defender.stressCount() === 1");
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Ion Pulse Missiles", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ION_PULSE_MISSILES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);

            assert.equal(defender.damageCount(), 1);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.equal(defender.ionCount(), 2);
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var environment = combatAction.environment();
         var store = environment.store();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Ion Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ION_TORPEDOES;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.secondaryWeapons().size, 0);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.size(), 4);
            assert.equal(attacker.ionCount(), 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.ok(Selector.isDefenderHit(store.getState(), attacker));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.ok(!defender.isDestroyed());
            assert.equal(defender.ionCount(), 1);
            assert.equal(token2.ionCount(), 1);
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter
         var store = environment.store();
         var defenderPosition = combatAction.defenderPosition();
         var token2 = new Token(store, Pilot.ACADEMY_PILOT, defender.agent());
         var token2Position = new Position(defenderPosition.x() + 80, defenderPosition.y(), defenderPosition.heading());
         store.dispatch(EnvironmentAction.placeToken(token2Position, token2));
         assert.equal(environment.tokens().length, 3);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Plasma Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PLASMA_TORPEDOES;
         var store00 = Redux.createStore(Reducer.root);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined);
         };
         var attacker = new Token(store00, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined);
         };
         var defender = new Token(store00, Pilot.PATROL_LEADER, imperialAgent);
         var defenderPosition = new Position(450, 845, 90);

         var store = Redux.createStore(Reducer.root);
         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2017, "squad1", [defender]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [attacker]);
         var positions1 = [defenderPosition];
         var positions2 = [attackerPosition];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         var tokens = environment.tokens();
         attacker = tokens[1];
         defender = tokens[0];
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var weapon = attacker.secondaryWeapons().get(0);

         new EventObserver(store);
         new PhaseObserver(store);

         store.dispatch(TokenAction.addFocusCount(attacker));
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(attacker.secondaryWeapons().size, 0);
            assert.equal(AttackDice.get(store, attacker.id()).size(), 4);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.ok(Selector.isDefenderHit(store.getState(), attacker));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 0);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.ok(!defender.isDestroyed());
            assert.equal(defender.shieldCount(), 2);
            done();
         };
         TargetLock.newInstance(store, attacker, defender);
         environment.setActiveToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().size, 1);
         assert.equal(defender.shieldCount(), 4);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Proton Rockets", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PROTON_ROCKETS;
         var store00 = Redux.createStore(Reducer.root);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            var rawAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][upgradeKey];
            var ability;
            if (rawAbility && rawAbility.condition(store, attacker))
            {
               ability = new Ability(UpgradeCard, upgradeKey, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
            }
            var isAccepted = (ability !== undefined);
            callback(ability, isAccepted);
         };
         var attacker = new Token(store00, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined);
         };
         var defender = new Token(store00, Pilot.ACADEMY_PILOT, imperialAgent);
         var defenderPosition = new Position(450, 845, 90);

         var store = Redux.createStore(Reducer.root);
         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2017, "squad1", [defender]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [attacker]);
         var positions1 = [defenderPosition];
         var positions2 = [attackerPosition];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         var tokens = environment.tokens();
         attacker = tokens[1];
         defender = tokens[0];
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var weapon = attacker.secondaryWeapons().get(0);

         new EventObserver(store);
         new PhaseObserver(store);

         store.dispatch(TokenAction.addFocusCount(attacker));
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            assert.equal(AttackDice.get(store, attacker.id()).size(), 2 + 2);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            done();
         };
         environment.setActiveToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, undefined, MockDefenseDice);
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().size, 1);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Proton Torpedoes", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PROTON_TORPEDOES;
         var callback = function()
         {
            // Verify.
            assert.ok(!TargetLock.getFirst(store, attacker, defender));
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 1);
            assert.equal(attackDice.criticalHitCount(), 2);
            assert.equal(attackDice.focusCount(), 0);
            assert.equal(attackDice.hitCount(), 1);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 2);
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var tokens = environment.tokens();
         var attacker = tokens[1]; // Dash Rendar YT-2400
         var defender = tokens[0]; // Academy Pilot TIE Fighter
         assert.ok(TargetLock.getFirst(store, attacker, defender));
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().size, 1);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() XX-23 S-Thread Tracers", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.XX_23_S_THREAD_TRACERS;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.ok(Selector.isDefenderHit(store.getState(), attacker));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 0);
            assert.equal(defender.criticalDamageCount(), 0);

            assert.ok(TargetLock.getFirst(store, token2, defender));
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter
         var store = environment.store();
         var attackerPosition = combatAction.attackerPosition();
         var token2 = new Token(store, Pilot.ROOKIE_PILOT, attacker.agent());
         var token2Position = new Position(attackerPosition.x() + 80, attackerPosition.y(), attackerPosition.heading());
         store.dispatch(EnvironmentAction.placeToken(token2Position, token2));
         assert.equal(environment.tokens().length, 3);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      function createCombatAction(upgradeKey, callback0, y)
      {
         var store00 = Redux.createStore(Reducer.root);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            var rawAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][upgradeKey];
            var ability;
            if (rawAbility && rawAbility.condition(store, attacker))
            {
               ability = new Ability(UpgradeCard, upgradeKey, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
            }
            var isAccepted = (ability !== undefined);
            callback(ability, isAccepted);
         };
         var attacker = new Token(store00, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };
         var defender = new Token(store00, Pilot.ACADEMY_PILOT, imperialAgent);
         var myY = (y !== undefined ? y : 845);
         var defenderPosition = new Position(450, myY, 90);

         var store = Redux.createStore(Reducer.root);
         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2017, "squad1", [defender]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [attacker]);
         var positions1 = [defenderPosition];
         var positions2 = [attackerPosition];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         var tokens = environment.tokens();
         attacker = tokens[1];
         defender = tokens[0];
         var weapon = attacker.secondaryWeapons().get(0);
         if (weapon === undefined)
         {
            weapon = attacker.primaryWeapon();
         }

         environment.setActiveToken(attacker);
         store.dispatch(TokenAction.addFocusCount(attacker));
         TargetLock.newInstance(store, attacker, defender);

         new EventObserver(store);
         new PhaseObserver(store);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));

         var callback = (callback0 !== undefined ? callback0 : function()
         {
            LOGGER.info("callback() start");
         });

         return new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
      }

      function createCombatActionRange2(upgradeKey, callback0)
      {
         return createCombatAction(upgradeKey, callback0, 700);
      }

      function verifyAttackDice(assert, attackDice)
      {
         assert.ok(attackDice);
         LOGGER.info("attackDice = " + attackDice);
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
