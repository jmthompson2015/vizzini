define(["upgradestats/EntityFilter", "upgradestats/RangeFilter", "upgradestats/UpgradeColumns"],
    function(EntityFilter, RangeFilter, UpgradeColumns)
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
                this.entityColumns.push(UpgradeColumns[0]); // type
                this.entityColumns.push(UpgradeColumns[2]); // restrictions
                this.entityColumns.push(UpgradeColumns[3]); // header
                this.entityColumns.push(UpgradeColumns[5]); // isImplemented
                this.entityColumns.push(UpgradeColumns[7]); // ranges
                this.entityColumns.push(UpgradeColumns[8]); // firingArc

                this.rangeColumns.push(UpgradeColumns[6]); // weaponValue
                this.rangeColumns.push(UpgradeColumns[9]); // squadPointCost
            },
        };

        DefaultFilters.initialize();

        return DefaultFilters;
    });
