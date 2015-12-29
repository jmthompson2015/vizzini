define([ "FiringArc" ], function(FiringArc)
{
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
        assert.ok(isInFiringArc(0),"0 deg");
        assert.ok(isInFiringArc(45),"45 deg");
        assert.ok(!isInFiringArc(46),"46 deg");
        assert.ok(!isInFiringArc(89),"89 deg");
        assert.ok(isInFiringArc(90),"90 deg");
        assert.ok(isInFiringArc(270),"270 deg");
        assert.ok(!isInFiringArc(271),"271 deg");
        assert.ok(!isInFiringArc(314),"314 deg");
        assert.ok(isInFiringArc(315),"315 deg");
    });
});
