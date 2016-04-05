define(function()
{
    "use strict";
    function ExhaustState()
    {
        var isExhausted = false;

        this.isExhausted = function(newValue)
        {
            if (newValue === true || newValue === false)
            {
                isExhausted = newValue;
                this.trigger(ExhaustState.EVENT);
            }

            return isExhausted;
        };
    }

    ExhaustState.EVENT = "exhaust";

    MicroEvent.mixin(ExhaustState);

    return ExhaustState;
});
