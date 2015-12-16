define([ "ShipBase" ], function(ShipBase)
{
    QUnit.module("ShipBase");

    QUnit.test("ShipBase properties Large", function(assert)
    {
        var shipBase = ShipBase.LARGE;
        var properties = ShipBase.properties[shipBase];
        assert.equal(properties.width, 80);
        assert.equal(properties.height, 80);
    });

    QUnit.test("ShipBase properties Standard", function(assert)
    {
        var shipBase = ShipBase.STANDARD;
        var properties = ShipBase.properties[shipBase];
        assert.equal(properties.width, 40);
        assert.equal(properties.height, 40);
    });

    QUnit.test("computePolygon() Standard", function(assert)
    {
        // Setup.
        var shipBase = ShipBase.STANDARD;

        // Run.
        var result = ShipBase.computePolygon(shipBase, 0, 0, 0);

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
        var result = ShipBase.computePolygon(shipBase, 10, 20, 0);

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
        var result = ShipBase.computePolygon(shipBase, 10, 20, 45);

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
});
