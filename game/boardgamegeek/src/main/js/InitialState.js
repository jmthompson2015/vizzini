define(["DefaultFilters", "EntityFilter", "RangeFilter"],
    function(DefaultFilters, EntityFilter, RangeFilter)
    {
        "use strict";

        function InitialState()
        {
            this.gameDatabase = undefined;
            this.gameDataMap = {};
            this.filteredGameData = [];

            this.categoryMap = {};
            this.designerMap = {};
            this.mechanicMap = {};

            // FIXME
            // localStorage.removeItem("filters");
            // FIXME

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

        if (Object.freeze)
        {
            Object.freeze(InitialState);
        }

        return InitialState;
    });
