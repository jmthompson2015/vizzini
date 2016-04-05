define([ "game/Count" ], function(Count)
{
    "use strict";
    function ResourceState(sphere)
    {
        InputValidator.validateNotNull("sphere", sphere);

        this.sphere = function()
        {
            return sphere;
        };

        var that = this;
        var count = new Count();

        count.bind(Count.EVENT, function()
        {
            that.trigger(ResourceState.EVENT);
        });

        this.resources = function()
        {
            return count;
        };
    }

    ResourceState.EVENT = "resource";

    MicroEvent.mixin(ResourceState);

    return ResourceState;
});
