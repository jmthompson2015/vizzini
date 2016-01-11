define([ "Maneuver", "ManeuverComputer", "Position", "ShipBase" ], function(Maneuver, ManeuverComputer, Position,
        ShipBase)
{
    "use strict";
    QUnit.module("ManeuverComputer");

    QUnit.test("ManeuverComputer.computeFromPolygon() 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeFromPolygon(fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.points().length, 10);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computePath() Straight1Easy 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.properties[Maneuver.STRAIGHT_1_EASY];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 8);

        var i = 0;
        var points = result.points();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x() + 20.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x() + 60.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x() + 80.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);
    });

    QUnit.test("ManeuverComputer.computePath() Straight1Easy 30 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 30);
        var maneuver = Maneuver.properties[Maneuver.STRAIGHT_1_EASY];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 8);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computePath() BankRight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.BANK_RIGHT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 14);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computePath() BankRight3Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.BANK_RIGHT_3_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 18);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computePath() BarrelRollLeft 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.properties[Maneuver.BARREL_ROLL_LEFT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.points().length, 8);

        var i = 0;
        var points = result.points();
        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() - 20.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() - 60.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() - 80.0);
    });

    QUnit.test("ManeuverComputer.computePath() BarrelRollRight 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.properties[Maneuver.BARREL_ROLL_RIGHT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.points().length, 8);

        var i = 0;
        var points = result.points();
        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 0.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 20.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 60.0);

        assert.equal(points[i++], fromPosition.x());
        assert.equal(points[i++], fromPosition.y() + 80.0);
    });

    QUnit.test("ManeuverComputer.computePath() SegnorsLoopRight3Hard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.SEGNORS_LOOP_RIGHT_3_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 18);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computePath() TurnRight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.TURN_RIGHT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 18);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computePath() Stationary0Hard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.STATIONARY_0_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 2);

        var i = 0;
        var points = result.points();
        assert.equal(points[i++], fromPosition.x() + 0.0);
        assert.equal(points[i++], fromPosition.y() + 0.0);
    });

    QUnit.test("computePolygon() Standard", function(assert)
    {
        // Setup.
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePolygon(shipBase, 0, 0, 0);

        // Verify.
        assert.ok(result);
        assert.equal(result.points().length, 10);

        var i = 0;
        var points = result.points();
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
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePolygon(shipBase, 10, 20, 0);

        // Verify.
        assert.ok(result);
        assert.equal(result.points().length, 10);

        var i = 0;
        var points = result.points();
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
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computePolygon(shipBase, 10, 20, 45);

        // Verify.
        assert.ok(result);
        assert.equal(result.points().length, 10);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computeToPolygon() Straight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.properties[Maneuver.STRAIGHT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPolygon(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        // console.log(result.toString());
        assert.equal(result.points().length, 10);

        var i = 0;
        var points = result.points();
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

    QUnit.test("ManeuverComputer.computeToPosition() BankLeft1Easy Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 200, 0);
        var maneuver = Maneuver.properties[Maneuver.BANK_LEFT_1_EASY];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 93);
        assert.equal(result.y(), fromPosition.y() - 38);
        assert.equal(result.heading(), fromPosition.heading() + 315);
    });

    QUnit.test("ManeuverComputer.computeToPosition() BankRight1Easy Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.properties[Maneuver.BANK_RIGHT_1_EASY];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 93);
        assert.equal(result.y(), fromPosition.y() + 38);
        assert.equal(result.heading(), fromPosition.heading() + 45);
    });

    QUnit.test("ManeuverComputer.computeToPosition() BankLeft3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 400, 0);
        var maneuver = Maneuver.properties[Maneuver.BANK_LEFT_3_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() - 66);
        assert.equal(result.heading(), fromPosition.heading() + 315);
    });

    QUnit.test("ManeuverComputer.computeToPosition() BankRight3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.BANK_RIGHT_3_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() + 66);
        assert.equal(result.heading(), fromPosition.heading() + 45);
    });

    QUnit.test("ManeuverComputer.computeToPosition() BarrelRollLeft1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.properties[Maneuver.BARREL_ROLL_LEFT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x());
        assert.equal(result.y(), fromPosition.y() - 80);
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("ManeuverComputer.computeToPosition() BarrelRollRight1Standard 0 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, 0);
        var maneuver = Maneuver.properties[Maneuver.BARREL_ROLL_RIGHT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x());
        assert.equal(result.y(), fromPosition.y() + 80);
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("ManeuverComputer.computeToPosition() BarrelRollLeft1Standard -90 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, -90);
        var maneuver = Maneuver.properties[Maneuver.BARREL_ROLL_LEFT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() - 80);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("ManeuverComputer.computeToPosition() BarrelRollRight1Standard -90 Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(100, 200, -90);
        var maneuver = Maneuver.properties[Maneuver.BARREL_ROLL_RIGHT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 80);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("ManeuverComputer.computeToPosition() KoiogranTurn3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.KOIOGRAN_TURN_3_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading() + 180);
    });

    QUnit.test("ManeuverComputer.computeToPosition() SegnorsLoopLeft3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 400, 0);
        var maneuver = Maneuver.properties[Maneuver.SEGNORS_LOOP_LEFT_3_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() - 66);
        assert.equal(result.heading(), fromPosition.heading() + 135);
    });

    QUnit.test("ManeuverComputer.computeToPosition() SegnorsLoopRight3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(0, 0, 0);
        var maneuver = Maneuver.properties[Maneuver.SEGNORS_LOOP_RIGHT_3_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y() + 66);
        assert.equal(result.heading(), fromPosition.heading() + 225);
    });

    QUnit.test("ManeuverComputer.computeToPosition() Straight1Easy Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.properties[Maneuver.STRAIGHT_1_EASY];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 80);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("ManeuverComputer.computeToPosition() Straight3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.properties[Maneuver.STRAIGHT_3_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 160);
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });

    QUnit.test("ManeuverComputer.computeToPosition() TallonRollLeft3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 300, 0);
        var maneuver = Maneuver.properties[Maneuver.TALLON_ROLL_LEFT_3_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 109);
        assert.equal(result.y(), fromPosition.y() - 109);
        assert.equal(result.heading(), fromPosition.heading() + 180);
    });

    QUnit.test("ManeuverComputer.computeToPosition() TallonRollRight3Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 300, 0);
        var maneuver = Maneuver.properties[Maneuver.TALLON_ROLL_RIGHT_3_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 109);
        assert.equal(result.y(), fromPosition.y() + 109);
        assert.equal(result.heading(), fromPosition.heading() + 180);
    });

    QUnit.test("ManeuverComputer.computeToPosition() TurnLeft1Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 60, 0);
        var maneuver = Maneuver.properties[Maneuver.TURN_LEFT_1_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 54);
        assert.equal(result.y(), fromPosition.y() - 54);
        assert.equal(result.heading(), fromPosition.heading() + 270);
    });

    QUnit.test("ManeuverComputer.computeToPosition() TurnLeft3Standard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 200, 0);
        var maneuver = Maneuver.properties[Maneuver.TURN_LEFT_3_STANDARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x() + 109);
        assert.equal(result.y(), fromPosition.y() - 109);
        assert.equal(result.heading(), fromPosition.heading() + 270);
    });

    QUnit.test("ManeuverComputer.computeToPosition() Stationary0Hard Standard", function(assert)
    {
        // Setup.
        var fromPosition = new Position(10, 20, 0);
        var maneuver = Maneuver.properties[Maneuver.STATIONARY_0_HARD];
        var shipBase = ShipBase.properties[ShipBase.SMALL];

        // Run.
        var result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        // Verify.
        assert.ok(result);
        assert.equal(result.x(), fromPosition.x());
        assert.equal(result.y(), fromPosition.y());
        assert.equal(result.heading(), fromPosition.heading());
    });
});
