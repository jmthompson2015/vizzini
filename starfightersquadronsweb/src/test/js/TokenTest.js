define([ "Bearing", "DamageCard", "Difficulty", "Environment", "Maneuver", "Pilot", "Range", "Ship", "SimpleAgent",
        "SquadBuilder", "TargetLock", "Team", "Token", "UpgradeCard", "ui/HumanAgent" ], function(Bearing, DamageCard,
        Difficulty, Environment, Maneuver, Pilot, Range, Ship, SimpleAgent, SquadBuilder, TargetLock, Team, Token,
        UpgradeCard, HumanAgent)
{
    QUnit.module("Token");

    QUnit.test("Token basics", function(assert)
    {
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getId(), 1);
        assert.equal(token0.getPilot(), Pilot.ACADEMY_PILOT);
        assert.equal(token0.getShip(), Ship.TIE_FIGHTER);
        assert.equal(token0.getName(), "1 Academy Pilot (TIE Fighter)");
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token1 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        assert.equal(token1.getId(), 2);
        assert.equal(token1.getPilot(), Pilot.ROOKIE_PILOT);
        assert.equal(token1.getShip(), Ship.X_WING);
        assert.equal(token1.getName(), "2 Rookie Pilot (X-Wing)");
    });

    QUnit.test("addCriticalDamage()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.equal(token.getCriticalDamageCount(), 0);
        assert.ok(!token.isCriticallyDamagedWith(damage));

        // Run.
        token.addCriticalDamage(damage);

        // Verify.
        assert.equal(token.getCriticalDamageCount(), 1);
        assert.ok(token.isCriticallyDamagedWith(damage));
    });

    QUnit.test("addCriticalDamage() Chewbacca", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var agent = new SimpleAgent("Imperial Agent", Team.REBEL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.CHEWBACCA, agent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.equal(token.getDamageCount(), 0);
        assert.equal(token.getCriticalDamageCount(), 0);

        // Run.
        token.addCriticalDamage(damage);

        // Verify.
        assert.equal(token.getDamageCount(), 1);
        assert.equal(token.getCriticalDamageCount(), 0);
    });

    QUnit.test("addDamage()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        assert.equal(token.getDamageCount(), 0);

        // Run.
        token.addDamage(damage);

        // Verify.
        assert.equal(token.getDamageCount(), 1);
    });

    QUnit.test("addAttackerTargetLock()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var attacker = environment.getTokens()[0]; // TIE Fighter.
        var defender = environment.getTokens()[2]; // X-Wing.
        assert.equal(attacker.getAttackerTargetLocks().length, 0);
        assert.equal(defender.getDefenderTargetLocks().length, 0);
        var targetLock = new TargetLock(attacker, defender);

        // Run.
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);

        // Verify.
        assert.equal(attacker.getAttackerTargetLocks().length, 1);
        assert.equal(defender.getDefenderTargetLocks().length, 1);
    });

    QUnit.test("computeAttackDiceCount()", function(assert)
    {
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getId(), 1);
        assert.equal(token0.getPilot(), Pilot.ACADEMY_PILOT);
        assert.equal(token0.getShip(), Ship.TIE_FIGHTER);
        assert.equal(token0.getName(), "1 Academy Pilot (TIE Fighter)");
        var environment;
        assert.equal(token0.computeAttackDiceCount(environment, token0.getPrimaryWeapon(), Range.ONE), 3);
        assert.equal(token0.computeAttackDiceCount(environment, token0.getPrimaryWeapon(), Range.TWO), 2);
        assert.equal(token0.computeAttackDiceCount(environment, token0.getPrimaryWeapon(), Range.THREE), 2);

        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token1 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        assert.equal(token1.getId(), 2);
        assert.equal(token1.getPilot(), Pilot.ROOKIE_PILOT);
        assert.equal(token1.getShip(), Ship.X_WING);
        assert.equal(token1.getName(), "2 Rookie Pilot (X-Wing)");
        var environment;
        assert.equal(token1.computeAttackDiceCount(environment, token1.getPrimaryWeapon(), Range.ONE), 4);
        assert.equal(token1.computeAttackDiceCount(environment, token1.getPrimaryWeapon(), Range.TWO), 3);
        assert.equal(token1.computeAttackDiceCount(environment, token1.getPrimaryWeapon(), Range.THREE), 3);
    });

    QUnit.test("computeAttackDiceCount() Blinded Pilot", function(assert)
    {
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var environment;
        assert.equal(token.getDamageCount(), 0);
        assert.equal(token.getCriticalDamageCount(), 0);
        assert.equal(token.computeAttackDiceCount(environment, token.getPrimaryWeapon(), Range.ONE), 3);
        assert.equal(token.computeAttackDiceCount(environment, token.getPrimaryWeapon(), Range.TWO), 2);
        assert.equal(token.computeAttackDiceCount(environment, token.getPrimaryWeapon(), Range.THREE), 2);

        token.addCriticalDamage(DamageCard.BLINDED_PILOT);
        assert.equal(token.getDamageCount(), 0);
        assert.equal(token.getCriticalDamageCount(), 1);
        assert.equal(token.computeAttackDiceCount(environment, token.getPrimaryWeapon(), Range.ONE), 0);
        assert.equal(token.getDamageCount(), 1);
        assert.equal(token.getCriticalDamageCount(), 0);
        // Subsequent calls work normally.
        assert.equal(token.computeAttackDiceCount(environment, token.getPrimaryWeapon(), Range.TWO), 2);
        assert.equal(token.computeAttackDiceCount(environment, token.getPrimaryWeapon(), Range.THREE), 2);
    });

    QUnit.test("computeDefenseDiceCount()", function(assert)
    {
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getId(), 1);
        assert.equal(token0.getPilot(), Pilot.ACADEMY_PILOT);
        assert.equal(token0.getShip(), Ship.TIE_FIGHTER);
        assert.equal(token0.getName(), "1 Academy Pilot (TIE Fighter)");
        var environment;
        assert.equal(token0.computeDefenseDiceCount(token0.getPrimaryWeapon(), Range.ONE), 3);
        assert.equal(token0.computeDefenseDiceCount(token0.getPrimaryWeapon(), Range.TWO), 3);
        assert.equal(token0.computeDefenseDiceCount(token0.getPrimaryWeapon(), Range.THREE), 4);

        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token1 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);
        assert.equal(token1.getId(), 2);
        assert.equal(token1.getPilot(), Pilot.ROOKIE_PILOT);
        assert.equal(token1.getShip(), Ship.X_WING);
        assert.equal(token1.getName(), "2 Rookie Pilot (X-Wing)");
        var environment;
        assert.equal(token1.computeDefenseDiceCount(token1.getPrimaryWeapon(), Range.ONE), 2);
        assert.equal(token1.computeDefenseDiceCount(token1.getPrimaryWeapon(), Range.TWO), 2);
        assert.equal(token1.computeDefenseDiceCount(token1.getPrimaryWeapon(), Range.THREE), 3);
    });

    QUnit.test("equals()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
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
        var environment = Environment.createCoreSetEnvironment();
        var attacker = environment.getTokens()[0];
        var defender = environment.getTokens()[2];
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);

        // Run.
        var result = attacker.findTargetLockByDefender(defender);

        // Verify.
        assert.ok(result);
        assert.equal(result.getAttacker(), attacker);
        assert.equal(result.getDefender(), defender);
    });

    QUnit.test("flipDamageCardFacedown()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;
        token.addCriticalDamage(damage);
        assert.equal(token.getCriticalDamageCount(), 1);
        assert.equal(token.getDamageCount(), 0);

        // Run.
        token.flipDamageCardFacedown(damage);

        // Verify.
        assert.equal(token.getCriticalDamageCount(), 0);
        assert.equal(token.getDamageCount(), 1);
    });

    QUnit.test("getAgilityValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.getAgilityValue(), 3);
        assert.equal(token1.getAgilityValue(), 2);
        assert.equal(token2.getAgilityValue(), 2);
    });

    QUnit.test("getAgilityValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent, UpgradeCard.STEALTH_DEVICE);

        // Run / Verify.
        assert.equal(token.getPilotSkillValue(), 1);
        assert.equal(token.getPrimaryWeaponValue(), 2);
        assert.equal(token.getAgilityValue(), 4);
        assert.equal(token.getHullValue(), 3);
        assert.equal(token.getShieldValue(), 0);
    });

    QUnit.test("getHullValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.getHullValue(), 3);
        assert.equal(token1.getHullValue(), 6);
        assert.equal(token2.getHullValue(), 3);
    });

    QUnit.test("getHullValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent, UpgradeCard.COMBAT_RETROFIT);

        // Run / Verify.
        assert.equal(token.getPilotSkillValue(), 1);
        assert.equal(token.getPrimaryWeaponValue(), 2);
        assert.equal(token.getAgilityValue(), 3);
        assert.equal(token.getHullValue(), 5);
        assert.equal(token.getShieldValue(), 1);
    });

    QUnit.test("getHullValue() Direct Hit", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.getHullValue(), 3);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.DIRECT_HIT);
        assert.equal(token.getHullValue(), 2);
    });

    QUnit.test("getCloakCount()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getCloakCount(), 0);
        token0.increaseCloakCount();
        assert.equal(token0.getCloakCount(), 1);
        token0.decreaseCloakCount();
        assert.equal(token0.getCloakCount(), 0);
        token0.decreaseCloakCount();
        assert.equal(token0.getCloakCount(), 0);
    });

    QUnit.test("getEvadeCount()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getEvadeCount(), 0);
        token0.increaseEvadeCount();
        assert.equal(token0.getEvadeCount(), 1);
        token0.decreaseEvadeCount();
        assert.equal(token0.getEvadeCount(), 0);
        token0.decreaseEvadeCount();
        assert.equal(token0.getEvadeCount(), 0);
    });

    QUnit.test("getFocusCount()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getFocusCount(), 0);
        token0.increaseFocusCount();
        assert.equal(token0.getFocusCount(), 1);
        token0.decreaseFocusCount();
        assert.equal(token0.getFocusCount(), 0);
        token0.decreaseFocusCount();
        assert.equal(token0.getFocusCount(), 0);
    });

    QUnit.test("getIonCount()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getIonCount(), 0);
        token0.increaseIonCount();
        assert.equal(token0.getIonCount(), 1);
        token0.decreaseIonCount();
        assert.equal(token0.getIonCount(), 0);
        token0.decreaseIonCount();
        assert.equal(token0.getIonCount(), 0);
    });

    QUnit.test("getManeuvers()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run.
        var result = token.getManeuvers();

        // Verify.
        assert.equal(result.length, 16);
    });

    QUnit.test("getManeuvers() stressed", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        token.increaseStressCount();

        // Run.
        var result = token.getManeuvers();

        // Verify.
        assert.equal(result.length, 14);
    });

    QUnit.test("getManeuvers() Nien Nunb crew", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token = new Token(Pilot.CHEWBACCA, agent, UpgradeCard.NIEN_NUNB);

        // Run.
        var result = token.getManeuvers();

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

    QUnit.test("getManeuvers() R2 Astromech", function(assert)
    {
        // Setup.
        var agent = new SimpleAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token = new Token(Pilot.LUKE_SKYWALKER, agent, UpgradeCard.R2_ASTROMECH);

        // Run.
        var result = token.getManeuvers();

        // Verify.
        assert.equal(result.length, 15);
        result.forEach(function(maneuver)
        {
            var maneuverProps = Maneuver.properties[maneuver];
            if (maneuverProps.speed === 1 || maneuverProps.speed === 2)
            {
                assert.equal(maneuverProps.difficulty, Difficulty.EASY);
            }
        });
    });

    QUnit.test("getPilotSkillValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.getPilotSkillValue(), 1);
        assert.equal(token1.getPilotSkillValue(), 3);
        assert.equal(token2.getPilotSkillValue(), 2);
    });

    QUnit.test("getPilotSkillValue() Whisper and Veteran Instincts", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.WHISPER, imperialAgent, UpgradeCard.ADVANCED_CLOAKING_DEVICE,
                UpgradeCard.REBEL_CAPTIVE, UpgradeCard.VETERAN_INSTINCTS);

        // Run / Verify.
        assert.equal(token.getPilotSkillValue(), 9);
        assert.equal(token.getPrimaryWeaponValue(), 4);
        assert.equal(token.getAgilityValue(), 2);
        assert.equal(token.getHullValue(), 2);
        assert.equal(token.getShieldValue(), 2);
    });

    QUnit.test("getPilotSkillValue() Damaged Cockpit", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.getPilotSkillValue(), 1);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.DAMAGED_COCKPIT);
        assert.equal(token.getPilotSkillValue(), 0);
    });

    QUnit.test("getPilotSkillValue() Injured Pilot", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.getPilotSkillValue(), 1);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.INJURED_PILOT);
        assert.equal(token.getPilotSkillValue(), 0);
    });

    QUnit.test("getPrimaryWeaponValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.getPrimaryWeaponValue(), 2);
        assert.equal(token1.getPrimaryWeaponValue(), 3);
        assert.equal(token2.getPrimaryWeaponValue(), 3);
    });

    QUnit.test("getPrimaryWeaponValue() Weapon Malfunction", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token.getPrimaryWeaponValue(), 2);

        // Run / Verify.
        token.addCriticalDamage(DamageCard.WEAPON_MALFUNCTION);
        assert.equal(token.getPrimaryWeaponValue(), 1);
    });

    QUnit.test("getShieldCount()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getShieldCount(), 0);
        token0.increaseShieldCount();
        assert.equal(token0.getShieldCount(), 1);
        token0.decreaseShieldCount();
        assert.equal(token0.getShieldCount(), 0);
        token0.decreaseShieldCount();
        assert.equal(token0.getShieldCount(), 0);
    });

    QUnit.test("getShieldValue()", function(assert)
    {
        // Setup.
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var token1 = new Token(Pilot.BOUNTY_HUNTER, imperialAgent);
        var token2 = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run / Verify.
        assert.equal(token0.getShieldValue(), 0);
        assert.equal(token1.getShieldValue(), 4);
        assert.equal(token2.getShieldValue(), 2);
    });

    QUnit.test("getShipActions() Rookie Pilot", function(assert)
    {
        // Setup.
        var rebelAgent = new HumanAgent("Rebel Agent", Team.REBEL, SquadBuilder.CoreSetRebelSquadBuilder);
        var token = new Token(Pilot.ROOKIE_PILOT, rebelAgent);

        // Run.
        var result = token.getShipActions();

        // Verify.
        assert.ok(result);
        // for (var i = 0; i < result.length; i++)
        // {
        // console.log(i + " " + result[i]);
        // }
        assert.equal(result.length, 2);
        assert.equal(result[0], "focus");
        assert.equal(result[1], "targetLock");
    });

    QUnit.test("getStressCount()", function(assert)
    {
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token0 = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        assert.equal(token0.getStressCount(), 0);
        token0.increaseStressCount();
        assert.equal(token0.getStressCount(), 1);
        token0.decreaseStressCount();
        assert.equal(token0.getStressCount(), 0);
        token0.decreaseStressCount();
        assert.equal(token0.getStressCount(), 0);
    });

    QUnit.test("isCloaked()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.SIGMA_SQUADRON_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isCloaked());
        token.increaseCloakCount();
        assert.ok(token.isCloaked());
    });

    QUnit.test("isCriticallyDamagedWith() none", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var damage = DamageCard.BLINDED_PILOT;

        // Run / Verify.
        assert.ok(!token.isCriticallyDamagedWith(damage));
    });

    QUnit.test("isCriticallyDamagedWith()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
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
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
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
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isStressed());
        token.increaseStressCount();
        assert.ok(token.isStressed());
    });

    QUnit.test("isUpgradedWith() none", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var upgrade = UpgradeCard.ADRENALINE_RUSH;
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.ok(!token.isUpgradedWith(upgrade));
    });

    QUnit.test("isUpgradedWith()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var upgrade = UpgradeCard.ADRENALINE_RUSH;
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent, upgrade);

        // Run / Verify.
        assert.ok(token.isUpgradedWith(upgrade));
    });

    QUnit.test("removeCriticalDamage()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
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
        var environment = Environment.createCoreSetEnvironment();
        var token0 = environment.getTokens()[0];
        var token1 = environment.getTokens()[1];
        var token2 = environment.getTokens()[2];

        var targetLock02 = new TargetLock(token0, token2);
        token0.addAttackerTargetLock(targetLock02);
        token2.addDefenderTargetLock(targetLock02);

        var targetLock12 = new TargetLock(token1, token2);
        token1.addAttackerTargetLock(targetLock12);
        token2.addDefenderTargetLock(targetLock12);

        var targetLock20 = new TargetLock(token2, token0);
        token2.addAttackerTargetLock(targetLock20);
        token0.addDefenderTargetLock(targetLock20);

        assert.equal(token0.getAttackerTargetLocks().length, 1);
        assert.equal(token1.getAttackerTargetLocks().length, 1);
        assert.equal(token2.getAttackerTargetLocks().length, 1);

        assert.equal(token0.getDefenderTargetLocks().length, 1);
        assert.equal(token1.getDefenderTargetLocks().length, 0);
        assert.equal(token2.getDefenderTargetLocks().length, 2);

        // Run.
        token2.removeAllTargetLocks();

        // Verify.
        assert.equal(token0.getAttackerTargetLocks().length, 0);
        assert.equal(token1.getAttackerTargetLocks().length, 0);
        assert.equal(token2.getAttackerTargetLocks().length, 0);

        assert.equal(token0.getDefenderTargetLocks().length, 0);
        assert.equal(token1.getDefenderTargetLocks().length, 0);
        assert.equal(token2.getDefenderTargetLocks().length, 0);
    });

    QUnit.test("removeAttackerTargetLock()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var attacker = environment.getTokens()[0];
        var defender = environment.getTokens()[2];
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);
        assert.equal(attacker.getAttackerTargetLocks().length, 1);
        assert.equal(defender.getDefenderTargetLocks().length, 1);

        // Run.
        attacker.removeAttackerTargetLock(targetLock);
        defender.removeDefenderTargetLock(targetLock);

        // Verify.
        assert.equal(attacker.getAttackerTargetLocks().length, 0);
        assert.equal(defender.getDefenderTargetLocks().length, 0);
    });

    QUnit.test("toString()", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL, SquadBuilder.CoreSetImperialSquadBuilder);
        var token = new Token(Pilot.ACADEMY_PILOT, imperialAgent);

        // Run / Verify.
        assert.equal(token.toString(), "1 Academy Pilot (TIE Fighter)");
    });
});
