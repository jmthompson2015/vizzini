define([ "Adjudicator", "CombatAction", "Environment", "Maneuver", "Phase", "Position", "Range", "Token" ], function(
        Adjudicator, CombatAction, Environment, Maneuver, Phase, Position, Range, Token)
{
    QUnit.module("CombatAction");

    QUnit.test("CombatAction.doIt() out of range", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var maneuver = Maneuver.STRAIGHT_1_EASY;
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        assert.ok(attacker);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(attackerPosition.getX(), attackerPosition.getY(), -30);
        environment.placeToken(attackerPosition, attacker);
        var weapon;
        var defenderPosition = new Position(305, 20, 90);
        var defender = environment.getTokenAt(defenderPosition);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.ok(!attacker.getRange());
    });

    QUnit.skip("CombatAction.doIt() range one", function(assert)
    {
        // Setup.
        Token.resetNextId();
        var environment = Environment.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var maneuver = Maneuver.STRAIGHT_1_EASY;
        var attacker = environment.getTokens()[2]; // X-Wing
        assert.ok(attacker);
        var weapon = attacker.getPrimaryWeapon();
        assert.ok(weapon);
        var defenderPosition = new Position(305, 20, 90); // TIE Fighter
        var defender = environment.getTokens()[0];
        defender.increaseEvadeCount();
        environment.removeToken(attackerPosition);
        var attackerPosition = new Position(defenderPosition.getX(), defenderPosition.getY() + 50, -90);
        environment.placeToken(attackerPosition, attacker);
        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                defenderPosition);

        // Run.
        combatAction.doIt();

        // Verify.
        assert.equal(attacker.getRange(), Range.ONE);
        assert.equal(environment.getPhase(), Phase.COMBAT_DEAL_DAMAGE);
    });
});
