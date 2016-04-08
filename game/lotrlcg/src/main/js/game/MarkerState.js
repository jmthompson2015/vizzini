define(function()
{
    "use strict";
    function MarkerState()
    {
        var isMarked = false;

        this.isMarked = function(newValue)
        {
            if (typeof newValue === "boolean")
            {
                isMarked = newValue;
                this.trigger(MarkerState.EVENT, this);
            }

            return isMarked;
        };
    }

    MarkerState.EVENT = "mark";

    MicroEvent.mixin(MarkerState);

    return MarkerState;
});
