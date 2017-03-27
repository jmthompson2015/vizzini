"use strict";
QUnit.module("ArrayAugments");

QUnit.test("vizziniAddAll()", function(assert)
{
    // Setup.
    var array1 = [1];
    var array2 = [2, 3, 4];

    // Run.
    array1.vizziniAddAll(array2);

    // Verify.
    assert.equal(array1.length, 4);
    assert.equal(array1[0], 1);
    assert.equal(array1[1], 2);
    assert.equal(array1[2], 3);
    assert.equal(array1[3], 4);
});

QUnit.test("vizziniContains()", function(assert)
{
    var array = [1, 2, 3, 4];
    assert.ok(!array.vizziniContains(0));
    assert.ok(array.vizziniContains(1));
    assert.ok(array.vizziniContains(2));
    assert.ok(array.vizziniContains(3));
    assert.ok(array.vizziniContains(4));
    assert.ok(!array.vizziniContains(5));
});

QUnit.test("vizziniContainsUsingEquals() 0", function(assert)
{
    // Setup.
    var array = [1, 2, 3, 4];
    var equalsFunction = function(a, b)
    {
        return a === b;
    }

    // Run / Verify.
    assert.ok(!array.vizziniContainsUsingEquals(0, equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals(1, equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals(2, equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals(3, equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals(4, equalsFunction));
    assert.ok(!array.vizziniContainsUsingEquals(5, equalsFunction));
});

QUnit.test("vizziniContainsUsingEquals() 1", function(assert)
{
    // Setup.
    var array = [
                [0, 1],
                [1, 2],
                [2, 3]
            ];
    var equalsFunction = function(a, b)
    {
        return a.vizziniEquals(b);
    }

    // Run / Verify.
    assert.ok(!array.vizziniContainsUsingEquals(0, equalsFunction));
    assert.ok(!array.vizziniContainsUsingEquals([0], equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals([0, 1], equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals([1, 2], equalsFunction));
    assert.ok(array.vizziniContainsUsingEquals([2, 3], equalsFunction));
    assert.ok(!array.vizziniContainsUsingEquals(4, equalsFunction));
});

QUnit.test("vizziniContainsUsingArrayEquals()", function(assert)
{
    // Setup.
    var array = [
                [0, 1],
                [1, 2],
                [2, 3]
            ];

    // Run / Verify.
    assert.ok(!array.vizziniContainsUsingArrayEquals(0));
    assert.ok(!array.vizziniContainsUsingArrayEquals([0]));
    assert.ok(array.vizziniContainsUsingArrayEquals([0, 1]));
    assert.ok(array.vizziniContainsUsingArrayEquals([1, 2]));
    assert.ok(array.vizziniContainsUsingArrayEquals([2, 3]));
    assert.ok(!array.vizziniContainsUsingArrayEquals(4));
});

QUnit.test("vizziniEquals()", function(assert)
{
    // Setup.
    var a = [1, 2, 3, 4];
    var b = [4, 3, 2, 1];
    var c = [1, 2, 3, 4];

    // Run / Verify.
    assert.ok(a.vizziniEquals(a));
    assert.ok(!a.vizziniEquals(b));
    assert.ok(a.vizziniEquals(c));

    assert.ok(!b.vizziniEquals(a));
    assert.ok(b.vizziniEquals(b));
    assert.ok(!b.vizziniEquals(c));

    assert.ok(c.vizziniEquals(a));
    assert.ok(!c.vizziniEquals(b));
    assert.ok(c.vizziniEquals(c));

    assert.ok(!a.vizziniEquals(null));
    assert.ok(!a.vizziniEquals("null"));
});

QUnit.test("vizziniIntersect()", function(assert)
{
    // Setup.
    var array1 = [1, 2, 3];
    var array2 = [2, 3, 4, 5];

    // Run.
    var result = array1.vizziniIntersect(array2);

    // Verify.
    assert.ok(result);
    assert.equal(result.length, 2);
    assert.equal(result.join(","), "2,3");
    assert.equal(array1.length, 3);
    assert.equal(array1.join(","), "1,2,3");
    assert.equal(array2.length, 4);
    assert.equal(array2.join(","), "2,3,4,5");
});

QUnit.test("vizziniRandomElement()", function(assert)
{
    var array = [1, 2, 3, 4];

    for (var i = 0; i < 10; i++)
    {
        assert.ok(array.vizziniContains(array.vizziniRandomElement()));
    }
});

QUnit.test("vizziniRemove()", function(assert)
{
    // Setup.
    var array = [1, 2, 3, 4];

    // Run.
    array.vizziniRemove(2);

    // Verify.
    assert.equal(array.length, 3);
    assert.equal(array[0], 1);
    assert.equal(array[1], 3);
    assert.equal(array[2], 4);
});

QUnit.test("vizziniShuffle()", function(assert)
{
    var array = [1, 2, 3, 4];

    for (var i = 0; i < 10; i++)
    {
        array.vizziniShuffle();
        assert.equal(array.length, 4);
        assert.ok(0 < array[0] && array[0] < 5);
    }
});
