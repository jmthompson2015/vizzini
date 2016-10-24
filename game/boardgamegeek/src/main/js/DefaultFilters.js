define(["EntityFilter", "GameColumns", "RangeFilter"],
    function(EntityFilter, GameColumns, RangeFilter)
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
                /*
                designers: EntityFilter.newFilterProps("designers", [], true),
                categories: EntityFilter.newFilterProps("categories", [], true),
                mechanics: EntityFilter.newFilterProps("mechanics", [], true),

                boardGameRank: RangeFilter.newFilterProps("boardGameRank", false, 1, false, 20),
                yearPublished: RangeFilter.newFilterProps("yearPublished", false, 2005, false, 2015),
                geekRating: RangeFilter.newFilterProps("geekRating", false, 7.2, false, 10),
                minPlayers: RangeFilter.newFilterProps("minPlayers", true, 2, true, 3),
                maxPlayers: RangeFilter.newFilterProps("maxPlayers", true, 4, false, 6),
                bestWithPlayers: RangeFilter.newFilterProps("bestWithPlayers", false, 3, false, 4),
                minPlayTime: RangeFilter.newFilterProps("minPlayTime", true, 30, false, 120),
                maxPlayTime: RangeFilter.newFilterProps("maxPlayTime", false, 30, true, 120),
                */
                this.entityColumns.push(GameColumns[2]); // designers
                this.entityColumns.push(GameColumns[10]); // categories
                this.entityColumns.push(GameColumns[11]); // mechanics

                this.rangeColumns.push(GameColumns[0]); // boardGameRank
                this.rangeColumns.push(GameColumns[3]); // yearPublished
                this.rangeColumns.push(GameColumns[4]); // geekRating
                this.rangeColumns.push(GameColumns[5]); // minPlayers
                this.rangeColumns.push(GameColumns[6]); // maxPlayers
                this.rangeColumns.push(GameColumns[7]); // bestWithPlayers
                this.rangeColumns.push(GameColumns[8]); // minPlayTime
                this.rangeColumns.push(GameColumns[9]); // maxPlayTime
            },
        };

        DefaultFilters.initialize();

        return DefaultFilters;
    });
