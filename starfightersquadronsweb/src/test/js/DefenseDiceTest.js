define([ "DefenseDice" ], function(DefenseDice)
{
    "use strict";
    QUnit.module("DefenseDice");

    QUnit.test("DefenseDice properties", function(assert)
    {
        var dice = new DefenseDice(3);
        assert.ok(dice.value(0));
        assert.ok(dice.value(1));
        assert.ok(dice.value(2));
    });

    QUnit.test("blankCount()", function(assert)
    {
        var dice = new DefenseDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == DefenseDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 1);
        }
        else
        {
            assert.equal(dice.blankCount(), 0);
        }
    });

    QUnit.test("evadeCount()", function(assert)
    {
        var dice = new DefenseDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == DefenseDice.Value.EVADE)
        {
            assert.equal(dice.evadeCount(), 1);
        }
        else
        {
            assert.equal(dice.evadeCount(), 0);
        }
    });

    QUnit.test("focusCount()", function(assert)
    {
        var dice = new DefenseDice(1);
        LOGGER.trace("dice = " + dice);
        if (dice.value(0) == DefenseDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 1);
        }
        else
        {
            assert.equal(dice.focusCount(), 0);
        }
    });

    QUnit.test("rerollBlank()", function(assert)
    {
        var dice;
        do
        {
            dice = new DefenseDice(1);
        }
        while (dice.blankCount() === 0)

        // Run.
        dice.rerollBlank();

        // Verify.
        if (dice.value(0) === DefenseDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 1);
        }
        else
        {
            assert.equal(dice.blankCount(), 0);
        }
    });
});
