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
                    var filter;

                    switch (column.key)
                    {
                        case "boardGameRank":
                            filter = new RangeFilter(column.key, isMinEnabled, 1, isMaxEnabled, 20);
                            break;
                        case "yearPublished":
                            filter = new RangeFilter(column.key, isMinEnabled, 2006, isMaxEnabled, 2016);
                            break;
                        case "geekRating":
                            filter = new RangeFilter(column.key, isMinEnabled, 7.2, isMaxEnabled, 10);
                            break;
                        case "minPlayers":
                            filter = new RangeFilter(column.key, true, 2, true, 3);
                            break;
                        case "maxPlayers":
                            filter = new RangeFilter(column.key, true, 4, isMaxEnabled, 6);
                            break;
                        case "bestWithPlayers":
                            filter = new RangeFilter(column.key, isMinEnabled, 3, isMaxEnabled, 4);
                            break;
                        case "minPlayTime":
                            filter = new RangeFilter(column.key, true, 30, isMaxEnabled, 120);
                            break;
                        case "maxPlayTime":
                            filter = new RangeFilter(column.key, isMinEnabled, 30, true, 120);
                            break;
                        default:
                            filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
                    }

                    filters[column.key] = filter;
                });

                return filters;
            },

            initialize: function()
            {
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
