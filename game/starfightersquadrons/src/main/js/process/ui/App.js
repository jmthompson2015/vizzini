"use strict";

var LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "https://raw.githubusercontent.com/jmthompson2015/vizzini/master/game/starfightersquadrons/src/main/resources/";
var iconBase = resourceBase + "icons/";
var imageBase = resourceBase + "images/";

require(["process/Action", "process/EnvironmentAction", "process/Game", "process/Reducer",
  "process/ui/Connector", "process/ui/NewGamePanel", "process/ui/PilotsUI", "process/ui/PlayAreaUI", "process/ui/StatusBarUI"],
   function(Action, EnvironmentAction, Game, Reducer,
      Connector, NewGamePanel, PilotsUI, PlayAreaUI, StatusBarUI)
   {
      // Create initial agents and tokens.
      var store0 = Redux.createStore(Reducer.root);
      var newGamePanel = React.createElement(ReactRedux.Provider,
      {
         store: store0,
      }, React.createElement(NewGamePanel,
      {
         callback: startNewGame,
         iconBase: iconBase,
         imageBase: imageBase,
      }));

      ReactDOM.render(newGamePanel, document.getElementById("secondPilotInputArea"));
      var game;

      function startNewGame(agent1, squad1, agent2, squad2)
      {
         LOGGER.info("startNewGame() start");

         LOGGER.info("agent1 = " + agent1);
         LOGGER.info("squad1 = " + squad1);
         LOGGER.info("agent2 = " + agent2);
         LOGGER.info("squad2 = " + squad2);

         var element = document.getElementById("secondPilotInputArea");
         element.innerHTML = "";

         game = new Game(agent1, squad1, agent2, squad2);
         var store = game.environment().store();
         createEnvironmentUI(game.engine(), game.environment(), imageBase, store);

         game.start();

         updateSizes();

         LOGGER.info("startNewGame() end");
      }

      function createEnvironmentUI(engine, environment, imageBase, store)
      {
         // Status bar.
         var connector0 = ReactRedux.connect(Connector.StatusBarUI.mapStateToProps)(StatusBarUI);
         var statusBarElement = React.createElement(ReactRedux.Provider,
         {
            store: store,
         }, React.createElement(connector0,
         {
            environment: environment,
         }));

         // First pilots.
         var connector1 = ReactRedux.connect(Connector.PilotsUI.mapStateToProps)(PilotsUI);
         var firstPilotsElement = React.createElement(ReactRedux.Provider,
         {
            store: store,
         }, React.createElement(connector1,
         {
            environment: environment,
            iconBase: iconBase,
            imageBase: imageBase,
            team: environment.firstAgent().teamKey(),
         }));

         // Play area.
         var connector2 = ReactRedux.connect(Connector.PlayAreaUI.mapStateToProps)(PlayAreaUI);
         var playAreaElement = React.createElement(ReactRedux.Provider,
         {
            store: store,
         }, React.createElement(connector2,
         {
            environment: environment,
            imageBase: imageBase,
         }));

         // Second pilots.
         var secondPilotsElement = React.createElement(ReactRedux.Provider,
         {
            store: store,
         }, React.createElement(connector1,
         {
            environment: environment,
            iconBase: iconBase,
            imageBase: imageBase,
            team: environment.secondAgent().teamKey(),
         }));

         ReactDOM.render(statusBarElement, document.getElementById("statusBarContainer"));
         ReactDOM.render(firstPilotsElement, document.getElementById("firstPilotArea"));
         ReactDOM.render(playAreaElement, document.getElementById("playAreaContainer"));
         ReactDOM.render(secondPilotsElement, document.getElementById("secondPilotArea"));
      }

      /*
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
       */
      function updateSizes()
      {
         var mainTable = document.getElementById("mainTable");
         //  var windowWidth = Math.min(window.innerWidth - 8, mainTable.clientWidth);
         var windowHeight = Math.min(window.innerHeight - 8, mainTable.clientHeight);
         var firstPilots = document.getElementById("firstPilotArea");
         var secondPilots = document.getElementById("secondPilotArea");
         //  var newWidth = windowWidth;
         var newHeight = windowHeight;

         if (firstPilots)
         {
            newHeight -= firstPilots.offsetHeight;
         }

         if (secondPilots)
         {
            newHeight -= secondPilots.offsetHeight;
         }

         // FIXME: use playFormat.height
         newHeight = Math.max(newHeight, 0.5 * 915);

         var myPlayAreaCanvas = document.getElementById("playAreaCanvas");
         if (myPlayAreaCanvas)
         {
            myPlayAreaCanvas.height = newHeight;
         }

         if (game)
         {
            var playFormat = game.environment().playFormat();

            if (myPlayAreaCanvas)
            {
               var aspectRatio = playFormat.width / playFormat.height;
               myPlayAreaCanvas.width = newHeight * aspectRatio;
            }

            var store = game.environment().store();
            store.dispatch(EnvironmentAction.setPlayAreaScale(newHeight / playFormat.height));
         }
      }

      window.addEventListener("resize", function()
      {
         updateSizes();
      }, false);
      window.addEventListener("orientationchange", function()
      {
         updateSizes();
      }, false);
   });
