define(function()
{
    "use strict";
    function InitialState()
    {
        this.consolePanelKey = "panel5";
        this.isDematerialised = false;
        this.isPowered = false;
        this.isScanning = false;
        this.sceneKey = "scene1";
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
