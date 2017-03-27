"use strict";
QUnit.module("ObjectAugments");

var LOGGER = new Logger();

QUnit.test("values()", function(assert)
{
    // Setup.
    var obj = {
        foo: "bar",
        baz: 42
    };

    // Run.
    var result = Object.values(obj);

    // Verify.
    assert.ok(result);
    assert.ok(Array.isArray(result));
    assert.equal(result.length, 2);
    assert.equal(result[0], "bar");
    assert.equal(result[1], 42);
});

QUnit.test("vizziniIsEmpty()", function(assert)
{
    assert.ok(Object.vizziniIsEmpty(null));
    assert.ok(Object.vizziniIsEmpty(
    {}));
    assert.ok(Object.vizziniIsEmpty([]));
    assert.ok(Object.vizziniIsEmpty(""));

    assert.ok(!Object.vizziniIsEmpty(
    {
        a: 1,
    }));
    assert.ok(!Object.vizziniIsEmpty([1]));
    assert.ok(!Object.vizziniIsEmpty("a"));
});

QUnit.test("vizziniMerge()", function(assert)
{
    // Setup.
    var obj1 = {
        a: 1,
        b: 2,
    };
    var obj2 = {
        c: 3,
        d: 4,
    };

    // Run.
    Object.vizziniMerge(obj1, obj2);

    // Verify.
    assert.ok(obj1.a);
    assert.ok(obj1.b);
    assert.ok(obj1.c);
    assert.ok(obj1.d);
    assert.equal(obj1.a, 1);
    assert.equal(obj1.b, 2);
    assert.equal(obj1.c, 3);
    assert.equal(obj1.d, 4);
});
