var LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../resources/";
var imageBase = resourceBase + "images/";

require([ "game/Reducer", "game/ui/Connector", "game/ui/EnvironmentUI" ], function(Reducer, Connector, EnvironmentUI)
{
    "use strict";
    var App = {};

    App.start = function()
    {
        var store = Redux.createStore(Reducer.Root);

        var connector = ReactRedux.connect(Connector.EnvironmentUI.mapStateToProps)(EnvironmentUI);

        var environmentUI = React.createElement(ReactRedux.Provider,
        {
            store: store,
        }, React.createElement(connector));
        ReactDOM.render(environmentUI, document.getElementById("environment"));
    };

    App.start();
});
