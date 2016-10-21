define(["Pilot", "pilotstats/DefaultFilters", "pilotstats/PilotData"], function(Pilot, DefaultFilters, PilotData)
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
        // var oldFilters = JSON.parse(localStorage.filters);
        // LOGGER.info("oldFilters = ");
        // Object.getOwnPropertyNames(oldFilters).forEach(function(columnKey)
        // {
        //     LOGGER.info(oldFilters[columnKey]);
        // });
        //
        // InitialState.merge(this.filters, oldFilters);
        // LOGGER.info("this.filters = ");
        // Object.getOwnPropertyNames(this.filters).forEach(function(columnKey)
        // {
        //     LOGGER.info(this.filters[columnKey]);
        // }, this);
    }

    // InitialState.merge = function(filters, oldFilters)
    // {
    //     InputValidator.validateNotNull("filters", filters);
    //
    //     if (oldFilters)
    //     {
    //         Object.getOwnPropertyNames(oldFilters).forEach(function(columnKey)
    //         {
    //             if (DefaultFilters.entityColumns.vizziniContains(columnKey) ||
    //                 DefaultFilters.rangeColumns.vizziniContains(columnKey))
    //             {
    //                 filters[columnKey] = oldFilters[columnKey];
    //             }
    //         });
    //     }
    // };

    return InitialState;
});
