define(["Pilot", "pilotstats/DefaultFilters", "pilotstats/EntityFilter", "pilotstats/PilotData", "pilotstats/RangeFilter"], function(Pilot, DefaultFilters, EntityFilter, PilotData, RangeFilter)
{
    "use strict";

    function InitialState()
    {
        this.pilotData = [];
        this.filteredPilotData = [];

        Pilot.values().forEach(function(pilotKey)
        {
            var pilot = Pilot.properties[pilotKey];
            var pilotData = PilotData.createPilotData(pilot);
            this.pilotData.push(pilotData);
            this.filteredPilotData.push(pilotData);
        }, this);

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
