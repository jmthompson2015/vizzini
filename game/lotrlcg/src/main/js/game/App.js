var LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../resources/";
var imageBase = resourceBase + "images/";

require([ "game/Game", "game/ui/EnvironmentUI", "game/ui/StatusBarUI" ], function(Game, EnvironmentUI, StatusBarUI)
{
    "use strict";

    function startNewGame()
    {
        LOGGER.info("startNewGame() start");

        var element = document.getElementById("inputArea");
        element.innerHTML = "";

        var game = new Game();

        var statusBarUI = React.createElement(StatusBarUI,
        {
            initialEnvironment: game.environment(),
        });
        React.render(statusBarUI, document.getElementById("statusBar"));

        var environmentUI = React.createElement(EnvironmentUI,
        {
            environment: game.environment(),
        });
        React.render(environmentUI, document.getElementById("environment"));

        game.start();

        LOGGER.info("startNewGame() end");
    }

    startNewGame();
});
