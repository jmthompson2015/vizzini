define([ "FiringArc" ], function(FiringArc)
{
    "use strict";
    QUnit.module("FiringArc");

    QUnit.test("FiringArc.isInFiringArc() Forward", function(assert)
    {
        var arc = FiringArc.FORWARD;
        var isInFiringArc = FiringArc.properties[arc].isInFiringArc;
        assert.ok(isInFiringArc(0));
        assert.ok(isInFiringArc(45));
        assert.ok(!isInFiringArc(46));
        assert.ok(!isInFiringArc(134));
        assert.ok(!isInFiringArc(135));
        assert.ok(!isInFiringArc(225));
        assert.ok(!isInFiringArc(226));
        assert.ok(!isInFiringArc(314));
        assert.ok(isInFiringArc(315));
    });

    QUnit.test("FiringArc.isInFiringArc() ForwardAndAft", function(assert)
    {
        var arc = FiringArc.FORWARD_AND_AFT;
        var isInFiringArc = FiringArc.properties[arc].isInFiringArc;
        assert.ok(isInFiringArc(0));
        assert.ok(isInFiringArc(45));
        assert.ok(!isInFiringArc(46));
        assert.ok(!isInFiringArc(134));
        assert.ok(isInFiringArc(135));
        assert.ok(isInFiringArc(225));
        assert.ok(!isInFiringArc(226));
        assert.ok(!isInFiringArc(314));
        assert.ok(isInFiringArc(315));
    });

    QUnit.test("FiringArc.isInFiringArc() ForwardAndFullAft", function(assert)
    {
        var arc = FiringArc.FORWARD_AND_FULL_AFT;
        var isInFiringArc = FiringArc.properties[arc].isInFiringArc;
        assert.ok(isInFiringArc(0), "0 deg");
        assert.ok(isInFiringArc(45), "45 deg");
        assert.ok(!isInFiringArc(46), "46 deg");
        assert.ok(!isInFiringArc(89), "89 deg");
        assert.ok(isInFiringArc(90), "90 deg");
        assert.ok(isInFiringArc(270), "270 deg");
        assert.ok(!isInFiringArc(271), "271 deg");
        assert.ok(!isInFiringArc(314), "314 deg");
        assert.ok(isInFiringArc(315), "315 deg");
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = FiringArc.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 4);
        assert.equal(result[0], "forward");
        assert.equal(result[1], "forwardAndAft");
        assert.equal(result[2], "forwardAndFullAft");
        assert.equal(result[3], "turret");

        var properties = Object.getOwnPropertyNames(FiringArc);
        var count = properties.length - 1 - // properties
        1; // values
        assert.equal(result.length, count);
    });
});
