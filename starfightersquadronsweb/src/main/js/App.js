"use strict";
var LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

// Create initial agents and tokens.
var imageUtils = new ImageUtilities();
var newGamePanel = new NewGamePanel(imageUtils, startNewGame);

var element = document.getElementById("inputArea");
element.innerHTML = newGamePanel.paintComponent();
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

    updateSizes();

    LOGGER.info("startNewGame() end");
}

function updateSizes()
{
    var imperialPilots = document.getElementById("imperialPilots");
    var rebelPilots = document.getElementById("rebelPilots");
    var newWidth = window.innerWidth - imperialPilots.offsetWidth
            - rebelPilots.offsetWidth;

    var ssPanel = document.getElementById("ssPanel");
    var messageArea = document.getElementById("messageArea");
    var inputArea = document.getElementById("inputArea");
    var newHeight = window.innerHeight - ssPanel.offsetHeight
            - messageArea.offsetHeight - inputArea.offsetHeight;

    var size = Math.min(newWidth, newHeight)

    var myPlayAreaCanvas = document.getElementById("playAreaCanvas");
    myPlayAreaCanvas.width = size;
    myPlayAreaCanvas.height = size;

    var scale = size / 915;
    environmentUI.setScale(scale);
}

window.addEventListener("resize", updateSizes, false);
window.addEventListener("orientationchange", updateSizes, false);
