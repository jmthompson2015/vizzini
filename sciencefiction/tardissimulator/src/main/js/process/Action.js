define(function()
{
    "use strict";
    var Action = {};

    Action.SET_CONSOLE_PANEL = "setConsolePanel";
    Action.SET_DEMATERIALISED = "setDematerialised";
    Action.SET_POWERED = "setPowered";
    Action.SET_SCANNING = "setScanning";
    Action.SET_SCENE = "setScene";

    Action.setConsolePanel = function(consolePanelKey)
    {
        return (
        {
            type: Action.SET_CONSOLE_PANEL,
            consolePanelKey: consolePanelKey,
        });
    };

    Action.setDematerialised = function(isDematerialised)
    {
        return (
        {
            type: Action.SET_DEMATERIALISED,
            isDematerialised: isDematerialised,
        });
    };

    Action.setPowered = function(isPowered)
    {
        return (
        {
            type: Action.SET_POWERED,
            isPowered: isPowered,
        });
    };

    Action.setScanning = function(isScanning)
    {
        return (
        {
            type: Action.SET_SCANNING,
            isScanning: isScanning,
        });
    };

    Action.setScene = function(sceneKey)
    {
        return (
        {
            type: Action.SET_SCENE,
            sceneKey: sceneKey,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
