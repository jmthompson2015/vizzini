define([ "game/Count" ], function(Count)
{
    "use strict";
    function WoundState()
    {
        var that = this;
        var count = new Count();

        count.bind(Count.EVENT, function()
        {
            that.trigger(WoundState.EVENT);
        });

        this.isWounded = function()
        {
            return count.count() > 0;
        };

        this.wounds = function()
        {
            return count;
        };
    }

    WoundState.EVENT = "wound";

    MicroEvent.mixin(WoundState);

    return WoundState;
});
