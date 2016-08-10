define([ "ConsolePanel", "DematStatus", "Scene" ], function(ConsolePanel, DematStatus, Scene)
{
    "use strict";
    function InitialState()
    {
        this.consolePanelKey = ConsolePanel.PANEL_5;
        this.dematStatusKey = DematStatus.MATERIALISED;
        this.isPowered = false;
        this.isScanning = false;
        this.sceneKey = Scene.SCENE_1;
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
