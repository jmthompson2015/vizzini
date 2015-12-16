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
});
