define([ "Bearing", "DamageCard", "Difficulty", "Environment", "EnvironmentFactory", "Maneuver", "ManeuverAction",
        "Pilot", "Position", "RangeRuler", "Ship", "SimpleAgent", "TargetLock", "Team", "Token", "UpgradeCard",
        "UpgradeType", "ui/HumanAgent" ], function(Bearing, DamageCard, Difficulty, Environment, EnvironmentFactory,
        Maneuver, ManeuverAction, Pilot, Position, RangeRuler, Ship, SimpleAgent, TargetLock, Team, Token, UpgradeCard,
        UpgradeType, HumanAgent)
{
    "use strict";
    QUnit.module("Token");

    QUnit.test("Token basics", function(assert)
    {
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.DARTH_VADER, imperialAgent, UpgradeCard.CLUSTER_MISSILES);
        assert.equal(token0.id(), 1);
        assert.equal(token0.pilotKey(), Pilot.DARTH_VADER);
        assert.equal(token0.pilot().shipTeam.shipKey, Ship.TIE_ADVANCED);
        assert.equal(token0.name(), "1 Darth Vader (TIE Advanced)");
        assert.equal(token0.secondaryWeapons().length, 1);
        var weapon0 = token0.secondaryWeapons()[0];
        assert.equal(weapon0.upgradeKey(), UpgradeCard.CLUSTER_MISSILES);

        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token1 = new Token(Pilot.DASH_RENDAR, rebelAgent, UpgradeCard.OUTRIDER, UpgradeCard.PREDATOR,
                UpgradeCard.MANGLER_CANNON, UpgradeCard.CHEWBACCA);
        assert.equal(token1.id(), 2);
        assert.equal(token1.pilotKey(), Pilot.DASH_RENDAR);
        assert.equal(token1.pilot().shipTeam.shipKey, Ship.YT_2400);
        assert.equal(token1.name(), "2 Dash Rendar (YT-2400)");
        assert.equal(token1.secondaryWeapons().length, 1);
        var weapon1 = token1.secondaryWeapons()[0];
        assert.equal(weapon1.upgradeKey(), UpgradeCard.MANGLER_CANNON);
    });

    QUnit.test("addCriticalDamage()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.equal(token.criticalDamageCount(), 0);
        assert.ok(!token.isCriticallyDamagedWith(damage));

        // Run.
        token.addCriticalDamage(damage);

        // Verify.
        assert.equal(token.criticalDamageCount(), 1);
        assert.ok(token.isCriticallyDamagedWith(damage));
    });

    QUnit.test("addCriticalDamage() Chewbacca", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("Imperial Agent", Team.REBEL);
        var token = new Token(Pilot.CHEWBACCA, agent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.equal(token.damageCount(), 0);
        assert.equal(token.criticalDamageCount(), 0);

        // Run.
        token.addCriticalDamage(damage);

        // Verify.
        assert.equal(token.damageCount(), 1);
        assert.equal(token.criticalDamageCount(), 0);
    });

    QUnit.test("addDamage()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.equal(token.damageCount(), 0);

        // Run.
        token.addDamage(damage);

        // Verify.
        assert.equal(token.damageCount(), 1);
    });

    QUnit.test("addAttackerTargetLock()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[0]; // TIE Fighter.
        var defender = environment.tokens()[2]; // X-Wing.
        assert.equal(attacker.attackerTargetLocks().length, 0);
        assert.equal(defender.defenderTargetLocks().length, 0);
        var targetLock = new TargetLock(attacker, defender);

        // Run.
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);

        // Verify.
        assert.equal(attacker.attackerTargetLocks().length, 1);
        assert.equal(defender.defenderTargetLocks().length, 1);
    });

    QUnit.test("addAttackerTargetLock() replace", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[2]; // X-Wing.
        var defender0 = environment.tokens()[0]; // TIE Fighter.
        var targetLock0 = new TargetLock(attacker, defender0);
        attacker.addAttackerTargetLock(targetLock0);
        defender0.addDefenderTargetLock(targetLock0);
        assert.equal(attacker.attackerTargetLocks().length, 1);
        assert.equal(defender0.defenderTargetLocks().length, 1);
        var defender1 = environment.tokens()[1]; // TIE Fighter.
        var targetLock1 = new TargetLock(attacker, defender1);

        // Run.
        attacker.addAttackerTargetLock(targetLock1);
        defender1.addDefenderTargetLock(targetLock1);

        // Verify.
        assert.equal(attacker.attackerTargetLocks().length, 1);
        assert.equal(defender0.defenderTargetLocks().length, 0);
        assert.equal(defender1.defenderTargetLocks().length, 1);
    });

    QUnit.test("computeAttackDiceCount()", function(assert)
    {
        Token.resetNextId();
        var environment = new Environment(Team.IMPERIAL, Team.REBEL);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.id(), 1);
        assert.equal(token0.pilotKey(), Pilot.ACADEMY_PILOT);
        assert.equal(token0.pilot().shipTeam.shipKey, Ship.TIE_FIGHTER);
        assert.equal(token0.name(), "1 Academy Pilot (TIE Fighter)");

        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token1 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        assert.equal(token1.id(), 2);
        assert.equal(token1.pilotKey(), Pilot.ROOKIE_PILOT);
        assert.equal(token1.pilot().shipTeam.shipKey, Ship.X_WING);
        assert.equal(token1.name(), "2 Rookie Pilot (X-Wing)");

        assert.equal(token0.computeAttackDiceCount(environment, token0.primaryWeapon(), token1, RangeRuler.ONE), 3);
        assert.equal(token0.computeAttackDiceCount(environment, token0.primaryWeapon(), token1, RangeRuler.TWO), 2);
        assert.equal(token0.computeAttackDiceCount(environment, token0.primaryWeapon(), token1, RangeRuler.THREE), 2);

        assert.equal(token1.computeAttackDiceCount(environment, token1.primaryWeapon(), token0, RangeRuler.ONE), 4);
        assert.equal(token1.computeAttackDiceCount(environment, token1.primaryWeapon(), token0, RangeRuler.TWO), 3);
        assert.equal(token1.computeAttackDiceCount(environment, token1.primaryWeapon(), token0, RangeRuler.THREE), 3);
    });

    QUnit.test("computeAttackDiceCount() Mauler Mithel", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[0]; // Mauler Mithel
        var defender = environment.tokens()[2]; // X-Wing
        assert.equal(attacker.name(), "1 \"Mauler Mithel\" (TIE Fighter)");
        var weapon = attacker.primaryWeapon();

        // Run / Verify.
        assert.equal(attacker.computeAttackDiceCount(environment, weapon, defender, RangeRuler.ONE), 4);
        assert.equal(attacker.computeAttackDiceCount(environment, weapon, defender, RangeRuler.TWO), 2);
        assert.equal(attacker.computeAttackDiceCount(environment, weapon, defender, RangeRuler.THREE), 2);
    });

    QUnit.test("computeAttackDiceCount() Talonbane Cobra", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var agent = environment.tokens()[0].agent(); // Mauler Mithel
        var token = new Token(Pilot.TALONBANE_COBRA, agent);
        var weapon = token.primaryWeapon();
        var defender = environment.tokens()[2]; // X-Wing

        // Run / Verify.
        assert.equal(token.computeAttackDiceCount(environment, weapon, defender, RangeRuler.ONE), 5);
        assert.equal(token.computeAttackDiceCount(environment, weapon, defender, RangeRuler.TWO), 3);
        assert.equal(token.computeAttackDiceCount(environment, weapon, defender, RangeRuler.THREE), 3);
    });

    QUnit.test("computeAttackDiceCount() Blinded Pilot", function(assert)
    {
        Token.resetNextId();
        var environment = new Environment(Team.IMPERIAL, Team.REBEL);
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var defender = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        assert.equal(token.damageCount(), 0);
        assert.equal(token.criticalDamageCount(), 0);
        assert.equal(token.computeAttackDiceCount(environment, token.primaryWeapon(), defender, RangeRuler.ONE), 3);
        assert.equal(token.computeAttackDiceCount(environment, token.primaryWeapon(), defender, RangeRuler.TWO), 2);
        assert.equal(token.computeAttackDiceCount(environment, token.primaryWeapon(), defender, RangeRuler.THREE), 2);

        token.addCriticalDamage(DamageCard.BLINDED_PILOT);
        assert.equal(token.damageCount(), 0);
        assert.equal(token.criticalDamageCount(), 1);
        assert.equal(token.computeAttackDiceCount(environment, token.primaryWeapon(), defender, RangeRuler.ONE), 0);
        assert.equal(token.damageCount(), 1);
        assert.equal(token.criticalDamageCount(), 0);
        // Subsequent calls work normally.
        assert.equal(token.computeAttackDiceCount(environment, token.primaryWeapon(), defender, RangeRuler.TWO), 2);
        assert.equal(token.computeAttackDiceCount(environment, token.primaryWeapon(), defender, RangeRuler.THREE), 2);
    });

    QUnit.test("computeDefenseDiceCount()", function(assert)
    {
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.id(), 1);
        assert.equal(token0.pilotKey(), Pilot.ACADEMY_PILOT);
        assert.equal(token0.pilot().shipTeam.shipKey, Ship.TIE_FIGHTER);
        assert.equal(token0.name(), "1 Academy Pilot (TIE Fighter)");
        var environment;
        assert.equal(token0.computeDefenseDiceCount(token0.primaryWeapon(), RangeRuler.ONE), 3);
        assert.equal(token0.computeDefenseDiceCount(token0.primaryWeapon(), RangeRuler.TWO), 3);
        assert.equal(token0.computeDefenseDiceCount(token0.primaryWeapon(), RangeRuler.THREE), 4);

        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token1 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        assert.equal(token1.id(), 2);
        assert.equal(token1.pilotKey(), Pilot.ROOKIE_PILOT);
        assert.equal(token1.pilot().shipTeam.shipKey, Ship.X_WING);
        assert.equal(token1.name(), "2 Rookie Pilot (X-Wing)");
        assert.equal(token1.computeDefenseDiceCount(token1.primaryWeapon(), RangeRuler.ONE), 2);
        assert.equal(token1.computeDefenseDiceCount(token1.primaryWeapon(), RangeRuler.TWO), 2);
        assert.equal(token1.computeDefenseDiceCount(token1.primaryWeapon(), RangeRuler.THREE), 3);
    });

    QUnit.test("computeDefenseDiceCount() Talonbane Cobra", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var agent = environment.tokens()[0].agent(); // Mauler Mithel
        var token = new Token(Pilot.TALONBANE_COBRA, agent);
        var weapon = token.primaryWeapon();

        // Run / Verify.
        assert.equal(token.computeDefenseDiceCount( weapon,  RangeRuler.ONE), 2);
        assert.equal(token.computeDefenseDiceCount( weapon,  RangeRuler.TWO), 2);
        assert.equal(token.computeDefenseDiceCount( weapon,  RangeRuler.THREE), 4);
    });

    QUnit.test("discardUpgrade()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.DARTH_VADER, imperialAgent, UpgradeCard.DETERMINATION,
                UpgradeCard.CLUSTER_MISSILES, UpgradeCard.ENGINE_UPGRADE);
        assert.equal(token.upgradeKeys().length, 3);
        assert.equal(token.secondaryWeapons().length, 1);

        // Run.
        token.discardUpgrade(UpgradeCard.CLUSTER_MISSILES);

        // Verify.
        assert.equal(token.upgradeKeys().length, 2);
        assert.equal(token.secondaryWeapons().length, 0);
    });

    QUnit.test("equals()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        var token2 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(token0.equals(token0));
        assert.ok(!token0.equals(token1));
        assert.ok(!token0.equals(token2));

        assert.ok(!token1.equals(token0));
        assert.ok(token1.equals(token1));
        assert.ok(!token1.equals(token2));

        assert.ok(!token2.equals(token0));
        assert.ok(!token2.equals(token1));
        assert.ok(token2.equals(token2));
    });

    QUnit.test("findTargetLockByDefender()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[2];
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);

        // Run.
        var result = attacker.findTargetLockByDefender(defender);

        // Verify.
        assert.ok(result);
        assert.equal(result.attacker(), attacker);
        assert.equal(result.defender(), defender);
    });

    QUnit.test("flipDamageCardFacedown()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        token.addCriticalDamage(damage);
        assert.equal(token.criticalDamageCount(), 1);
        assert.equal(token.damageCount(), 0);

        // Run.
        token.flipDamageCardFacedown(damage);

        // Verify.
        assert.equal(token.criticalDamageCount(), 0);
        assert.equal(token.damageCount(), 1);
    });

    QUnit.test("agilityValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.agilityValue(), 3);
        assert.equal(token1.agilityValue(), 2);
        assert.equal(token2.agilityValue(), 2);
    });

    QUnit.test("agilityValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent, UpgradeCard.STEALTH_DEVICE);

        // Run / Verify.
        assert.equal(token.pilotSkillValue(), 1);
        assert.equal(token.primaryWeaponValue(), 2);
        assert.equal(token.agilityValue(), 4);
        assert.equal(token.hullValue(), 3);
        assert.equal(token.shieldValue(), 0);
    });

    QUnit.test("hullValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.hullValue(), 3);
        assert.equal(token1.hullValue(), 6);
        assert.equal(token2.hullValue(), 3);
    });

    QUnit.test("hullValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent, UpgradeCard.COMBAT_RETROFIT);

        // Run / Verify.
        assert.equal(token.pilotSkillValue(), 1);
        assert.equal(token.primaryWeaponValue(), 2);
        assert.equal(token.agilityValue(), 3);
        assert.equal(token.hullValue(), 5);
        assert.equal(token.shieldValue(), 1);
    });

    QUnit.test("hullValue() Direct Hit", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.hullValue(), 3);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.DIRECT_HIT);
        assert.equal(token.hullValue(), 2);
    });

    QUnit.test("cloak()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.cloak().count(), 0);
        token0.cloak().increase();
        assert.equal(token0.cloak().count(), 1);
        token0.cloak().decrease();
        assert.equal(token0.cloak().count(), 0);
        token0.cloak().decrease();
        assert.equal(token0.cloak().count(), 0);
    });

    QUnit.test("evade()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.evade().count(), 0);
        token0.evade().increase();
        assert.equal(token0.evade().count(), 1);
        token0.evade().decrease();
        assert.equal(token0.evade().count(), 0);
        token0.evade().decrease();
        assert.equal(token0.evade().count(), 0);
    });

    QUnit.test("focus()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.focus().count(), 0);
        token0.focus().increase();
        assert.equal(token0.focus().count(), 1);
        token0.focus().decrease();
        assert.equal(token0.focus().count(), 0);
        token0.focus().decrease();
        assert.equal(token0.focus().count(), 0);
    });

    QUnit.test("ion()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.ion().count(), 0);
        token0.ion().increase();
        assert.equal(token0.ion().count(), 1);
        token0.ion().decrease();
        assert.equal(token0.ion().count(), 0);
        token0.ion().decrease();
        assert.equal(token0.ion().count(), 0);
    });

    QUnit.test("ion token", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, agent);
        token.ion().increase();
        assert.equal(token.ion().count(), 1);

        // Run / Verify.
        var maneuverKeys = token.maneuverKeys();
        assert.ok(maneuverKeys);
        assert.equal(maneuverKeys.length, 1);
        assert.equal(maneuverKeys[0], Maneuver.STRAIGHT_1_STANDARD);

        var environment = new Environment(Team.IMPERIAL, Team.REBEL);
        var fromPosition = new Position(200, 200, 0);
        environment.placeToken(fromPosition, token);
        var maneuverAction = new ManeuverAction(environment, token, Maneuver.STRAIGHT_1_STANDARD);
        maneuverAction.doIt();
        assert.equal(token.ion().count(), 0);
    });

    QUnit.test("maneuverKeys()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 16);
    });

    QUnit.test("maneuverKeys() stressed", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        token.stress().increase();

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 14);
    });

    QUnit.test("maneuverKeys() Damaged Engine", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        token.addCriticalDamage(DamageCard.DAMAGED_ENGINE);

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 16);
        result.forEach(function(maneuver)
        {
            var maneuverProps = Maneuver.properties[maneuver];
            if (maneuverProps.bearing === Bearing.TURN_LEFT || maneuverProps.bearing === Bearing.TURN_RIGHT)
            {
                assert.equal(maneuverProps.difficulty, Difficulty.HARD);
            }
        });
    });

    QUnit.test("maneuverKeys() Nien Nunb crew", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var token = new Token(Pilot.CHEWBACCA, agent, UpgradeCard.NIEN_NUNB);

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 16);
        result.forEach(function(maneuver)
        {
            var maneuverProps = Maneuver.properties[maneuver];
            if (maneuverProps.bearing === Bearing.STRAIGHT)
            {
                assert.equal(maneuverProps.difficulty, Difficulty.EASY);
            }
        });
    });

    QUnit.test("maneuverKeys() R2 Astromech", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var token = new Token(Pilot.LUKE_SKYWALKER, agent, UpgradeCard.R2_ASTROMECH);

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 15);
        result.forEach(function(maneuver)
        {
            var maneuverProps = Maneuver.properties[maneuver];
            if (maneuverProps.speed === 1 || maneuverProps.speed === 2)
            {
                assert.equal(maneuverProps.difficultyKey, Difficulty.EASY);
            }
        });
    });

    QUnit.test("maneuverKeys() Twin Ion Engine Mk. II", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, agent, UpgradeCard.TWIN_ION_ENGINE_MK_II);

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 16);
        result.forEach(function(maneuver)
        {
            var maneuverProps = Maneuver.properties[maneuver];
            if (maneuverProps.bearing === Bearing.BANK_LEFT || maneuverProps.bearing === Bearing.BANK_RIGHT)
            {
                assert.equal(maneuverProps.difficultyKey, Difficulty.EASY);
            }
        });
    });

    QUnit.test("maneuverKeys() Unhinged Astromech", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Scum Agent", Team.SCUM);
        var token = new Token(Pilot.DREA_RENTHAL, agent, UpgradeCard.UNHINGED_ASTROMECH);

        // Run.
        var result = token.maneuverKeys();

        // Verify.
        assert.equal(result.length, 15);
        result.forEach(function(maneuver)
        {
            var maneuverProps = Maneuver.properties[maneuver];
            if (!maneuverProps)
                throw "Unknown maneuver: " + maneuver;
            if (maneuverProps.speed === 3)
            {
                assert.equal(maneuverProps.difficultyKey, Difficulty.EASY);
            }
        });
    });

    QUnit.test("pilotSkillValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.pilotSkillValue(), 1);
        assert.equal(token1.pilotSkillValue(), 3);
        assert.equal(token2.pilotSkillValue(), 2);
    });

    QUnit.test("pilotSkillValue() Whisper and Veteran Instincts", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.WHISPER, imperialAgent, UpgradeCard.ADVANCED_CLOAKING_DEVICE,
                UpgradeCard.REBEL_CAPTIVE, UpgradeCard.VETERAN_INSTINCTS);

        // Run / Verify.
        assert.equal(token.pilotSkillValue(), 9);
        assert.equal(token.primaryWeaponValue(), 4);
        assert.equal(token.agilityValue(), 2);
        assert.equal(token.hullValue(), 2);
        assert.equal(token.shieldValue(), 2);
    });

    QUnit.test("pilotSkillValue() Damaged Cockpit", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.pilotSkillValue(), 1);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.DAMAGED_COCKPIT);
        assert.equal(token.pilotSkillValue(), 0);
    });

    QUnit.test("pilotSkillValue() Injured Pilot", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.pilotSkillValue(), 1);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.INJURED_PILOT);
        assert.equal(token.pilotSkillValue(), 0);
    });

    QUnit.test("primaryWeaponValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.primaryWeaponValue(), 2);
        assert.equal(token1.primaryWeaponValue(), 3);
        assert.equal(token2.primaryWeaponValue(), 3);
    });

    QUnit.test("primaryWeaponValue() Weapon Malfunction", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.primaryWeaponValue(), 2);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.WEAPON_MALFUNCTION);
        assert.equal(token.primaryWeaponValue(), 1);
    });

    QUnit.test("recoverShield() increase to limit", function(assert)
    {
        var agent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var token = new Token(Pilot.LUKE_SKYWALKER, agent);
        assert.equal(token.shieldValue(), 2);
        assert.equal(token.shield().count(), 2);
        token.recoverShield();
        assert.equal(token.shield().count(), 2); // stopped at limit
        token.shield().decrease();
        assert.equal(token.shield().count(), 1);
        token.recoverShield();
        assert.equal(token.shield().count(), 2);
        token.recoverShield();
        assert.equal(token.shield().count(), 2); // stopped at limit
    });

    QUnit.test("secondaryWeapons()", function(assert)
    {
        // Setup.
        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var token = new Token(Pilot.DASH_RENDAR, rebelAgent, UpgradeCard.OUTRIDER, UpgradeCard.CALCULATION,
                UpgradeCard.MANGLER_CANNON, UpgradeCard.CLUSTER_MISSILES, UpgradeCard.ENGINE_UPGRADE);

        // Run.
        var result = token.secondaryWeapons();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.equal(result[0].name(), "\"Mangler\" Cannon");
        assert.equal(result[1].name(), "Cluster Missiles");
    });

    QUnit.test("shield()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.shield().count(), 0);
        token0.shield().increase();
        assert.equal(token0.shield().count(), 1);
        token0.shield().decrease();
        assert.equal(token0.shield().count(), 0);
        token0.shield().decrease();
        assert.equal(token0.shield().count(), 0);
    });

    QUnit.test("shield() increase to limit", function(assert)
    {
        // use recoverShield() instead of shield().increase()
        var agent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var token = new Token(Pilot.LUKE_SKYWALKER, agent);
        assert.equal(token.shieldValue(), 2);
        assert.equal(token.shield().count(), 2);
        token.shield().increase();
        assert.equal(token.shield().count(), 3); // didn't stop at limit
        token.shield().decrease();
        assert.equal(token.shield().count(), 2);
        token.shield().increase();
        assert.equal(token.shield().count(), 3);
        token.shield().increase();
        assert.equal(token.shield().count(), 4); // didn't stop at limit
    });

    QUnit.test("shieldValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.shieldValue(), 0);
        assert.equal(token1.shieldValue(), 4);
        assert.equal(token2.shieldValue(), 2);
    });

    QUnit.test("shipActions() Rookie Pilot", function(assert)
    {
        // Setup.
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL);
        var token = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run.
        var result = token.shipActions();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 2);
        assert.equal(result[0], "focus");
        assert.equal(result[1], "targetLock");
    });

    QUnit.test("stress()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.stress().count(), 0);
        token0.stress().increase();
        assert.equal(token0.stress().count(), 1);
        token0.stress().decrease();
        assert.equal(token0.stress().count(), 0);
        token0.stress().decrease();
        assert.equal(token0.stress().count(), 0);
    });

    QUnit.test("stress() Kyle Katarn", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var token = environment.tokens()[2]; // X-Wing
        token.upgradeKeys().push(UpgradeCard.KYLE_KATARN);
        token.stress().increase();
        assert.equal(token.focus().count(), 0);
        assert.equal(token.stress().count(), 1);
        var maneuverKey = Maneuver.STRAIGHT_1_EASY;
        var maneuverAction = new ManeuverAction(environment, token, maneuverKey);

        // Run.
        maneuverAction.doIt();

        // Verify.
        assert.equal(token.focus().count(), 1);
        assert.equal(token.stress().count(), 0);
    });

    QUnit.test("weaponsDisabled()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.weaponsDisabled().count(), 0);
        token0.weaponsDisabled().increase();
        assert.equal(token0.weaponsDisabled().count(), 1);
        token0.weaponsDisabled().decrease();
        assert.equal(token0.weaponsDisabled().count(), 0);
        token0.weaponsDisabled().decrease();
        assert.equal(token0.weaponsDisabled().count(), 0);
    });

    QUnit.test("isCloaked()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.SIGMA_SQUADRON_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isCloaked());
        assert.equal(token.agilityValue(), 2);
        token.cloak().increase();
        assert.ok(token.isCloaked());
        assert.equal(token.agilityValue(), 4);
    });

    QUnit.test("isCriticallyDamagedWith() none", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;

        // Run / Verify.
        assert.ok(!token.isCriticallyDamagedWith(damage));
    });

    QUnit.test("isCriticallyDamagedWith()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.ok(!token.isCriticallyDamagedWith(damage));
        token.addCriticalDamage(damage);

        // Run / Verify.
        assert.ok(token.isCriticallyDamagedWith(damage));
    });

    QUnit.test("isDestroyed()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isDestroyed());
        token.addCriticalDamage(DamageCard.BLINDED_PILOT);
        assert.ok(!token.isDestroyed());
        token.addDamage(DamageCard.CONSOLE_FIRE);
        assert.ok(!token.isDestroyed());
        token.addCriticalDamage(DamageCard.DAMAGED_COCKPIT);
        assert.ok(token.isDestroyed());
    });

    QUnit.test("isStressed()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isStressed());
        token.stress().increase();
        assert.ok(token.isStressed());
    });

    QUnit.test("isUpgradedWith() none", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var upgrade = UpgradeCard.ADRENALINE_RUSH;
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isUpgradedWith(upgrade));
    });

    QUnit.test("isUpgradedWith()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var upgrade = UpgradeCard.ADRENALINE_RUSH;
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent, upgrade);

        // Run / Verify.
        assert.ok(token.isUpgradedWith(upgrade));
    });

    QUnit.test("removeCriticalDamage()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        token.addCriticalDamage(damage);
        assert.ok(token.isCriticallyDamagedWith(damage));

        // Run.
        token.removeCriticalDamage(damage);

        // Verify.
        assert.ok(!token.isCriticallyDamagedWith(damage));
    });

    QUnit.test("removeAllTargetLocks()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var token0 = environment.tokens()[0];
        var token1 = environment.tokens()[1];
        var token2 = environment.tokens()[2];

        var targetLock02 = new TargetLock(token0, token2);
        token0.addAttackerTargetLock(targetLock02);
        token2.addDefenderTargetLock(targetLock02);

        var targetLock12 = new TargetLock(token1, token2);
        token1.addAttackerTargetLock(targetLock12);
        token2.addDefenderTargetLock(targetLock12);

        var targetLock20 = new TargetLock(token2, token0);
        token2.addAttackerTargetLock(targetLock20);
        token0.addDefenderTargetLock(targetLock20);

        assert.equal(token0.attackerTargetLocks().length, 1);
        assert.equal(token1.attackerTargetLocks().length, 1);
        assert.equal(token2.attackerTargetLocks().length, 1);

        assert.equal(token0.defenderTargetLocks().length, 1);
        assert.equal(token1.defenderTargetLocks().length, 0);
        assert.equal(token2.defenderTargetLocks().length, 2);

        // Run.
        token2.removeAllTargetLocks();

        // Verify.
        assert.equal(token0.attackerTargetLocks().length, 0);
        assert.equal(token1.attackerTargetLocks().length, 0);
        assert.equal(token2.attackerTargetLocks().length, 0);

        assert.equal(token0.defenderTargetLocks().length, 0);
        assert.equal(token1.defenderTargetLocks().length, 0);
        assert.equal(token2.defenderTargetLocks().length, 0);
    });

    QUnit.test("removeAttackerTargetLock()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[2];
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);
        assert.equal(attacker.attackerTargetLocks().length, 1);
        assert.equal(defender.defenderTargetLocks().length, 1);

        // Run.
        attacker.removeAttackerTargetLock(targetLock);
        defender.removeDefenderTargetLock(targetLock);

        // Verify.
        assert.equal(attacker.attackerTargetLocks().length, 0);
        assert.equal(defender.defenderTargetLocks().length, 0);
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.equal(token.toString(), "1 Academy Pilot (TIE Fighter)");
    });

    QUnit.test("upgradeKeys()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var token0 = environment.tokens()[0]; // TIE Fighter.
        var token1 = environment.tokens()[1]; // TIE Fighter.
        var token2 = environment.tokens()[2]; // X-Wing.

        // Run / Verify.
        assert.ok(token0.upgradeKeys());
        assert.equal(token0.upgradeKeys().length, 1);
        assert.ok(token1.upgradeKeys());
        assert.equal(token1.upgradeKeys().length, 0);
        assert.ok(token2.upgradeKeys());
        assert.equal(token2.upgradeKeys().length, 2);
    });

    QUnit.test("upgradeTypeKeys()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var token0 = environment.tokens()[0]; // TIE Fighter.
        var token1 = environment.tokens()[1]; // TIE Fighter.
        var token2 = environment.tokens()[2]; // X-Wing.

        // Run / Verify.
        assert.ok(token0.upgradeTypeKeys());
        assert.equal(token0.upgradeTypeKeys().length, 2);
        assert.ok(token1.upgradeTypeKeys());
        assert.equal(token1.upgradeTypeKeys().length, 1);
        assert.ok(token2.upgradeTypeKeys());
        assert.equal(token2.upgradeTypeKeys().length, 4);
    });

    QUnit.test("upgradeTypeKeys() B-Wing/E2", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("name", Team.IMPERIAL);
        var token = new Token(Pilot.TEN_NUMB, agent, UpgradeCard.B_WING_E2);

        // Run / Verify.
        assert.ok(token.upgradeTypeKeys());
        assert.equal(token.upgradeTypeKeys().length, 7);
        assert.equal(token.upgradeTypeKeys()[0], UpgradeType.ELITE);
        assert.equal(token.upgradeTypeKeys()[5], UpgradeType.MODIFICATION);
        assert.equal(token.upgradeTypeKeys()[6], UpgradeType.CREW);
    });

    QUnit.test("upgradeTypeKeys() Firespray-31 Andrasta", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("name", Team.IMPERIAL);
        var token = new Token(Pilot.BOBA_FETT_IMPERIAL, agent, UpgradeCard.ANDRASTA);

        // Run / Verify.
        assert.ok(token.upgradeTypeKeys());
        assert.equal(token.upgradeTypeKeys().length, 9);
        assert.equal(token.upgradeTypeKeys()[0], UpgradeType.TITLE);
        assert.equal(token.upgradeTypeKeys()[6], UpgradeType.MODIFICATION);
        assert.equal(token.upgradeTypeKeys()[7], UpgradeType.BOMB);
        assert.equal(token.upgradeTypeKeys()[8], UpgradeType.BOMB);
    });

    QUnit.test("upgradeTypeKeys() Firespray-31", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("name", Team.IMPERIAL);
        var token = new Token(Pilot.BOBA_FETT_IMPERIAL, agent);

        // Run / Verify.
        assert.ok(token.upgradeTypeKeys());
        assert.equal(token.upgradeTypeKeys().length, 7);
        assert.equal(token.upgradeTypeKeys()[0], UpgradeType.TITLE);
        assert.equal(token.upgradeTypeKeys()[6], UpgradeType.MODIFICATION);
    });

    QUnit.test("upgradeTypeKeys() TIE Interceptor Royal Guard TIE", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("name", Team.IMPERIAL);
        var token = new Token(Pilot.CARNOR_JAX, agent, UpgradeCard.ROYAL_GUARD_TIE);

        // Run / Verify.
        assert.ok(token.upgradeTypeKeys());
        assert.equal(token.upgradeTypeKeys().length, 4);
        assert.equal(token.upgradeTypeKeys()[0], UpgradeType.TITLE);
        assert.equal(token.upgradeTypeKeys()[1], UpgradeType.ELITE);
        assert.equal(token.upgradeTypeKeys()[2], UpgradeType.MODIFICATION);
        assert.equal(token.upgradeTypeKeys()[3], UpgradeType.MODIFICATION);
    });

    QUnit.test("upgradeTypeKeys() Firespray-31 Andrasta", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("name", Team.IMPERIAL);
        var token = new Token(Pilot.BOBA_FETT_IMPERIAL, agent, UpgradeCard.ANDRASTA);

        // Run / Verify.
        assert.ok(token.upgradeTypeKeys());
        assert.equal(token.upgradeTypeKeys().length, 9);
        assert.equal(token.upgradeTypeKeys()[0], UpgradeType.TITLE);
        assert.equal(token.upgradeTypeKeys()[6], UpgradeType.MODIFICATION);
        assert.equal(token.upgradeTypeKeys()[7], UpgradeType.BOMB);
        assert.equal(token.upgradeTypeKeys()[8], UpgradeType.BOMB);
    });

    QUnit.test("upgradeTypeKeys() Y-Wing Bomb Loadout", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("name", Team.IMPERIAL);
        var token = new Token(Pilot.HORTON_SALM, agent, UpgradeCard.BOMB_LOADOUT);

        // Run / Verify.
        assert.ok(token.upgradeTypeKeys());
        assert.equal(token.upgradeTypeKeys().length, 7);
        assert.equal(token.upgradeTypeKeys()[0], UpgradeType.TITLE);
        assert.equal(token.upgradeTypeKeys()[5], UpgradeType.MODIFICATION);
        assert.equal(token.upgradeTypeKeys()[6], UpgradeType.BOMB);
    });
});
