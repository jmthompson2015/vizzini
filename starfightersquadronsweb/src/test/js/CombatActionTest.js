define([ "Adjudicator", "CombatAction", "Environment", "EnvironmentFactory", "Maneuver", "Phase", "Pilot", "Position",
        "RangeRuler", "SimpleAgent", "TargetLock", "Team", "Token", "UpgradeCard" ], function(Adjudicator,
        CombatAction, Environment, EnvironmentFactory, Maneuver, Phase, Pilot, Position, RangeRuler, SimpleAgent,
        TargetLock, Team, Token, UpgradeCard)
{
    "use strict";
    QUnit.module("CombatAction");

    QUnit.test("CombatAction.doIt() out of range", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var maneuver = Maneuver.STRAIGHT_1_EASY;
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(attackerPosition.x(), attackerPosition.y(), -30);
        environment.placeToken(attackerPosition, attacker);
        var weapon = attacker.primaryWeapon();
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.combatState().range());
    });

    QUnit.skip("CombatAction.doIt() range one", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = EnvironmentFactory.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var maneuver = Maneuver.STRAIGHT_1_EASY;
        var attacker = environment.tokens()[2]; // X-Wing
        assert.ok(attacker);
        var weapon = attacker.primaryWeapon();
        assert.ok(weapon);
        var defenderPosition = new Position(305, 20, 90); // TIE Fighter
        var defender = environment.tokens()[0];
        defender.increaseEvadeCount();
        environment.removeToken(attackerPosition);
        var attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, -90);
        environment.placeToken(attackerPosition, attacker);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.equal(attacker.range(), RangeRuler.ONE);
        assert.equal(environment.phase(), Phase.COMBAT_DEAL_DAMAGE);
    });

    QUnit.test("CombatAction.doIt() Advanced Proton Torpedoes", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.ADVANCED_PROTON_TORPEDOES;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 5);
    });

    QUnit.test("CombatAction.doIt() Blaster Turret", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.BLASTER_TURRET;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.equal(attacker.focus().count(), 1);
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.equal(attacker.focus().count(), 0);
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        assert.equal(attacker.combatState().attackDice().size(), 3);
    });

    QUnit.test("CombatAction.doIt() Concussion Missiles", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.CONCUSSION_MISSILES;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 4);
    });

    QUnit.test("CombatAction.doIt() Heavy Laser Cannon", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.HEAVY_LASER_CANNON;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        assert.equal(attacker.combatState().attackDice().size(), 4);
    });

    QUnit.test("CombatAction.doIt() Hot Shot Blaster", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.HOT_SHOT_BLASTER;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 3);
    });

    QUnit.test("CombatAction.doIt() Mangler Cannon", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.MANGLER_CANNON;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);
        assert.equal(attacker.combatState().attackDice().size(), 3);
    });

    QUnit.test("CombatAction.doIt() Proton Rockets", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.PROTON_ROCKETS;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 2 + 2);
    });

    QUnit.test("CombatAction.doIt() Proton Torpedoes", function(assert)
    {
        // Setup.
        var upgradeKey = UpgradeCard.PROTON_TORPEDOES;
        var combatAction = createCombatAction(upgradeKey);
        var environment = combatAction.environment();
        var attacker = environment.tokens()[0];
        var defender = environment.tokens()[1];
        assert.ok(attacker.findTargetLockByDefender(defender));
        assert.ok(attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 1);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.findTargetLockByDefender(defender));
        assert.ok(!attacker.isUpgradedWith(upgradeKey));
        assert.equal(attacker.secondaryWeapons().length, 0);
        assert.equal(attacker.combatState().attackDice().size(), 4);
    });

    function createCombatAction(upgradeKey)
    {
        var environment = new Environment(Team.IMPERIAL, Team.REBEL);
        var adjudicator = new Adjudicator();

        var rebelAgent = new SimpleAgent("Rebel Agent", Team.REBEL);
        var attacker = new Token(Pilot.DASH_RENDAR, rebelAgent, upgradeKey);
        var attackerPosition = new Position(458, 895, -90);
        var weapon = attacker.secondaryWeapons()[0];

        var imperialAgent = new SimpleAgent("Imperial Agent", Team.IMPERIAL);
        var defender = new Token(Pilot.ACADEMY_PILOT, imperialAgent);
        var defenderPosition = new Position(450, 845, 90);

        environment.placeToken(attackerPosition, attacker);
        environment.placeToken(defenderPosition, defender);

        attacker.focus().increase();

        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);

        return new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);
    }
});
