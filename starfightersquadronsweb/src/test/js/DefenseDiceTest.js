define([ "DefenseDice" ], function(DefenseDice)
{
    QUnit.module("DefenseDice");

    QUnit.test("DefenseDice properties", function(assert)
    {
        var dice = new DefenseDice(3);
        assert.ok(dice.getValue(0));
        assert.ok(dice.getValue(1));
        assert.ok(dice.getValue(2));
    });

    QUnit.test("DefenseDice.getBlankCount()", function(assert)
    {
        var dice = new DefenseDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == DefenseDice.Value.BLANK)
        {
            assert.equal(dice.getBlankCount(), 1);
        }
        else
        {
            assert.equal(dice.getBlankCount(), 0);
        }
    });

    QUnit.test("DefenseDice.getEvadeCount()", function(assert)
    {
        var dice = new DefenseDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == DefenseDice.Value.EVADE)
        {
            assert.equal(dice.getEvadeCount(), 1);
        }
        else
        {
            assert.equal(dice.getEvadeCount(), 0);
        }
    });

    QUnit.test("DefenseDice.getFocusCount()", function(assert)
    {
        var dice = new DefenseDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.getValue(0) == DefenseDice.Value.FOCUS)
        {
            assert.equal(dice.getFocusCount(), 1);
        }
        else
        {
            assert.equal(dice.getFocusCount(), 0);
        }
    });
});
