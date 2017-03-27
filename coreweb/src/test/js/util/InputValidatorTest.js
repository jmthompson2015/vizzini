"use strict";
QUnit.module("InputValidator");

var LOGGER = new Logger();
var SHOULD_THROW = "Should have thrown an exception.";

QUnit.test("isArray()", function(assert)
{
    var array = [1, 2, 3, 4];
    assert.ok(!InputValidator.isArray());
    assert.ok(!InputValidator.isArray(undefined));
    assert.ok(!InputValidator.isArray(null));
    assert.ok(!InputValidator.isArray(false));
    assert.ok(!InputValidator.isArray(""));
    assert.ok(!InputValidator.isArray(12));
    assert.ok(InputValidator.isArray([]));
    assert.ok(InputValidator.isArray(array));
});

QUnit.test("isNumber()", function(assert)
{
    var array = [1, 2, 3, 4];
    assert.ok(!InputValidator.isNumber());
    assert.ok(!InputValidator.isNumber(undefined));
    assert.ok(!InputValidator.isNumber(null));
    assert.ok(!InputValidator.isNumber(false));
    assert.ok(!InputValidator.isNumber(""));
    assert.ok(InputValidator.isNumber(12));
    assert.ok(!InputValidator.isNumber([]));
    assert.ok(!InputValidator.isNumber(array));
});

QUnit.test("validateNotEmpty()", function(assert)
{
    try
    {
        InputValidator.validateNotEmpty();
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "undefined" + InputValidator.EMPTY);
    }
    try
    {
        InputValidator.validateNotEmpty("value");
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.EMPTY);
    }
    try
    {
        InputValidator.validateNotEmpty("value", undefined);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.EMPTY);
    }
    try
    {
        InputValidator.validateNotEmpty("value", null);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.EMPTY);
    }
});

QUnit.test("validateNotEmpty() boolean", function(assert)
{
    InputValidator.validateNotEmpty("value", false);
    InputValidator.validateNotEmpty("value", true);
    assert.ok(true);
});

QUnit.test("validateNotEmpty() string", function(assert)
{
    try
    {
        InputValidator.validateNotEmpty("value", "");
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.EMPTY);
    }

    InputValidator.validateNotEmpty("value", "string");
});

QUnit.test("validateNotEmpty() number", function(assert)
{
    try
    {
        InputValidator.validateNotEmpty("value", NaN);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.EMPTY);
    }

    InputValidator.validateNotEmpty("value", 0);
    InputValidator.validateNotEmpty("value", 12);
});

QUnit.test("validateNotEmpty() array", function(assert)
{
    try
    {
        InputValidator.validateNotEmpty("value", []);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.EMPTY);
    }

    InputValidator.validateNotEmpty("value", [1, 2, 3, 4]);
});

QUnit.test("validateNotEmpty() object", function(assert)
{
    var object = {};
    InputValidator.validateNotEmpty("value", object);
    assert.ok(true);
});

QUnit.test("validateNotNull() undefined", function(assert)
{
    try
    {
        InputValidator.validateNotNull();
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "undefined" + InputValidator.UNDEFINED);
    }
    try
    {
        InputValidator.validateNotNull("value");
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.UNDEFINED);
    }
    try
    {
        InputValidator.validateNotNull("value", undefined);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.UNDEFINED);
    }
});

QUnit.test("validateNotNull() null", function(assert)
{
    try
    {
        InputValidator.validateNotNull("value", null);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.NULL);
    }
    try
    {
        InputValidator.validateNotNull("value", null);
        throw SHOULD_THROW;
    }
    catch (e)
    {
        assert.equal(e, "value" + InputValidator.NULL);
    }
});
