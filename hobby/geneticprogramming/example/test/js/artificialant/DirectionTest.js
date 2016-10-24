define([ "../../../../example/main/js/artificialant/Direction" ], function(Direction)
{
    "use strict";
    QUnit.module("Direction");

    QUnit.test("Direction properties North", function(assert)
    {
        var directionKey = Direction.NORTH;
        var direction = Direction.properties[directionKey];
        assert.equal(direction.name, "North");
        assert.equal(direction.dx, 0);
        assert.equal(direction.dy, -1);
        assert.equal(direction.value, directionKey);
    });

    QUnit.test("Direction properties East", function(assert)
    {
        var directionKey = Direction.EAST;
        var direction = Direction.properties[directionKey];
        assert.equal(direction.name, "East");
        assert.equal(direction.dx, 1);
        assert.equal(direction.dy, 0);
        assert.equal(direction.value, directionKey);
    });

    QUnit.test("Direction properties South", function(assert)
    {
        var directionKey = Direction.SOUTH;
        var direction = Direction.properties[directionKey];
        assert.equal(direction.name, "South");
        assert.equal(direction.dx, 0);
        assert.equal(direction.dy, 1);
        assert.equal(direction.value, directionKey);
    });

    QUnit.test("Direction properties West", function(assert)
    {
        var directionKey = Direction.WEST;
        var direction = Direction.properties[directionKey];
        assert.equal(direction.name, "West");
        assert.equal(direction.dx, -1);
        assert.equal(direction.dy, 0);
        assert.equal(direction.value, directionKey);
    });

    QUnit.test("left() North", function(assert)
    {
        // Setup.
        var directionKey = Direction.NORTH;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.left();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.WEST);
    });

    QUnit.test("left() East", function(assert)
    {
        // Setup.
        var directionKey = Direction.EAST;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.left();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.NORTH);
    });

    QUnit.test("left() South", function(assert)
    {
        // Setup.
        var directionKey = Direction.SOUTH;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.left();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.EAST);
    });

    QUnit.test("left() West", function(assert)
    {
        // Setup.
        var directionKey = Direction.WEST;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.left();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.SOUTH);
    });

    QUnit.test("right() North", function(assert)
    {
        // Setup.
        var directionKey = Direction.NORTH;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.right();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.EAST);
    });

    QUnit.test("right() East", function(assert)
    {
        // Setup.
        var directionKey = Direction.EAST;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.right();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.SOUTH);
    });

    QUnit.test("right() South", function(assert)
    {
        // Setup.
        var directionKey = Direction.SOUTH;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.right();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.WEST);
    });

    QUnit.test("right() West", function(assert)
    {
        // Setup.
        var directionKey = Direction.WEST;
        var direction = Direction.properties[directionKey];

        // Run.
        var result = direction.right();

        // Verify.
        assert.ok(result);
        assert.equal(result, Direction.NORTH);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Direction.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Direction);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Direction[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Direction.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Direction[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Direction.values();

        // Verify.
        assert.ok(result);
        var length = 4;
        assert.equal(result.length, length);
        assert.equal(result[0], "north");
        assert.equal(result[length - 1], "west");

        var properties = Object.getOwnPropertyNames(Direction);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
