define(function()
{
    "use strict";
    function ActivationState()
    {
        var isTouching = false;
        var maneuverAction;

        this.clear = function()
        {
            LOGGER.debug("ActivationState.clear()");
            isTouching = false;
            maneuverAction = undefined;
        };

        this.isTouching = function(value)
        {
            if (value === true || value === false)
            {
                isTouching = value;
            }

            return isTouching;
        };

        this.maneuverAction = function(value)
        {
            if (value)
            {
                maneuverAction = value;
            }

            return maneuverAction;
        };
    }

    return ActivationState;
});
