define(function()
{
    "use strict";
    function InitialState()
    {
        this.consolePanelKey = "";
        this.isDematerialised = false;
        this.isPowered = false;
        this.isScanning = false;
        this.sceneKey = "";
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
