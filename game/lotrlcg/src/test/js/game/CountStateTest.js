define([ "game/CountState" ], function(CountState)
{
    "use strict";
    QUnit.module("CountState");

    QUnit.test("basics", function(assert)
    {
        var count = new CountState();

        assert.equal(count.count(), 0);
        count.increase();
        assert.equal(count.count(), 1);
        count.increase();
        assert.equal(count.count(), 2);
        count.decrease();
        assert.equal(count.count(), 1);
        count.clear();
        assert.equal(count.count(), 0);
    });

    QUnit.test("decrease()", function(assert)
    {
        var count = new CountState();

        count.increase();
        count.increase();
        count.increase();
        assert.equal(count.count(), 3);
        count.decrease(2);
        assert.equal(count.count(), 1);
    });

    QUnit.test("increase()", function(assert)
    {
        var count = new CountState();

        assert.equal(count.count(), 0);
        count.increase(3);
        assert.equal(count.count(), 3);
    });
});
