define([ "AttackDice" ], function(AttackDice)
{
    "use strict";
    QUnit.module("AttackDice");

    QUnit.test("AttackDice properties", function(assert)
    {
        var dice = new AttackDice(3);
        assert.ok(dice.value(0));
        assert.ok(dice.value(1));
        assert.ok(dice.value(2));
    });

    QUnit.test("blankCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == AttackDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 1);
        }
        else
        {
            assert.equal(dice.blankCount(), 0);
        }
    });

    QUnit.test("criticalHitCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == AttackDice.Value.CRITICAL_HIT)
        {
            assert.equal(dice.criticalHitCount(), 1);
        }
        else
        {
            assert.equal(dice.criticalHitCount(), 0);
        }
    });

    QUnit.test("focusCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 1);
        }
        else
        {
            assert.equal(dice.focusCount(), 0);
        }
    });

    QUnit.test("hitCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == AttackDice.Value.HIT)
        {
            assert.equal(dice.hitCount(), 1);
        }
        else
        {
            assert.equal(dice.hitCount(), 0);
        }
    });

    QUnit.test("rerollBlank()", function(assert)
    {
        var dice;
        do
        {
            dice = new AttackDice(1);
        }
        while (dice.blankCount() === 0)

        // Run.
        dice.rerollBlank();

        // Verify.
        if (dice.value(0) === AttackDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 1);
        }
        else
        {
            assert.equal(dice.blankCount(), 0);
        }
    });
});
