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
            var isDematerialised = [ DematStatus.DEMATERIALISING, DematStatus.DEMATERIALISED ]
                    .includes(state.dematStatusKey);

            return (
            {
                isDematerialised: isDematerialised,
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

            if ([ DematStatus.DEMATERIALISED, DematStatus.MATERIALISING ].includes(state.dematStatusKey))
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
