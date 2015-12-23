define([ "Adjudicator", "CombatAction", "Environment", "Maneuver", "Phase", "Position", "RangeRuler", "Token" ],
        function(Adjudicator, CombatAction, Environment, Maneuver, Phase, Position, RangeRuler, Token)
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
                attackerPosition = new Position(attackerPosition.x(), attackerPosition.y(), -30);
                environment.placeToken(attackerPosition, attacker);
                var weapon;
                var defenderPosition = new Position(305, 20, 90);
                var defender = environment.getTokenAt(defenderPosition);
                var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon,
                        defender, defenderPosition);

                // Run.
                combatAction.doIt();

                // Verify.
                assert.ok(!attacker.range());
            });

            QUnit.skip("CombatAction.doIt() range one", function(assert)
            {
                // Setup.
                Token.resetNextId();
                var environment = Environment.createCoreSetEnvironment();
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
                var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon,
                        defender, defenderPosition);

                // Run.
                combatAction.doIt();

                // Verify.
                assert.equal(attacker.range(), RangeRuler.ONE);
                assert.equal(environment.phase(), Phase.COMBAT_DEAL_DAMAGE);
            });
        });
