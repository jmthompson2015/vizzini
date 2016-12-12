define(["damagestats/DamageColumns", "damagestats/EntityFilter", "damagestats/RangeFilter"],
    function(DamageColumns, EntityFilter, RangeFilter)
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
                this.entityColumns.push(DamageColumns[0]); // version
                this.entityColumns.push(DamageColumns[2]); // trait
                this.entityColumns.push(DamageColumns[5]); // isImplemented
            },
        };

        DefaultFilters.initialize();

        return DefaultFilters;
    });
