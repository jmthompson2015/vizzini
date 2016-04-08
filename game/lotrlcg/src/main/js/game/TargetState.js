define(function()
{
    "use strict";
    function TargetState()
    {
        var target;

        this.target = function(newValue)
        {
            if (newValue !== undefined)
            {
                target = newValue;
                this.trigger(TargetState.EVENT, this);
            }

            return target;
        };
    }

    TargetState.EVENT = "target";

    MicroEvent.mixin(TargetState);

    return TargetState;
});
