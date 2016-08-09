define([ "ConsolePanel" ], function(ConsolePanel)
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

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});
