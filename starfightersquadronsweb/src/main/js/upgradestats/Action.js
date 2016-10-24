define(function()
{
    "use strict";
    var Action = {};

    Action.REMOVE_FILTERS = "removeFilters";
    Action.SET_DEFAULT_FILTERS = "setDefaultFilters";
    Action.SET_FILTERS = "setFilters";

    Action.removeFilters = function()
    {
        return (
        {
            type: Action.REMOVE_FILTERS,
        });
    };

    Action.setDefaultFilters = function()
    {
        return (
        {
            type: Action.SET_DEFAULT_FILTERS,
        });
    };

    Action.setFilters = function(filters)
    {
        InputValidator.validateNotNull("filters", filters);

        return (
        {
            type: Action.SET_FILTERS,
            filters: filters,
        });
    };

    return Action;
});
