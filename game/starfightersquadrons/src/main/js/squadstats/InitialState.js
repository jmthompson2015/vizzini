define(["process/SquadBuilder", "squadstats/DefaultFilters", "squadstats/EntityFilter", "squadstats/RangeFilter", "squadstats/SquadData"],
   function(SquadBuilder, DefaultFilters, EntityFilter, RangeFilter, SquadData)
   {
      "use strict";

      function InitialState()
      {
         this.squadData = [];
         this.filteredSquadData = [];

         SquadBuilder.SquadBuilders.forEach(function(squadBuilder)
         {
            var squadData = SquadData.createSquadData(squadBuilder);
            this.squadData.push(squadData);
            this.filteredSquadData.push(squadData);
         }, this);

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
