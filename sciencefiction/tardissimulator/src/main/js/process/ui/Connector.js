define([ "ConsolePanel", "Scene" ], function(ConsolePanel, Scene)
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
            return (
            {
                isDematerialised: state.isDematerialised,
                isPowered: state.isPowered,
                isScanning: state.isScanning,
            });
        },
    };

    Connector.Scanner =
    {
        mapStateToProps: function(state, ownProps)
        {
            var image;
            var title;

            if (state.isDematerialised)
            {
                image = "../resources/scenes/time-vortex.gif";
                title = "Time Vortex";
            }
            else
            {
                var scene = Scene.properties[state.sceneKey];
                image = scene.image;
                title = scene.name;
            }

            return (
            {
                image: image,
                title: title,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});
