define(["AttackDice"], function(AttackDice)
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

    QUnit.test("addDie()", function(assert)
    {
        // Setup.
        var dice = new AttackDice(1);

        // Run.
        dice.addDie();

        // Verify.
        assert.equal(dice.size(), 2);
        assert.ok(AttackDice.Value.values().vizziniContains(dice.value(1)));
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

    QUnit.test("newInstance()", function(assert)
    {
        // Setup.
        var dice = new AttackDice(5);

        // Run.
        var result = dice.newInstance();

        // Verify.
        assert.ok(result);
        assert.ok(result !== dice);
        assert.equal(result.size(), dice.size());

        for (var i = 0; i < result.size(); i++)
        {
            assert.equal(result.value(i), dice.value(i));
        }
    });

    QUnit.test("rerollAllFocus()", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(1);
        }
        while (dice.focusCount() === 0);

        // Run.
        dice.rerollAllFocus();

        // Verify.
        if (dice.value(0) === AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 1);
        }
        else
        {
            assert.equal(dice.focusCount(), 0);
        }
    });

    QUnit.test("rerollBlank() 1", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(1);
        }
        while (dice.blankCount() === 0);

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

    QUnit.test("rerollBlank() 2", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(2);
        }
        while (dice.blankCount() < 2);

        // Run.
        dice.rerollBlank(2);

        // Verify.
        if (dice.value(0) === AttackDice.Value.BLANK && dice.value(1) === AttackDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 2);
        }
        else if (dice.value(0) === AttackDice.Value.BLANK || dice.value(1) === AttackDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 1);
        }
        else
        {
            assert.equal(dice.blankCount(), 0);
        }
    });

    QUnit.test("rerollBlankAndFocus() 2, 0", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(2);
        }
        while (dice.blankCount() < 2);

        // Run.
        dice.rerollBlankAndFocus(2);

        // Verify.
        if (dice.value(0) === AttackDice.Value.BLANK && dice.value(1) === AttackDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 2);
        }
        else if (dice.value(0) === AttackDice.Value.BLANK || dice.value(1) === AttackDice.Value.BLANK)
        {
            assert.equal(dice.blankCount(), 1);
        }
        else
        {
            assert.equal(dice.blankCount(), 0);
        }
    });

    QUnit.test("rerollBlankAndFocus() 0, 2", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(2);
        }
        while (dice.focusCount() < 2);

        // Run.
        dice.rerollBlankAndFocus(2);

        // Verify.
        if (dice.value(0) === AttackDice.Value.FOCUS && dice.value(1) === AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 2);
        }
        else if (dice.value(0) === AttackDice.Value.FOCUS || dice.value(1) === AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 1);
        }
        else
        {
            assert.equal(dice.focusCount(), 0);
        }
    });

    QUnit.test("rerollFocus() 1", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(1);
        }
        while (dice.focusCount() === 0);

        // Run.
        dice.rerollFocus();

        // Verify.
        if (dice.value(0) === AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 1);
        }
        else
        {
            assert.equal(dice.focusCount(), 0);
        }
    });

    QUnit.test("rerollFocus() 2", function(assert)
    {
        var dice;
        do {
            dice = new AttackDice(2);
        }
        while (dice.focusCount() < 2);

        // Run.
        dice.rerollFocus(2);

        // Verify.
        if (dice.value(0) === AttackDice.Value.FOCUS && dice.value(1) === AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 2);
        }
        else if (dice.value(0) === AttackDice.Value.FOCUS || dice.value(1) === AttackDice.Value.FOCUS)
        {
            assert.equal(dice.focusCount(), 1);
        }
        else
        {
            assert.equal(dice.focusCount(), 0);
        }
    });
});
