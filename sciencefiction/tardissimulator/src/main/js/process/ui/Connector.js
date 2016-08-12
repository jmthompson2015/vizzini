define([ "ConsolePanel", "DematStatus", "Scene" ], function(ConsolePanel, DematStatus, Scene)
{
    "use strict";
    var Connector = {};

    Connector.Console =
    {
        mapStateToProps: function(state, ownProps)
        {
            var consolePanel = ConsolePanel.properties[state.consolePanelKey];

            return (
            {
                consolePanel: consolePanel,
                width: 500,
                height: 250,
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
