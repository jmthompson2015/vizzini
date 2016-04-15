var LOGGER = new Logger();
//LOGGER.setTraceEnabled(false);
//LOGGER.setDebugEnabled(false);

var resourceBase = "../resources/";
var imageBase = resourceBase + "images/";

require([ "game/Game", "game/Reducer", "game/ui/Connector", "game/ui/EnvironmentUI" ], function(Game, Reducer,
        Connector, EnvironmentUI)
{
    "use strict";
    function startNewGame()
    {
        LOGGER.info("startNewGame() start");

        var store = Redux.createStore(Reducer.root);

        var game = new Game(store);

        var connector = ReactRedux.connect(Connector.EnvironmentUI.mapStateToProps)(EnvironmentUI);

        var environmentUI = React.createElement(ReactRedux.Provider,
        {
            store: store,
        }, React.createElement(connector));
        ReactDOM.render(environmentUI, document.getElementById("environment"));

        game.start();

        LOGGER.info("startNewGame() end");
    }

    startNewGame();
});
