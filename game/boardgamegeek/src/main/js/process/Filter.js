define(["EntityFilter", "RangeFilter", "process/Action"], function(EntityFilter, RangeFilter, Action)
{
    "use strict";

    function Filter(store)
    {
        InputValidator.validateNotNull("store", store);

        this.store = function()
        {
            return store;
        };

        this.loadFromLocalStorage = function()
        {
            var answer;

            if (localStorage.filterObject)
            {
                answer = JSON.parse(localStorage.filterObject);
            }
            else
            {
                answer = Filter.createDefaults();
            }

            store.dispatch(Action.setFilters(answer));

            return answer;
        };

        this.storeToLocalStorage = function(filterObject)
        {
            localStorage.filterObject = JSON.stringify(filterObject);
        };
    }

    Filter.prototype.filters = function()
    {
        return this.store().getState().filters;
    };

    Filter.prototype.passes = function(gameSummary, gameDetail)
    {
        InputValidator.validateNotNull("gameSummary", gameSummary);
        InputValidator.validateNotNull("gameDetail", gameDetail);

        var answer = false;
        var filters = this.filters();
        LOGGER.debug("Filter.passes() filters.length = " + filters.length);

        if (filters && filters.length > 0)
        {
            answer = filters.reduce(function(previousValue, filter)
            {
                LOGGER.debug("Filter.passes() filter = " + filter);
                LOGGER.debug("Filter.passes() filter.passes() ? " + filter.passes(gameSummary, gameDetail));
                return previousValue && filter.passes(gameSummary, gameDetail);
            }, true);
        }

        LOGGER.debug("Filter.passes() answer ? " + answer);
        return answer;
    };

    Filter.createDefaults = function()
    {
        return (
        {
            boardGameRank: RangeFilter.newFilterProps("boardGameRank", false, 1, false, 20),
            designers: EntityFilter.newFilterProps("designers", [], true),
            yearPublished: RangeFilter.newFilterProps("yearPublished", false, 2005, false, 2015),
            geekRating: RangeFilter.newFilterProps("geekRating", false, 7.2, false, 10),
            minPlayers: RangeFilter.newFilterProps("minPlayers", true, 2, true, 3),
            maxPlayers: RangeFilter.newFilterProps("maxPlayers", true, 4, false, 6),
            bestWithPlayers: RangeFilter.newFilterProps("bestWithPlayers", false, 3, false, 4),
            minPlayTime: RangeFilter.newFilterProps("minPlayTime", true, 30, false, 120),
            maxPlayTime: RangeFilter.newFilterProps("maxPlayTime", false, 30, true, 120),
            categories: EntityFilter.newFilterProps("categories", [], true),
            mechanics: EntityFilter.newFilterProps("mechanics", [], true),
        });
    };

    return Filter;
});
