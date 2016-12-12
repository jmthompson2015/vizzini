define(["abilitystats/AbilityColumns", "abilitystats/EntityFilter", "abilitystats/RangeFilter"],
    function(AbilityColumns, EntityFilter, RangeFilter)
    {
        "use strict";
        var DefaultFilters = {
            entityColumns: [],
            rangeColumns: [],

            create: function()
            {
                var filters = {};

                this.entityColumns.forEach(function(column)
                {
                    var values = [];
                    var filter = new EntityFilter(column.key, values);
                    filters[column.key] = filter;
                });

                this.rangeColumns.forEach(function(column)
                {
                    var isMinEnabled = false;
                    var minValue = 1;
                    var isMaxEnabled = false;
                    var maxValue = 10;

                    var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
                    filters[column.key] = filter;
                });

                return filters;
            },

            initialize: function()
            {
                this.entityColumns.push(AbilityColumns[0]); // deck
                this.entityColumns.push(AbilityColumns[1]); // type
                this.entityColumns.push(AbilityColumns[5]); // isImplemented
                this.entityColumns.push(AbilityColumns[6]); // event
            },
        };

        DefaultFilters.initialize();

        return DefaultFilters;
    });
