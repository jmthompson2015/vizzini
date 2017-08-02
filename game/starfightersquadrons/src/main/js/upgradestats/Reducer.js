define(["upgradestats/Action", "upgradestats/DefaultFilters", "upgradestats/InitialState"],
   function(Action, DefaultFilters, InitialState)
   {
      "use strict";
      var Reducer = {};

      Reducer.root = function(state, action)
      {
         LOGGER.debug("root() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         var newFilters, newFilteredUpgradeData;

         switch (action.type)
         {
            case Action.REMOVE_FILTERS:
               newFilteredUpgradeData = [];
               newFilteredUpgradeData.vizziniAddAll(state.upgradeData);
               return Object.assign(
               {}, state,
               {
                  filteredUpgradeData: newFilteredUpgradeData,
               });
            case Action.SET_DEFAULT_FILTERS:
               newFilters = DefaultFilters.create();
               return Object.assign(
               {}, state,
               {
                  filters: newFilters,
               });
            case Action.SET_FILTERS:
               LOGGER.debug("Reducer filters = ");
               Object.getOwnPropertyNames(action.filters).forEach(function(propertyName)
               {
                  LOGGER.debug(propertyName + ": " + action.filters[propertyName]);
               });
               newFilters = Object.assign(
               {}, state.filters);
               Object.vizziniMerge(newFilters, action.filters);
               newFilteredUpgradeData = Reducer.filterUpgradeData(state.upgradeData, newFilters);
               Reducer.saveToLocalStorage(newFilters);
               return Object.assign(
               {}, state,
               {
                  filters: newFilters,
                  filteredUpgradeData: newFilteredUpgradeData,
               });
            case Action.TOGGLE_FILTER_SHOWN:
               return Object.assign(
               {}, state,
               {
                  isFilterShown: !state.isFilterShown,
               });
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      Reducer.filterUpgradeData = function(upgradeData, filters)
      {
         InputValidator.validateNotNull("upgradeData", upgradeData);
         InputValidator.validateNotNull("filters", filters);

         var answer = [];

         upgradeData.forEach(function(data)
         {
            if (Reducer.passes(data, filters))
            {
               answer.push(data);
            }
         });

         return answer;
      };

      Reducer.passes = function(data, filters)
      {
         InputValidator.validateNotNull("data", data);
         InputValidator.validateNotNull("filters", filters);

         var answer = true;
         var propertyNames = Object.getOwnPropertyNames(filters);

         for (var i = 0; i < propertyNames.length; i++)
         {
            var propertyName = propertyNames[i];
            var filter = filters[propertyName];

            if (!filter.passes(data))
            {
               answer = false;
               break;
            }
         }

         return answer;
      };

      Reducer.saveToLocalStorage = function(filters)
      {
         InputValidator.validateNotNull("filters", filters);

         var filterObjects = [];

         Object.getOwnPropertyNames(filters).forEach(function(columnKey)
         {
            var filter = filters[columnKey];
            filterObjects.push(filter.toObject());
         });

         localStorage.filters = JSON.stringify(filterObjects);
      };

      return Reducer;
   });
