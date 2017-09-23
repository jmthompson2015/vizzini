"use strict";

define(["Phase", "Pilot", "PlayFormat", "Position", "RangeRuler", "Ship", "Team", "UpgradeCard",
  "process/Action", "process/Environment", "process/EnvironmentAction", "process/EnvironmentFactory", "process/Reducer", "process/SimpleAgent", "process/Squad", "process/SquadBuilder", "process/TargetLock", "process/Token", "process/TokenAction"],
   function(Phase, Pilot, PlayFormat, Position, RangeRuler, Ship, Team, UpgradeCard,
      Action, Environment, EnvironmentAction, EnvironmentFactory, Reducer, SimpleAgent, Squad, SquadBuilder, TargetLock, Token, TokenAction)
   {
      QUnit.module("Environment");

      QUnit.test("activeToken()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token0 = environment.tokens()[0]; // TIE Fighter.
         assert.ok(!environment.activeToken());

         // Run.
         environment.setActiveToken(token0);

         // Verify.
         assert.ok(environment.activeToken().equals(token0));
      });

      QUnit.test("createWeaponToRangeToDefenders() one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90); // X-Wing.
         var attacker = environment.getTokenAt(attackerPosition0);
         var attackerPosition = new Position(300, 70, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = attacker.primaryWeapon();

         // Run.
         var result = environment.createWeaponToRangeToDefenders(attacker);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         {
            var weaponToRangeToDefenders = result[0];
            weapon = weaponToRangeToDefenders.weapon;
            assert.equal(weapon, attacker.primaryWeapon());

            var rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
            assert.ok(rangeToDefendersArray);
            assert.equal(rangeToDefendersArray.length, 1);

            var rangeToDefenders = rangeToDefendersArray[0];
            assert.equal(rangeToDefenders.range, RangeRuler.ONE);

            var defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 1);
         }
      });

      QUnit.test("createWeaponToRangeToDefenders() four", function(assert)
      {
         // Setup.
         var store00 = Redux.createStore(Reducer.root);
         var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
         var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
         var squad1 = new Squad(Team.IMPERIAL, "squad1", 2016, "squad1", [
                 new Token(store00, Pilot.ACADEMY_PILOT, imperialAgent),
                 new Token(store00, Pilot.ACADEMY_PILOT, imperialAgent),
                 new Token(store00, Pilot.OBSIDIAN_SQUADRON_PILOT, imperialAgent),
                 new Token(store00, Pilot.OBSIDIAN_SQUADRON_PILOT, imperialAgent),
                 new Token(store00, Pilot.BLACK_SQUADRON_PILOT, imperialAgent),
                 new Token(store00, Pilot.BLACK_SQUADRON_PILOT, imperialAgent)
          ]);
         var squad2 = new Squad(Team.REBEL, "squad2", 2017, "squad2", [new Token(store00, Pilot.DASH_RENDAR, rebelAgent, [UpgradeCard.OUTRIDER, UpgradeCard.CALCULATION, UpgradeCard.MANGLER_CANNON, UpgradeCard.BLASTER_TURRET, UpgradeCard.PROTON_TORPEDOES])]);

         var store = Redux.createStore(Reducer.root);
         var positions1 = [new Position(450, 845, 90), new Position(450, 795, 90), new Position(450, 745, 90), new Position(450, 695, 90), new Position(450, 645, 90), new Position(450, 595, 90)];
         var positions2 = [new Position(458, 895, -90)];
         var environment = new Environment(store, imperialAgent, squad1, rebelAgent, squad2, positions1, positions2);

         var attacker = environment.tokens()[6];
         var defender3 = environment.tokens()[3];
         store.dispatch(TokenAction.addFocusCount(attacker));
         TargetLock.newInstance(store, attacker, defender3);

         // Run.
         var result = environment.createWeaponToRangeToDefenders(attacker);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         var weaponToRangeToDefenders, weapon, rangeToDefendersArray, rangeToDefenders, defenders;
         {
            weaponToRangeToDefenders = result[0];
            weapon = weaponToRangeToDefenders.weapon;
            assert.equal(weapon, attacker.primaryWeapon());

            rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
            assert.ok(rangeToDefendersArray);
            assert.equal(rangeToDefendersArray.length, 3);

            rangeToDefenders = rangeToDefendersArray[0];
            assert.equal(rangeToDefenders.range, RangeRuler.ONE);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 3, "defenders.length === 3");

            rangeToDefenders = rangeToDefendersArray[1];
            assert.equal(rangeToDefenders.range, RangeRuler.TWO);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 2);

            rangeToDefenders = rangeToDefendersArray[2];
            assert.equal(rangeToDefenders.range, RangeRuler.THREE);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 1);
         }
         {
            weaponToRangeToDefenders = result[1];
            weapon = weaponToRangeToDefenders.weapon;
            assert.equal(weapon.upgradeKey(), UpgradeCard.MANGLER_CANNON);

            rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
            assert.ok(rangeToDefendersArray);
            assert.equal(rangeToDefendersArray.length, 3);

            rangeToDefenders = rangeToDefendersArray[0];
            assert.equal(rangeToDefenders.range, RangeRuler.ONE);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 3, "defenders.length === 3");

            rangeToDefenders = rangeToDefendersArray[1];
            assert.equal(rangeToDefenders.range, RangeRuler.TWO);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 2);

            rangeToDefenders = rangeToDefendersArray[2];
            assert.equal(rangeToDefenders.range, RangeRuler.THREE);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 1);
         }
         {
            weaponToRangeToDefenders = result[2];
            weapon = weaponToRangeToDefenders.weapon;
            assert.equal(weapon.upgradeKey(), UpgradeCard.BLASTER_TURRET);

            rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
            assert.ok(rangeToDefendersArray);
            assert.equal(rangeToDefendersArray.length, 2);

            rangeToDefenders = rangeToDefendersArray[0];
            assert.equal(rangeToDefenders.range, RangeRuler.ONE);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 3, "defenders.length === 3");

            rangeToDefenders = rangeToDefendersArray[1];
            assert.equal(rangeToDefenders.range, RangeRuler.TWO);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 2);
         }
         {
            weaponToRangeToDefenders = result[3];
            weapon = weaponToRangeToDefenders.weapon;
            assert.equal(weapon.upgradeKey(), UpgradeCard.PROTON_TORPEDOES);

            rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
            assert.ok(rangeToDefendersArray);
            assert.equal(rangeToDefendersArray.length, 1);

            rangeToDefenders = rangeToDefendersArray[0];
            assert.equal(rangeToDefenders.range, RangeRuler.TWO);
            defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 1);
         }
      });

      QUnit.test("createWeaponToRangeToDefenders() one with weapon", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();
         var attackerPosition0 = new Position(458, 895, -90); // X-Wing.
         var attacker = environment.getTokenAt(attackerPosition0);
         var attackerPosition = new Position(300, 220, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var defender = environment.tokens()[0]; // TIE Fighter
         var weapon = attacker.secondaryWeapons().get(0); // Proton Torpedoes
         TargetLock.newInstance(store, attacker, defender);

         // Run.
         var result = environment.createWeaponToRangeToDefenders(attacker, weapon);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1, "result.length === 1");
         {
            var weaponToRangeToDefenders = result[0];
            weapon = weaponToRangeToDefenders.weapon;
            assert.equal(weapon, attacker.secondaryWeapons().get(0));

            var rangeToDefendersArray = weaponToRangeToDefenders.rangeToDefenders;
            assert.ok(rangeToDefendersArray);
            assert.equal(rangeToDefendersArray.length, 1);

            var rangeToDefenders = rangeToDefendersArray[0];
            assert.equal(rangeToDefenders.range, RangeRuler.TWO, "range === two");

            var defenders = rangeToDefenders.defenders;
            assert.ok(defenders);
            assert.equal(defenders.length, 1);
         }
      });

      QUnit.test("discardDamage()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var damage = environment.drawDamage();
         assert.equal(environment.store().getState().damageDeck.length, 32);
         assert.equal(environment.store().getState().damageDiscardPile.length, 0);

         // Run.
         environment.discardDamage(damage);

         // Verify.
         assert.equal(environment.store().getState().damageDeck.length, 32);
         assert.equal(environment.store().getState().damageDiscardPile.length, 1);
         assert.equal(environment.store().getState().damageDiscardPile[0], damage);
      });

      QUnit.test("drawDamage()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         assert.equal(environment.store().getState().damageDeck.length, 33);
         assert.equal(environment.store().getState().damageDiscardPile.length, 0);

         // Run.
         var result = environment.drawDamage();

         // Verify.
         assert.ok(result);
         assert.equal(environment.store().getState().damageDeck.length, 32);
         assert.equal(environment.store().getState().damageDiscardPile.length, 0);
      });

      QUnit.test("drawDamage() empty", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         for (var i = 0; i < 33; i++)
         {
            var damage = environment.drawDamage();
            environment.discardDamage(damage);
         }
         assert.equal(environment.store().getState().damageDeck.length, 0);
         assert.equal(environment.store().getState().damageDiscardPile.length, 33);

         // Run.
         var result = environment.drawDamage();

         // Verify.
         assert.ok(result);
         assert.equal(environment.store().getState().damageDeck.length, 32);
         assert.equal(environment.store().getState().damageDiscardPile.length, 0);
      });

      QUnit.test("getDefenders() Imperial vs Rebel", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[0]; // TIE Fighter.

         // Run.
         var result = environment.getDefenders(attacker);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
      });

      QUnit.test("getDefenders() Rebel vs Imperial", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[2]; // X-Wing.

         // Run.
         var result = environment.getDefenders(attacker);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
      });

      QUnit.test("getDefenders() Rebel vs Rebel", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent1 = new SimpleAgent("1", Team.REBEL);
         var squad1 = SquadBuilder.findByNameAndYear("Worlds #2", 2016).buildSquad(agent1);
         var agent2 = new SimpleAgent("2", Team.REBEL);
         var squad2 = SquadBuilder.findByNameAndYear("Worlds #4", 2016).buildSquad(agent1);
         var environment = new Environment(store, agent1, squad1, agent2, squad2);
         var attacker = environment.tokens()[0]; // X-Wing.

         // Run.
         var result = environment.getDefenders(attacker);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.ok(result[0].equals(environment.tokens()[2]));
         assert.ok(result[1].equals(environment.tokens()[3]));
      });

      QUnit.test("getDefendersInRange()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[2]; // X-Wing
         var attackerPosition0 = environment.getPositionFor(attacker);
         var attackerPosition = new Position(458, 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);

         // Run.
         var result = environment.getDefendersInRange(attacker);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].pilot().shipTeam.teamKey, Team.IMPERIAL);
      });

      QUnit.test("getFriendlyTokensAtRange() zero", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[2]; // X-Wing
         var attackerPosition0 = environment.getPositionFor(attacker);
         var attackerPosition = new Position(458, 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);

         // Run.
         var result = environment.getFriendlyTokensAtRange(attacker, RangeRuler.TWO);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 0);
      });

      QUnit.test("getFriendlyTokensAtRange() one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[0]; // TIE Fighter
         var attackerPosition0 = environment.getPositionFor(attacker);
         var attackerPosition = new Position(458, 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);

         // Run.
         var result = environment.getFriendlyTokensAtRange(attacker, RangeRuler.TWO);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].pilotKey(), Pilot.DARK_CURSE);
      });

      QUnit.test("getPositionFor()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[0];
         var position = new Position(305, 20, 90);

         // Run.
         var result = environment.getPositionFor(token);

         // Verify.
         assert.ok(result);
         assert.strictEqual(result.toString(), position.toString());
      });

      QUnit.test("getPositionFor() Huge2", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();
         var token = environment.tokens()[3]; // CR90

         // Run.
         var result = environment.getPositionFor(token);

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458);
         assert.equal(result.y(), 803);
         assert.equal(result.heading(), 270);

         // Run.
         result = environment.getPositionFor(token.tokenFore());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458);
         assert.equal(result.y(), 803 - 72);
         assert.equal(result.heading(), 270);

         // Run.
         result = environment.getPositionFor(token.tokenAft());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458);
         assert.equal(result.y(), 803 + 72);
         assert.equal(result.heading(), 270);
      });

      QUnit.test("getPositionFor() Huge2 330 deg", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();
         var token = environment.tokens()[3]; // CR90
         var fromPosition = new Position(458, 803, 270);
         var toPosition = new Position(458, 750, 330);
         environment.moveToken(fromPosition, toPosition);

         // Run.
         var result = environment.getPositionFor(token);

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458);
         assert.equal(result.y(), 750);
         assert.equal(result.heading(), 330);

         // Run.
         result = environment.getPositionFor(token.tokenFore());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458 + 62);
         assert.equal(result.y(), 750 - 36);
         assert.equal(result.heading(), 330);

         // Run.
         result = environment.getPositionFor(token.tokenAft());

         // Verify.
         assert.ok(result);
         assert.equal(result.x(), 458 - 62);
         assert.equal(result.y(), 750 + 36);
         assert.equal(result.heading(), 330);
      });

      QUnit.test("getTargetableDefenders() none", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition);
         var weapon = attacker.primaryWeapon();

         // Run.
         var result = environment.getTargetableDefenders(attacker, attackerPosition, weapon);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 0);
      });

      QUnit.test("getTargetableDefenders() one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition0);
         var attackerPosition = new Position(305, 70, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = attacker.primaryWeapon();

         // Run.
         var result = environment.getTargetableDefenders(attacker, attackerPosition, weapon);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
      });

      QUnit.test("getTargetableDefendersAtRange() none", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition);
         var weapon = attacker.primaryWeapon();

         // Run.
         var result = environment.getTargetableDefendersAtRange(attacker, attackerPosition, weapon,
            RangeRuler.ONE);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 0);
      });

      QUnit.test("getTargetableDefendersAtRange() one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attackerPosition0 = new Position(458, 895, -90);
         var attacker = environment.getTokenAt(attackerPosition0);
         var attackerPosition = new Position(305, 70, -90);
         environment.moveToken(attackerPosition0, attackerPosition);
         var weapon = attacker.primaryWeapon();

         // Run.
         var result = environment.getTargetableDefendersAtRange(attacker, attackerPosition, weapon, RangeRuler.ONE);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
      });

      QUnit.test("getTokenAt() 1", function(assert)
      {
         var position = new Position(305, 20, 90);
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         var token = environment.getTokenAt(position);
         assert.strictEqual(token.pilotKey(), Pilot.MAULER_MITHEL);
      });

      QUnit.test("getTokenAt() 2", function(assert)
      {
         var position = new Position(610, 20, 90);
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         var token = environment.getTokenAt(position);
         assert.strictEqual(token.pilotKey(), Pilot.DARK_CURSE);
      });

      QUnit.test("getTokenAt() 3", function(assert)
      {
         var position = new Position(458, 895, -90);
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         var token = environment.getTokenAt(position);
         assert.strictEqual(token.pilotKey(), Pilot.LUKE_SKYWALKER);
      });

      QUnit.test("getTokenById()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run / Verify.
         assert.equal(environment.getTokenById(1).id(), 1);
         assert.equal(environment.getTokenById(2).id(), 2);
         assert.equal(environment.getTokenById(3).id(), 3);
      });

      QUnit.test("getTokensAtRange()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[2]; // X-Wing
         var attackerPosition0 = environment.getPositionFor(attacker);
         var attackerPosition = new Position(458, 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);

         // Run.
         var result = environment.getTokensAtRange(attacker, RangeRuler.TWO);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
      });

      QUnit.test("getTokensForActivation()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run.
         var result = environment.getTokensForActivation();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 3);
         var token;
         var i = 0;
         {
            token = result[i++];
            assert.equal(token.id(), 2);
            assert.equal(token.pilotKey(), Pilot.DARK_CURSE);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 1);
            assert.equal(token.pilotKey(), Pilot.MAULER_MITHEL);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 3);
            assert.equal(token.pilotKey(), Pilot.LUKE_SKYWALKER);
         }
      });

      QUnit.test("getTokensForActivation() Huge", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();

         // Run.
         var result = environment.getTokensForActivation();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 6);
         var token;
         var i = 0;
         {
            token = result[i++];
            assert.equal(token.id(), 2);
            assert.equal(token.pilotSkillValue(), 8);
            assert.equal(token.pilotKey(), Pilot.JUNO_ECLIPSE);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 9);
            assert.equal(token.pilotSkillValue(), 8);
            assert.equal(token.pilotKey(), Pilot.WES_JANSON);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 1);
            assert.equal(token.pilotSkillValue(), 2);
            assert.equal(token.pilotKey(), Pilot.GOZANTI_CLASS_CRUISER);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 10);
            assert.equal(token.pilotSkillValue(), 3);
            assert.equal(token.pilotKey(), Pilot.GR_75_MEDIUM_TRANSPORT);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 3);
            assert.equal(token.tokenFore().pilotSkillValue(), 4);
            assert.equal(token.tokenAft().pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 6);
            assert.equal(token.tokenFore().pilotSkillValue(), 4);
            assert.equal(token.tokenAft().pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE);
         }
      });

      QUnit.test("getTokensForActivation() Huge pure", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();

         // Run.
         var result = environment.getTokensForActivation(true);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 8);
         var token;
         var i = 0;
         {
            token = result[i++];
            assert.equal(token.id(), 2);
            assert.equal(token.pilotSkillValue(), 8);
            assert.equal(token.pilotKey(), Pilot.JUNO_ECLIPSE);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 9);
            assert.equal(token.pilotSkillValue(), 8);
            assert.equal(token.pilotKey(), Pilot.WES_JANSON);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 1);
            assert.equal(token.pilotSkillValue(), 2);
            assert.equal(token.pilotKey(), Pilot.GOZANTI_CLASS_CRUISER);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 10);
            assert.equal(token.pilotSkillValue(), 3);
            assert.equal(token.pilotKey(), Pilot.GR_75_MEDIUM_TRANSPORT);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 4);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".fore");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 5);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".aft");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 7);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".fore");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 8);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".aft");
         }
      });

      QUnit.test("getTokensForCombat()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run.
         var result = environment.getTokensForCombat();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 3);
         var token;
         var i = 0;
         {
            token = result[i++];
            assert.equal(token.id(), 3);
            assert.equal(token.pilotKey(), Pilot.LUKE_SKYWALKER);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 1);
            assert.equal(token.pilotKey(), Pilot.MAULER_MITHEL);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 2);
            assert.equal(token.pilotKey(), Pilot.DARK_CURSE);
         }
      });

      QUnit.test("getTokensForCombat() Huge", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();

         // Run.
         var result = environment.getTokensForCombat();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 8);
         var token;
         var i = 0;
         {
            token = result[i++];
            assert.equal(token.id(), 2);
            assert.equal(token.pilotSkillValue(), 8);
            assert.equal(token.pilotKey(), Pilot.JUNO_ECLIPSE);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 9);
            assert.equal(token.pilotSkillValue(), 8);
            assert.equal(token.pilotKey(), Pilot.WES_JANSON);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 4);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".fore");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 5);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.RAIDER_CLASS_CORVETTE + ".aft");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 7);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".fore");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 8);
            assert.equal(token.pilotSkillValue(), 4);
            assert.equal(token.pilotKey(), Pilot.CR90_CORVETTE + ".aft");
         }
         {
            token = result[i++];
            assert.equal(token.id(), 10);
            assert.equal(token.pilotSkillValue(), 3);
            assert.equal(token.pilotKey(), Pilot.GR_75_MEDIUM_TRANSPORT);
         }
         {
            token = result[i++];
            assert.equal(token.id(), 1);
            assert.equal(token.pilotSkillValue(), 2);
            assert.equal(token.pilotKey(), Pilot.GOZANTI_CLASS_CRUISER);
         }
      });

      QUnit.test("getTokensForTeam() First Order", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createTFACoreSetEnvironment();

         // Run.
         var result = environment.getTokensForTeam(Team.FIRST_ORDER);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].pilotKey(), Pilot.EPSILON_LEADER);
         assert.equal(result[1].pilotKey(), Pilot.ZETA_ACE);
      });

      QUnit.test("getTokensForTeam() Imperial", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run.
         var result = environment.getTokensForTeam(Team.IMPERIAL);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
      });

      QUnit.test("getTokensForTeam() Imperial mixed teams", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var foAgent = new SimpleAgent("First Order Agent", Team.FIRST_ORDER);
         var resistanceAgent = new SimpleAgent("Resistance Agent", Team.RESISTANCE);
         var squad1 = SquadBuilder.findByNameAndYear("Worlds #3", 2016).buildSquad(foAgent);
         var squad2 = SquadBuilder.CoreSetResistanceSquadBuilder.buildSquad(resistanceAgent);
         var environment = new Environment(store, foAgent, squad1, resistanceAgent, squad2);

         // Run.
         var result = environment.getTokensForTeam(Team.IMPERIAL);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 3);
         assert.equal(result[0].pilotKey(), Pilot.OMEGA_LEADER);
         assert.equal(result[1].pilotKey(), Pilot.COLONEL_VESSERY);
         assert.equal(result[2].pilotKey(), Pilot.OMICRON_GROUP_PILOT);
      });

      QUnit.test("getTokensForTeam() Imperial pure", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var isPure = true;

         // Run.
         var result = environment.getTokensForTeam(Team.IMPERIAL, isPure);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
      });

      QUnit.test("getTokensForTeam() Rebel", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run.
         var result = environment.getTokensForTeam(Team.REBEL);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].pilotKey(), Pilot.LUKE_SKYWALKER);
      });

      QUnit.test("getTokensForTeam() Resistance", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createTFACoreSetEnvironment();

         // Run.
         var result = environment.getTokensForTeam(Team.RESISTANCE);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].pilotKey(), Pilot.POE_DAMERON);
      });

      QUnit.test("getTokensTouching()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var fromPosition0 = new Position(305, 20, 90);
         var token0 = environment.getTokenAt(fromPosition0); // TIE Fighter 1
         var fromPosition20 = new Position(458, 895, -90);
         var fromPosition2 = new Position(fromPosition0.x(), fromPosition0.y() + 39, -90);
         environment.moveToken(fromPosition20, fromPosition2);

         // Run.
         var result = environment.getTokensTouching(token0);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 1);
         assert.equal(result[0].pilot().shipTeam.shipKey, Ship.X_WING);
      });

      QUnit.test("getUnfriendlyTokensAtRange() one", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var attacker = environment.tokens()[2]; // X-Wing
         var attackerPosition0 = environment.getPositionFor(attacker);
         var attackerPosition = new Position(458, 50, -90);
         environment.moveToken(attackerPosition0, attackerPosition);

         // Run.
         var result = environment.getUnfriendlyTokensAtRange(attacker, RangeRuler.TWO);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(result[1].pilotKey(), Pilot.DARK_CURSE);
      });

      QUnit.test("incrementRound()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         assert.equal(environment.round(), 0);

         // Run.
         environment.incrementRound();

         // Verify.
         assert.equal(environment.round(), 1);
      });

      QUnit.test("moveToken()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[0];
         var fromPosition = environment.getPositionFor(token);
         var toPosition = new Position(fromPosition.x() + 100, fromPosition.y() + 100, fromPosition.heading() + 90);
         assert.equal(environment.getPositionFor(token), fromPosition);
         assert.ok(environment.getTokenAt(fromPosition).equals(token));

         // Run.
         environment.moveToken(fromPosition, toPosition);

         // Verify.
         assert.strictEqual(environment.getPositionFor(token), toPosition);
         assert.ok(environment.getTokenAt(toPosition).equals(token));
      });

      QUnit.test("playFormatKey() Standard", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run.
         var result = environment.playFormatKey();

         // Verify.
         assert.ok(result);
         assert.equal(result, PlayFormat.STANDARD);
      });

      QUnit.test("playFormatKey() Epic", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createHugeShipEnvironment();

         // Run.
         var result = environment.playFormatKey();

         // Verify.
         assert.ok(result);
         assert.equal(result, PlayFormat.EPIC);
      });

      QUnit.test("removeToken()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[0];
         var position = environment.getPositionFor(token);
         assert.equal(environment.getPositionFor(token), position);
         assert.ok(environment.getTokenAt(position).equals(token));

         // Run.
         environment.removeToken(token);

         // Verify.
         assert.strictEqual(environment.getPositionFor(token), undefined);
         assert.strictEqual(environment.getTokenAt(position), undefined);
      });

      QUnit.test("setTokenTouching()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var token = environment.tokens()[0];
         assert.equal(environment.isTouching(token), false);

         // Run.
         environment.setTokenTouching(token, true);

         // Verify.
         assert.equal(environment.isTouching(token), true);
      });

      QUnit.test("tokens()", function(assert)
      {
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         var tokens = environment.tokens();
         assert.equal(tokens.length, 3);
         assert.equal(tokens[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(tokens[1].pilotKey(), Pilot.DARK_CURSE);
         assert.equal(tokens[2].pilotKey(), Pilot.LUKE_SKYWALKER);
      });

      QUnit.test("tokens() Pure", function(assert)
      {
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         var isPure = true;
         var tokens = environment.tokens(isPure);
         assert.equal(tokens.length, 3);
         assert.equal(tokens[0].pilotKey(), Pilot.MAULER_MITHEL);
         assert.equal(tokens[1].pilotKey(), Pilot.DARK_CURSE);
         assert.equal(tokens[2].pilotKey(), Pilot.LUKE_SKYWALKER);
      });

      QUnit.test("toString()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();

         // Run / Verify.
         assert.equal(environment.toString(), "(305, 20, 90) 1 \"Mauler Mithel\" (TIE Fighter)\n(610, 20, 90) 2 \"Dark Curse\" (TIE Fighter)\n(458, 895, 270) 3 Luke Skywalker (X-Wing)\n");
      });
   });
