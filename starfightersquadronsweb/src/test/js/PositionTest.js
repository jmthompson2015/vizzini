define([ "Position" ], function(Position)
{
    QUnit.module("Position");

    QUnit.test("Position()", function(assert)
    {
        var position = new Position(1, 2, 3);

        assert.equal(position.x(), 1);
        assert.equal(position.y(), 2);
        assert.equal(position.heading(), 3);
    });

    QUnit.test("Position() out of area", function(assert)
    {
        try
        {
            var position = new Position(-1, -2, 3);
            throw "Should have thrown an exception";
        }
        catch (e)
        {
            assert.equal(e.message, "Coordinates are not in the play area: (-1, -2)");
        }
    });

    QUnit.test("Position() over 360", function(assert)
    {
        var position = new Position(1, 2, 363);

        assert.equal(position.x(), 1);
        assert.equal(position.y(), 2);
        assert.equal(position.heading(), 3);
    });

    QUnit.test("Position() constants", function(assert)
    {
        assert.equal(Position.MAX_X, 915);
        assert.equal(Position.MAX_Y, 915);

        var position = Position.ZERO;

        assert.equal(position.x(), 0);
        assert.equal(position.y(), 0);
        assert.equal(position.heading(), 0);
    });

    QUnit.test("Position.compareTo()", function(assert)
    {
        // Setup.
        var position0 = new Position(1, 2, 3);
        var position1 = new Position(2, 3, 4);
        var position2 = new Position(1, 2, 4);

        // Run / Verify.
        assert.equal(position0.compareTo(position0), 0);
        assert.equal(position0.compareTo(position1), -1);
        assert.equal(position0.compareTo(position2), -1);

        assert.equal(position1.compareTo(position0), 1);
        assert.equal(position1.compareTo(position1), 0);
        assert.equal(position1.compareTo(position2), 1);

        assert.equal(position2.compareTo(position0), 1);
        assert.equal(position2.compareTo(position1), -1);
        assert.equal(position2.compareTo(position2), 0);
    });

    QUnit.test("Position.computeBearing()", function(assert)
    {
        // Setup.
        var x = 10;
        var y = 10;
        var position = new Position(x, y, 0);

        // Run / Verify.
        assert.equal(position.computeBearing(x + 1, y + 0), 0);
        assert.equal(position.computeBearing(x + 1, y + 1), 45);
        assert.equal(position.computeBearing(x - 0, y + 1), 90);
        assert.equal(position.computeBearing(x - 1, y + 1), 135);
        assert.equal(position.computeBearing(x - 1, y - 0), 180);
        assert.equal(position.computeBearing(x - 1, y - 1), 225);
        assert.equal(position.computeBearing(x + 0, y - 1), 270);
        assert.equal(position.computeBearing(x + 1, y - 1), 315);
    });

    QUnit.test("Position.computeDistance()", function(assert)
    {
        // Setup.
        var position0 = new Position(100, 200, 0);
        var position1 = new Position(position0.x() + 100, position0.y() + 1, 0);
        var position2 = new Position(position0.x() - 50, position0.y() + 10, 0);
        var position3 = new Position(position0.x() - 10, position0.y() - 50, 0);
        var position4 = new Position(position0.x() + 1, position0.y() - 100, 0);

        // Run / Verify.
        assert.equal(position0.computeDistance(position1), 100);
        assert.equal(position0.computeDistance(position2), 51);
        assert.equal(position0.computeDistance(position3), 51);
        assert.equal(position0.computeDistance(position4), 100);
    });

    QUnit.test("Position.computeHeading()", function(assert)
    {
        var x = 10;
        var y = 10;

        assert.equal(Position.computeHeading(x, y, x + 1, y + 0), 0);
        assert.equal(Position.computeHeading(x, y, x + 1, y + 1), 45);
        assert.equal(Position.computeHeading(x, y, x - 0, y + 1), 90);
        assert.equal(Position.computeHeading(x, y, x - 1, y + 1), 135);
        assert.equal(Position.computeHeading(x, y, x - 1, y - 0), 180);
        assert.equal(Position.computeHeading(x, y, x - 1, y - 1), 225);
        assert.equal(Position.computeHeading(x, y, x + 0, y - 1), 270);
        assert.equal(Position.computeHeading(x, y, x + 1, y - 1), 315);
    });

    QUnit.test("Position().equals()", function(assert)
    {
        var position0 = new Position(1, 2, 363);
        var position1 = new Position(4, 5, 366);
        var position2 = new Position(1, 2, 363);

        assert.ok(position0.equals(position0));
        assert.ok(!position0.equals(position1));
        assert.ok(position0.equals(position2));

        assert.ok(!position1.equals(position0));
        assert.ok(position1.equals(position1));
        assert.ok(!position1.equals(position2));

        assert.ok(position2.equals(position0));
        assert.ok(!position2.equals(position1));
        assert.ok(position2.equals(position2));
    });

    QUnit.test("Position.isPointInPlayArea()", function(assert)
    {
        assert.equal(Position.isPointInPlayArea(3, 4), true);
        assert.equal(Position.isPointInPlayArea(-1, 4), false);
        assert.equal(Position.isPointInPlayArea(3, -1), false);
        assert.equal(Position.isPointInPlayArea(915, 4), false);
        assert.equal(Position.isPointInPlayArea(3, 915), false);
    });

    QUnit.test("Position.normalizeAngle()", function(assert)
    {
        assert.equal(Position.normalizeAngle(3), 3);
        assert.equal(Position.normalizeAngle(363), 3);
        assert.equal(Position.normalizeAngle(-357), 3);
    });

    QUnit.test("Position().toString()", function(assert)
    {
        // Setup.
        var position0 = new Position(1, 2, 363);

        // Run / Verify.
        assert.equal(position0.toString(), "(1, 2, 3)");
    });
});
