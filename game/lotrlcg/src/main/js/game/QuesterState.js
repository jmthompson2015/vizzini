define(function()
{
    "use strict";
    function QuesterState()
    {
        var isQuesting = false;

        this.isQuesting = function(newValue)
        {
            if (newValue === true || newValue === false)
            {
                isQuesting = newValue;
                this.trigger(QuesterState.EVENT);
            }

            return isQuesting;
        };
    }

    QuesterState.EVENT = "quester";

    MicroEvent.mixin(QuesterState);

    return QuesterState;
});
