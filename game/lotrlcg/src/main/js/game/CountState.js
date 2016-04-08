define(function()
{
    "use strict";
    function CountState(initialCount)
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
                that.trigger(CountState.EVENT, that);
            }
        }
    }

    CountState.EVENT = "count";

    MicroEvent.mixin(CountState);

    return CountState;
});
