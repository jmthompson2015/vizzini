define([ "Range" ], function(Range)
{
    QUnit.module("Range");

    QUnit.test("findRange()", function(assert)
    {
        assert.ok(!Range.findRange(-1));
        assert.equal(Range.findRange(0), Range.ONE);
        assert.equal(Range.findRange(100), Range.ONE);
        assert.equal(Range.findRange(101), Range.TWO);
        assert.equal(Range.findRange(200), Range.TWO);
        assert.equal(Range.findRange(201), Range.THREE);
        assert.equal(Range.findRange(300), Range.THREE);
        assert.ok(!Range.findRange(301));
    });
});
