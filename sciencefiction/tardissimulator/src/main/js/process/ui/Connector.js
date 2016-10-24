define([ "ConsolePanel", "DematStatus", "Scene" ], function(ConsolePanel, DematStatus, Scene)
{
    "use strict";
    var Connector = {};

    Connector.CameraUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var consolePanel = ConsolePanel.properties[state.consolePanelKey];
            var timeRotorDZ = state.timeRotorDZ;

            return (
            {
                canvasId: "cameraCanvas",
                consolePanel: consolePanel,
                width: 640,
                height: 480,
                timeRotorDZ: timeRotorDZ,
            });
        },
    };

    Connector.Controls =
    {
        mapStateToProps: function(state, ownProps)
        {
            var consolePanel = ConsolePanel.properties[state.consolePanelKey];
            var dematStatus = DematStatus.properties[state.dematStatusKey];

            return (
            {
                consolePanel: consolePanel,
                dematStatus: dematStatus,
                isPowered: state.isPowered,
                isScanning: state.isScanning,
            });
        },
    };

    Connector.Scanner =
    {
        mapStateToProps: function(state, ownProps)
        {
            var scene = Scene.properties[state.sceneKey];

            return (
            {
                image: scene.image,
                title: scene.name,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});
