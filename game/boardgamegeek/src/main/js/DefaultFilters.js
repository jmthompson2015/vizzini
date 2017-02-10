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
                            filter = new RangeFilter(column.key, isMinEnabled, 1, isMaxEnabled, 100);
                            break;
                        case "yearPublished":
                            filter = new RangeFilter(column.key, isMinEnabled, 2007, isMaxEnabled, 2017);
                            break;
                        case "geekRating":
                            filter = new RangeFilter(column.key, true, 7, isMaxEnabled, 10);
                            break;
                        case "minPlayers":
                            filter = new RangeFilter(column.key, isMinEnabled, 2, true, 3);
                            break;
                        case "maxPlayers":
                            filter = new RangeFilter(column.key, true, 4, isMaxEnabled, 6);
                            break;
                        case "bestWithPlayers":
                            filter = new RangeFilter(column.key, isMinEnabled, 3, isMaxEnabled, 4);
                            break;
                        case "minPlayTime":
                            filter = new RangeFilter(column.key, true, 30, isMaxEnabled, 90);
                            break;
                        case "maxPlayTime":
                            filter = new RangeFilter(column.key, isMinEnabled, 30, true, 90);
                            break;
                        case "averageWeight":
                            filter = new RangeFilter(column.key, true, 1.5, true, 3.2);
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
                this.entityColumns.push(GameColumns[0]); // usernames
                this.entityColumns.push(GameColumns[3]); // designers
                this.entityColumns.push(GameColumns[12]); // categories
                this.entityColumns.push(GameColumns[13]); // mechanics

                this.rangeColumns.push(GameColumns[1]); // boardGameRank
                this.rangeColumns.push(GameColumns[4]); // yearPublished
                this.rangeColumns.push(GameColumns[5]); // geekRating
                this.rangeColumns.push(GameColumns[6]); // minPlayers
                this.rangeColumns.push(GameColumns[7]); // maxPlayers
                this.rangeColumns.push(GameColumns[8]); // bestWithPlayers
                this.rangeColumns.push(GameColumns[9]); // minPlayTime
                this.rangeColumns.push(GameColumns[10]); // maxPlayTime
                this.rangeColumns.push(GameColumns[11]); // averageWeight
            },
        };

        DefaultFilters.initialize();

        return DefaultFilters;
    });
