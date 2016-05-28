define([ "Phase" ], function(Phase)
{
    "use strict";
    function InitialState()
    {
        this.playFormatKey = undefined;
        this.round = 0;
        this.phaseKey = Phase.SETUP;
        this.activeTokenId = undefined;
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
