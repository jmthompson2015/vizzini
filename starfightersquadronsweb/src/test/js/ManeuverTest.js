define([ "Bearing", "Difficulty", "Maneuver", "Position", "ShipBase" ], function(Bearing, Difficulty, Maneuver,
        Position, ShipBase)
{
    QUnit.module("Maneuver");

    QUnit.test("Maneuver properties Straight1Standard", function(assert)
    {
        var maneuver = Maneuver.STRAIGHT_1_STANDARD;
        var properties = Maneuver.properties[maneuver];
        assert.equal(properties.bearing, Bearing.STRAIGHT);
        assert.equal(properties.speed, 1);
        assert.equal(properties.difficulty, Difficulty.STANDARD);
        assert.equal(properties.value, maneuver);
    });

    QUnit.test("Maneuver.computeFromPolygon() 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);

        // Run.
        var result = Maneuver.computeFromPolygon(fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 10);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 20.0);
        assert.equal(points[i++], fromPosition.y() - 20.0);

        assert.equal(points[i++], fromPosition.x() + 20.0);
        assert.equal(points[i++], fromPosition.y() + 20.0);

        assert.equal(points[i++], fromPosition.x() - 20.0);
        assert.equal(points[i++], fromPosition.y() + 20.0);

        assert.equal(points[i++], fromPosition.x() - 20.0);
        assert.equal(points[i++], fromPosition.y() - 20.0);

        assert.equal(points[i++], fromPosition.x() + 20.0);
        assert.equal(points[i++], fromPosition.y() - 20.0);
    });

    QUnit.test("Maneuver.computePath() Straight1Easy 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.STRAIGHT_1_EASY;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 8);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x() + 20.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x() + 60.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x() + 80.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);
    });

    QUnit.test("Maneuver.computePath() Straight1Easy 30 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 30);
        var maneuver = Maneuver.STRAIGHT_1_EASY;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 8);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 17.3205);
        assert.equal(myRound(points[i++]), fromPosition.y() + 10.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 51.9615);
        assert.equal(myRound(points[i++]), fromPosition.y() + 30.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 69.2820);
        assert.equal(myRound(points[i++]), fromPosition.y() + 40.0);

        function myRound(value)
        {
            var factor = 10000;
            return Math.round(value * factor) / factor;
        }
    });

    QUnit.test("Maneuver.computePath() BankRight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.BANK_RIGHT_1_STANDARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 14);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 20.0);
        assert.equal(myRound(points[i++]), fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 36.1145);
        assert.equal(myRound(points[i++]), fromPosition.y() + 1.5871);

        assert.equal(myRound(points[i++]), fromPosition.x() + 51.6097);
        assert.equal(myRound(points[i++]), fromPosition.y() + 6.2876);

        assert.equal(myRound(points[i++]), fromPosition.x() + 65.8901);
        assert.equal(myRound(points[i++]), fromPosition.y() + 13.9206);

        assert.equal(myRound(points[i++]), fromPosition.x() + 78.4070);
        assert.equal(myRound(points[i++]), fromPosition.y() + 24.1930);

        assert.equal(myRound(points[i++]), fromPosition.x() + 92.1421);
        assert.equal(myRound(points[i++]), fromPosition.y() + 38.1421);

        function myRound(value)
        {
            var factor = 10000;
            return Math.round(value * factor) / factor;
        }
    });

    QUnit.test("Maneuver.computePath() BankRight3Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.BANK_RIGHT_3_STANDARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 18);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 20.0);
        assert.equal(myRound(points[i++]), fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 43.2076);
        assert.equal(myRound(points[i++]), fromPosition.y() + 1.5211);

        assert.equal(myRound(points[i++]), fromPosition.x() + 66.0180);
        assert.equal(myRound(points[i++]), fromPosition.y() + 6.0584);

        assert.equal(myRound(points[i++]), fromPosition.x() + 88.0411);
        assert.equal(myRound(points[i++]), fromPosition.y() + 13.5342);

        assert.equal(myRound(points[i++]), fromPosition.x() + 108.9000);
        assert.equal(myRound(points[i++]), fromPosition.y() + 23.8207);

        assert.equal(myRound(points[i++]), fromPosition.x() + 128.2378);
        assert.equal(myRound(points[i++]), fromPosition.y() + 36.7418);

        assert.equal(myRound(points[i++]), fromPosition.x() + 145.7236);
        assert.equal(myRound(points[i++]), fromPosition.y() + 52.0764);

        assert.equal(myRound(points[i++]), fromPosition.x() + 160.1421);
        assert.equal(myRound(points[i++]), fromPosition.y() + 66.1421);

        function myRound(value)
        {
            var factor = 10000;
            return Math.round(value * factor) / factor;
        }
    });

    QUnit.test("Maneuver.computePath() BarrelRollLeft 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.BARREL_ROLL_LEFT_1_STANDARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.getPoints().length, 8);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() - 20.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() - 60.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() - 80.0);
    });

    QUnit.test("Maneuver.computePath() BarrelRollRight 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.BARREL_ROLL_RIGHT_1_STANDARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.getPoints().length, 8);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 20.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 60.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 80.0);
    });

    QUnit.test("Maneuver.computePath() SegnorsLoopRight3Hard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.SEGNORS_LOOP_RIGHT_3_HARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 18);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 20.0);
        assert.equal(myRound(points[i++]), fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 43.2076);
        assert.equal(myRound(points[i++]), fromPosition.y() + 1.5211);

        assert.equal(myRound(points[i++]), fromPosition.x() + 66.0180);
        assert.equal(myRound(points[i++]), fromPosition.y() + 6.0584);

        assert.equal(myRound(points[i++]), fromPosition.x() + 88.0411);
        assert.equal(myRound(points[i++]), fromPosition.y() + 13.5342);

        assert.equal(myRound(points[i++]), fromPosition.x() + 108.9000);
        assert.equal(myRound(points[i++]), fromPosition.y() + 23.8207);

        assert.equal(myRound(points[i++]), fromPosition.x() + 128.2378);
        assert.equal(myRound(points[i++]), fromPosition.y() + 36.7418);

        assert.equal(myRound(points[i++]), fromPosition.x() + 145.7236);
        assert.equal(myRound(points[i++]), fromPosition.y() + 52.0764);

        assert.equal(myRound(points[i++]), fromPosition.x() + 160.1421);
        assert.equal(myRound(points[i++]), fromPosition.y() + 66.1421);

        function myRound(value)
        {
            var factor = 10000;
            return Math.round(value * factor) / factor;
        }
    });

    QUnit.test("Maneuver.computePath() TurnRight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.TURN_RIGHT_1_STANDARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 18);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 20.0);
        assert.equal(myRound(points[i++]), fromPosition.y() + 0.0);

        assert.equal(myRound(points[i++]), fromPosition.x() + 28.8775);
        assert.equal(myRound(points[i++]), fromPosition.y() + 1.1687);

        assert.equal(myRound(points[i++]), fromPosition.x() + 37.1500);
        assert.equal(myRound(points[i++]), fromPosition.y() + 4.5953);

        assert.equal(myRound(points[i++]), fromPosition.x() + 44.2538);
        assert.equal(myRound(points[i++]), fromPosition.y() + 10.0462);

        assert.equal(myRound(points[i++]), fromPosition.x() + 49.7047);
        assert.equal(myRound(points[i++]), fromPosition.y() + 17.1500);

        assert.equal(myRound(points[i++]), fromPosition.x() + 53.1313);
        assert.equal(myRound(points[i++]), fromPosition.y() + 25.4225);

        assert.equal(myRound(points[i++]), fromPosition.x() + 54.3000);
        assert.equal(myRound(points[i++]), fromPosition.y() + 34.3000);

        assert.equal(myRound(points[i++]), fromPosition.x() + 54.0);
        assert.equal(myRound(points[i++]), fromPosition.y() + 54.0);

        function myRound(value)
        {
            var factor = 10000;
            return Math.round(value * factor) / factor;
        }
    });

    QUnit.test("Maneuver.computePath() Stationary0Hard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.STATIONARY_0_HARD;

        // Run.
        var result = Maneuver.computePath(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 2);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);
    });

    QUnit.test("computePolygon() Standard", function(assert)
    {
        // Setup.
        var shipBase = ShipBase.STANDARD;

        // Run.
        var result = Maneuver.computePolygon(shipBase, 0, 0, 0);

        // Verify.
        assert.ok(result);
        assert.equal(result.getPoints().length, 10);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], 20);
        assert.equal(points[i++], -20);
        assert.equal(points[i++], 20);
        assert.equal(points[i++], 20);
        assert.equal(points[i++], -20);
        assert.equal(points[i++], 20);
        assert.equal(points[i++], -20);
        assert.equal(points[i++], -20);
        assert.equal(points[i++], 20);
        assert.equal(points[i++], -20);
    });

    QUnit.test("computePolygon() Standard 0", function(assert)
    {
        // Setup.
        var shipBase = ShipBase.STANDARD;

        // Run.
        var result = Maneuver.computePolygon(shipBase, 10, 20, 0);

        // Verify.
        assert.ok(result);
        assert.equal(result.getPoints().length, 10);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], 30);
        assert.equal(points[i++], 0);
        assert.equal(points[i++], 30);
        assert.equal(points[i++], 40);
        assert.equal(points[i++], -10);
        assert.equal(points[i++], 40);
        assert.equal(points[i++], -10);
        assert.equal(points[i++], 0);
        assert.equal(points[i++], 30);
        assert.equal(points[i++], 0);
    });

    QUnit.test("computePolygon() Standard 45", function(assert)
    {
        // Setup.
        var shipBase = ShipBase.STANDARD;

        // Run.
        var result = Maneuver.computePolygon(shipBase, 10, 20, 45);

        // Verify.
        assert.ok(result);
        assert.equal(result.getPoints().length, 10);

        var i = 0;
        var points = result.getPoints();
        assert.equal(myRound(points[i++]), 38.2843);
        assert.equal(myRound(points[i++]), 20);
        assert.equal(myRound(points[i++]), 10);
        assert.equal(myRound(points[i++]), 48.2843);
        assert.equal(myRound(points[i++]), -18.2843);
        assert.equal(myRound(points[i++]), 20);
        assert.equal(myRound(points[i++]), 10);
        assert.equal(myRound(points[i++]), -8.2843);
        assert.equal(myRound(points[i++]), 38.2843);
        assert.equal(myRound(points[i++]), 20);

        function myRound(value)
        {
            var factor = 10000;
            return Math.round(value * factor) / factor;
        }
    });

    QUnit.test("Maneuver.computeToPolygon() Straight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.STRAIGHT_1_STANDARD;

        // Run.
        var result = Maneuver.computeToPolygon(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.getPoints().length, 10);

        var i = 0;
        var points = result.getPoints();
        assert.equal(points[i++], fromPosition.x() + 100.0);
        assert.equal(points[i++], fromPosition.y() - 20.0);

        assert.equal(points[i++], fromPosition.x() + 100.0);
        assert.equal(points[i++], fromPosition.y() + 20.0);

        assert.equal(points[i++], fromPosition.x() + 60.0);
        assert.equal(points[i++], fromPosition.y() + 20.0);

        assert.equal(points[i++], fromPosition.x() + 60.0);
        assert.equal(points[i++], fromPosition.y() - 20.0);

        assert.equal(points[i++], fromPosition.x() + 100.0);
        assert.equal(points[i++], fromPosition.y() - 20.0);
    });

    QUnit.test("Maneuver.computeToPosition() BankLeft1Easy Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 200, 0);
        var maneuver = Maneuver.BANK_LEFT_1_EASY;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 93);
        assert.equal(result.y(), fromPosition.y() - 38);
        assert.equal(result.heading(), fromPosition.heading() + 315);
    });

    QUnit.test("Maneuver.computeToPosition() BankRight1Easy Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.BANK_RIGHT_1_EASY;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 93);
        assert.equal(result.y(), fromPosition.y() + 38);
        assert.equal(result.heading(), fromPosition.heading() + 45);
    });

    QUnit.test("Maneuver.computeToPosition() BankLeft3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 400, 0);
        var maneuver = Maneuver.BANK_LEFT_3_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() - 66);
        assert.equal(result.heading(), fromPosition.heading() + 315);
    });

    QUnit.test("Maneuver.computeToPosition() BankRight3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.BANK_RIGHT_3_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() + 66);
        assert.equal(result.heading(), fromPosition.heading() + 45);
    });

    QUnit.test("Maneuver.computeToPosition() BarrelRollLeft1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.BARREL_ROLL_LEFT_1_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x());
        assert.equal(result.y(), fromPosition.y() - 80);
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("Maneuver.computeToPosition() BarrelRollRight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.BARREL_ROLL_RIGHT_1_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x());
        assert.equal(result.y(), fromPosition.y() + 80);
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("Maneuver.computeToPosition() BarrelRollLeft1Standard -90 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, -90);
        var maneuver = Maneuver.BARREL_ROLL_LEFT_1_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() - 80);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("Maneuver.computeToPosition() BarrelRollRight1Standard -90 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, -90);
        var maneuver = Maneuver.BARREL_ROLL_RIGHT_1_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 80);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("Maneuver.computeToPosition() KoiogranTurn3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.KOIOGRAN_TURN_3_HARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading() + 180);
    });

    QUnit.test("Maneuver.computeToPosition() SegnorsLoopLeft3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 400, 0);
        var maneuver = Maneuver.SEGNORS_LOOP_LEFT_3_HARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() - 66);
        assert.equal(result.heading(), fromPosition.heading() + 135);
    });

    QUnit.test("Maneuver.computeToPosition() SegnorsLoopRight3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.SEGNORS_LOOP_RIGHT_3_HARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() + 66);
        assert.equal(result.heading(), fromPosition.heading() + 225);
    });

    QUnit.test("Maneuver.computeToPosition() Straight1Easy Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.STRAIGHT_1_EASY;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 80);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("Maneuver.computeToPosition() Straight3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.STRAIGHT_3_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("Maneuver.computeToPosition() TurnLeft1Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 60, 0);
        var maneuver = Maneuver.TURN_LEFT_1_STANDARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 54);
        assert.equal(result.y(), fromPosition.y() - 54);
        assert.equal(result.heading(), fromPosition.heading() + 270);
    });

    QUnit.test("Maneuver.computeToPosition() Stationary0Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.STATIONARY_0_HARD;

        // Run.
        var result = Maneuver.computeToPosition(maneuver, fromPosition, ShipBase.STANDARD);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x());
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
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
});
