"use strict";
QUnit.module("MathAugments");

QUnit.test("vizziniFormat()", function(assert)
{
    assert.equal(Math.vizziniFormat(1.2345, 0), "1");
    assert.equal(Math.vizziniFormat(1.2345, 1), "1.2");
    assert.equal(Math.vizziniFormat(1.2345, 2), "1.23");
    assert.equal(Math.vizziniFormat(1.2345, 3), "1.234");
    assert.equal(Math.vizziniFormat(1.2345, 4), "1.2345");

    assert.equal(Math.vizziniFormat("bob", 0), "bob");
});

QUnit.test("vizziniRandomFloatFromRange()", function(assert)
{
    // Setup.
    var min = 2.5;
    var max = 9.5;

    // Run.
    for (var i = 0; i < 10; i++)
    {
        var result = Math.vizziniRandomRealFromRange(min, max);
        // console.log(result);
        assert.ok(min <= result);
        assert.ok(result < max);
    }
});

QUnit.test("vizziniRandomIntFromRange()", function(assert)
{
    // Setup.
    var min = 1;
    var max = 11;

    // Run.
    for (var i = 0; i < 10; i++)
    {
        var result = Math.vizziniRandomIntFromRange(min, max);
        // console.log(result);
        assert.ok(min <= result);
        assert.ok(result < max);
    }
});

QUnit.test("vizziniRound()", function(assert)
{
    assert.equal(Math.vizziniRound(1.2345, 0), 1);
    assert.equal(Math.vizziniRound(1.2345, 1), 1.2);
    assert.equal(Math.vizziniRound(1.2345, 2), 1.23);
    assert.equal(Math.vizziniRound(1.2345, 3), 1.235);
    assert.equal(Math.vizziniRound(1.2345, 4), 1.2345);
});

QUnit.test("vizziniRound2()", function(assert)
{
    assert.equal(Math.vizziniRound2(1.2345), 1.23);
});

QUnit.test("vizziniRound4()", function(assert)
{
    assert.equal(Math.vizziniRound4(1.2345), 1.2345);
});
