define(["AttackDice", "CombatState", "DefenseDice", "RangeRuler"],
    function(AttackDice, CombatState, DefenseDice, RangeRuler)
    {
        "use strict";
        QUnit.module("CombatState");

        QUnit.test("attackDice()", function(assert)
        {
            // Setup.
            var initialSize = 3;
            var attackDice = new AttackDice(initialSize);
            var combatState = new CombatState();
            assert.ok(!combatState.attackDice());

            // Run.
            var result = combatState.attackDice(attackDice);

            // Verify.
            assert.ok(result);
            assert.equal(result, attackDice);
        });

        QUnit.test("defenseDice()", function(assert)
        {
            // Setup.
            var initialSize = 3;
            var defenseDice = new DefenseDice(initialSize);
            var combatState = new CombatState();
            assert.ok(!combatState.defenseDice());

            // Run.
            var result = combatState.defenseDice(defenseDice);

            // Verify.
            assert.ok(result);
            assert.equal(result, defenseDice);
        });

        QUnit.test("isDefenderHit()", function(assert)
        {
            // Setup.
            var isDefenderHit = true;
            var combatState = new CombatState();
            assert.ok(!combatState.isDefenderHit());

            // Run.
            var result = combatState.isDefenderHit(isDefenderHit);

            // Verify.
            assert.ok(result);
            assert.equal(result, isDefenderHit);
        });

        QUnit.test("rangeKey()", function(assert)
        {
            // Setup.
            var rangeKey = RangeRuler.ONE;
            var combatState = new CombatState();
            assert.ok(!combatState.rangeKey());

            // Run.
            var result = combatState.rangeKey(rangeKey);

            // Verify.
            assert.ok(result);
            assert.equal(result, rangeKey);
        });
    });
