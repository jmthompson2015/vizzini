define(["squadbuilder/Action", "squadbuilder/DisplayItemType", "squadbuilder/InitialState"],
   function(Action, DisplayItemType, InitialState)
   {
      "use strict";
      var Reducer = {};

      Reducer.root = function(state, action)
      {
         LOGGER.info("root() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         var newPilotIndexToUpgrades, newPilots, newShips, newUpgrades;

         switch (action.type)
         {
            case Action.INITIALIZE:
               LOGGER.info("INITIALIZE delegateStore = " + action.delegateStore + " imageBase = " + action.imageBase + " team = " + action.team.value);
               return Object.assign(
               {}, state,
               {
                  delegateStore: action.delegateStore,
                  imageBase: action.imageBase,
                  team: action.team,
               });
            case Action.SET_DISPLAY_ITEM:
               LOGGER.info("SET_DISPLAY_ITEM displayItem = " + action.displayItem + " displayItemType = " + action.displayItemType);
               return Object.assign(
               {}, state,
               {
                  displayItem: action.displayItem,
                  displayItemType: action.displayItemType,
               });
            case Action.SET_PILOT:
               LOGGER.info("SET_PILOT pilot = " + action.pilot + " " + (action.pilot ? action.pilot.value : undefined) + " index = " + action.index);
               newPilots = state.pilots.set(action.index, action.pilot);
               if (action.pilot)
               {
                  newPilotIndexToUpgrades = state.pilotIndexToUpgrades.set(action.index, new Immutable.List());
               }
               else
               {
                  newPilotIndexToUpgrades = state.pilotIndexToUpgrades;
               }
               return Object.assign(
               {}, state,
               {
                  displayItem: action.pilot,
                  displayItemType: DisplayItemType.PILOT,
                  pilots: newPilots,
                  pilotIndexToUpgrades: newPilotIndexToUpgrades,
               });
            case Action.SET_PILOT_UPGRADE:
               LOGGER.info("SET_PILOT_UPGRADE pilotIndex = " + action.pilotIndex + " upgrade = " + (action.upgrade ? action.upgrade.value : undefined) + " upgradeIndex = " + action.upgradeIndex);
               newUpgrades = state.pilotIndexToUpgrades.get(action.pilotIndex);
               newUpgrades = newUpgrades.set(action.upgradeIndex, action.upgrade);
               newPilotIndexToUpgrades = state.pilotIndexToUpgrades.set(action.pilotIndex, newUpgrades);
               return Object.assign(
               {}, state,
               {
                  displayItem: action.upgrade,
                  displayItemType: DisplayItemType.UPGRADE,
                  pilotIndexToUpgrades: newPilotIndexToUpgrades,
               });
            case Action.SET_SHIP:
               LOGGER.info("SET_SHIP ship = " + action.ship + " " + (action.ship ? action.ship.value : undefined) + " index = " + action.index);
               newShips = state.ships.set(action.index, action.ship);
               return Object.assign(
               {}, state,
               {
                  displayItem: action.ship,
                  displayItemType: DisplayItemType.SHIP,
                  ships: newShips,
               });
            case Action.SET_SQUAD:
               LOGGER.info("SET_SQUAD squad = " + action.squad);
               return Object.assign(
               {}, state,
               {
                  squad: action.squad,
               });
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      return Reducer;
   });
