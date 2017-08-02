define(["UpgradeCard", "upgradestats/DefaultFilters", "upgradestats/EntityFilter", "upgradestats/RangeFilter", "upgradestats/UpgradeData"],
   function(UpgradeCard, DefaultFilters, EntityFilter, RangeFilter, UpgradeData)
   {
      "use strict";

      function InitialState()
      {
         this.upgradeData = [];
         this.filteredUpgradeData = [];

         UpgradeCard.values().forEach(function(upgradeKey)
         {
            var upgrade = UpgradeCard.properties[upgradeKey];
            var upgradeData = UpgradeData.createUpgradeData(upgrade);
            this.upgradeData.push(upgradeData);
            this.filteredUpgradeData.push(upgradeData);
         }, this);

         // FIXME
         // localStorage.removeItem("filters");
         // FIXME

         this.isFilterShown = false;
         this.filters = DefaultFilters.create();
         var oldFilters = InitialState.loadFromLocalStorage();

         if (oldFilters)
         {
            this.merge(oldFilters);
         }
      }

      InitialState.prototype.merge = function(oldFilters)
      {
         InputValidator.validateNotNull("oldFilters", oldFilters);

         Object.getOwnPropertyNames(oldFilters).forEach(function(columnKey, i)
         {
            this.filters[columnKey] = oldFilters[columnKey];
         }, this);
      };

      InitialState.loadFromLocalStorage = function()
      {
         var answer;
         var filterObjects = JSON.parse(localStorage.filters || null);

         if (filterObjects)
         {
            answer = {};

            filterObjects.forEach(function(object, i)
            {
               var filter;

               switch (object.type)
               {
                  case "EntityFilter":
                     filter = EntityFilter.fromObject(object);
                     break;
                  case "RangeFilter":
                     filter = RangeFilter.fromObject(object);
                     break;
                  default:
                     throw "Unknown filter type: " + JSON.stringify(object);
               }

               answer[filter.columnKey()] = filter;
            });
         }

         return answer;
      };

      return InitialState;
   });
