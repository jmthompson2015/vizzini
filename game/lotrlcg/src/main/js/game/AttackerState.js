define(function()
{
    "use strict";
    function AttackerState()
    {
        var defender;

        this.defender = function(newValue)
        {
            if (newValue !== undefined)
            {
                defender = newValue;
                this.trigger(AttackerState.EVENT);
            }

            return defender;
        };
    }

    AttackerState.EVENT = "attacker";

    MicroEvent.mixin(AttackerState);

    return AttackerState;
});
