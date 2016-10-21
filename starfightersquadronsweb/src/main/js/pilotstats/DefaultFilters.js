define(["pilotstats/EntityFilter", "pilotstats/PilotColumns", "pilotstats/RangeFilter"], function(EntityFilter, PilotColumns, RangeFilter)
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

                if (column.key === "squadPointCost")
                {
                    minValue = 0;
                    maxValue = 46;
                }
                else if (column.key === "sumStats")
                {
                    minValue = 8;
                    maxValue = 27;
                }
                else if (column.key === "ratioPrimaryWeaponAgility")
                {
                    minValue = 0;
                    maxValue = 3;
                }
                else if (column.key === "hullPlusShield")
                {
                    minValue = 3;
                    maxValue = 16;
                }
                else if (column.key === "ratioSumStatsSquadPointCost")
                {
                    minValue = 0;
                    maxValue = 1;
                }

                var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
                filters[column.key] = filter;
            });

            return filters;
        },

        initialize: function()
        {
            this.entityColumns.push(PilotColumns[0]); // factionKey
            this.entityColumns.push(PilotColumns[2]); // shipKey
            this.entityColumns.push(PilotColumns[3]); // wave

            this.rangeColumns.push(PilotColumns[6]); // pilotSkill
            this.rangeColumns.push(PilotColumns[7]); // primaryWeapon
            this.rangeColumns.push(PilotColumns[8]); // energy
            this.rangeColumns.push(PilotColumns[9]); // agility
            this.rangeColumns.push(PilotColumns[10]); // hull
            this.rangeColumns.push(PilotColumns[11]); // shield
            this.rangeColumns.push(PilotColumns[12]); // squadPointCost
            this.rangeColumns.push(PilotColumns[13]); // sumStats
            this.rangeColumns.push(PilotColumns[14]); // ratioPrimaryWeaponAgility
            this.rangeColumns.push(PilotColumns[15]); // hullPlusShield
            this.rangeColumns.push(PilotColumns[16]); // ratioSumStatsSquadPointCost
        },
    };

    DefaultFilters.initialize();

    return DefaultFilters;
});
