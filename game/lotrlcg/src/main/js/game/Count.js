define(function()
{
    "use strict";
    function Count(initialCount)
    {
        var that = this;
        var count = (initialCount ? initialCount : 0);

        this.clear = function()
        {
            setCount(0);
        };

        this.count = function()
        {
            return count;
        };

        this.decrease = function(newValue)
        {
            var value = (newValue === undefined ? 1 : newValue);

            setCount(count - value);
        };

        this.increase = function(newValue)
        {
            var value = (newValue === undefined ? 1 : newValue);

            setCount(count + value);
        };

        function setCount(newValue)
        {
            if (0 <= newValue)
            {
                count = newValue;
                that.trigger(Count.EVENT);
            }
        }
    }

    Count.EVENT = "count";

    MicroEvent.mixin(Count);

    return Count;
});
