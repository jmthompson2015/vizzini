"use strict";
QUnit.module("NumberAugments");

QUnit.test("vizziniIsInteger()", function(assert)
{
    assert.ok(Number.vizziniIsInteger(0));
    assert.ok(Number.vizziniIsInteger(1));
    assert.ok(Number.vizziniIsInteger(1.0));
    assert.ok(!Number.vizziniIsInteger(1.2));
    assert.ok(!Number.vizziniIsInteger(Math.PI));
});
