"use strict";

define(["Ability", "Maneuver", "Phase", "Pilot", "Position", "RangeRuler", "Team", "UpgradeCard",
   "process/Action", "process/Adjudicator", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/Environment", "process/EnvironmentAction", "process/EnvironmentFactory", "process/EventObserver", "process/PhaseObserver", "process/Reducer", "process/Selector", "process/SimpleAgent", "process/Squad", "process/TargetLock", "process/Token", "process/TokenAction", "process/UpgradeAbility3", "../../../test/js/MockAttackDice", "../../../test/js/MockDefenseDice"],
   function(Ability, Maneuver, Phase, Pilot, Position, RangeRuler, Team, UpgradeCard,
      Action, Adjudicator, AttackDice, CombatAction, DefenseDice, Environment, EnvironmentAction, EnvironmentFactory, EventObserver, PhaseObserver, Reducer, Selector, SimpleAgent, Squad, TargetLock, Token, TokenAction, UpgradeAbility3, MockAttackDice, MockDefenseDice)
   {
      QUnit.module("CombatAction-2");

      var delay = 10;

      QUnit.test("CombatAction.doIt() range one through Modify Attack Dice", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var attacker = environment.tokens()[2]; // Luke Skywalker X-Wing
         assert.ok(attacker);
         attacker.agent().getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };
         var weapon = attacker.primaryWeapon();
         assert.ok(weapon);
         var attackerPosition = environment.getPositionFor(attacker);
         var defenderPosition = new Position(305, 20, 90); // Mauler Mithel TIE Fighter
         var defender = environment.tokens()[0];
         defender.agent().getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };

         environment.removeToken(attacker);
         attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
         store.dispatch(EnvironmentAction.placeToken(attackerPosition, attacker));
         var callback = function()
         {
            LOGGER.info("callback() start");
         };
         environment.setActiveToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
         combatAction.rollDefenseDice = function()
         {
            var callback = this.callback();
            callback();
         };

         // Run.
         combatAction.doIt();

         // Verify.
         assert.equal(Selector.rangeKey(store.getState(), attacker), RangeRuler.ONE);
         assert.equal(store.getState().phaseKey, Phase.COMBAT_MODIFY_ATTACK_DICE);
         verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
         assert.ok(!defender.isDestroyed());
         var defenseDice = DefenseDice.get(store, attacker.id());
         assert.ok(defenseDice);
      });

      QUnit.test("CombatAction.doIt() range one through Modify Defense Dice", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         var attacker = environment.tokens()[2]; // Luke Skywalker X-Wing
         assert.ok(attacker);
         attacker.agent().getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };
         var weapon = attacker.primaryWeapon();
         assert.ok(weapon);
         var attackerPosition = environment.getPositionFor(attacker);
         var defenderPosition = new Position(305, 20, 90); // Mauler Mithel TIE Fighter
         var defender = environment.tokens()[0];
         defender.agent().compareResults = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };

         environment.removeToken(attacker);
         attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
         store.dispatch(EnvironmentAction.placeToken(attackerPosition, attacker));
         var callback = function()
         {
            LOGGER.info("callback() start");
         };
         environment.setActiveToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);
         combatAction.compareResults = function()
         {
            var callback = this.callback();
            callback();
         };

         // Run.
         combatAction.doIt();

         // Verify.
         assert.equal(Selector.rangeKey(store.getState(), attacker), RangeRuler.ONE);
         assert.equal(store.getState().phaseKey, Phase.COMBAT_MODIFY_DEFENSE_DICE);
         verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
         assert.ok(!defender.isDestroyed());
         verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
         assert.equal(defender.hullValue(), 3);
         assert.equal(defender.damageCount(), 0);
         assert.equal(defender.criticalDamageCount(), 0);
      });

      QUnit.test("CombatAction.doIt() range one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attacker = environment.tokens()[2]; // Luke Skywalker X-Wing
         assert.ok(attacker);
         attacker.agent().getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };
         var weapon = attacker.primaryWeapon();
         assert.ok(weapon);
         var attackerPosition = environment.getPositionFor(attacker);
         var defenderPosition = new Position(305, 20, 90); // Mauler Mithel TIE Fighter
         var defender = environment.tokens()[0];
         defender.agent().getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };

         environment.removeToken(attacker);
         attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
         store.dispatch(EnvironmentAction.placeToken(attackerPosition, attacker));
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(combatAction.executionCount(), 1);
            assert.equal(Selector.rangeKey(store.getState(), attacker), RangeRuler.ONE);
            assert.equal(store.getState().phaseKey, Phase.COMBAT_AFTER_DEAL_DAMAGE);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            assert.ok(!defender.isDestroyed());
            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            assert.equal(defender.hullValue(), 3);
            done();
         };
         environment.setActiveToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Bossk upgrade", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.BOSSK;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            if (Selector.isDefenderHit(store.getState(), attacker))
            {
               assert.ok(Selector.isDefenderHit(store.getState(), attacker), "isDefenderHit() === true");
               assert.equal(attacker.stressCount(), 0);
               assert.equal(attacker.focusCount(), 0);
               assert.equal(store.getState().targetLocks.size, 0);
            }
            else
            {
               assert.ok(!Selector.isDefenderHit(store.getState(), attacker), "isDefenderHit() === false");
               assert.equal(attacker.stressCount(), 1);
               assert.equal(attacker.focusCount(), 1);
               assert.equal(store.getState().targetLocks.size, 0);
            }
            done();
         };
         var combatAction = createCombatAction2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter
         assert.ok(environment.getPositionFor(attacker), "environment.getPositionFor(attacker) !== undefined");
         assert.ok(environment.getPositionFor(defender), "environment.getPositionFor(defender) !== undefined");
         assert.ok(attacker.isUpgradedWith(upgradeKey), "isUpgradedWith() === true");
         assert.equal(attacker.stressCount(), 0);
         assert.equal(attacker.focusCount(), 0);
         assert.equal(store.getState().targetLocks.size, 0);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Fire Control System", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.FIRE_CONTROL_SYSTEM;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(TargetLock.getFirst(store, attacker, defender) === undefined, defender.isDestroyed());
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.ok(defender.damageCount() + defender.criticalDamageCount() > 0);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter
         assert.ok(TargetLock.getFirst(store, attacker, defender));

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Flechette Cannon", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.FLECHETTE_CANNON;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(TargetLock.getFirst(store, attacker, defender));
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 1, "defender.damageCount() === 1");
            assert.equal(defender.criticalDamageCount(), 0, "defender.criticalDamageCount() === 0");
            assert.ok(defender.isStressed());
            assert.equal(defender.stressCount(), 1, "defender.stressCount() === 1");
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Gunner upgrade", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.GUNNER;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var store = combatAction.store();
            var attacker = combatAction.attacker(); // Dash Rendar YT-2400
            var defender = combatAction.defender(); // Academy Pilot TIE Fighter

            if (Selector.isDefenderHit(store.getState(), attacker))
            {
               assert.ok(Selector.isDefenderHit(store.getState(), attacker), "isDefenderHit() === true");
               assert.ok(defender.damageCount() + defender.criticalDamageCount() > 0, "damageCount() + criticalDamageCount() > 0");
            }
            else
            {
               assert.ok(!Selector.isDefenderHit(store.getState(), attacker), "isDefenderHit() !== true");
               assert.equal(defender.damageCount() + defender.criticalDamageCount(), 0, "damageCount() + criticalDamageCount() === 0");
            }
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback, 695);
         combatAction.notifyDamage = function()
         {
            var store = this.store();
            var attacker = this.attacker();

            // Reset so that defender is not hit.
            store.dispatch(Action.setTokenDefenderHit(attacker, false));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_NOTIFY_DAMAGE, this.attacker(), this.finishNotifyDamage.bind(this)));
         };

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Heavy Laser Cannon", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.HEAVY_LASER_CANNON;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            assert.equal(AttackDice.get(store, attacker.id()).size(), 4);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 1);
            assert.equal(attackDice.criticalHitCount(), 0, "attackDice.criticalHitCount() === 0");
            assert.equal(attackDice.focusCount(), 1);
            assert.equal(attackDice.hitCount(), 2, "attackDice.hitCount() === 2");

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Hot Shot Blaster", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.HOT_SHOT_BLASTER;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(!attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 0);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.ok(defender.damageCount() + defender.criticalDamageCount() > 0);
            assert.equal(defender.hullValue(), 3);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Ion Cannon", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ION_CANNON;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 1);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.equal(defender.ionCount(), 1);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Ion Cannon Turret", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.ION_CANNON_TURRET;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 1);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.equal(defender.ionCount(), 1);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Mangler Cannon", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.MANGLER_CANNON;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            var attackDice = AttackDice.get(store, attacker.id());
            assert.equal(attackDice.blankCount(), 1);
            assert.equal(attackDice.criticalHitCount(), 1); // mock dice don't change
            assert.equal(attackDice.focusCount(), 1);
            assert.equal(attackDice.hitCount(), 1); // mock dice don't change

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount() + defender.criticalDamageCount(), 1);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Predator", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.PREDATOR;
         var callback = function()
         {
            // Verify.
            var store = combatAction.store();
            var environment = combatAction.environment();
            var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Tactician", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.TACTICIAN;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.ok(defender.damageCount() + defender.criticalDamageCount() > 0);
            assert.equal(defender.stressCount(), 1, "defender.stressCount() === 1");
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Tractor Beam", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.TRACTOR_BEAM;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(attacker.secondaryWeapons().size, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.equal(defender.damageCount(), 0);
            assert.equal(defender.criticalDamageCount(), 0);
            assert.equal(defender.tractorBeamCount(), 1);
            done();
         };
         var combatAction = createCombatAction(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1]; // Dash Rendar YT-2400
         var defender = environment.tokens()[0]; // Academy Pilot TIE Fighter
         assert.equal(defender.tractorBeamCount(), 0);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Twin Laser Turret", function(assert)
      {
         // Setup.
         var upgradeKey = UpgradeCard.TWIN_LASER_TURRET;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(attacker.isUpgradedWith(upgradeKey));
            assert.equal(combatAction.executionCount(), 2);
            assert.equal(attacker.secondaryWeapons().size, 1);
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            assert.ok(0 <= defender.damageCount() && defender.damageCount() <= 2, "defender.damageCount() = " + defender.damageCount());
            assert.equal(defender.damageCount(), 2, "defender.damageCount() = " + defender.damageCount());
            assert.equal(defender.criticalDamageCount(), 0, "defender.criticalDamageCount() = " + defender.criticalDamageCount());
            done();
         };
         var combatAction = createCombatActionRange2(upgradeKey, callback);
         var store = combatAction.store();
         var environment = combatAction.environment();
         var attacker = environment.tokens()[1];
         assert.ok(attacker.isUpgradedWith(upgradeKey));
         assert.equal(attacker.secondaryWeapons().size, 1);
         var defender = environment.tokens()[0];
         assert.equal(defender.damageCount(), 0);

         // Run.
         var done = assert.async();
         combatAction.doIt();
      });

      QUnit.test("CombatAction.doIt() Whisper", function(assert)
      {
         // Setup.
         var store00 = Redux.createStore(Reducer.root);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var attacker = new Token(store00, Pilot.WHISPER, imperialAgent);
         var attackerPosition = new Position(458, 895, -90);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         var defender = new Token(store00, Pilot.DASH_RENDAR, rebelAgent);
         var defenderPosition = new Position(450, 845, 90);

         var store = Redux.createStore(Reducer.root);
         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2017, "squad1", [defender]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2016, "squad2", [attacker]);
         var positions1 = [defenderPosition];
         var positions2 = [attackerPosition];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         defender = environment.tokens()[0];
         attacker = environment.tokens()[1];
         var weapon = attacker.primaryWeapon();
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         assert.equal(attacker.focusCount(), 0);

         new EventObserver(store);
         new PhaseObserver(store);

         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            verifyAttackDice(assert, AttackDice.get(store, attacker.id()));
            assert.equal(attacker.focusCount(), 1);

            verifyDefenseDice(assert, DefenseDice.get(store, attacker.id()));
            done();
         };
         environment.setActiveToken(attacker);
         var combatAction = new CombatAction(store, attacker, weapon, defender, callback, delay, MockAttackDice, MockDefenseDice);

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
         var squad2 = new Squad(Team.REBEL, "squad2", 2016, "squad2", [attacker]);
         var positions1 = [defenderPosition];
         var positions2 = [attackerPosition];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         defender = environment.tokens()[0];
         attacker = environment.tokens()[1];
         environment.setActiveToken(attacker);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));
         new EventObserver(store);
         new PhaseObserver(store);

         store.dispatch(TokenAction.addFocusCount(attacker));
         TargetLock.newInstance(store, attacker, defender);

         var weapon = attacker.secondaryWeapons().get(0);

         if (weapon === undefined)
         {
            weapon = attacker.primaryWeapon();
         }

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

      function createCombatAction2(upgradeKey, callback0)
      {
         var store00 = Redux.createStore(Reducer.root);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         rebelAgent.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };
         var attacker = new Token(store00, Pilot.DASH_RENDAR, rebelAgent, [upgradeKey]);
         var attackerPosition = new Position(458, 895, -90);

         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         imperialAgent.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
         {
            callback(undefined, false);
         };
         var defender = new Token(store00, Pilot.ACADEMY_PILOT, imperialAgent);
         var defenderPosition = new Position(450, 845, 90);

         var store = Redux.createStore(Reducer.root);
         var adjudicator = new Adjudicator();
         store.dispatch(Action.setAdjudicator(adjudicator));

         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2017, "squad1", [defender]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2016, "squad2", [attacker]);
         var positions1 = [defenderPosition];
         var positions2 = [attackerPosition];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);
         defender = environment.tokens()[0];
         attacker = environment.tokens()[1];
         environment.setActiveToken(attacker);
         new EventObserver(store);
         new PhaseObserver(store);

         var weapon = attacker.primaryWeapon();
         var callback = (callback0 !== undefined ? callback0 : function()
         {
            LOGGER.info("callback() start");
         });

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
