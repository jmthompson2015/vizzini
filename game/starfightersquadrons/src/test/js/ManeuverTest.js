define(["Bearing", "Difficulty", "Maneuver"], function(Bearing, Difficulty, Maneuver)
{
    "use strict";
    QUnit.module("Maneuver");

    QUnit.test("Maneuver properties Straight1Standard", function(assert)
    {
        var maneuver = Maneuver.STRAIGHT_1_STANDARD;
        var properties = Maneuver.properties[maneuver];
        assert.equal(properties.bearingKey, Bearing.STRAIGHT);
        assert.equal(properties.speed, 1);
        assert.equal(properties.energy, undefined);
        assert.equal(properties.difficultyKey, Difficulty.STANDARD);
        assert.equal(properties.value, maneuver);
    });

    QUnit.test("Maneuver properties Straight1_3", function(assert)
    {
        var maneuver = Maneuver.STRAIGHT_1_3;
        var properties = Maneuver.properties[maneuver];
        assert.equal(properties.bearingKey, Bearing.STRAIGHT);
        assert.equal(properties.speed, 1);
        assert.equal(properties.energy, 3);
        assert.equal(properties.difficultyKey, Difficulty.STANDARD);
        assert.equal(properties.value, maneuver);
    });

    QUnit.test("Maneuver.find()", function(assert)
    {
        assert.equal(Maneuver.find(Bearing.STRAIGHT, 1, Difficulty.EASY), Maneuver.STRAIGHT_1_EASY);
        assert.equal(Maneuver.find(Bearing.BANK_RIGHT, 2, Difficulty.STANDARD), Maneuver.BANK_RIGHT_2_STANDARD);
        assert.equal(Maneuver.find(Bearing.BARREL_ROLL_LEFT, 1, Difficulty.STANDARD),
            Maneuver.BARREL_ROLL_LEFT_1_STANDARD);
        assert.equal(Maneuver.find(Bearing.TURN_LEFT, 3, Difficulty.HARD), Maneuver.TURN_LEFT_3_HARD);
        assert.equal(Maneuver.find(undefined, 0, Difficulty.HARD), Maneuver.STATIONARY_0_HARD);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = Maneuver.values();
        var ownPropertyNames = Object.getOwnPropertyNames(Maneuver);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = Maneuver[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(Maneuver.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return Maneuver[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("Maneuver.toString()", function(assert)
    {
        assert.equal(Maneuver.toString(Maneuver.TURN_LEFT_1_STANDARD), "Turn Left 1 Standard");
        assert.equal(Maneuver.toString(Maneuver.BANK_LEFT_1_EASY), "Bank Left 1 Easy");
        assert.equal(Maneuver.toString(Maneuver.STRAIGHT_1_EASY), "Straight 1 Easy");
        assert.equal(Maneuver.toString(Maneuver.BANK_RIGHT_1_EASY), "Bank Right 1 Easy");
        assert.equal(Maneuver.toString(Maneuver.TURN_RIGHT_1_STANDARD), "Turn Right 1 Standard");

        assert.equal(Maneuver.toString(Maneuver.TURN_LEFT_2_STANDARD), "Turn Left 2 Standard");
        assert.equal(Maneuver.toString(Maneuver.BANK_LEFT_2_STANDARD), "Bank Left 2 Standard");
        assert.equal(Maneuver.toString(Maneuver.STRAIGHT_2_STANDARD), "Straight 2 Standard");
        assert.equal(Maneuver.toString(Maneuver.BANK_RIGHT_2_STANDARD), "Bank Right 2 Standard");
        assert.equal(Maneuver.toString(Maneuver.TURN_RIGHT_2_STANDARD), "Turn Right 2 Standard");
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Maneuver.values();

        // Verify.
        assert.ok(result);
        var length = 77;
        assert.equal(result.length, length);
        assert.equal(result[0], "bankLeft1Easy");
        assert.equal(result[length - 1], "turnRight3Standard");

        var properties = Object.getOwnPropertyNames(Maneuver);
        var count = properties.length - 1 - // properties
            1 - // find
            1 - // toString
            1; // values
        assert.equal(result.length, count);
    });
});
