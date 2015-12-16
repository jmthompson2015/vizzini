define([ "AttackDice" ], function(AttackDice)
{
    QUnit.module("AttackDice");

    QUnit.test("AttackDice properties", function(assert)
    {
        var dice = new AttackDice(3);
        assert.ok(dice.getValue(0));
        assert.ok(dice.getValue(1));
        assert.ok(dice.getValue(2));
    });

    QUnit.test("AttackDice.getBlankCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == AttackDice.Value.BLANK)
        {
            assert.equal(dice.getBlankCount(), 1);
        }
        else
        {
            assert.equal(dice.getBlankCount(), 0);
        }
    });

    QUnit.test("AttackDice.getCriticalHitCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == AttackDice.Value.CRITICAL_HIT)
        {
            assert.equal(dice.getCriticalHitCount(), 1);
        }
        else
        {
            assert.equal(dice.getCriticalHitCount(), 0);
        }
    });

    QUnit.test("AttackDice.getFocusCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == AttackDice.Value.FOCUS)
        {
            assert.equal(dice.getFocusCount(), 1);
        }
        else
        {
            assert.equal(dice.getFocusCount(), 0);
        }
    });

    QUnit.test("AttackDice.getHitCount()", function(assert)
    {
        var dice = new AttackDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == AttackDice.Value.HIT)
        {
            assert.equal(dice.getHitCount(), 1);
        }
        else
        {
            assert.equal(dice.getHitCount(), 0);
        }
    });
});
