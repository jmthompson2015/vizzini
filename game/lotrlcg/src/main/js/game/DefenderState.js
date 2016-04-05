define(function()
{
    "use strict";
    function DefenderState()
    {
        var attacker;

        this.attacker = function(newValue)
        {
            if (newValue !== undefined)
            {
                attacker = newValue;
                this.trigger(DefenderState.EVENT);
            }

            return attacker;
        };
    }

    DefenderState.EVENT = "defender";

    MicroEvent.mixin(DefenderState);

    return DefenderState;
});
