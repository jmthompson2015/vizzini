"use strict";
var LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "https://raw.githubusercontent.com/jmthompson2015/vizzini/master/starfightersquadronsweb/src/main/resources/";
var audioBase = resourceBase + "audio/";
var iconBase = resourceBase + "icons/";
var imageBase = resourceBase + "images/";

require([ "Game", "ui/EnvironmentUI", "ui/ImageUtilities", "ui/NewGamePanel" ], function(Game, EnvironmentUI,
        ImageUtilities, NewGamePanel)
{
    // Create initial agents and tokens.
    var imageUtils = new ImageUtilities(imageBase);
    var newGamePanel = React.createElement(NewGamePanel,
    {
        iconBase: iconBase,
        callback: startNewGame,
    });

    React.render(newGamePanel, document.getElementById("inputArea"));
    var environmentUI;

    function startNewGame(agents)
    {
        LOGGER.info("startNewGame() start");

        LOGGER.info("agents[0] = " + agents[0]);
        LOGGER.info("agents[1] = " + agents[1]);

        var element = document.getElementById("inputArea");
        element.innerHTML = "";

        var game = new Game(agents);
        environmentUI = new EnvironmentUI(game.getEngine(), game.getEnvironment());

        game.start();

        updateSizes(environmentUI);
        HtmlUtilities.removeClass(document.getElementById("ssPanel"), "hidden");

        LOGGER.info("startNewGame() end");
    }

    window.addEventListener("resize", function()
    {
        updateSizes(environmentUI)
    }, false);
    window.addEventListener("orientationchange", function()
    {
        updateSizes(environmentUI)
    }, false);
});

function updateSizes(environmentUI)
{
    // InputValidator.validateNotNull("environmentUI", environmentUI);

    var firstPilots = document.getElementById("firstPilots");
    var secondPilots = document.getElementById("secondPilots");
    var newWidth = window.innerWidth - firstPilots.offsetWidth - secondPilots.offsetWidth;

    var ssPanel = document.getElementById("ssPanel");
    var messageArea = document.getElementById("messageArea");
    var inputArea = document.getElementById("inputArea");
    var newHeight = window.innerHeight - ssPanel.offsetHeight - messageArea.offsetHeight - inputArea.offsetHeight;

    var size = Math.min(newWidth, newHeight)

    var myPlayAreaCanvas = document.getElementById("playAreaCanvas");
    myPlayAreaCanvas.width = size;
    myPlayAreaCanvas.height = size;

    var scale = size / 915;

    if (environmentUI)
    {
        environmentUI.setScale(scale);
    }
}
